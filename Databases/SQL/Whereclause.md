Alright, let’s de-mystify the WHERE clause. Think of it as “a boolean expression factory”: it takes a row in, evaluates a truth value (TRUE / FALSE / UNKNOWN), and decides if the row survives.

I’ll cover what you *can* put in WHERE, what you *can’t*, the semantics that bite, and the cross-DB quirks (SQLite, PostgreSQL, MySQL, SQL Server).

---

# What WHERE **can** contain (every major SQL DB)

* **Boolean expressions** built from columns, literals, params, and functions:

  * Comparisons: `=, <>, !=, <, <=, >, >=`
  * Logical: `AND, OR, NOT`
  * Null checks: `IS NULL`, `IS NOT NULL`
  * Range / set: `BETWEEN`, `IN (...)`, `NOT IN (...)`
  * Pattern: `LIKE` (and vendor regex variants)
  * Quantifiers over subqueries: `EXISTS`, `NOT EXISTS`, `IN (subquery)`, `= ANY(...)`, `> ALL(...)`
  * Row/tuple comparisons (Postgres best; others partial): `(a,b) = (1,2)`
* **Scalar expressions and functions** (built-ins or UDFs) returning a scalar:

  * Math/date/string/JSON extraction/etc. Result must reduce to TRUE/FALSE/UNKNOWN.
* **Correlated and uncorrelated subqueries** returning:

  * **Boolean via EXISTS**: `WHERE EXISTS (SELECT 1 FROM ...)`
  * **Scalar**: `WHERE price > (SELECT AVG(price) FROM ...)`
  * **Set**: `WHERE x IN (SELECT ...)`
* **Case/conditional**:

  * `CASE WHEN ... THEN ... ELSE ... END` (as long as final result is comparable / boolean)

---

# What WHERE **cannot** contain (standard SQL, all vendors enforce most of these)

* **Aggregate functions directly**: `WHERE SUM(x) > 0` ❌
  Use `HAVING` (post-GROUP BY) or a subquery/CTE that computes the aggregate, then filter.
* **Window functions**: `WHERE row_number()...` ❌
  Use them in `SELECT`/`ORDER BY` (vendor-dependent) and then wrap in an outer query to filter.
* **SELECT-list aliases** (in standard order of evaluation) ❌
  WHERE runs before SELECT.

  * PostgreSQL, SQL Server, SQLite: alias not visible in WHERE.
  * MySQL: same; people sometimes abuse `HAVING` to filter by alias, but that changes semantics (post-aggregation).
* **ORDER BY / LIMIT** directly inside WHERE ❌
  If you need a “top-k” subquery, use `TOP/LIMIT` *inside the subquery* and then reference that subquery from WHERE. (Vendors allow `ORDER BY` in a subquery only when paired with `TOP/LIMIT`.)

---

# Semantics & gotchas you should tattoo on your brain

### 1) Three-valued logic (3VL)

* Comparisons with `NULL` yield **UNKNOWN**, not TRUE/FALSE.
* WHERE keeps rows only when the predicate is **TRUE**. `FALSE` and `UNKNOWN` both drop.
* Use `IS NULL` / `IS NOT NULL`, not `= NULL` / `<> NULL`.
* `NOT IN (subquery)` pitfalls: if the subquery can produce **NULL**, the whole predicate often becomes **UNKNOWN** → filters out everything. Prefer `NOT EXISTS` with a correlated anti-join pattern:

  ```sql
  -- safer than NOT IN when NULLs might appear
  WHERE NOT EXISTS (
    SELECT 1 FROM T2 WHERE T2.key = T1.key
  )
  ```

### 2) SARGability (can the predicate use indexes?)

* Wrapping the indexed column in a function usually blocks index seeks:

  ```sql
  -- bad for index use
  WHERE LOWER(email) = 'a@b.com'
  -- better
  WHERE email = 'a@b.com' COLLATE ...  -- or store normalized form
  ```
* Non-deterministic / volatile functions (e.g., `random()`, `now()` in some engines) rarely use indexes efficiently.
* For computed conditions, consider **expression/functional indexes** (supported in all four now):

  * SQLite: **expression indexes** (since 3.9+): `CREATE INDEX ON users((lower(email)));`
  * PostgreSQL: `CREATE INDEX ON users ((lower(email)));`
  * MySQL 8.0+: **functional indexes** via generated columns or direct functional index.
  * SQL Server: **indexed computed columns** (persisted recommended).

### 3) `LIKE` and pattern matching

* `LIKE 'abc%'` can use an index; `LIKE '%abc'` or `LIKE '%abc%'` cannot (needs scan) unless you have special indexes (e.g., trigram/FTS).
* Case-sensitivity is collation-dependent:

  * SQLite: `LIKE` is case-insensitive for ASCII by default; `GLOB` is case-sensitive. Collations matter.
  * PostgreSQL: `LIKE` follows collation; `ILIKE` is case-insensitive (non-standard, Postgres-only).
  * MySQL / SQL Server: behavior controlled by column/collation.
* Regex:

  * PostgreSQL: `~`, `~*`, `!~`, `!~*` (with optional trigram index for speed).
  * MySQL 8.0: `REGEXP_LIKE()`, legacy `REGEXP`.
  * SQLite: no built-in PCRE in core; many builds ship a `regexp` UDF; otherwise you must load an extension.
  * SQL Server: no regex—use `LIKE`, `PATINDEX`, CLR, or external.

### 4) `IN` vs `EXISTS`

* `IN (subquery)` is fine for uniqueness; `EXISTS` scales better for large/duplicative sets and null-weirdness.
* `NOT IN` vs `NOT EXISTS`: prefer `NOT EXISTS` to dodge NULL traps.
* For many constants, large `IN (...)` lists can become unwieldy; consider temp table + join, or table-valued parameters (SQL Server), or `VALUES(...)` joined.

### 5) Row/tuple comparisons

* PostgreSQL: full support (`(a,b) > (1,2)`), composable with indexes.
* MySQL: supports row constructors, some quirks.
* SQL Server: limited row constructors in comparisons; more often you compare components explicitly.
* SQLite: supports row comparisons but with type-affinity quirks—test carefully.

### 6) JSON in WHERE

* PostgreSQL: `->`, `->>`, `#>>`, plus GIN indexes with `jsonb_path_ops` make predicates fast.
* MySQL: `JSON_EXTRACT`, `->>`; functional indexes or generated columns for performance.
* SQL Server: `JSON_VALUE`, `OPENJSON`; add computed columns for indexing.
* SQLite: `json1` extension (`json_extract`). Combine with expression indexes.

### 7) Date/time math & implicit casts

* Be explicit with types. SQLite’s dynamic typing can coerce text to numeric and back; that changes comparison results. Store ISO-8601 text or Unix epoch consistently, index the chosen representation, and compare apples to apples.
* MySQL can do silent truncation/casts; enable strict SQL mode in production.
* SQL Server/PostgreSQL are stricter; still, prefer explicit casts.

### 8) Collations

* WHERE comparisons use the expression’s effective collation. Mixed collations can cause errors or unexpected sort/compare behavior. Unify collations for join/filter columns.

### 9) ORDER of evaluation (mental model)

Roughly: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/TOP.
Thus:

* No aggregates/window funcs in WHERE.
* No SELECT aliases in WHERE (use a subquery/CTE if you need to filter by an alias).

---

# Vendor specifics / differences

### SQLite

* Dynamic typing & type affinity: `'10' = 10` can be TRUE after coercion; be consistent with storage & comparisons.
* `LIKE` case-insensitive for ASCII, `GLOB` case-sensitive; regex only via extension/UDF.
* Expression indexes exist; use them to salvage sargability when you must transform data in WHERE.
* No built-in boolean type: `TRUE`/`FALSE` map to 1/0.

### PostgreSQL

* Best-in-class for tuple comparisons, rich JSON (`jsonb`) filters, regex operators, `ILIKE`.
* Strict typing; booleans are real booleans.
* Functional indexes + operator classes (e.g., trigram, GIN) give you fast WHERE for patterns/JSON.

### MySQL (8.0+)

* Functional indexes exist; but many teams still use **generated columns** + index for clarity.
* `REGEXP_LIKE` is available; collations drive case-sensitivity.
* Beware legacy behaviors: `ONLY_FULL_GROUP_BY`, type coercions. Keep strict SQL mode on.
* `LIMIT` is allowed in subqueries (useful for “semi-join top-k” patterns).

### SQL Server

* Use **persisted computed columns** + index for computed predicates.
* No regex. `LIKE`/`PATINDEX` only. Full-text search is separate.
* Careful with ANSI vs non-ANSI null semantics settings (keep ANSI_NULLS ON).
* TOP allowed in subqueries; ORDER BY inside a subquery requires TOP to be meaningful.

---

# Performance strategy for WHERE (portable playbook)

1. **Keep predicates sargable**: compare a column to a parameter/constant, not `func(column)` to something. If you must compute, use expression/functional indexes (or computed columns).
2. **Prefer `EXISTS` for semi/anti-joins**:

   ```sql
   WHERE EXISTS (SELECT 1 FROM child c WHERE c.parent_id = p.id)
   -- and
   WHERE NOT EXISTS (SELECT 1 FROM child c WHERE c.parent_id = p.id)
   ```
3. **Normalize then index**: store search keys in canonical form (lower-cased email, UTC timestamps, extracted JSON fields) and index those columns.
4. **Beware OR across different columns**: `colA = ? OR colB = ?` can disable index seeks. Consider UNION ALL of two index-friendly queries or filtered/partial indexes.
5. **Use the right pattern tool**: prefix `LIKE 'foo%'` → B-tree index; arbitrary substring/regex → add trigram/FTS/GIN/CONTAINS (vendor-specific).
6. **Cardinality & stats**: selective predicates shine with good statistics. Keep autovacuum/ANALYZE/auto-update stats healthy.

---

# Tiny cookbook (correct, fast patterns)

**Null-safe anti-join**

```sql
-- PostgreSQL / SQL Server / MySQL / SQLite
WHERE NOT EXISTS (
  SELECT 1
  FROM T2
  WHERE T2.key = T1.key
)
```

**JSON filter (portable idea)**

```sql
-- PostgreSQL
WHERE (payload->>'status') = 'active'

-- MySQL
WHERE JSON_UNQUOTE(JSON_EXTRACT(payload, '$.status')) = 'active'

-- SQL Server
WHERE JSON_VALUE(payload, '$.status') = 'active'

-- SQLite (json1)
WHERE json_extract(payload, '$.status') = 'active'
```

**Date range (sargable)**

```sql
WHERE ts >= @start AND ts < @start + INTERVAL '1 day'  -- PG
-- MySQL:  ts >= @start AND ts < DATE_ADD(@start, INTERVAL 1 DAY)
-- SQLSrv: ts >= @start AND ts < DATEADD(day, 1, @start)
-- SQLite: ts >= @start AND ts < @start_plus_one_day
```

**Case-insensitive search (index-friendly)**

* Store `email_lc` as lowercase, `CREATE INDEX ... (email_lc)`

```sql
WHERE email_lc = LOWER(@email_param)
```

---

# Quick “allow/forbid” checklist

* ✅ Comparisons, boolean logic, `IS [NOT] NULL`, `BETWEEN`, `IN`, `LIKE`

* ✅ Scalar functions (built-in or UDF) that return scalars

* ✅ Subqueries with `EXISTS` / `IN` / scalar result (correlated or not)

* ✅ CASE expressions

* ✅ JSON accessors (vendor-specific)

* ✅ Row/tuple comparisons (best in Postgres; others partial)

* ❌ Aggregates (`SUM/COUNT/...`) directly in WHERE

* ❌ Window functions in WHERE

* ❌ Referencing SELECT aliases in WHERE

* ❌ Using ORDER BY/LIMIT directly *inside* WHERE (use them in a subquery, then filter)

* ⚠️ `NOT IN` with possible NULLs (prefer `NOT EXISTS`)

* ⚠️ Functions on indexed columns (hurts sargability unless you have expression indexes)

* ⚠️ Collation/typing surprises (especially SQLite affinity and MySQL coercions)

---

If you want, I can turn this into a compact, printable cheat-sheet with a vendor matrix (SQLite/Postgres/MySQL/SQL Server) and example patterns for each—plus a section of “turn this slow WHERE into that fast WHERE” refactors.
