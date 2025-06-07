
---

# **KQL `summarize` Operator: Explanation & Examples**

## **What does `summarize` do?**

The `summarize` operator **aggregates** data—meaning it groups rows and calculates summary values (like count, sum, average, min, max, etc.) for each group.

- It's similar to `GROUP BY` in SQL.

---

## **General Syntax**

```kql
TableName
| summarize [AggregationFunction1 = ] agg_func1(Column1), 
            [AggregationFunction2 = ] agg_func2(Column2), ...
  by GroupByColumn1, GroupByColumn2, ...
```
- **AggregationFunctionX:** (optional) Name you give the result column.
- **agg_funcX(ColumnX):** Aggregation function applied to a column.
- **by ...:** Columns to group by.

---

## **Common Aggregation Functions**

| Function      | What it does                                 | Example use                      |
|-------------- |---------------------------------------------|----------------------------------|
| `count()`     | Number of rows in each group                 | Total events per day             |
| `sum(Column)` | Sum of values in column                      | Total sales per region           |
| `avg(Column)` | Average value in column                      | Avg. response time per user      |
| `min(Column)` | Minimum value in column                      | Earliest timestamp per session   |
| `max(Column)` | Maximum value in column                      | Latest login per user            |
| `dcount(Column)` | Distinct (unique) count of column values  | Unique users per app             |
| `countif(condition)` | Count rows matching a condition       | Error count per service          |
| `make_list(Column)` | List of values in column (array)       | List of pages per session        |
| `make_set(Column)`  | Unique set of values (array, no dups)  | Unique IPs per user              |
| `arg_min(Column, ByColumn)` | Row with min value in Column   | First event per session          |
| `arg_max(Column, ByColumn)` | Row with max value in Column   | Last event per session           |

---

## **Examples**

### 1. **Count Rows**

Count total rows in the table:

```kql
Events
| summarize TotalEvents = count()
```

---

### 2. **Count by Group**

Count events per event type:

```kql
Events
| summarize EventCount = count() by EventType
```

---

### 3. **Sum**

Sum of sales by region:

```kql
Sales
| summarize TotalSales = sum(Amount) by Region
```

---

### 4. **Average**

Average response time by user:

```kql
Requests
| summarize AvgDuration = avg(Duration) by UserId
```

---

### 5. **Min and Max**

Earliest and latest login per user:

```kql
Logins
| summarize FirstLogin = min(Timestamp), LastLogin = max(Timestamp) by UserId
```

---

### 6. **Distinct Count (`dcount`)**

Unique users per application:

```kql
Sessions
| summarize UniqueUsers = dcount(UserId) by AppName
```

---

### 7. **Count with Condition (`countif`)**

Count errors per service:

```kql
Logs
| summarize ErrorCount = countif(Level == "Error") by ServiceName
```

---

### 8. **List/Set of Values**

List of all visited pages per user:

```kql
PageViews
| summarize PagesVisited = make_list(PageUrl) by UserId
```

List of unique IPs per user:

```kql
Logins
| summarize UniqueIPs = make_set(IPAddress) by UserId
```

---

### 9. **Row with Min or Max Value (`arg_min`, `arg_max`)**

Row with earliest event per session (get full row):

```kql
Events
| summarize arg_min(Timestamp, *) by SessionId
```
- `*` gets all columns from the row with the min timestamp.

Row with highest score per user:

```kql
Scores
| summarize arg_max(Score, *) by UserId
```

---

### 10. **Multiple Aggregations Together**

```kql
Transactions
| summarize Total=sum(Amount), Count=count(), Avg=avg(Amount), Min=min(Amount), Max=max(Amount) by CustomerId
```

---

## **Summary Table: Aggregation Functions**

| Aggregation Function   | Description                         | Example                                  |
|------------------------|-------------------------------------|------------------------------------------|
| `count()`              | Number of rows                      | `count()`                                |
| `sum(Col)`             | Sum of column                       | `sum(Amount)`                            |
| `avg(Col)`             | Average of column                   | `avg(Duration)`                          |
| `min(Col)`             | Minimum value                       | `min(Timestamp)`                         |
| `max(Col)`             | Maximum value                       | `max(Score)`                             |
| `dcount(Col)`          | Count of distinct values            | `dcount(UserId)`                         |
| `countif(condition)`   | Conditional count                   | `countif(Level=="Error")`                |
| `make_list(Col)`       | List (possibly with duplicates)     | `make_list(Page)`                        |
| `make_set(Col)`        | List (no duplicates)                | `make_set(IP)`                           |
| `arg_min(Col, *)`      | Row with minimum value in Col       | `arg_min(Timestamp, *)`                  |
| `arg_max(Col, *)`      | Row with maximum value in Col       | `arg_max(Score, *)`                      |

---

## **Key Points**

- `summarize` is for **aggregation and grouping**.
- You can use **multiple aggregation functions** in one `summarize`.
- The `by` clause determines your grouping columns.
- Use `summarize` wherever you’d use SQL’s `GROUP BY`.

---
