
## Never use `=` for nullable equality (NULL-safe equality) as `= NULL` is always UNKNOWN

**Never use `=` for nullable equality.** Use `IS DISTINCT FROM` or `IS NOT DISTINCT FROM` or `IS NULL`.

##

Let’s pin down **NULL-safe equality**—i.e., “treat two NULLs as equal.”
Below is a practical, engine-by-engine guide with join/filter examples, version notes, and index/use hints.

---

## The goal (why you need this)

Regular `=` treats `NULL` as “unknown,” so:

```sql
NULL = NULL         -- UNKNOWN (never true in WHERE/JOIN)
```

NULL-safe equality means: return TRUE when **both sides are NULL** and when **values are equal**.

Formally, we want the truth table:

| a    | b    | result |
| ---- | ---- | ------ |
| 5    | 5    | TRUE   |
| 5    | 6    | FALSE  |
| 5    | NULL | FALSE  |
| NULL | 6    | FALSE  |
| NULL | NULL | TRUE   |

---

## Syntax by database

### SQLite

* **Operator(s):** `IS`, `IS NOT` (null-safe equality/inequality)
* **Also:** `(a IS b)` works for values; it’s not just identity—it’s defined for SQL values in SQLite.
* **Tuple/row:** No direct row-wise `IS [NOT] DISTINCT FROM`; do it per column.

```sql
-- Filter
WHERE a IS b

-- Join
... JOIN t2 ON t1.k IS t2.k

-- Composite key join (null-safe)
... JOIN t2 ON t1.k1 IS t2.k1 AND t1.k2 IS t2.k2
```

**Index use:** `IS` is sargable much like `=` for B-tree lookups on non-NULL keys; when many NULLs are present, expect partial scans (that’s true everywhere).

---

### PostgreSQL

* **Operator(s):** `IS DISTINCT FROM`, `IS NOT DISTINCT FROM` (ANSI)
* **Row/tuple aware:** works on row types too!

```sql
-- Filter
WHERE a IS NOT DISTINCT FROM b

-- Join
... JOIN t2 ON t1.k IS NOT DISTINCT FROM t2.k

-- Composite key, one predicate (row-wise)
... JOIN t2 ON (t1.k1, t1.k2) IS NOT DISTINCT FROM (t2.k1, t2.k2)
```

**Notes**

* `IS NOT DISTINCT FROM` behaves like “null-safe `=`”.
* Sargability: PostgreSQL can use B-tree indexes for `IS NOT DISTINCT FROM` comparisons.
* Very portable within the PG ecosystem; cleanest for composite keys.

---

### SQL Server

* **SQL Server 2022+**: supports ANSI `IS [NOT] DISTINCT FROM`.
* **Older versions**: emulate with `ISNULL`/`COALESCE` (careful: sentinel must be outside domain).

```sql
-- 2022+
WHERE a IS NOT DISTINCT FROM b
... JOIN t2 ON t1.k IS NOT DISTINCT FROM t2.k

-- Pre-2022 (emulation; choose a safe sentinel):
WHERE ISNULL(a, -2147483648) = ISNULL(b, -2147483648)

-- Composite key (pre-2022)
... JOIN t2 ON ISNULL(t1.k1,'§§§') = ISNULL(t2.k1,'§§§')
          AND ISNULL(t1.k2,'§§§') = ISNULL(t2.k2,'§§§')
```

**Index use**

* 2022+ `IS NOT DISTINCT FROM` is sargable (like `=`).
* The `ISNULL/COALESCE` trick can prevent index seeks and force scans; use only if you must.

---

### MySQL (8.0+)

* **Operator(s):** `<=>` (NULL-safe equals)
* **Also (8.0.13+)**: `IS NOT DISTINCT FROM` / `IS DISTINCT FROM` (synonyms of `<=>` semantics)
* **Row/tuple:** do per column; no null-safe row operator.

```sql
-- Filter
WHERE a <=> b
-- or
WHERE a IS NOT DISTINCT FROM b

-- Join
... JOIN t2 ON t1.k <=> t2.k

-- Composite key
... JOIN t2 ON t1.k1 <=> t2.k1 AND t1.k2 <=> t2.k2
```

**Index use:** `<=>` is sargable like `=`.

---

## Quick choosing guide

* **PostgreSQL:** `a IS NOT DISTINCT FROM b` (row-wise too).
* **SQL Server 2022+:** `a IS NOT DISTINCT FROM b`; earlier versions: avoid if possible, else `ISNULL/COALESCE` with care.
* **MySQL:** `a <=> b` (or `a IS NOT DISTINCT FROM b` on 8.0.13+).
* **SQLite:** `a IS b`.

---

## Practical patterns

### 1) Null-safe equality filter

```sql
-- PG / SQL Server 2022+ / MySQL (8.0.13+)
WHERE a IS NOT DISTINCT FROM b

-- MySQL (all)
WHERE a <=> b

-- SQLite
WHERE a IS b
```

### 2) Null-safe equality join on possibly-nullable key

```sql
-- PG
JOIN t2 ON t1.k IS NOT DISTINCT FROM t2.k

-- SQL Server 2022+
JOIN t2 ON t1.k IS NOT DISTINCT FROM t2.k

-- MySQL
JOIN t2 ON t1.k <=> t2.k

-- SQLite
JOIN t2 ON t1.k IS t2.k
```

### 3) Null-safe composite key join

```sql
-- PG (cleanest)
JOIN t2 ON (t1.k1, t1.k2) IS NOT DISTINCT FROM (t2.k1, t2.k2)

-- Others
JOIN t2 ON t1.k1 <=> t2.k1 AND t1.k2 <=> t2.k2      -- MySQL
JOIN t2 ON t1.k1 IS t2.k1 AND t1.k2 IS t2.k2        -- SQLite
```

### 4) Anti-join (NULL-safe “no match”)

Prefer `NOT EXISTS` (portable & NULL-safe) over `NOT IN`:

```sql
SELECT t.*
FROM t
WHERE NOT EXISTS (
  SELECT 1 FROM s WHERE s.k IS NOT DISTINCT FROM t.k  -- PG / SQL Server 2022+
  -- MySQL: s.k <=> t.k
  -- SQLite: s.k IS t.k
);
```

---

## Gotchas to remember

1. **Don’t use `=` for nullable equality**—you’ll silently drop “both NULL” matches.
2. **Avoid COALESCE/ISNULL hacks** unless you must (older SQL Server): choosing a sentinel is brittle, harms index usage.
3. **Row-wise null-safe equality** is only first-class in PostgreSQL; in others, expand to per-column predicates.
4. **`NOT IN` + NULL anywhere = empty result set.** Prefer `NOT EXISTS` and combine with null-safe equality in the subquery.
5. **Sargability matters:** native null-safe operators (`IS NOT DISTINCT FROM`, `<=>`, `IS`) let the optimizer consider index seeks; expression-wrapping often does not.

---

## Tiny test set (copy-paste)

Create:

```sql
CREATE TABLE t(a INT, b INT);
INSERT INTO t VALUES (1,1),(1,2),(NULL,NULL),(NULL,1);
```

Queries (swap per engine syntax):

```sql
-- Find rows where a “equals” b, treating two NULLs as equal
-- PG / SQL Server 2022+
SELECT * FROM t WHERE a IS NOT DISTINCT FROM b;

-- MySQL
SELECT * FROM t WHERE a <=> b;

-- SQLite
SELECT * FROM t WHERE a IS b;
```

Expected rows: `(1,1)` and `(NULL,NULL)`.

---

Want to sanity-check this against your target engines (versions) with a couple more composite-key examples? If you tell me the exact versions you use, I’ll tailor a mini test suite you can run as part of migrations.
