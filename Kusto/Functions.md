
---

# **KQL User-Defined Functions: Guide, Gotchas, and Examples**

## **1. Kinds of User-Defined Functions**

- **Scalar Functions:** Return a single value per row.
- **Tabular Functions:** Return a table.
- **Parameterless Functions (Macros):** Can be used for code reuse, constants, or query fragments. In KQL, the parameter block is **optional** if there are no parameters.

---

## **2. Syntax and Nuances**

### **a. With Parameters**

```kql
let FunctionName = (param1:type, param2:type) {
    // Expression or query here
};
```

### **b. Without Parameters (Parameterless Functions)**

- **Parameter block is optional.**  
- You can define as:
    ```kql
    let FunctionName = {
        // Expression or query here
    };
    ```
    or
    ```kql
    let FunctionName = () {
        // Expression or query here
    };
    ```

**Both forms work**—but omitting the parameter block is more concise and idiomatic.

---

## **3. Gotchas and Nuances**

- **No recursion:** Functions can’t call themselves (directly or indirectly).
- **No function overloading:** Each function name must be unique.
- **No variable number of arguments:** Each parameter must be explicitly listed.
- **No “return” keyword:** The last expression is the result.
- **Must be defined at the start** of the query (before usage).
- **Local scope:** Inline `let` functions are visible only within that query.
- **Tabular functions’ parameters** must be **scalars** or a **single table**.
- **Parameterless functions** are often called “macros” and are great for code reuse or constants.

---

## **4. All Example Patterns**

### **A. Scalar Functions**

#### **1. Add Prefix**

```kql
let add_prefix = (prefix:string, value:string) {
    strcat(prefix, value)
};

MyTable
| extend NewField = add_prefix("User_", UserName)
```

#### **2. Is Even**

```kql
let is_even = (num:int) {
    num % 2 == 0
};

MyTable
| extend Even = is_even(NumberField)
```

#### **3. Classify Amount**

```kql
let classify_amount = (amt:real) {
    case(
        amt > 1000, "High",
        amt > 100, "Medium",
        "Low"
    )
};

Transactions
| extend Category = classify_amount(Amount)
```

#### **4. Extract Domain**

```kql
let extract_domain = (email:string) {
    extract("@(.+)$", 1, email)
};

Users
| extend Domain = extract_domain(Email)
```

#### **5. Scalar Function Calling Another**

```kql
let square = (x:int) { x * x };
let cube = (x:int) { x * square(x) };

range n from 1 to 5 step 1
| extend Squared = square(n), Cubed = cube(n)
```

---

### **B. Tabular Functions**

#### **1. Get User Records**

```kql
let get_user_records = (userId:string) {
    MyTable
    | where UserId == userId
};

get_user_records("user123")
```

#### **2. Filter by Severity**

```kql
let filter_by_severity = (level:string) {
    Logs
    | where Severity == level
};

filter_by_severity("Error")
```

#### **3. User Events in Range**

```kql
let user_events_in_range = (userId:string, startTime:datetime, endTime:datetime) {
    Events
    | where UserId == userId
    | where Timestamp between (startTime .. endTime)
};

user_events_in_range("user123", datetime(2024-06-01), datetime(2024-06-07))
```

#### **4. Tabular Function with Calculations**

> **Note:** KQL does **not** support referencing columns dynamically by name inside a function. Column names have to be hardcoded.

```kql
let age_stats = (tbl:(Age:int)) {
    tbl
    | summarize Min=min(Age), Max=max(Age), Avg=avg(Age)
};

age_stats(MyTable)
```

---

### **C. Parameterless Functions (Macros)**

#### **1. Last Week Constant**

```kql
let last_week = ago(7d);
let last_week_logs = {
    Logs
    | where Timestamp >= last_week
};

last_week_logs
```

#### **2. Reusable Filter**

```kql
let error_filter = {
    Logs
    | where Level == "Error"
};

let warning_filter = {
    Logs
    | where Level == "Warning"
};

error_filter
| summarize ErrorCount = count()

warning_filter
| summarize WarningCount = count()
```

#### **3. Simple Macro**

```kql
let active_users = {
    Users
    | where IsActive == true
};

active_users
| count
```

---

### **D. Ad-hoc (Inline) Functions**

#### **1. Double a Number**

```kql
let double = (x:int) { x * 2 };

range n from 1 to 5 step 1
| extend Twice = double(n)
```

---

## **5. Summary Table**

| Function Kind          | Parameter Block      | Example Syntax                                | Use Case                  |
|------------------------|---------------------|-----------------------------------------------|---------------------------|
| Scalar, with params    | Required            | `(a:int, b:int) { a + b }`                   | Calculated field per row  |
| Scalar, no params      | Optional            | `{ now() }` or `() { now() }`                | Constant per row          |
| Tabular, with params   | Required            | `(level:string) { ... }`                      | Filtering by severity     |
| Tabular, no params     | Optional            | `{ ... }` or `() { ... }`                     | Reusable code fragment    |

---

## **6. Key Nuances and Best Practices**

- **No parameter block is needed for parameterless functions.**  
- Always define your functions at the top of the query.
- No recursion or overloading.
- For tabular functions, parameters must be scalars or a single table.
- Use parameterless functions for macros, constants, or reusable query fragments.

---

