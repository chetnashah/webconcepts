
### MYSQL

Use library with parametrized queries: Recommended library in js ecosyste: `sql-template-strings`

How it works:
```js
const SQL = require('sql-template-strings')
const query = SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`
typeof query // => 'object'
query.text   // => 'SELECT author FROM books WHERE name = $1 AND author = $2'
query.sql    // => 'SELECT author FROM books WHERE name = ? AND author = ?'
query.values // => ['harry potter', 'J. K. Rowling']
```

Table/database naming convention: all databses and table names should have lowercase and snake case e.g. creative_users etc.

Query writing convention: SQL keywords in CAPITAL L LETTERS.
e.g. `CREATE DATABASE hello_world_db;`

Tell me the currently used db:
`SELECT database();`

### Numeric types in MySQL

* INT
* SMALLINT
* TINYINT
* MEDIUMINT
* BIGINT
* DECIMAL
* NUMERIC
* FLOAT
* DOUBLE
* BIT

### String types in MySQL
* CHAR
* VARCHAR
* BINARY
* VARBINARY
* BLOB
* TINYBLOB
* MEDIUMBLOB
* LONGBLOB
* TEXT
* TINYTEXT
* MEDIUMTEXT
* LONGTEXT
* ENUM

### Date types in MYSql
* DATE
* DATETIME
* TIMESTAMP
* TIME
* YEAR

#### INT gotchas

INT is by default signed, INT (which is shorthand for INT SIGNED) therefore has the MAX VALUE of 2147483647.  INT UNSIGNED  is 0 to 4294967295.

You have to explicitly modify INT to get a different range. This is the same with all integer types; hence the confusion. They are both INT, but they are not technically the same.

They are both integers of type INT; so you could say 4294967295 is the largest available INT value.

You can compare this to CHAR vs VARHCHAR. Yes a CHAR is a string, as is VARCHAR; but it behaves differently than VARCHAR. One has a set amount of memory (CHAR), the other can vary its memory footprint (VARCHAR). They're both stings but they behave differently, because of a modification.

The largest integer (of any type) available in MySQL (currently) is BIGINT UNSIGNED at 9,223,372,036,854,775,807.

#### Get column metadata for a table

`SHOW COLUMNS FROM table_name;`
or 
`DESC table_name;`

**order of columns in insert statement matters**


### multiple insert formatting

```sql
INSERT INTO cats(name, age)
VALUES ('CHarlie', 10)
,('Sadie', 3)
,('Lazy bear', 1);
```

### INserting strings with quotes

If you're wondering how to insert a string (VARCHAR) value that contains quotations, then here's how.

You can do it a couple of ways:

* Escape the quotes with a backslash: `"This text has \"quotes\" in it"` or `'This text has \'quotes\' in it'`

* Alternate single and double quotes: `"This text has 'quotes' in it"` or `'This text has "quotes" in it'`.

### seeing MySQL warnings
`WARNINGS` set is only set after an insuccessful query. and gets cleared after
execution of a successful Query.
`SHOW WARNINGS;`

### what will happen if you do following?
`INSERT INTO cats() values()`
Ans:
An entry with all values `NULL`.
```
name| age
NULL| NULL
```

If you explicitly try to insert `NULL` to
a `NOT NULL` column, the query will throw error.

Good idea to always setup `DEFAULT` along with `NOT NULL` in create table.

### Mysql PRIMARY KEY with AUTO INCREMENT example:
```sql
CREATE TABLE unique_cats(cat_id INT NOT NULL AUTO_INCREMENT
, name VARCHAR(100)
, age INT
, PRIMARY KEY (cat_id)
);
```

another e.g.
```sql
CREATE TABLE employees(id INT NOT NULL AUTO_INCREMENT , last_name VARCHAR
(100) NOT NULL , first_name VARCHAR(100) NOT NULL , middle_name VARCHAR(100) , a
ge INT NOT NULL , current_status VARCHAR(20) NOT NULL DEFAULT 'employed', PRIMAR
Y KEY (id));
```

Primary Key: works both as a constraint at the end, or inline with the column name definition itself.

**Prepared statements**: ensure that attacker is not able to change intent of
a query, even if SQL commands are inserted by attacker.
Certain values are left unspecified, called `parameters`, `placeholders` or `bind variables` (labelled `?` below):
`INSERT INTO products (name, price) VALUES (?, ?);`


e.g. if an attacker were to enter the user id `tom' or '1'='1`, the
parametrized query would not be vulnerable and would instead look
for a username which literally matched entire string `tom' or '1'='1`

### Mysql vs postgresql




| feature | Mysql | Postrges |
| --- | --- | --- |
| Math operators | kllk | `/`,`+`,`-`,`*`|
| String operators | lkl | `||` -> concat, `CONCAT(A,B,C,...)`|
| Comparision ops in `WHERE`| adsf | `>`,`=`, `IN (a,b,...)`, `NOT IN (a,b,...)`, `BETWEEN` | 


### Postgres query exectuion

step1: get query source  i.e. `FROM`
step2: where clause filtering i.e. `WHERE`
step3: column selection via `SELECT`

