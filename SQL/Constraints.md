Below is a list of common SQL constraints along with examples for each one:

---

1. **NOT NULL**  
   - **Purpose:** Ensures a column cannot accept `NULL` values.  
   - **Example:**
     ```sql
     CREATE TABLE Employees (
         id INTEGER PRIMARY KEY,
         name TEXT NOT NULL   -- The "name" column must have a value.
     );
     ```

---

2. **UNIQUE**  
   - **Purpose:** Guarantees that all values in a column, or a combination of columns, are distinct.  
   - **Example (Inline for Single Column):**
     ```sql
     CREATE TABLE Employees (
         id INTEGER PRIMARY KEY,
         email TEXT UNIQUE   -- The "email" must be unique.
     );
     ```
   - **Example (Table-Level for Composite Unique):**
     ```sql
     CREATE TABLE EmployeeContacts (
         first_name TEXT,
         last_name TEXT,
         phone_number TEXT,
         UNIQUE (first_name, last_name, phone_number)   -- The combination must be unique.
     );
     ```

---

3. **PRIMARY KEY**  
   - **Purpose:** Uniquely identifies each record in a table. A PRIMARY KEY must be unique and not null.  
   - **Example (Inline):**
     ```sql
     CREATE TABLE Departments (
         department_id INTEGER PRIMARY KEY,
         department_name TEXT
     );
     ```
   - **Example (Table-Level Composite Primary Key):**
     ```sql
     CREATE TABLE EmployeeDepartments (
         employee_id INTEGER,
         department_id INTEGER,
         PRIMARY KEY (employee_id, department_id)  -- Composite primary key.
     );
     ```

---

4. **FOREIGN KEY**  
   - **Purpose:** Maintains referential integrity by ensuring a value in one table matches a primary key or unique key in another table.  
   - **Example:**
     ```sql
     CREATE TABLE Employees (
         emp_id INTEGER PRIMARY KEY,
         name TEXT
     );

     CREATE TABLE EmployeeSalaries (
         emp_id INTEGER,
         salary NUMERIC,
         CONSTRAINT fk_employee
             FOREIGN KEY (emp_id)
             REFERENCES Employees(emp_id)
     );
     ```

---

5. **CHECK**  
   - **Purpose:** Ensures values in a column meet a specified condition (using a Boolean expression).  
   - **Example (Inline):**
     ```sql
     CREATE TABLE Products (
         product_id INTEGER PRIMARY KEY,
         price NUMERIC CHECK (price > 0)   -- Price must be greater than 0.
     );
     ```
   - **Example (Table-Level):**
     ```sql
     CREATE TABLE Orders (
         order_id INTEGER PRIMARY KEY,
         quantity INTEGER,
         CHECK (quantity > 0)   -- Quantity must be a positive number.
     );
     ```

---

6. **DEFAULT**  
   - **Purpose:** Assigns a default value to a column when no value is provided during insertion.  
   - **Example:**
     ```sql
     CREATE TABLE Users (
         user_id INTEGER PRIMARY KEY,
         username TEXT,
         status TEXT DEFAULT 'active'   -- Defaults to "active" if no status is provided.
     );
     ```

---

Each of these constraints helps enforce data integrity and ensures that the data stored in your database adheres to the rules defined by your application logic. You can apply these constraints either inline (directly in the column definition) or at the table level, depending on which form improves clarity and maintainability for your specific design.