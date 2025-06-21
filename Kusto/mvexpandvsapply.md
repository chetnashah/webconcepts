# `mv-expand` vs `mv-apply` in Kusto Query Language (KQL)

Both operators deal with dynamic (array / bag) columns, but they serve different purposes and have very different performance characteristics.

| Point | `mv-expand` | `mv-apply` |
|-------|-------------|------------|
|Basic idea|“Flatten” – each array/bag element becomes its *own* row.|“Iterate + sub-query” – for each row, run a mini-query **inside** the array and return its result(s).|
|Row multiplication|Rows are duplicated (one per element, or Cartesian product if several columns are expanded).|Cardinality is kept under your control; you decide what the sub-query returns (often 1 row per source row).|
|Typical use|Need to join/filter against other tables element-by-element.|Need to calculate something *about* the array (min/max/avg/count, complex filter, top-N…) and keep the row “collapsed”.|
|Syntax|`… | mv-expand <col1>[, <col2>] [with_itemindex=Idx]`|`… | mv-apply <alias1>=<col1>[, …] on ( <sub-query> )`|
|Performance|Cheap to execute, but can explode data volume → heavy network & memory if arrays are large.|Slightly higher CPU per row, but avoids huge intermediate datasets; usually cheaper *overall* for large arrays or when only aggregated result is needed.|
|Returned columns|Original columns + the expanded element (and optional index).|Only columns you project in the sub-query (plus any untouched columns from the source row).|

---

## 1. When to choose `mv-expand`

Use it when you really need one row **per element** because you intend to:

* Join to another table on that element.
* Apply a `where` predicate to keep/discard individual elements.
* Visualise or export the data at element level.

Example – check every IP address in a request against threat intel:

```kql
AppRequests
| where Timestamp > ago(1d)
| mv-expand ip = todynamic(ClientIPAddresses)
| lookup kind=leftouter ThreatIntel in
         (ThreatIntelTable)
         on ip == IP
| project Timestamp, Name, ip, ThreatType
```

Here each IP must be separate so the `lookup` can match.

---

## 2. When to choose `mv-apply`

Use it when you need **some calculation about the array** and do *not* need every element as a standalone row.

Common patterns:

1. Aggregate inside the array (min / max / avg / sum / count).
2. Take the *top 1* or *top N* elements by some metric.
3. Extract a value and keep the result as a single column.
4. Filter the array and repack it.

Example – keep one row per request, but also store the maximum response time of its internal calls:

```kql
Requests
| where Timestamp > ago(24h)
| mv-apply call = todynamic(InternalCalls) on (
        summarize maxDuration = max(todouble(call.durationMs))
    )
| project Timestamp, OperationId, maxDuration
```

The alternative with `mv-expand` would be:

```kql
Requests
| mv-expand call = todynamic(InternalCalls)
| summarize maxDuration = max(todouble(call.durationMs)) by Timestamp, OperationId
```

Both give the same answer, but `mv-apply` never materialises the (potentially huge) expanded set; it sums inside each row.

---

## 3. Mixed scenarios

You can combine both: first reduce each row with `mv-apply`, then expand the condensed information, or vice-versa.

Example – keep only the suspicious URLs inside each array, then expand:

```kql
SecurityEvents
| mv-apply url = UrlArray on (
        where url matches regex @"\.exe$"
        project filteredUrl = url
    )
| mv-expand filteredUrl
| distinct filteredUrl
```

---

## 4. Decision checklist

Ask yourself:

1. “Do I need to treat each element as an independent row?”  
   • Yes → `mv-expand`.  
   • No → go to 2.

2. “Can I calculate what I need *inside* the array?”  
   • Yes → `mv-apply` (fewer rows, less data shuffle).  
   • No (you really must join/filter per element) → `mv-expand`.

3. “Will the expanded set be very large (millions of rows)?”  
   • Yes → try to redesign with `mv-apply` or push filters *before* expanding (use `where array_length(col) > 0`, etc.).  
   • No → `mv-expand` is fine.

4. “Do I need several summarization steps?”  
   • Often easier & cheaper to nest them inside `mv-apply` than to expand, summarise, and re-summarise.

---

## 5. Performance tips

• Always project away unneeded columns *before* `mv-expand` to reduce row size.

• In `mv-apply`, you can restrict the number of elements processed:

```kql
... | mv-apply item = Items limit 100 on ( ...)
```

• For arrays with thousands of elements, `mv-apply` usually wins because the intermediate materialisation of `mv-expand` can blow out ADX’s memory.

---

### TL;DR

• Need element-level joins/filters? → **`mv-expand`**.  
• Need per-row metrics or condensed info? → **`mv-apply`** (safer & cheaper for big arrays).

