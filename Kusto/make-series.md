

## Pre-requisites
Every event needs to have a timestamp, and the data should be structured in a way that allows for grouping by time intervals. The `make-series` operator is typically used with a time column and one or more value columns to aggregate.

## Group by time intervals and aggregate values
The `make-series` operator in Kusto Query Language (KQL) is used to create a time series by grouping data into specified time intervals and aggregating values within those intervals. This operator is particularly useful for analyzing trends over time.
```
// Group by Supplier, fruit and 1d - aggregation is avg(Price).
T | make-series PriceAvg=avg(Price) default=0
on Purchase from datetime(2016-09-10) to datetime(2016-09-13) step 1d by Supplier, Fruit
```

## Visual explaination

![make-series](./images/make-series.png)


## Syntax
```kql  
let min_t = toscalar(demo_make_series1 | summarize min(TimeStamp));
let max_t = toscalar(demo_make_series1 | summarize max(TimeStamp));
demo_make_series1
| make-series num=count() default=0 on TimeStamp from min_t to max_t step 1h by OsVer
| render timechart 
``` 

Use the make-series operator to create a set of three time series, where:
1. `num=count()`: time series of traffic
2. from `min_t to max_t step 1h`: time series is created in **1-hour bins (i.e Aggregation rollup window)** in the time range (oldest and newest timestamps of table records)
3. `default=0`: specify fill method for missing bins to create regular time series. Alternatively use series_fill_const(), series_fill_forward(), series_fill_backward() and series_fill_linear() for changes
4. `by OsVer`: partition by OS - one time series for each OS version in the table.

**The actual time series data structure is a numeric array of the aggregated value per each time bin.** 
We use render timechart for visualization

## make-series vs summarize by bin

# `make-series` vs. `summarize … by bin()` in KQL  
(When, why and how to pick the right one)

| Feature | `summarize … by bin()` | `make-series` |
|---------|-----------------------|---------------|
| Result shape | One row **per time bin** | One row **per logical series** – the time bins are packed into an array (mv-type) |
| Gaps in time | Missing bins are **dropped** (can be re-added with a `range`/`join`) | Missing bins are **auto-filled** with `default= …` |
| Down-stream operators | Works with all relational ops; good for joins, additional grouping, filtering | Designed for *series\_* analytics (`series_decompose`, `series_outliers`, `series_fir`, `series_stats`, …) |
| Visualisation | `render timechart`, PowerBI, Grafana, etc. | Same, but also enables `mv-expand`-free anomaly/forecast visuals |
| Memory footprint | Streams; lightweight even for long time ranges | Allocates an in-memory array (`#bins × #groups`) → can be heavy |
| Cardinality flexibility | Many dimensions and high cardinality fine (returns many small rows) | Best when number of groups is moderate; wide arrays with many groups can explode |
| Typical use-cases | Quick aggregation, KPI tiles, dashboards, further relational logic | Seasonality/forecasting, anomaly detection, window maths, gap-filling lines |

---

## 1. `summarize … by bin()` – the work-horse

```kusto
Transactions
| where Timestamp between (ago(24h) .. now())
| summarize txn = count(), amt = sum(Amount)
          by bin(Timestamp, 1m)           // one row per minute
| order by Timestamp
| render timechart
```

Pros  
* Streams, so it is very fast and low-memory.  
* Perfect if you still need to `join` with other tables or do further `extend`, `where`, `project` steps.  
* Works with many grouping dimensions effortlessly:

```kusto
Transactions
| summarize count() by bin(Timestamp, 1h), Country, Channel
```

Cons  
* If no events fell into a minute, that minute is simply missing.  
  (To re-insert: `range ts from start to end step 1m | join kind=leftouter`.)

---

## 2. `make-series` – specialised time-series constructor

```kusto
Transactions
| where Timestamp between (ago(24h) .. now())
| make-series txn = count() default = 0
            on Timestamp from ago(24h) to now() step 1m
            by Country
```

Result: one row per `Country`; each row has an `txn` **array** whose length equals the number of 1-minute buckets between the chosen `from` and `to`. Holes are already filled with `0`.

Why/when?

1. You intend to call one of the `series_*` family:

```kusto
| extend season = series_decompose(txn)
| extend anomalies = series_outliers(txn)
```

2. You need evenly-spaced data with no gaps (e.g., ML models, FIR filters).

3. You prefer “wide” results: each country = one chart line, without doing a client-side pivot.

Things to watch:

* The product `#groups × #bins` must fit in memory.  
  1000 groups × 86 400 bins (1-day @1 s) = 86 M values ≈ **don’t do that**.

* If you later want individual rows again, add  
  `| mv-expand Timestamp, txn` or `| extend (Timestamp, txn) = series_to_segments(...)`.

---

## 3. Quick decision guide

Use **`summarize … by bin()`** when:

* You just need an aggregated time series for a chart or KPI.  
* You still plan relational operations (filter, join, additional group by).  
* Very long time ranges or many groups – you want streaming scalability.

Use **`make-series`** when:

* You will immediately feed the result into `series_*` analytics.  
* You need automatic gap filling (`default=`).  
* You want one logical series per row (easy to loop in client code).  
* Time range × step is moderate and memory is not a concern.

---

## 4. Side-by-side example

```kusto
let start = ago(7d);
let finish = now();
let step   = 1h;

// Summarize
let s = materialize(
    Transactions
    | where Timestamp between (start .. finish)
    | summarize txn = count() by bin(Timestamp, step), Category
);

// Make-series
let m = materialize(
    Transactions
    | where Timestamp between (start .. finish)
    | make-series txn = count() default=0
                    on Timestamp from start to finish step step
                    by Category
);

print
  summarize_rows = toscalar(s | count),
  make_series_rows = toscalar(m | count)
```

Output might be:

```
summarize_rows   | make_series_rows
-----------------|-----------------
3360             |  12
```

*3360 = 7 days * 24 h * 20 categories* versus *one row per category*.

---

### TL;DR

1. Need plain aggregation → **`summarize … by bin()`**.  
2. Need advanced time-series maths or automatic gap filling → **`make-series`**.  
3. Mind memory: `make-series` is powerful but can bite for very dense or long ranges.