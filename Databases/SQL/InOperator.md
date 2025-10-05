Short answer: SQL is **set-based**, not procedural—but predicates (like `col IN (...)`) are **applied to each candidate row** of the left side. Whether the right side gets recomputed “row by row” depends on what it is:

* **Constant list** `IN (1,2,3)` → right side is fixed; the engine precomputes/optimizes it once.
* **Uncorrelated subquery** `IN (SELECT y FROM T2)` → right side is computed **once** (often materialized or hashed) and probed for every left row.
* **Correlated subquery** `IN (SELECT y FROM T2 WHERE T2.k = T1.k)` → logically depends on the current left row; the optimizer **may** run it per row (nested loops) **or** rewrite to a **semi-join** so it’s not literally re-executed each time.

Below is the “how it really runs” view, plus engine-specific tendencies.

---

## How optimizers execute `IN`

### 1) Constant list

```sql
SELECT * FROM Orders o WHERE o.status IN ('NEW','PAID','HOLD');
```

* **Conceptually:** check the predicate for each `Orders` row.
* **Physically:** engines pre-process the list so probes are cheap:

  * **PostgreSQL:** OR-expansion → BitmapOr / Hash set of constants.
  * **SQL Server:** Constant Scan + (Hash/Nested) **Left Semi Join** or multiple **Index Seeks** (Union).
  * **MySQL (InnoDB):** multi-range/point lookups on indexed column; can collapse to range scans.
  * **SQLite:** compares per row; with an index on `status` it can narrow quickly; constant-list isn’t “recomputed.”

**Takeaway:** not “row-by-row recomputation”; the list is reused efficiently.

---

### 2) Uncorrelated subquery

```sql
SELECT * 
FROM Orders o
WHERE o.customer_id IN (SELECT c.id FROM Customers c WHERE c.active = 1);
```

* **Conceptually:** for each `o`, check membership in the set `{active customer ids}`.
* **Physically:** optimizer runs the subquery **once**, materializes it (hash table / temp index), then probes it for each left row (**semi-join**).

  * **PostgreSQL:** Hash Semi Join or Semi-Join via `IN -> ANY` transformation.
  * **SQL Server:** Hash/Nested **Left Semi Join** against a one-time built set.
  * **MySQL 8.0+:** semi-join transformation (e.g., materialization/duplicate-weedout/first-match).
  * **SQLite:** builds an ephemeral B-tree of RHS values for fast lookups.

**Takeaway:** not reevaluated per row; it’s computed once, then probed.

---

### 3) Correlated subquery

```sql
SELECT * 
FROM Orders o
WHERE o.amount IN (
  SELECT p.amount FROM Payments p
  WHERE p.customer_id = o.customer_id
);
```

* **Conceptually:** RHS depends on the current `o.customer_id` → **per-row**.
* **Physically:** two possible plans:

  1. **Nested Loops**: for each `o`, run the inner with `customer_id = o.customer_id` (fast if `p.customer_id, p.amount` is indexed).
  2. **Decorrelation to Semi-Join**: optimizer rewrites to a join and executes set-wise.

**Takeaway:** correlated forms are the only case where “row by row” may actually happen—unless the optimizer rewrites it.

---

## Gotchas that feel like “row by row”

* **Type mismatch kills sargability:**
  `WHERE o.id IN ('1','2','3')` on an INT column can force conversions per row (esp. SQL Server/MySQL), blocking index seeks. Keep types aligned.
* **Functions on the left side:**
  `WHERE UPPER(o.code) IN ('A','B')` prevents index use; compute once in a derived table or use a functional index (PG expression index, SQL Server computed persisted column + index, MySQL generated column + index).
* **`NOT IN` + NULL:**
  If RHS (list/subquery) contains NULL, the predicate becomes **UNKNOWN** → filters out all rows. Prefer `NOT EXISTS` with an equality join.
* **Huge IN-lists:**
  Thousands of constants become unwieldy. Load them into a temp/table-valued parameter and **JOIN/EXISTS** instead.

---

## Engine-specific notes

* **PostgreSQL**

  * Strict typing; `IN` coerces the list to a single compatible type or errors—good for stability.
  * Excellent semi-join/hash-semi-join. `IN (subquery)` is typically set-wise, not per row.

* **SQL Server**

  * `IN (const list)` often becomes multiple **Index Seeks** or a hash semi-join.
  * Correlated `IN` can be decorrelated; otherwise Nested Loops per row. Watch implicit conversions.

* **MySQL 8.0+**

  * Semi-join strategies for `IN (subquery)` (materialization, first-match, duplicate-weedout).
  * With an index, `IN (const list)` uses multi-range reads. Beware loose type coercion.

* **SQLite**

  * For `IN (subquery)` it commonly materializes RHS to a temp index (fast membership test).
  * Without indexes, evaluation is row-by-row against the set (still not recomputing the set).

---

## Practical rules of thumb

1. **Constant list?** Fine. Keep types consistent and ensure an index on the left column.
2. **Uncorrelated subquery?** Also fine—DB will build a set and probe it. Add an index on the RHS output column.
3. **Correlated subquery?** Expect nested loops unless optimizer decorrelates. Index the correlation keys; consider rewriting to a **JOIN** or **EXISTS**.
4. **Large dynamic sets?** Stage them into a (temp) table and `JOIN`—more predictable and plannable than a megasized IN-list.
5. **Avoid `NOT IN` with possible NULLs**; use `NOT EXISTS`.

---

### Quick self-check (answer in one line)

If you write:

```sql
WHERE t.col IN (SELECT x FROM S WHERE S.flag = 1)
```

is the inner subquery run once, or for each row of `t`?
(Hint: uncorrelated.)
