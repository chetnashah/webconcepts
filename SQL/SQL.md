
### MYSQL

Running it easily using docker: `docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest`

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

### FOREIGN KEY constraint in mysql

```sql
-- 1 customer: many orders (one to many relationship)
CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### JOINs

An alternative to JOINs is subqueries.
e.g.
```sql
SELECT * FROM orders WHERE customer_id=
       (
              SELECT id FROM customers
              WHERE last_name='George'
       );
```

#### CROSS (Product) JOIN (MxN)

Makes `MxN` rows, does not put any logic.
```sql
SELECT * from customers, orders;
-- or
SELECT * 
FROM table1 
CROSS JOIN table2;
```
### Execution order of clauses:

`FROM & JOINs` determine & filter rows
`WHERE` more filters on the rows
`GROUP BY` combines those rows into groups
`HAVING` filters groups
`SELECT`
`DISTINCT`
`ORDER BY` arranges the remaining rows/groups
`LIMIT` filters on the remaining rows/groups


### **column aliases** declared in **select clause** cannot be used in **where clause**

Due to above mentioned execution order,
aliases declared in `select` clause are only discovered after
`where` clause, so one cannot use `ALIASNAME` inside a `WHERE` clause
for mysql,sql server etc.

Although some environments like `snowflake` allow using aliases declared
in `select` clause to be used in `where` clause


### Subquerying

Subquerying can be done in 3 places:
1. `SELECT CLAUSE` - 
```sql
select customerid, fright, (select avg(freight) from orders)
from orders
```

2. `FROM STATEMENT` - inner query becomes data source for outer query.
also useful to do aggregate of an aggregate.
```sql
select shipcountry, avg(num_orders) from
       (select customerid, shipcountry, count(*)as num_orders
       from orders
       group by 1,2) subtable
group by 1
```

3. `WHERE CLAUSE`- useful for set/rows/table generation and used in `WHERE X IN ROWS` clause.
```sql
select * from orders
where employeeid in
(select employeeid from employees where firstname like '%a%')
```

### WITH queries and CTEs



### Execute .sql file in mysql cli

`mysql> source myfile.sql`

### WHERE CLAUSE in mysql

Can be used in `SELECT` as well as `UPDATE`

### Numeric types in MySQL

* INT
* SMALLINT
* TINYINT
* MEDIUMINT
* BIGINT
* DECIMAL - `DECIMAL(M,D)` where `M` is max no of digits(incl. precision), and `D` is precision. e.g. `DECIMAL(5,2)` is `999.99`.
* NUMERIC
* FLOAT
* DOUBLE
* BIT

### String types in MySQL
* CHAR - fast for fixed length e.g `CHAR(2)` for country codes
* VARCHAR - truncates anything beyond specified length i.e `VARCHAR(10)`
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
* DATE - `YYYY-MM-DD` format, no time information
* DATETIME- both date and time, i.e. `YYYY-MM-DD HH:MM:SS`.
* TIMESTAMP
* TIME - `HH:MM:SS` Values with a time, but no date.
* YEAR

#### Date and time functions
 `CURDATE()` - gives you current date, 
 `CURTIME()` - gives you current time, 
 `NOW()` - gives you current datetime.

### Mysql string functions

charachter indexes start at `1`.
Running these with `NULL` returns `NULL`
e.g. `CONCAT('abc', NULL)` returns `NULL`
#### CONCAT(X,Y,Z...)

Can be used in SELECT clause as well as WHERE clause.


#### SUBSTRING(str, startIdx, endIdx)
Can be used in SELECT clause as well as WHERE clause.
`SUBSTR` is same as `SUBSTRING`.


#### REPLACE(str, s1, s2)

Replace **all** occurences of s1 to s2 in str

#### REVERSE(str)

#### CHAR_LENGTH(str)



### INT gotchas

INT is by default signed, INT (which is shorthand for INT SIGNED) therefore has the MAX VALUE of 2147483647.  INT UNSIGNED  is 0 to 4294967295.

You have to explicitly modify INT to get a different range. This is the same with all integer types; hence the confusion. They are both INT, but they are not technically the same.

They are both integers of type INT; so you could say 4294967295 is the largest available INT value.

You can compare this to CHAR vs VARHCHAR. Yes a CHAR is a string, as is VARCHAR; but it behaves differently than VARCHAR. One has a set amount of memory (CHAR), the other can vary its memory footprint (VARCHAR). They're both stings but they behave differently, because of a modification.

The largest integer (of any type) available in MySQL (currently) is BIGINT UNSIGNED at 9,223,372,036,854,775,807.

### Mysql keywords to avoid

avoid `size` and use something like `shirt_size` etc.

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

### Mysql Aliases

Aliases are specified via `AS` keyword and we can have aliases 
for columns as well as tables.

**NOTE** - **You cannot use aliases declared in `SELECT` clause within the `WHERE` clause becuase WHERE
clause executes before SELECT**, The alternate solution is to use `WITH` clause, which allows to define alias before query is executed.
e.g. following is an invalid query:
```sql
SELECT logcount, logUserID, maxlogtm
   , DATEDIFF(day, maxlogtm, GETDATE()) AS daysdiff
FROM statslogsummary
WHERE daysdiff > 120 -- error!!! - where executes before select
```

### Mysql WITH clause

A `common table expression (CTE)` is a named (Alias) temporary result set that exists within the scope of a single statement and that can be referred to later within that statement, possibly multiple times

With for table aliases:
```sql
WITH
  cte1 AS (SELECT a, b FROM table1),
  cte2 AS (SELECT c, d FROM table2)
SELECT b, d FROM cte1 JOIN cte2
WHERE cte1.a = cte2.c;
```
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


## Distinct

The SELECT DISTINCT statement is used to return only distinct (different) values. t's semantically equivalent to a GROUP BY where all returned fields are in the GROUP BY clause.
E.g.
`select city from PARK group by city;` is equivalent to `select distinct city from PARK`;

Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values.

**NULL is considered a unique value, meaning it will get returned when using the DISTINCT keyword**

Syntax:
```
SELECT DISTINCT column_name1, column_name2,... // this will find unique rows with given column combination
FROM table_name;
```

**DISTINCT can be used with aggregated functions and can be applied on only one field in that case**

Count distinct is a common and useful operation
e.g. `SELECT COUNT(DISTINCT id) FROM sql_distinct;`

Another one:
`SELECT MAX(DISTNCT ID), Roles, FirstName, LastName FROM UserNames, LastName`


HOw it works:
* A SELECT DISTINCT statement first builds our overall result set with all records, i.e including duplicate values based on FROM, JOIN, WHERE, HAVING, etc statements.
* Next, it sorts the result set based on the column_name or field with which DISTINCT has been used.
* Then it performs de-duplication (i.e. removes any duplicate values) on the overall result set which was prepared in the first step.


### mysql> DISTINCT col_name / DISTINCT(col_name)

Used in `SELECT` clause.
Gives all the unique values for a column.

#### distinct combination of multiple rows

`SELECT DISTINCT author_fname, author_lname FROM books;`



### Order by (is for sorting)

#### Order by with shortcut

Here `2` stands as a shortcut for 2nd column i.e. `author_fname`
```sql
SELECT title, author_fname, author_lname FROM books ORDER BY 2;
```


#### stable sorting with order by (multiple columns)

```sql
SELECT * FROM books ORDER BY author_lname, author_fname;
```


### LIMIT count
Limit number of results
#### LIMIT offset, count
LImit number of results since offset.
if count is greater than number of rows, no issue.



### LIKE and wildcards
LIke search is case insensitve
To search for `%` or `_` in text, put a backslash `\` before them in pattern text.
#### % is the standard wildcard that matches anything (Any num of chars)

#### _ is another wildcard for single charachter

#### Case insensitivity and LIKE

`LIKE` does case insensitive search by default i.e.
```sql
SELECT name FROM users WHERE name LIKE 't%'
------------------
name
test
Test
```

If you want case sensitive search, you can cast the value as binary
and then do a byte by byte comparision vs charachter-by-charachter comparision.
```sql
SELECT name FROM users WHERE name LIKE BINARY 't%'
-------------------
name
test
```

### Mysql aggregate functions

`COUNT`,`MAX`,`MIN`,`SUM`,`AVG` are aggregate functions.


#### COUNT

`COUNT` typically takes a column or a list of columns, and counts
the number of rows for those columns.

A common pattern `COUNT(DISTINCT ...)` helps us count distinct values
for given columns etc.

`COUNT`: Returns a count of the number of `non-NULL` values of expr in the rows retrieved by a `SELECT` statement. The result is a `BIGINT` value.

`COUNT(*)` is somewhat different in that it returns a count of the number of rows retrieved, whether or not they contain NULL values.

### GROUP BY

It summarizes aggregates almost(some) identical data into single rows.
combine/summarize mostly same rows into mega-rows (optionally using aggregation functions).
The SQL GROUP BY clause lets us group records based on data in a given column (or columns).

https://learnsql.com/blog/how-does-sql-group-by-work/
https://learnsql.com/blog/getting-hang-group-clause/

`GROUP BY` is a useful part where we want to combine rows `per` entry,
or `for each` entry.
E.g. 
* no. of books `per` author
* avg height `per` birth contry.
* Total sales `per` product.

**Like any other value, NULL values have their own group; if we have a NULL in any of the columns in GROUP BY, an extra group of records is created for those records**

Once we've decided how to group our data, we can then perform aggregations on the remaining columns.


GROUP BY **can lose data** in other columns if not queried properly (so count is also used together sometimes).

e.g.    
```sql
------------------------------------------------------
title                                   | author_lname
------------------------------------------------------
The namesake                            | Lahiri
Norse Mythology                         | Gaiman
A Hologram for the King: A novel        | Eggers
American Gods                           | Gaiman
Interpreter of Maladies                 | Lahiri
------------------------------------------------------

SELECT title, author_lname FROM books
GROUP BY author_lname
-- note we lose two books below in summary
-- and only picks first title in grouping of author_lname
------------------------------------------------------
title                                   | author_lname
------------------------------------------------------
The namesake                            | Lahiri
Norse Mythology                         | Gaiman
A Hologram for the King: A novel        | Eggers
------------------------------------------------------
```

Hence `COUNT(*) + Groupby` is a popular combination
```sql

```

#### GROUP BY with multiple columns

`Sameness` now considered on multiple columns instead of single column.
```sql
mysql> SELECT species, sex, COUNT(*) FROM pet
       WHERE species = 'dog' OR species = 'cat'
       GROUP BY species, sex;
+---------+------+----------+
| species | sex  | COUNT(*) |
+---------+------+----------+
| cat     | f    |        1 |
| cat     | m    |        1 |
| dog     | f    |        1 |
| dog     | m    |        2 |
+---------+------+----------+

-- number of books per author
SELECT CONCAT(author_fname, ' ', author_lname), COUNT(*) 
FROM books
GROUP BY author_fname, author_lname;
+-----------------------------------------+----------+
| Dan Harris                              |        1 |
| Dave Eggers                             |        3 |
| David Foster Wallace                    |        2 |
| Don DeLillo                             |        1 |
| Freida Harris                           |        1 |
| George Saunders                         |        1 |
| Jhumpa Lahiri                           |        2 |
| John Steinbeck                          |        1 |
| Michael Chabon                          |        1 |
| Neil Gaiman                             |        3 |
| Patti Smith                             |        1 |
| Raymond Carver                          |        2 |
+-----------------------------------------+----------+
```

### Group by gotchas

#### Select column should either be in group-by clause or be aggregated

1. All select columns must either be in Group-by clause column list or be used in aggregate functions(so they return a single value in the summarized-mega-row).
Following is invalid query:
```
SELECT Gender, Height
FROM People
GROUP BY Gender;
```
Here we see that `Height` is not in group-by column list, and it is also not aggregated using an aggregation function. Hence the error.
Error:
```
(MYSQL) ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains 
nonaggregated column 'vertabelo.People.Height' which is not functionally dependent on columns 
in GROUP BY clause;
```

#### Using Where instead of Having

When you need to filter based on aggregate values, move them from where to `Having` clause, which is executed after grouping by group by.

### The problem with MIN/MAX

Following query will not give you expected result, i.e. 
book title with max no. of pages
```sql
select Max(pages), title from books;
// returns wrong ans
```

SOlution: Use subquery to get max first, and then filter rows using where.

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

