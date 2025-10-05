## Primarily intended only for null/truth tests only


##

Great question — this one trips up even experienced SQL developers, because **every database supports the keyword `IS`**, but it doesn’t always mean the same thing. Its *core use* (`IS NULL`, `IS TRUE`, etc.) is universal, but *value-to-value* comparisons like `a IS b` are **not portable**.

Let’s go engine by engine and sort this out clearly.

---

## 🧩 1. The SQL Standard meaning

In standard SQL:

* `IS` is used for *truth-value tests* or *null tests*, e.g.
  `IS NULL`, `IS NOT NULL`, `IS TRUE`, `IS NOT FALSE`, `IS UNKNOWN`.
* It is **not** a general equality operator.
  So `a IS b` is **not standard** SQL.

Each vendor either:

* Keeps `IS` only for those truth/null tests,
* or extends it to also mean “null-safe equality.”

---

## 🧠 2. Database-by-database breakdown

| Engine         | `IS NULL` / `IS NOT NULL` | `IS TRUE/FALSE/UNKNOWN`                                | `a IS b` (value-to-value)                     | Notes                                                                                                                |
| -------------- | ------------------------- | ------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **SQLite**     | ✅ Yes                     | ❌ No separate boolean literals (but truthy via 0/1)    | ✅ Yes — extended to mean *null-safe equality* | This is **non-standard but very handy**. `a IS b` → TRUE if both NULL or values equal.                               |
| **PostgreSQL** | ✅ Yes                     | ✅ Yes                                                  | ❌ No — only for boolean or null tests         | `a IS b` gives error unless `b` is a boolean literal or NULL. Use `a IS NOT DISTINCT FROM b` for null-safe equality. |
| **SQL Server** | ✅ Yes                     | ❌ No (`bit` type instead)                              | ❌ No — syntax error                           | Only truth test allowed is `IS NULL`.                                                                                |
| **MySQL**      | ✅ Yes                     | ✅ Yes (since 8.0.17 for `IS [NOT] TRUE/FALSE/UNKNOWN`) | ❌ No — syntax error                           | Use `<=>` or `IS [NOT] DISTINCT FROM` instead.                                                                       |

---

### ✅ Universal meanings (safe everywhere)

These always work:

```sql
col IS NULL
col IS NOT NULL
```

These are increasingly common and safe in modern engines (PostgreSQL, MySQL ≥ 8.0.17):

```sql
flag IS TRUE
flag IS FALSE
flag IS UNKNOWN
```

---

### 🚫 Non-portable `a IS b`

Let’s compare:

| Engine         | Example                                         | Result                        |
| -------------- | ----------------------------------------------- | ----------------------------- |
| **SQLite**     | `SELECT 1 IS 1;` → TRUE / `NULL IS NULL` → TRUE | ✅ Works as null-safe equality |
| **PostgreSQL** | `SELECT 1 IS 1;` → ❌ syntax error               | ❌ Not allowed                 |
| **SQL Server** | `SELECT 1 IS 1;` → ❌ syntax error               | ❌ Not allowed                 |
| **MySQL**      | `SELECT 1 IS 1;` → ❌ syntax error               | ❌ Not allowed                 |

So:
→ Only **SQLite** extends `IS` to act as null-safe equality.
→ The others reserve it for **IS NULL / IS TRUE / IS UNKNOWN** contexts.

---

## 🧪 Example summary

```sql
-- Portable and valid in all
WHERE col IS NULL
WHERE col IS NOT NULL

-- Postgres / MySQL 8+ only
WHERE bool_col IS TRUE
WHERE bool_col IS NOT FALSE

-- SQLite only (null-safe equality)
WHERE a IS b  -- same as "a IS NOT DISTINCT FROM b"

-- Postgres / SQL Server 2022+ / MySQL 8+ equivalents
WHERE a IS NOT DISTINCT FROM b
```

---

## 🧩 3. Recommendation for portability

| Use case                                  | Portable pattern                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Check for NULL                            | `IS NULL` / `IS NOT NULL`                                                                           |
| Check booleans                            | `IS TRUE`, `IS FALSE`, `IS UNKNOWN` (or `= TRUE` if not supported)                                  |
| Null-safe equality                        | Use `IS NOT DISTINCT FROM` (Postgres, SQL Server 2022+, MySQL 8+) or `<=>` (MySQL) or `IS` (SQLite) |
| Avoid nonstandard `a IS b` outside SQLite | ❌                                                                                                   |

---

## 🧠 4. Mental model

* `IS` always binds more tightly than `NOT`. (`IS NOT NULL` ≠ `IS (NOT NULL)`)
* Think of `IS` as a family:

  * *Truth tests*: `IS TRUE / IS FALSE / IS UNKNOWN`
  * *Null tests*: `IS NULL / IS NOT NULL`
  * *Null-safe equality* (SQLite only)
* If writing portable SQL: **restrict `IS` to truth/null tests only.**

---
