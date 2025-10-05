Beautiful — you’ve reached the heart of SQL’s logic system.
Understanding **`UNKNOWN`** (the third logical state) explains almost every odd behavior involving `NULL`, `NOT IN`, and `WHERE` filters.

Let’s rebuild it from **first principles**, then walk engine-by-engine to see differences, quirks, and fixes.

---

# 🧩 1. The big idea — SQL’s Three-Valued Logic (3VL)

In everyday programming, logic is **two-valued**:
`TRUE` or `FALSE`.

SQL adds a third: **`UNKNOWN`**, meaning “we don’t know.”

It exists because of **`NULL`**, which means “missing / undefined / not applicable.”

Since you can’t truthfully say whether `NULL = 5`, SQL says: *“I don’t know.”* → **`UNKNOWN`**

---

# 🧠 2. Basic truth tables

| Expression    | Result  |
| ------------- | ------- |
| `5 = 5`       | TRUE    |
| `5 = 6`       | FALSE   |
| `5 = NULL`    | UNKNOWN |
| `NULL = NULL` | UNKNOWN |

So:

* `=` doesn’t treat NULLs as equal
* Any arithmetic or comparison involving NULL → UNKNOWN

---

# ⚙️ 3. Logical operator behavior

## `NOT`

| Input   | Result  |
| ------- | ------- |
| TRUE    | FALSE   |
| FALSE   | TRUE    |
| UNKNOWN | UNKNOWN |

> Negating an unknown doesn’t make it known.

## `AND`

| A       | B          | Result  |
| ------- | ---------- | ------- |
| TRUE    | TRUE       | TRUE    |
| TRUE    | FALSE      | FALSE   |
| FALSE   | (anything) | FALSE   |
| TRUE    | UNKNOWN    | UNKNOWN |
| UNKNOWN | TRUE       | UNKNOWN |
| UNKNOWN | FALSE      | FALSE   |
| UNKNOWN | UNKNOWN    | UNKNOWN |

## `OR`

| A       | B          | Result  |
| ------- | ---------- | ------- |
| TRUE    | (anything) | TRUE    |
| FALSE   | FALSE      | FALSE   |
| FALSE   | UNKNOWN    | UNKNOWN |
| UNKNOWN | TRUE       | TRUE    |
| UNKNOWN | FALSE      | UNKNOWN |
| UNKNOWN | UNKNOWN    | UNKNOWN |

---

# 🧩 4. WHERE filters and UNKNOWN

In `WHERE`, only rows where the condition evaluates to **TRUE** are returned.
`FALSE` and `UNKNOWN` both *exclude* the row.

Example:

```sql
SELECT * FROM employees
WHERE manager_id = 5;        -- TRUE rows kept
WHERE manager_id <> 5;       -- FALSE and UNKNOWN (NULL) removed
WHERE manager_id IS NULL;    -- captures those UNKNOWN cases
```

---

# 🧮 5. UNKNOWN from expressions

| Operation  | Example                       | Result                      |       |      |
| ---------- | ----------------------------- | --------------------------- | ----- | ---- |
| Comparison | `NULL = 10`                   | UNKNOWN                     |       |      |
| Arithmetic | `NULL + 5`                    | NULL (propagates)           |       |      |
| Logical    | `NULL AND TRUE`               | UNKNOWN                     |       |      |
| String     | `'abc'                        |                             | NULL` | NULL |
| Case test  | `CASE WHEN NULL THEN 'x' END` | skips branch (acts UNKNOWN) |       |      |

So NULLs quietly spread “unknown” through expressions.

---

# 🧱 6. UNKNOWN in conditions

### Example:

```sql
SELECT * FROM sales WHERE region <> 'West';
```

If `region` is NULL, the comparison → UNKNOWN → row **filtered out**.

### Fix:

```sql
WHERE region IS DISTINCT FROM 'West';    -- PG, SQL Server 2022+, MySQL 8+
-- or
WHERE COALESCE(region, '') <> 'West';    -- workaround (but mind empty string!)
```

---

# ⚡ 7. How each engine implements 3VL

| Engine         | TRUE / FALSE / UNKNOWN support                                                              | Special notes                                                               |
| -------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **SQLite**     | No true Boolean type; 0 = false, non-zero = true, NULL = unknown                            | Works fine for 3VL semantics; `WHERE` filters the same way.                 |
| **PostgreSQL** | Real Boolean type; fully implements `IS TRUE`, `IS FALSE`, `IS UNKNOWN`                     | Strict, ANSI-compliant; you can explicitly test for `UNKNOWN`.              |
| **SQL Server** | Uses `bit` (0/1/NULL). Logical ops follow 3VL. No `IS UNKNOWN` keyword.                     | `NULL` in `bit` column behaves as unknown.                                  |
| **MySQL**      | `BOOLEAN` alias for `TINYINT(1)`; 0/1/NULL. `IS TRUE/FALSE/UNKNOWN` supported since 8.0.17. | Earlier versions treated booleans as integers, so subtle coercion possible. |

---

# 🔍 8. Explicitly checking for UNKNOWN

| Engine            | Expression                                | Result                               |
| ----------------- | ----------------------------------------- | ------------------------------------ |
| **PostgreSQL**    | `expr IS UNKNOWN` / `expr IS NOT UNKNOWN` | ✅ Supported                          |
| **MySQL 8.0.17+** | `expr IS UNKNOWN` / `expr IS NOT UNKNOWN` | ✅ Supported                          |
| **SQL Server**    | ❌ Not supported directly                  | Use `expr IS NULL` if caused by NULL |
| **SQLite**        | ❌ No; use `expr IS NULL` if appropriate   |                                      |

So if you need to detect a condition that *evaluates* to UNKNOWN:

* Portable → wrap the logic (e.g., `expr IS NULL` or `(expr IS NULL OR expr = FALSE)`).
* PostgreSQL/MySQL8 → use `IS UNKNOWN`.

---

# 💣 9. Common gotchas caused by UNKNOWN

### 🧨 1. `NOT IN` + NULL = UNKNOWN

```sql
WHERE dept_id NOT IN (SELECT dept_id FROM inactive_depts)
```

→ If any dept_id is NULL, entire predicate becomes UNKNOWN → no rows.

**Fix:** use `NOT EXISTS`.

---

### 🧨 2. `NULL = NULL` is UNKNOWN

Use null-safe comparison:

```sql
-- PG / SQL Server 2022+
WHERE a IS NOT DISTINCT FROM b

-- MySQL
WHERE a <=> b

-- SQLite
WHERE a IS b
```

---

### 🧨 3. Aggregates and UNKNOWN

`COUNT(col)` ignores NULLs entirely; `COUNT(*)` doesn’t.
So rows where condition is UNKNOWN still count in `COUNT(*)`.

---

### 🧨 4. CHECK constraints

A `CHECK` passes unless the condition is **FALSE**.
If it’s UNKNOWN → still passes.

Example:

```sql
CREATE TABLE orders(
  quantity INT CHECK (quantity > 0)
);
```

If `quantity` is NULL → `quantity > 0` = UNKNOWN → passes.
To forbid that, add `NOT NULL`.

---

# 🧠 10. Truth flow inside SQL evaluation

When SQL evaluates a query:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

* At the **WHERE** step, any condition evaluating to `UNKNOWN` is dropped.
* Later clauses (e.g., HAVING) use the same 3VL rules.

---

# ⚙️ 11. Practical debugging pattern

You can “see” UNKNOWNs by rewriting:

```sql
SELECT *,
       CASE
         WHEN condition THEN 'TRUE'
         WHEN NOT condition THEN 'FALSE'
         ELSE 'UNKNOWN'
       END AS truth_value
FROM table;
```

Example:

```sql
SELECT id,
       CASE
         WHEN price > 100 THEN 'TRUE'
         WHEN NOT (price > 100) THEN 'FALSE'
         ELSE 'UNKNOWN'
       END AS result
FROM products;
```

---

# 🧩 12. Quick takeaways

| Concept                                                                               | Rule |
| ------------------------------------------------------------------------------------- | ---- |
| Any comparison with NULL → UNKNOWN                                                    |      |
| UNKNOWN in WHERE behaves like FALSE (row excluded)                                    |      |
| `NOT` of UNKNOWN → UNKNOWN                                                            |      |
| `AND` with FALSE → FALSE (short-circuits), `OR` with TRUE → TRUE                      |      |
| CHECK passes on UNKNOWN (not just TRUE)                                               |      |
| COUNT, SUM, AVG ignore NULLs                                                          |      |
| Fix most NULL/UNKNOWN issues with `IS NOT DISTINCT FROM`, `COALESCE`, or `NOT EXISTS` |      |

---

Would you like me to show **a visual truth matrix**—a compact chart showing how TRUE/FALSE/UNKNOWN propagate through `AND`, `OR`, and `NOT` for all engines (with which ones implement full 3VL vs approximations)? It’s one of the best ways to memorize 3VL behavior.
