

---

## **Typical Use Cases for `datatable`**

### 1. **Testing and Prototyping Queries**
- Try out query logic without needing real tables.

### 2. **Reference or Lookup Tables**
- Provide small static mappings (e.g., code-to-name, threshold values).

### 3. **Joining with Real Data**
- Enrich real query results with small static sets.

### 4. **Building Test Data for Demos**
- Share sample queries with built-in data.

### 5. **Filtering or Excluding by List**
- Filter data using an inline list of values.

---

## **Syntax**

```kql
datatable(Column1:type, Column2:type, ...)
[
    Value1, Value2, ...
    Value3, Value4, ...
]
```
Each row’s values are comma-separated, and each row is on a new line.

---

## **Examples**

### **1. Simple Inline Table**

```kql
datatable(Name:string, Age:int)
[
    "Alice", 30,
    "Bob", 25,
    "Charlie", 40
]
```

---

### **2. Lookup Table Example**

Suppose you want to map status codes to readable labels:

```kql
let status_lookup = datatable(StatusCode:int, StatusDesc:string)
[
    200, "OK",
    400, "Bad Request",
    404, "Not Found",
    500, "Server Error"
];

status_lookup
```

---

### **3. Join with Real Data**

Imagine you have a `Logs` table with `StatusCode`, and you want friendly descriptions:

```kql
let status_lookup = datatable(StatusCode:int, StatusDesc:string)
[
    200, "OK",
    400, "Bad Request",
    404, "Not Found",
    500, "Server Error"
];

Logs
| join kind=leftouter status_lookup on StatusCode
| project Timestamp, StatusCode, StatusDesc, Message
```

---

### **4. Filtering Using a List**

Suppose you want only certain users:

```kql
let allowed_users = datatable(User:string)
[
    "alice",
    "bob",
    "charlie"
];

Users
| join kind=inner allowed_users on User
```

Or, using `in`:
```kql
datatable(User:string)
[
    "alice",
    "bob",
    "charlie"
]
| join kind=inner (Users) on User
```

---

### **5. Testing Functions or Query Logic**

```kql
let testdata = datatable(x:int, y:int)
[
    1, 2,
    3, 4,
    5, 6
];

testdata
| extend sum = x + y
```

---

### **6. Multi-type Columns**

```kql
datatable(Name:string, Age:int, Registered:datetime)
[
    "Alice", 30, datetime(2024-06-01),
    "Bob", 25, datetime(2024-05-15)
]
```

---

### **7. Using `datatable` with `union`**

Combine sample data with production data:

```kql
let sample = datatable(Name:string, Value:int)
[
    "SampleA", 10,
    "SampleB", 20
];

union sample, RealData
| summarize Total=sum(Value) by Name
```

---

### **8. Reference Table for Thresholds**

```kql
let thresholds = datatable(Level:string, MaxValue:int)
[
    "Low", 100,
    "Medium", 500,
    "High", 1000
];

thresholds
```

---

## **Tips and Gotchas**

- **For small tables only:** `datatable` is designed for small, static datasets.
- **Type safety:** Explicitly define types for each column.
- **Use for demo, lookup, or filtering—not for big data.**
- **Good for ad-hoc reports** or sharing queries with sample data.

---

## **Summary Table**

| Use Case                   | Example Pattern                                          |
|----------------------------|---------------------------------------------------------|
| Testing logic              | `datatable(A:int, B:string)[1, "a", 2, "b"]`            |
| Lookup/mapping             | Join with `datatable(Code:int, Desc:string)[...]`       |
| Filter by list             | `join` with `datatable(Value:string)[...]`              |
| Demo/sample data           | `datatable(...) [...]`                                  |
| Threshold/reference table  | Use in calculations or joins                            |

---

