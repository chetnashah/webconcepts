
https://www.youtube.com/watch?v=o666k19mZwE

Window functions are similar to Groupby, but instead of collapsing rows, they allow you to perform calculations across a set of rows related to the current row. This is useful for running totals, moving averages, and ranking, as well as contributing ratio to their department/group etc.

## Limitations

- Can only be used in `SELECT` and `ORDER BY` clauses, not in `WHERE` or `GROUP BY` clauses.
- Nested window functions are not allowed.


## `OVER` Clause - windowFn OVER (group definition)
The `OVER` clause is used to define the window of rows for the function.
and `windowFn` returns result for each row in the result set, rather than a single value for the entire group.

**Note** - One can have more than one window function in a single query, i.e since over clause returns a value for each row, each window function is like returning a new column in the result set, e.g. we can have both `TotalSales` and `TotalSalesByDepartment` in the same query which are calculated using different window functions - `TotalSales` has full table as window, and `TotalSalesByDepartment` has department as partiions.

### Group Definition inside `OVER`
1. `PARTITION` CLAUSE: Divides the result set into partitions to which the window function is applied.
2. `ORDER BY` CLAUSE: Orders the rows within each partition. Required for `RANK` and `VALUE` based window functions. also implicitly defines a frame (from the first row to the current row) which will be used by window functions.
3. `FRAME CLAUSE` = `ROWS/RANGE` CLAUSE: Defines the frame of rows to consider for the calculation. Depends on the `ORDER BY` clause to be present and can be specified as `ROWS` or `RANGE`.

## FRAME CLAUSE (depends on `ORDER BY` clause)
The `FRAME` clause specifies the subset of rows (relative to the current row under consideration) within the partition to be used for the aggregation calculation. It can be defined using `ROWS` or `RANGE`, **Without it, SQL uses a default frame (usually, the entire partition).**
**Gotcha** - Even when `ROWS/RANGE` is not specified, the `ORDER BY` clause introduces a implicit frame, which is the current row and all preceding rows.

### Common FRAME options

- **RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW**  
  (default for many functions; includes all previous rows up to and including the current row)
- **ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING**  
  (includes one row before, the current row, and one row after)
- **RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING**  
  (includes current row and all following rows)

---

### Simple Example

Suppose you want a moving sum over 3 rows (previous, current, next):

```sql
SUM(sales) OVER (
  ORDER BY date
  ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
)
```
This means: For each row, sum the sales of the previous day, today, and the next day.

---

### Summary Table

| Clause | What it does                                 |
|--------|----------------------------------------------|
| `ROWS` | Counts rows physically                       |
| `RANGE`| Considers rows with the same ORDER BY values |
| `BETWEEN ... AND ...` | Sets frame start and end       |

---

**In short:**  
The FRAME clause lets you **control exactly which rows are included** in a window function calculation, making your results more precise and flexible.


# Structure build up of Window Functions

## 1. **Basic SELECT**
```sql
SELECT column1, column2
FROM table_name;
```
*This retrieves data from a table.*

---

## 2. **Introducing an Aggregate Function**
```sql
SELECT column1, SUM(column2)
FROM table_name
GROUP BY column1;
```
- **Aggregate functions** (like `SUM`, `AVG`) summarize data.
- **GROUP BY** is needed to aggregate per group.

---

## 3. **Adding a Window Function**
```sql
SELECT column1, column2,
       SUM(column2) OVER ()
FROM table_name;
```
- `SUM(column2) OVER ()` computes the sum **over all rows** (no grouping needed).
- **No GROUP BY** clause! The window function computes alongside each row.

---

## 4. **Partitioning Data with `PARTITION BY`**
```sql
SELECT column1, column2,
       SUM(column2) OVER (PARTITION BY column1)
FROM table_name;
```
- `PARTITION BY` divides data into groups (partitions), like `GROUP BY` but without collapsing rows.
- The result: sum of `column2` per `column1`, shown on every row.

---

## 5. **Ordering Within Partitions**
```sql
SELECT column1, column2,
       SUM(column2) OVER (PARTITION BY column1 ORDER BY column2)
FROM table_name;
```
- `ORDER BY` (inside `OVER`) **orders rows within each partition**.
- Useful for running totals, rankings, etc.

---

## 6. **Framing (ROWS/RANGE Clause)**
```sql
SELECT column1, column2,
       SUM(column2) OVER (
         PARTITION BY column1
         ORDER BY column2
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       )
FROM table_name;
```
- **Framing** specifies which rows are included in the calculation, relative to the current row.
- `UNBOUNDED PRECEDING AND CURRENT ROW`: running total up to the current row.

---

## 7. **Putting It All Together: Full Syntax**
```sql
SELECT
    column1,
    column2,
    SUM(column2) OVER (
        PARTITION BY column1
        ORDER BY column3
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS window_sum
FROM table_name;
```
- **Function**: `SUM(column2)`
- **Window**: `OVER (...)`
- **Partition**: `PARTITION BY column1` (per group)
- **Order**: `ORDER BY column3` (within each group)
- **Frame**: `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` (current row ±1)

---

## 8. **General Window Function Syntax**
```sql
<window_function>(<expression>)
OVER (
    [PARTITION BY <columns>]
    [ORDER BY <columns>]
    [ROWS|RANGE <frame_specification>]
)
```

---

## 9. **Examples of Common Window Functions**
- **ROW_NUMBER()**: Assigns a sequential number.
    ```sql
    ROW_NUMBER() OVER (PARTITION BY column1 ORDER BY column2)
    ```
- **RANK()**: Ranking with gaps for ties.
- **SUM()/AVG()/MIN()/MAX()**: Aggregate over a window.

---

## **Summary Table**

| Part          | Example Syntax                                         | Purpose                        |
|---------------|-------------------------------------------------------|--------------------------------|
| Basic         | `SELECT col FROM t`                                   | Select data                    |
| Aggregate     | `SUM(col) GROUP BY col`                               | Summarize per group            |
| Window Func   | `SUM(col) OVER ()`                                    | Summarize over window          |
| Partition     | `... OVER (PARTITION BY col)`                         | Per group, but keep all rows   |
| Order         | `... OVER (PARTITION BY col ORDER BY other_col)`      | Order within group             |
| Frame         | `... OVER (... ROWS BETWEEN ... AND ...)`             | Specify row range in window    |

---

