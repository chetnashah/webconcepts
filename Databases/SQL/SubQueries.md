
---

# First-principles: what is a subquery?

A **subquery** is a query used *inside* another query. It can behave like:

1. a **value** (scalar),
2. a **list** (for `IN` / `ANY` / `ALL`),
3. a **truth test** (with `EXISTS`),
4. a **table** (derived table in `FROM`, or a **CTE**).

I remember them as **S-L-E-T**:

* **S**calar
* **L**ist (`IN`/`ANY`/`ALL`)
* **E**XISTS / `NOT EXISTS`
* **T**able (derived table / CTE)

## Logical vs physical

* Logically, the outer query evaluates your predicate **per candidate row**.
* Physically, optimizers try to **pull up**/rewrite subqueries to joins, or **materialize** them once, or **hash** them for fast membership tests. Only **correlated** subqueries truly “depend on the current row”; even then, many are decorrelated to semi-joins.

---

# The four species (with pocket rules)

## 1) Scalar subquery (returns **one value**)

Used where an expression can appear.

```sql
SELECT e.id,
       (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) AS dept_avg
FROM employees e;
```

**Rules**

* Must return **one column** and **at most one row**.
* If **no row** → result is **NULL**. If **>1 row** → **error**.
* Great for per-group lookups; can often be rewritten as a join + aggregate.

**Performance tip**: If correlated, add an index on the correlation key(s). Consider a join with `GROUP BY` when it’s hot.

---

## 2) List subquery (`IN`, `ANY`, `ALL`)

Membership or comparative tests.

```sql
-- IN
SELECT * FROM orders
WHERE customer_id IN (SELECT id FROM customers WHERE active = 1);

-- ANY/ALL (PostgreSQL/SQL Server/MySQL)
SELECT * FROM products
WHERE price <= ALL (SELECT price FROM competitor_prices WHERE sku = products.sku);
```

**Rules**

* Subquery returns **one column** of comparable type.
* `IN` is like many `OR`s; `NOT IN` is like many `AND`s **but**:

  * **Gotcha**: if the subquery returns **any NULL**, `NOT IN` becomes **UNKNOWN** → filters out everything. Prefer `NOT EXISTS`.

**Perf tip**: Engines usually **materialize once** and probe (semi-join). Index the subquery output column. Keep types consistent to stay sargable.

---

## 3) `EXISTS` / `NOT EXISTS` (truth tests)

Presence checks; ignores subquery’s columns—only cares if **any row** exists.

```sql
SELECT c.*
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);
```

**Rules**

* Always **NULL-safe** (unlike `NOT IN`).
* Optimizers turn these into efficient **semi-joins** / anti-joins.

**Perf tip**: Index the join predicate in the subquery (here `orders(customer_id)`).

---

## 4) Derived table (FROM-subquery) and CTEs

Treat a subquery as a **table**.

```sql
-- Derived table
SELECT d.customer_id, SUM(d.amount) total
FROM (
  SELECT customer_id, amount
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '30 day'
) AS d
GROUP BY d.customer_id;

-- CTE
WITH recent AS (
  SELECT customer_id, amount
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '30 day'
)
SELECT customer_id, SUM(amount)
FROM recent
GROUP BY customer_id;
```

**Rules**

* Must give the derived table an **alias** (all engines).
* CTEs are usually just syntax sugar; some engines historically made them optimization fences (see engine notes).

**Perf tip**: Indexes don’t exist on the ephemeral result; push filters/aggregations **inside** the subquery so less data flows out.

---

## Correlated vs uncorrelated (the “depends on outer row” divide)

* **Uncorrelated**: does **not** reference outer columns.
  → Typically **computed once** (materialized or hashed), then probed.
* **Correlated**: references outer columns.
  → Logically per row; optimizer may still **decorrelate** to a join.
  → If not, you get **nested-loops** style execution; indexes on correlation keys matter.

---

# Engine-by-engine behavior (features, gotchas)

## SQLite

* **Supports** scalar, `IN`, `EXISTS`, derived tables, CTEs (including recursive).
* **No `LATERAL`** (true lateral joins), but correlated subqueries are allowed and frequently **flattened**.
* Scalar subquery: no row → **NULL**; >1 row → **error**.
* `NOT IN` **NULL trap** applies.
* Optimizer often builds ephemeral B-tree to probe `IN (subquery)`; simple and effective.

**Use**: Keep types aligned (SQLite’s type affinity will coerce). Push filters into subqueries; expect flattening.

---

## PostgreSQL

* **Full suite**: scalar, `IN`/`ANY`/`ALL`, `EXISTS`, derived tables, **CTEs**, **`LATERAL`**, tuple `(a,b)` comparisons.
* `LATERAL` enables true left-to-right dependency in `FROM`:

  ```sql
  SELECT c.id, x.top_order
  FROM customers c
  CROSS JOIN LATERAL (
    SELECT o.id AS top_order
    FROM orders o
    WHERE o.customer_id = c.id
    ORDER BY o.created_at DESC
    LIMIT 1
  ) x;
  ```
* CTEs: before v12 acted as optimization fences; v12+ usually inlineable.
* Excellent decorrelation: **Hash Semi Join**, **Index Semi Join**.
* Strong typing: mismatched types in `IN` must share a common supertype or be cast.

**Use**: Prefer `EXISTS`/`NOT EXISTS` over `IN`/`NOT IN` with subqueries. Exploit `LATERAL` and row-wise `(a,b)` comparisons. Cast explicitly.

---

## SQL Server

* **Full suite**: scalar, `IN`/`ANY`/`ALL`, `EXISTS`, derived tables, **CTEs**, and **APPLY** (CROSS/OUTER APPLY == lateral).

  ```sql
  SELECT c.CustomerID, x.TopOrderID
  FROM Customers c
  CROSS APPLY (
     SELECT TOP (1) o.OrderID AS TopOrderID
     FROM Orders o
     WHERE o.CustomerID = c.CustomerID
     ORDER BY o.OrderDate DESC
  ) AS x;
  ```
* Scalar subquery: no row → **NULL**; >1 row → **error**.
* Implicit conversions follow type precedence; can silently change semantics (watch `IN` with strings vs ints).
* Optimizer: constant-scan, semi-joins, nested loops, spools for correlated forms.

**Use**: Favor `EXISTS`/`NOT EXISTS`. Keep **types aligned** to avoid scans. APPLY is your friend for “top-N per parent.”

---

## MySQL (8.0+)

* **Supports** scalar, `IN`/`ANY`/`ALL`, `EXISTS`, derived tables, **CTEs** (including recursive).
* **No true `LATERAL`** in general query syntax; use correlated subqueries or JSON_TABLE patterns when needed.
* Historically poor subquery plans improved in 8.0: **semi-join transformations** (materialization, first-match, duplicate-weedout).
* Very **loose type coercion** (strings → numbers); this affects `IN`/comparisons.
* Scalar subquery: no row → **NULL**; >1 row → **error**.

**Use**: Prefer `EXISTS`/`NOT EXISTS` over `IN` for correlated cases; keep constants’ types matching the column; avoid huge `IN` lists—stage to a temp table and join.

---

# Common gotchas (portable)

1. **`NOT IN` + NULL** → filters out everything.
   Use `NOT EXISTS` or filter out NULLs in the subquery:

   ```sql
   WHERE key NOT IN (SELECT k FROM t WHERE k IS NOT NULL)
   -- better
   WHERE NOT EXISTS (SELECT 1 FROM t WHERE t.k = outer.key)
   ```

2. **Scalar subquery >1 row** → error.
   Reduce inside (e.g., `MAX()`, `LIMIT 1` with a deterministic `ORDER BY`).

3. **Type mismatch breaks sargability**.
   `WHERE id IN ('1','2')` on an INT column can force per-row conversions. Keep types aligned or cast appropriately.

4. **Derived table must be aliased** (all engines):

   ```sql
   FROM (SELECT ...) AS d   -- alias required
   ```

5. **ORDER BY inside scalar subquery needs LIMIT/TOP** to be meaningful.
   Without it, multiple rows are possible → error.

6. **CTEs vs subqueries**: in most engines CTEs are syntactic sugar; do not assume materialization. In Postgres pre-12, CTEs were an optimization fence (be careful on older versions).

---

# Performance crib sheet

* **IN (const list)** → fine; engines hash/merge or do multi-seeks.
* **IN (uncorrelated subquery)** → usually materialized once; index the subquery output column.
* **Correlated subquery** → index the correlation keys; consider rewriting to **JOIN** / `EXISTS`; APPLY/LATERAL where available.
* **Large dynamic lists** → load into a (temp) table and **JOIN**; better plans, stats, and caching.
* **Push filters down** inside subqueries to reduce rows early.

---

## Correlated vs uncorrelated sub queries

Here’s a clean, “stick-in-your-head” way to think about subqueries.

## Core idea

A **subquery** is just a query used inside another query. Two species:

* **Uncorrelated subquery**: stands alone; it **doesn’t read any column** from the outer query.
* **Correlated subquery**: **does** read a column from the outer query; its result can change for every outer row.

### Memory hook

> **U**ncorrelated = **U**nplugged (independent).
> **C**orrelated = **C**onnected (depends on the current row).

---

## Uncorrelated subqueries (independent)

### What it means

The inner query returns a fixed result (for the duration of the statement). The optimizer can compute it **once** (or rewrite to a join) and reuse it.

### Examples

**Scalar** (one value):

```sql
-- Average salary across the whole company
SELECT e.id, e.salary,
       (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees e;
```

If the inner query returns 0 rows → `NULL`. If it returns >1 row → error.

**List / membership**:

```sql
-- Keep only employees whose department is active
SELECT e.*
FROM employees e
WHERE e.dept_id IN (SELECT d.id FROM departments d WHERE d.active = TRUE);
```

The right-hand set is built once, then probed for each employee.

**EXISTS**:

```sql
SELECT 1
WHERE EXISTS (SELECT 1 FROM departments WHERE active = TRUE);
```

Evaluates to TRUE/FALSE once.

**Derived table / CTE**:

```sql
WITH active_depts AS (
  SELECT id FROM departments WHERE active = TRUE
)
SELECT e.*
FROM employees e
JOIN active_depts d ON d.id = e.dept_id;
```

Independent “helper table” for the outer query.

### Typical execution

* Computed once (materialized / hashed) or rewritten to a (semi-)join.
* Very optimizer-friendly.

---

## Correlated subqueries (dependent)

### What it means

The inner query **references columns from the outer row**, so its answer depends on which row we’re on.

### Examples

**EXISTS (per parent row)**:

```sql
SELECT c.*
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id        -- ← correlation
);
```

For each `c`, we ask “is there at least one order for THIS customer?”

**Scalar (per group value)**:

```sql
SELECT e.id,
       (SELECT AVG(salary)
        FROM employees s
        WHERE s.dept_id = e.dept_id) AS dept_avg     -- ← correlation
FROM employees e;
```

**IN (per row)**:

```sql
SELECT e.*
FROM employees e
WHERE e.skill IN (
  SELECT s.skill
  FROM skills s
  WHERE s.person_id = e.id          -- ← correlation
);
```

### Typical execution

* **Best case**: optimizer **decorrelates** to a set-based plan (semi-join, join + aggregate).
* **Otherwise**: **nested-loops** per outer row, ideally doing an indexed seek on the inner table. Indexes on correlation keys are critical.

### Equivalent, often faster rewrites

* Scalar correlated → **window function**:

  ```sql
  SELECT id, AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg
  FROM employees;
  ```
* EXISTS correlated → **join** (when you only need existence):

  ```sql
  SELECT DISTINCT c.*
  FROM customers c
  JOIN orders o ON o.customer_id = c.id;
  ```

---

## Gotchas you’ll actually hit

* **`NOT IN` + NULL** in the subquery → the predicate becomes UNKNOWN and filters out everything. Prefer `NOT EXISTS`:

  ```sql
  WHERE NOT EXISTS (
    SELECT 1 FROM t WHERE t.key = outer.key
  );
  ```
* **Scalar subquery must return ≤ 1 row**. If it can return many, aggregate or `LIMIT/TOP 1` with a deterministic `ORDER BY`.
* **Type mismatches** inside `IN` can kill index use (and coerce in surprising ways on MySQL/SQLite). Keep types aligned or cast explicitly.
* **Functions on the left side** (e.g., `UPPER(col) IN (subquery)`) make it unsargable; consider computed/functional indexes or compute earlier.
* **CTEs vs derived tables**: in most engines, CTEs are just syntax; they’re not guaranteed to materialize (Postgres ≤11 was an exception). Don’t assume a performance boundary—check the plan.

---

## Quick performance compass

* Uncorrelated subquery → **computed once** or **rewritten to join/semi-join**. Safe.
* Correlated subquery → try to **rewrite**; if not, ensure **indexes on correlation keys** to make per-row probes fast.
* “Top-1 per parent” → prefer **LATERAL/APPLY** (Postgres/SQL Server) or window functions.

---

