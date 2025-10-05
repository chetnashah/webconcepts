
---

## 🧱 The core idea

In SQL, you can assign *aliases* to:

1. **Tables / subqueries** – short names for referencing columns.
2. **Columns / expressions** – friendly names for output columns.

They exist **only for that query’s duration** (including subqueries, derived tables, and CTEs).

## Table alias vs column alias

Here’s a cleaner “cheat-sheet / notes + mini examples” to lock down your intuition around **table alias** vs **column alias**, and when (and where) each is allowed or disallowed. Use this as your mental map when writing SQL.

---

## 🧩 Table alias vs Column alias — concept & purpose

| Alias Type       | What it does                                                                   | Why you use it                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Table alias**  | Give a temporary name to a table (or subquery / derived table) in a query      | Shorten long table names, disambiguate when same table appears multiple times (self-joins), make joins easier to read |
| **Column alias** | Give a temporary name (alias) to a column or expression in the `SELECT` output | Improve readability, rename computed values, provide meaningful output names                                          |

Key point: aliases are **only valid inside that one query**, they don’t alter the schema.

---

## 📋 Rules / restrictions — where you can and cannot use them

Here are the common rules (across most SQL engines) you should internalize. Engines may vary slightly, but these are reliable guidelines.

| Alias type       | Defining it (i.e. writing the alias)       | Can be used in `FROM` clause (qualifying tables) | Can be used in `WHERE` (to reference alias) | Can be used in `JOIN … ON` / `ON` conditions                  | Can be used in `GROUP BY` / `HAVING` / `ORDER BY`                                         |
| ---------------- | ------------------------------------------ | ------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Table alias**  | `FROM table_name AS t` (or `table_name t`) | — (that’s where you define it)                   | ✅ (to qualify columns: `t.column`)          | ✅                                                             | ✅                                                                                         |
| **Column alias** | `SELECT expr AS alias_name`                | —                                                | ❌ (cannot use alias in same-level `WHERE`)  | — (you can’t alias in ON, but you can reference base columns) | ✅ (in many engines you *can* use alias in `ORDER BY`, sometimes in `GROUP BY` / `HAVING`) |

**Notes / clarifications:**

* Table aliases are known by the time `WHERE` / `JOIN` / `ON` are evaluated, so you can use them to qualify columns (`t.colname`).
* Column aliases are “assigned” at the *SELECT* phase, which is logically **after** `WHERE` filtering. Thus `WHERE` has no knowledge of column aliases defined in SELECT.
* Because `ORDER BY` is logically after SELECT, many SQL dialects allow you to use column aliases there.
* Some dialects allow column aliases in `GROUP BY` or `HAVING`, but this is dialect-specific; don’t rely on it for portability.
* Always alias derived tables / subqueries in the `FROM` clause: `FROM ( … ) AS subq` is required in almost all SQL engines.

---

## 🧪 Mini examples (with commentary)

### Table alias usage

```sql
SELECT e.name, e.salary
FROM Employees AS e
WHERE e.salary > 50000
ORDER BY e.name;
```

* `e` is a **table alias**.
* You can refer to `e.salary` in `WHERE` because the table alias is known by then.

When you join the same table twice:

```sql
SELECT a.name AS manager, b.name AS subordinate
FROM Employee AS a
JOIN Employee AS b ON b.manager_id = a.id
WHERE a.salary > 100000;
```

Without aliases you'd have no way to distinguish `Employee.name` twice.

---

### Column alias usage

```sql
SELECT salary * 12 AS annual_salary
FROM Employees
ORDER BY annual_salary DESC;
```

* `annual_salary` is a **column alias**.
* Using it in `ORDER BY` is okay: the alias exists by that stage.

If you try to put it in `WHERE`:

```sql
SELECT salary * 12 AS annual_salary
FROM Employees
WHERE annual_salary > 100000;  -- ❌ will error: “column does not exist” or similar
```

You’ll get an error, because at the **WHERE** stage, `annual_salary` hasn’t been defined yet.

---

### Combined / derived table alias + column alias

```sql
SELECT sub.annual_salary, sub.dept
FROM (
  SELECT dept, salary * 12 AS annual_salary
  FROM Employees
) AS sub
WHERE sub.annual_salary > 120000
ORDER BY sub.annual_salary DESC;
```

* Inside the subquery, we defined `annual_salary` (column alias).
* The outer `WHERE` can refer to it, because at the outer query level, it’s now a “real” column from the derived table.
* `sub` is a **table alias** for the derived table.

---

## ✅ Tips to remember (nerdy mnemonic)

* Table alias → you define it in `FROM` (early), so you can use it everywhere that needs to qualify tables.
* Column alias → you define it in `SELECT` (late), so you can’t use it earlier like in `WHERE`.
* If you ever try to use a column alias in `WHERE` and it fails, the proper fix is: **repeat the underlying expression** or move the alias into a subquery / CTE so outer query can use it.


---

## 1. SQLite

**Table aliases**

```sql
SELECT t.name, d.building
FROM instructor AS t
JOIN department AS d ON t.dept_name = d.dept_name;
```

or without `AS`:

```sql
FROM instructor t JOIN department d ...
```

**Column aliases**

```sql
SELECT name AS instructor_name,
       salary * 12 AS annual_salary
FROM instructor;
```

**Subquery aliases (required)**

```sql
SELECT * FROM (SELECT 1 AS x, 2 AS y) AS sub;
```

**Limitations / Notes**

* `AS` keyword is **optional for tables**, **optional for columns**.
* Aliases cannot be reused in the same SELECT’s WHERE clause (standard SQL rule); use expressions or subqueries instead:

  ```sql
  SELECT salary * 12 AS annual_salary
  FROM instructor
  WHERE annual_salary > 100000; -- ❌ not allowed
  ```

  Must rewrite as:

  ```sql
  SELECT * FROM (
      SELECT name, salary * 12 AS annual_salary
      FROM instructor
  ) WHERE annual_salary > 100000; -- ✅
  ```
* No alias visibility beyond its SELECT level.
* CTEs (`WITH alias AS (...)`) are fully supported and behave like named subqueries.

---

## 2. SQL Server (T-SQL)

**Table aliases**

```sql
SELECT e.name, d.department_name
FROM Employees AS e
JOIN Departments AS d ON e.dept_id = d.id;
```

You can omit `AS`:

```sql
FROM Employees e JOIN Departments d ...
```

**Column aliases**

```sql
SELECT first_name + ' ' + last_name AS full_name
FROM Employees;
```

**Special rule:**
If you omit `AS`, T-SQL allows a space-separated alias *only* when it’s unambiguous:

```sql
SELECT first_name + ' ' + last_name full_name FROM Employees;  -- ✅ works
```

**CTEs**

```sql
WITH HighEarners AS (
    SELECT emp_id, salary
    FROM Employees
    WHERE salary > 100000
)
SELECT * FROM HighEarners;
```

**Limitations / Notes**

* Table alias *must* be unique in query scope.
* Aliases **cannot** be referenced in the same SELECT’s `WHERE`, `GROUP BY`, or `HAVING`. Use subqueries or repeat expression.
* T-SQL also supports `CROSS APPLY` / `OUTER APPLY` where alias naming behaves like subqueries.
* When aliasing derived tables: `AS` is optional but parentheses and alias are **mandatory**.

  ```sql
  SELECT * FROM (SELECT * FROM Employees) e; -- ✅ alias required
  ```

---

## 3. PostgreSQL

**Table aliases**

```sql
SELECT i.name, d.building
FROM instructor AS i
JOIN department AS d ON i.dept_name = d.dept_name;
```

**Column aliases**

```sql
SELECT salary * 12 AS annual_salary, name AS instructor_name
FROM instructor;
```

**Subquery aliases**

```sql
SELECT * FROM (SELECT 1 AS a, 2 AS b) AS sub;
```

**Postgres extensions**

* You can alias **function calls** that return tables:

  ```sql
  SELECT * FROM generate_series(1,3) AS g(num);
  ```

  Here `num` becomes the column alias of the generated series.

**CTEs**

```sql
WITH high_salary AS (
    SELECT name, salary FROM instructor WHERE salary > 100000
)
SELECT * FROM high_salary;
```

**Limitations / Notes**

* `AS` optional for tables, but **required when defining column alias lists** in FROM functions or CTEs.
* PostgreSQL lets you alias subquery output columns directly:

  ```sql
  SELECT * FROM (SELECT 1, 2) AS t(x, y);
  ```
* Aliases not visible in `WHERE` or `GROUP BY` of same level (standard SQL).
* Case sensitivity: unquoted aliases become lowercase internally; quoted identifiers preserve case and must be referred to exactly:

  ```sql
  SELECT salary AS "Annual Salary" FROM instructor;
  ```

---

## 4. MySQL

**Table aliases**

```sql
SELECT e.name, d.dept_name
FROM employees AS e
JOIN departments AS d ON e.dept_id = d.id;
```

**Column aliases**

```sql
SELECT salary * 12 AS annual_salary, name AS instructor_name
FROM instructor;
```

**Without `AS`**

```sql
SELECT salary * 12 annual_salary FROM instructor;  -- ✅ works
```

**Subquery aliases (required)**

```sql
SELECT * FROM (SELECT 1 AS a, 2 AS b) AS sub; -- ✅ alias required
```

**Limitations / Notes**

* You **must** give an alias for any derived table or subquery in the FROM clause; otherwise, you get:

  ```
  ERROR 1248 (42000): Every derived table must have its own alias
  ```
* Aliases cannot be referenced in `WHERE` (like all others) but *can* in `ORDER BY`:

  ```sql
  SELECT salary * 12 AS annual_salary
  FROM instructor
  ORDER BY annual_salary DESC; -- ✅ works
  ```
* Supports CTEs (`WITH ... AS (...)`) since MySQL 8.0.
* Case sensitivity depends on the file system and collation, but alias matching is case-insensitive by default.

---

## 🧩 Feature & Limitation Comparison

| Feature                                          | SQLite | SQL Server | PostgreSQL | MySQL        |
| ------------------------------------------------ | ------ | ---------- | ---------- | ------------ |
| **AS keyword optional (tables)**                 | ✅      | ✅          | ✅          | ✅            |
| **AS keyword optional (columns)**                | ✅      | ✅          | ✅          | ✅            |
| **Alias in WHERE allowed**                       | ❌      | ❌          | ❌          | ❌            |
| **Alias in ORDER BY allowed**                    | ✅      | ✅          | ✅          | ✅            |
| **Alias required for subquery in FROM**          | ✅      | ✅          | ✅          | ✅ (enforced) |
| **Alias required for function-returning tables** | ✅      | ✅          | ✅          | ✅            |
| **Quoted aliases preserve case**                 | ✅      | ✅          | ✅          | ✅            |
| **Column alias list for subquery**               | ❌      | ✅ (CTE)    | ✅          | ❌            |
| **CTE support**                                  | ✅      | ✅          | ✅          | ✅ (8.0+)     |

---

## 🪄 Quick mental model

Think of aliases as **local nicknames**:

* They live only inside your current query scope.
* They can’t be used until the logical *SELECT* phase (so not in WHERE).
* They can simplify join readability, disambiguate duplicate column names, or label derived data for result sets or client consumption.

---

To push deeper, you might next explore **alias scope in nested queries and CTEs**—for instance, how Postgres and SQL Server handle name shadowing differently inside correlated subqueries. That’s where aliasing stops being cosmetic and starts affecting query semantics.
