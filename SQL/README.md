
## Table creation syntax

Below is a concise summary of the key points regarding `CREATE TABLE` syntax options:

---

### Easy-to-Remember Mnemonic: **Name – Columns – Rules**

1. **Name**  
   - Start with `CREATE TABLE` followed by the table name.
   - *Example:*  
     ```sql
     CREATE TABLE Employees
     ```

2. **Columns**  
   - List each column inside parentheses.
   - Each column definition can include:
     - **Data Type:** e.g., `INTEGER`, `TEXT`, `NUMERIC`.
     - **Inline Constraints:** such as `NOT NULL`, `PRIMARY KEY`, or `UNIQUE` directly next to the column.
   - *Example:*  
     ```sql
     (
         id INTEGER PRIMARY KEY,
         name TEXT NOT NULL
     )
     ```

3. **Rules** (Table-Level Constraints)  
   - These are extra conditions placed after listing all columns.
   - Useful for:
     - **Composite Constraints:** like a composite primary key or composite UNIQUE constraint.
     - **Foreign Keys:** referencing columns in other tables.
     - **Check Constraints:** often used for multi-column checks.
   - *Example:*  
     ```sql
     (
         employee_id INTEGER,
         department_id INTEGER,
         PRIMARY KEY (employee_id, department_id),
         CHECK (employee_id > 0)
     )
     ```

---

### Additional Points to Remember

- **SQLite Specifics:**
  - **Type Flexibility:** SQLite uses type affinities, so data types are not enforced as strictly.
  - **Auto-Increment:** Defined with `INTEGER PRIMARY KEY` (optional `AUTOINCREMENT` keyword is available).
  - **Foreign Key Enforcement:** Must be enabled with `PRAGMA foreign_keys = ON;` as it’s off by default.
  
- **Constraints Location:**
  - **Inline Constraints:** Best for single-column rules (e.g., `NOT NULL`, `UNIQUE`, and inline `CHECK`).
  - **Table-Level Constraints:** Preferred for multi-column constraints and offering additional naming/control (e.g., `CONSTRAINT fk_employee FOREIGN KEY…`, composite unique, or composite primary keys).

---

### Quick Takeaway

- **Name:** Declare the table’s name.
- **Columns:** Define each column with data types and inline constraints.
- **Rules:** Specify table-level constraints (unique, composite keys, foreign keys, check constraints) where needed.

This "Name – Columns – Rules" mnemonic helps encapsulate the overall structure of a `CREATE TABLE` statement and guides you in recalling where and how to specify different types of constraints.