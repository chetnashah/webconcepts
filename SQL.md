
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

**Prepared statements**: ensure that attacker is not able to change intent of
a query, even if SQL commands are inserted by attacker.
Certain values are left unspecified, called `parameters`, `placeholders` or `bind variables` (labelled `?` below):
`INSERT INTO products (name, price) VALUES (?, ?);`


e.g. if an attacker were to enter the user id `tom' or '1'='1`, the
parametrized query would not be vulnerable and would instead look
for a username which literally matched entire string `tom' or '1'='1`

