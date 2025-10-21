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
