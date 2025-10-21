Let’s go step by step — from first principles to practical use.

---

## 1. First principles: what is a “join”?

A **join** combines rows from two tables based on some relationship — usually a shared key.
Mathematically, it’s a **Cartesian product** (every row of A paired with every row of B), filtered by a **join condition** that picks the pairs that “match.”

So if:

```
A = {a1, a2}
B = {b1, b2, b3}
```

then `A × B` has 2×3 = 6 combinations.
A join then filters those combinations down to the meaningful pairs.

---

## 2. “JOIN” vs “INNER JOIN” — same thing logically

In SQL:

```sql
SELECT *
FROM A JOIN B ON A.id = B.id;
```

and

```sql
SELECT *
FROM A INNER JOIN B ON A.id = B.id;
```

are **exactly equivalent**.
The keyword `INNER` is optional — it’s the default kind of join.

This means:
→ Keep only the rows where both A and B have matching values (the intersection).
→ Rows from either side with no match are **excluded**.

---

### Example

**Tables:**

```sql
student(student_id, name)
takes(student_id, course_id)
```

**Query:**

```sql
SELECT name, course_id
FROM student JOIN takes ON student.student_id = takes.student_id;
```

This returns all students who are taking at least one course.
If a student hasn’t taken any course, they’re not included.

That’s an **inner join** (or just `JOIN`).

---

## 3. What about “NATURAL JOIN”?

`NATURAL JOIN` is a **shortcut** for an inner join,
where SQL **automatically decides** the join condition:
it joins on *every column name that exists in both tables.*

Formally:

```sql
A NATURAL JOIN B
```

≡

```sql
A JOIN B USING (all common column names)
```

So you don’t write `ON A.id = B.id`; SQL figures it out by comparing the column names.

---

### Example

Given:

```sql
student(student_id, name, dept_name)
takes(student_id, course_id, grade)
```

Then:

```sql
SELECT name, course_id
FROM student NATURAL JOIN takes;
```

automatically uses `student_id` as the join key, because that’s the only common column.
This will produce:

* all students who have taken something
* joined by matching `student_id`

That’s convenient — but **dangerous** (we’ll see why).

---

## 4. Why “NATURAL JOIN” can be dangerous

Imagine we add a `dept_name` column to both tables (maybe by mistake, or schema change):

```sql
student(student_id, name, dept_name)
takes(student_id, course_id, grade, dept_name)
```

Now, `NATURAL JOIN` will match on **both student_id and dept_name** automatically.
A student taking a course outside their department will **disappear** from results!

Your query’s text hasn’t changed, but its meaning has.
That’s why professional developers rarely use `NATURAL JOIN` — it’s too implicit.

---

## 5. When to use each one

| Type                  | How it works                                             | Pros                                                    | Cons                                   | When to use                                                             |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| **JOIN / INNER JOIN** | You specify the join condition explicitly with `ON`      | Clear, predictable, portable                            | Verbose                                | **Always preferred** when you know the join keys                        |
| **NATURAL JOIN**      | SQL matches all columns with the same name automatically | Short to write, can be neat for small teaching examples | Hidden logic, breaks if schema changes | **Almost never** in production; only for quick ad-hoc or textbook demos |

---

### Example comparison

#### Explicit INNER JOIN

```sql
SELECT s.name, c.title
FROM student AS s
JOIN takes  AS t ON s.student_id = t.student_id
JOIN course AS c ON t.course_id  = c.course_id;
```

✅ Works no matter how table columns change.
✅ Self-documenting — anyone can read it and understand the logic.

#### NATURAL JOIN (shortcut)

```sql
SELECT name, title
FROM student NATURAL JOIN takes NATURAL JOIN course;
```

❌ Depends on what column names overlap; might accidentally add `dept_name` to join keys.
❌ Harder to reason about later.

---

## 6. Key points to remember

* `JOIN` = shorthand for `INNER JOIN`.
  They are **the same**; both keep only matching rows.
* `NATURAL JOIN` = inner join on **all same-named columns**.
  It’s automatic, but brittle.
* Always know which columns you’re joining on.
  Never assume “natural” means “correct.”
* Prefer **explicit `ON`** or **`USING(column)`** syntax to make intent clear.
* The only time `NATURAL JOIN` is safe is in a controlled, educational, or quick-throwaway context where table schemas are fixed and small.

---

## ON vs Using (ON is more common)

Excellent — you’re now moving from “what” joins do to *how join conditions are expressed*, which is where SQL’s subtle behaviors live.

Let’s walk through the difference between **`ON`** and **`USING`** from first principles, then look at real-world gotchas across databases.

---

## 1. The idea: two ways to say “how rows match”

When you join two tables, you must say **how** they relate.
There are two syntactic ways:

1. **`ON`** – a general logical expression.
2. **`USING`** – a shorthand when both sides share a column name and you want equality on it.

---

## 2. Syntax and semantics

### A. The `ON` clause

**Syntax:**

```sql
FROM A JOIN B ON <boolean_condition>
```

**Semantics:**

* The expression after `ON` can be *any* boolean condition — equality, inequality, multiple columns, computed expressions, or even subqueries.
* Columns from both sides are available, qualified by table alias.
* You must specify both sides explicitly (`A.col = B.col`).

**Type signature:**

```
JOIN_ON : (table A, table B, condition(A,B) → boolean) → joined_table
```

**Example:**

```sql
SELECT s.name, c.title
FROM student AS s
JOIN takes AS t ON s.student_id = t.student_id
JOIN course AS c ON t.course_id = c.course_id;
```

**Allows:**

```sql
ON A.x = B.y AND A.flag = 'Y'
ON ABS(A.id) = B.key
ON (A.start BETWEEN B.begin AND B.end)
```

So `ON` is the *fully general form* — everything else is syntactic sugar around it.

---

### B. The `USING` clause

**Syntax:**

```sql
FROM A JOIN B USING (col1 [, col2, ...])
```

**Semantics:**

* Equivalent to `ON A.col1 = B.col1 AND A.col2 = B.col2 ...`
* The resulting joined table **has only one copy** of each listed column (they’re merged / coalesced).
* You **cannot qualify** those columns with table aliases in the `SELECT` list — they become a shared column.

**Type signature:**

```
JOIN_USING : (table A, table B, columns ⊆ intersection(schema(A), schema(B))) → joined_table
```

**Example:**

```sql
SELECT name, title
FROM student
JOIN takes  USING (student_id)
JOIN course USING (course_id);
```

**Equivalent to:**

```sql
SELECT name, title
FROM student
JOIN takes  ON student.student_id = takes.student_id
JOIN course ON takes.course_id    = course.course_id;
```

But unlike `ON`, the output of `USING` will only have one `student_id` and one `course_id` column — not duplicates from each side.

---

## 3. Key behavioral difference in results

Let’s say:

```sql
A(id, x)
B(id, y)
```

Then:

### Using `ON`

```sql
SELECT *
FROM A JOIN B ON A.id = B.id;
```

→ Result columns:
`A.id, x, B.id, y`
(two id columns — you must disambiguate)

### Using `USING`

```sql
SELECT *
FROM A JOIN B USING (id);
```

→ Result columns:
`id, x, y`
(one merged `id` column)

That’s the most visible difference in practice.

---

## 4. Common use cases

| Use case                                     | Preferred clause | Why                                               |
| -------------------------------------------- | ---------------- | ------------------------------------------------- |
| Columns share same name (e.g. `student_id`)  | `USING`          | Shorter, clearer, merges column                   |
| Columns have different names                 | `ON`             | You can’t use `USING` unless names match          |
| Complex join condition                       | `ON`             | `USING` only allows equality of same-name columns |
| Multi-column join where all names align      | Either           | `USING (a, b)` is concise                         |
| You want to preserve both columns distinctly | `ON`             | `USING` merges them into one                      |

---

## 5. Behavior across databases

| Database       | `USING` Supported? | Notes / Gotchas                                                                               |
| -------------- | ------------------ | --------------------------------------------------------------------------------------------- |
| **SQLite**     | ✅                  | Behaves per SQL standard — merges join columns into one.                                      |
| **PostgreSQL** | ✅                  | Standard behavior. You cannot qualify a `USING` column with table alias (`A.col` forbidden).  |
| **MySQL**      | ✅                  | Same semantics. However, beware of implicit type conversions if columns differ slightly.      |
| **SQL Server** | ❌ (not supported)  | You must use `ON`. SQL Server has no `USING` or `NATURAL JOIN`.                               |
| **Oracle**     | ✅                  | Same as standard, but NATURAL JOIN and USING internally merge columns; can affect `SELECT *`. |

So if you want cross-database portability, **`ON` is safest**.

---

## 6. Edge semantics: `SELECT *` and duplicate columns

Example:

```sql
SELECT *
FROM A JOIN B ON A.id = B.id;
```

returns **two id columns**: `A.id` and `B.id`.

But:

```sql
SELECT *
FROM A JOIN B USING (id);
```

returns **one id column** — the join key is merged.

That difference can break applications that depend on column order or count.

---

## 7. Historical note

* `ON` was introduced in SQL-92 to replace old `WHERE` joins (e.g. `FROM A, B WHERE A.id = B.id`).
* `USING` and `NATURAL JOIN` came from relational theory to make “natural” relationships less verbose.
* In practice, `ON` won the popularity contest because it’s explicit and flexible.

---

## 8. Key points to remember

* `ON` = **general** condition, full control, both columns remain.
* `USING` = **shortcut** for equal-name columns; merges them.
* `USING` only works if the column names are identical.
* After `USING`, you can’t qualify the merged column with table aliases.
* `SELECT *` behaves differently (merged vs duplicated join columns).
* SQL Server doesn’t support `USING` or `NATURAL JOIN`.
* For clarity and portability, prefer `ON` in production queries.
* `USING` is nice for simple foreign key joins where schema naming is disciplined.

---

In short:

* Use `ON` when you want to **express logic**.
* Use `USING` when you just want to **express sameness**.

# Joins and NULLs

This is one of those deep corners of SQL that looks simple until you realize NULLs have their own quiet logic.
Let’s unpack **joins and NULL handling** from first principles — relationally, logically, and then practically for each kind of join.

---

## 1. Foundation: NULL means “unknown”, not “empty” or “zero”

In SQL’s three-valued logic:

* `TRUE` means the condition is known true.
* `FALSE` means known false.
* `UNKNOWN` means you don’t know (usually due to `NULL`).

So:

```sql
5 = NULL      → UNKNOWN
NULL = NULL   → UNKNOWN
```

**Important:** UNKNOWN behaves like FALSE in `WHERE` and `ON` filters — the row doesn’t pass.

This rule underlies *every join*.

---

## 2. How joins conceptually work

A join is built on the **Cartesian product** of two tables, filtered by the join condition:

```
A ⋈ B  ≈  SELECT * FROM A, B WHERE <join_condition>
```

* `INNER JOIN` keeps only rows where the condition is TRUE.
* `OUTER JOIN` tries to “fill in” missing matches with NULLs on one side.

So if the join condition evaluates to UNKNOWN (because of NULLs),
then for inner joins — no match.
For outer joins — partial match with NULL-fill on one side.

---

## 3. NULLs in INNER JOIN

### Behavior:

An **inner join** keeps rows only when the join condition is **TRUE**.
If a comparison involves NULL, the result is **UNKNOWN**, so that row is dropped.

### Example:

```sql
A:                  B:
id | name           id | value
1  | Alice          1  | 10
2  | Bob            2  | NULL
3  | Carol          3  | 30
4  | Dave           -  | -

SELECT * FROM A JOIN B ON A.id = B.id;
```

Rows join fine because IDs match, even if `B.value` is NULL —
**join keys themselves** are not NULL.

But if join keys contain NULL:

```sql
A.id = NULL, B.id = NULL
→ (A.id = B.id) → UNKNOWN → row dropped
```

So NULL in join keys *never matches anything* (even another NULL).

---

### Key takeaway

> Inner join removes any row where the join condition is FALSE or UNKNOWN.
> Therefore, rows with NULL in join key will never join.

---

## 4. NULLs in LEFT OUTER JOIN

A **left join** keeps all rows from the left table — even those with no match.

Mechanics:

* For each left row:

  * If right match exists (join condition TRUE) → merge rows.
  * If none (FALSE/UNKNOWN) → fill right side columns with NULL.

### Example

```sql
SELECT s.id, s.name, t.course_id
FROM student s
LEFT JOIN takes t ON s.id = t.student_id;
```

If a student has no entries in `takes`, you’ll still get that student with `course_id = NULL`.

If a student has `s.id = NULL`, it never matches any right-side row —
but since it’s a left join, the left row still appears with NULLs on the right.

---

### Summary:

| Join condition   | Result                      |
| ---------------- | --------------------------- |
| TRUE             | row combined                |
| FALSE or UNKNOWN | left row + right side NULLs |

---

## 5. NULLs in RIGHT OUTER JOIN

Exactly the mirror image:

* Keeps all rows from **right** table.
* Fills **left** side with NULLs where there’s no match.

PostgreSQL, MySQL, and Oracle support `RIGHT JOIN`;
SQLite does **not** (but you can swap table order to simulate it).

---

## 6. NULLs in FULL OUTER JOIN

Keeps all rows from both sides:

* Matches (TRUE) → merged row.
* Left-only (FALSE/UNKNOWN) → left row + right NULLs.
* Right-only (FALSE/UNKNOWN) → right row + left NULLs.

PostgreSQL, Oracle, SQL Server support it.
SQLite doesn’t — you simulate it via `UNION` of LEFT and RIGHT joins.

---

## 7. NULLs and equality joins (`ON A.col = B.col`)

Because `NULL = anything` → UNKNOWN,
rows where either `A.col` or `B.col` is NULL don’t match.

### Example:

```sql
A: id=1, code=NULL
B: id=1, code=NULL
JOIN ON A.code = B.code → no match
```

If you *want* NULLs to be treated as equal, use:

```sql
ON COALESCE(A.col, 'x') = COALESCE(B.col, 'x')
```

or, in databases that support it:

```sql
ON A.col IS NOT DISTINCT FROM B.col
```

(PostgreSQL, Oracle, SQLite 3.32+)

That last form treats NULLs as equal — very useful for nullable foreign keys.

---

## 8. NULLs in “USING” joins

When you use:

```sql
JOIN ... USING (col)
```

SQL automatically rewrites to:

```sql
ON A.col = B.col
```

and merges the column.

So same NULL rules apply — no match if either side’s join key is NULL.

---

## 9. NULLs in NATURAL JOIN

`NATURAL JOIN` is also equivalent to a join with `USING(all common columns)` →
same rule: if any of the join columns are NULL, row is not matched.

---

## 10. NULLs in filtering after the join

Remember:

* The join condition runs first.
* Then `WHERE` filters the combined rows.

So if you left-join and then `WHERE right.col IS NULL`,
you’re selecting the **unmatched** rows (the “anti-join” pattern).

Example:

```sql
-- find students with no takes entry
SELECT s.*
FROM student s
LEFT JOIN takes t ON s.id = t.student_id
WHERE t.student_id IS NULL;
```

This works because unmatched rows have all right-side columns as NULL.

---

## 11. Database differences and gotchas

| Database       | Notes                                                                     |
| -------------- | ------------------------------------------------------------------------- |
| **SQLite**     | No `RIGHT` or `FULL` joins. Use `LEFT` or `UNION`.                        |
| **PostgreSQL** | Has `IS NOT DISTINCT FROM` for NULL-safe equality.                        |
| **MySQL**      | Has `<=>` operator: `A.col <=> B.col` treats NULLs as equal.              |
| **SQL Server** | Uses `ISNULL()` or `COALESCE()` for similar handling; supports FULL JOIN. |
| **Oracle**     | Has `NVL()` and `IS NOT DISTINCT FROM`.                                   |

---

## 12. Quick intuition table

| Join type       | Rows kept from left | Rows kept from right | NULL handling in join condition                                           |
| --------------- | ------------------- | -------------------- | ------------------------------------------------------------------------- |
| **INNER**       | Only matching rows  | Only matching rows   | NULL = no match                                                           |
| **LEFT OUTER**  | All                 | Only matches         | Left rows with NULL key still appear; right side NULL                     |
| **RIGHT OUTER** | Only matches        | All                  | Right rows with NULL key still appear; left side NULL                     |
| **FULL OUTER**  | All                 | All                  | NULL in join key breaks match, but both sides still appear with null-fill |
| **CROSS JOIN**  | All combinations    | All combinations     | NULL irrelevant (no condition)                                            |

---

## 13. Key points to remember

* `NULL = NULL` is **UNKNOWN**, not TRUE — so no match in normal joins.
* `INNER JOIN` → drops rows where condition is UNKNOWN.
* `OUTER JOIN` → keeps unmatched side, fills other side with NULLs.
* Use `IS NOT DISTINCT FROM` (Postgres/SQLite) or `<=>` (MySQL) for NULL-safe joins.
* For anti-joins (find “no match” cases), use `LEFT JOIN ... WHERE right.col IS NULL`.
* Beware: NULL logic propagates — a single NULL in a join key can eliminate an entire row in an inner join.

---

In short:
**NULLs in join keys behave like “holes” — inner joins fall through them, outer joins patch them with more NULLs.**

If the left key is NULL, the row stays — but the right side turns NULL.

If the right join key is NULL, the comparison fails (NULL ≠ anything), so:
* in an inner join, the row is dropped,
* in a left join, the left row stays but right side becomes NULL,