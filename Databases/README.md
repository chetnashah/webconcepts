
## Driver interface is mostly "execute" or "query" or "run" method

# Popular SQL Driver Libraries in TypeScript

The following table summarizes widely used SQL driver libraries for Node.js/TypeScript, including their npm package pages, primary documentation sites, and GitHub repositories.

 Library           | npm Package                                               | Documentation                                        | GitHub Repository                                  |
|-------------------|-----------------------------------------------------------|------------------------------------------------------|----------------------------------------------------|
| **mysql2**        | https://www.npmjs.com/package/mysql2                      | https://sidorares.github.io/node-mysql2/docs         | https://github.com/mysqljs/mysql2                  |
| **node-postgres (pg)** | https://www.npmjs.com/package/pg                        | https://node-postgres.com                            | https://github.com/brianc/node-postgres            |
| **Postgres.js**   | https://www.npmjs.com/package/postgres                    | https://github.com/porsager/postgres#readme          | https://github.com/porsager/postgres               |
| **ts-postgres**   | https://www.npmjs.com/package/ts-postgres                | https://www.npmjs.com/package/ts-postgres#readme     | https://github.com/brianclements/ts-postgres       |
| **sqlite3**       | https://www.npmjs.com/package/sqlite3                     | https://github.com/TryGhost/node-sqlite3#readme      | https://github.com/TryGhost/node-sqlite3           |
| **sqlite**        | https://www.npmjs.com/package/sqlite                      | https://github.com/kriasoft/node-sqlite#readme       | https://github.com/kriasoft/node-sqlite            |
| **better-sqlite3**| https://www.npmjs.com/package/better-sqlite3              | https://github.com/WiseLibs/better-sqlite3#readme    | https://github.com/WiseLibs/better-sqlite3         |


# Drivers as the “Execute” Layer in a Layered Architecture

**Key Takeaway:** At the lowest level of a typical layered architecture, database drivers expose minimal, imperative methods—often just anexecute` or `query` call—that accept raw SQL and return untyped results. Their responsibility is purely transport and protocol translation, not type safety or high-level modeling.

## 1. Driver Interfaces: Minimal Surface Area

In most Node.js/TypeScript drivers (e.g. `mysql2`, `pg`, `sqlite3`):

- **Single Entry Point:** A method named `execute()`, `query()`, or `run()` is the primary API.  
- **Raw SQL + Parameters:** Callers supply a SQL string plus a parameters array/tuple.  
- **Untyped Results:** Rows are returned as generic objects (e.g. `any[]`, `RowDataPacket[]`) with no compile-time guarantees about column names or types.  
- **Error Handling Only:** Drivers validate at runtime (syntax errors, type mismatches in parameters) but do not enforce TypeScript types on the shape of incoming/outgoing data.

### Why So Simple?

1. **Broad Compatibility:** By focusing strictly on the wire protocol (e.g. the MySQL, PostgreSQL, or SQLite protocol), drivers remain thin, performant, and DB-vendor–agnostic.  
2. **Separation of Concerns:** Higher-level concerns—type safety, SQL generation, relation mapping, caching—are pushed to libraries built atop drivers.

## 2. Layered Architecture: Where Drivers Fit

```
+---------------------------------+
|     Presentation / UI Layer     |
+---------------------------------+
|    Application / Business Logic |
+---------------------------------+
|    Domain / Service Layer       |
+---------------------------------+
|  Data Access / Repository Layer |
+---------------------------------+
|   Database Driver (execute)     |
+---------------------------------+
|       Database Engine           |
+---------------------------------+
```

- **Data Access / Repository Layer**  
  - Translates business-level operations into query intents.  
  - Uses query builders or ORMs to assemble SQL and map result rows into typed domain objects.  
  - Handles type safety via TypeScript generics, interfaces, and compile-time checks.  

- **Database Driver Layer**  
  - Sends the raw SQL + parameters to the DBMS.  
  - Performs minimal marshalling/unmarshalling of data types (e.g., converting JavaScript `Date` to SQL `TIMESTAMP`).  
  - Does **not** know about domain models—only raw rows and primitive values.

## 3. Why Push Type Safety Above Drivers?

1. **Modularity & Swap-ability**  
   - If drivers included domain types, swapping to a new DB or driver version would force changes throughout the application.  
2. **Single Responsibility**  
   - Drivers focus on protocol correctness and performance; mapping and validation of data shapes is done once in repositories or ORMs.  
3. **Compile-time Guarantees**  
   - By modeling SQL fragments or table schemas in TypeScript (e.g. via query builders like `ts-sql-query`, pg-typed, or ORMs such as TypeORM), you catch mismatches before running code.  

## 4. Common Patterns Above the Driver

| Approach                       | Description                                                                                                                                     | Type Safety          |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| Raw Driver + Interfaces        | Manually cast rows to interfaces after `execute()`. Error-prone if columns change.                                                               | Weak (manual casts)  |
| Query Builders (e.g. Knex, ts-sql-query) | Fluent APIs to construct queries; types track selected columns and parameter types.                                                             | Stronger (generics)  |
| ORM (TypeORM, Prisma)          | High-level abstractions of tables as classes/models. Auto-generates SQL, maps results to model instances with full TypeScript support.         | Very strong          |

## 5. Practical Insights

- **Don’t “leak” SQL strings through multiple layers.** Encapsulate SQL generation in one place (repository) to centralize type checks and prevent injection.  
- **Leverage Generics.** When using raw drivers, define a result interface and annotate calls:  
  ```typescript
  interface User { id: number; name: string; email: string; }
  const [rows] = await connection.query('SELECT id, name, email FROM users WHERE active = ?', [true]);
  ```
- **Adopt Code Generation.** Tools like Prisma or pg-typed introspect your schema and autogenerate TypeScript types that mirror your database schema.  

## 6. Conclusion

Database drivers intentionally remain surface-minimal—essentially just an `execute()` call—so that concerns like type safety, SQL correctness, and domain modeling live at higher layers of the architecture. By **separating** the “transport” (driver) from the “modeling” (repository, ORM), you achieve both performance and robust compile-time guarantees.

