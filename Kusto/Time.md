# KQL Date & Time Basics   *(the beginner-friendly version)*

Kusto has only **two** native temporal data types:

| Type | What it represents | Typical column names |
|------|-------------------|----------------------|
| `datetime` | A point on the UTC timeline (a “timestamp”) | `Timestamp`, `TimeGenerated`, `CreatedOn` |
| `timespan` | A length / duration (2 min 30 sec, –4 days, …) | `Duration`, `Latency`, any ad-hoc value you compute |

Everything you do in time-related queries is some combination of:

1. Creating a value (`now()`, `ago(5m)`, `datetime("2025-06-18")`, `5s` …)  
2. Converting it (`todatetime()`, `totimespan()`)  
3. Extracting parts (`dayofweek()`, `datetime_part("Hour", dt)`)  
4. Rounding / bucketing (`bin()`, `startofday()`)  
5. Arithmetic (`+`, `-`, `/`) and comparisons (`>`, `between`)  
6. Aggregating (`count() by bin(Time, 1h)`, `avg(Duration)`)  

Below you’ll find a lightweight crash course that covers these six areas.

---

## 1. Creating timestamps (`datetime`)

```kusto
print
  rightNow     = now(),                      // current UTC time
  fiveMinAgo   = ago(5m),                    // 5 minutes ago
  specificDate = datetime(2025-06-18),       // midnight on that date
  withClock    = datetime(2025-06-18 14:35)  // full Y-M-D h:m
```

`ago()` is simply a shorthand for “`now() – <timespan>`”.

---

## 2. Creating durations (`timespan`)

```kusto
print
  tenSec   = 10s,
  twoHours = 2h,
  oneDay   = 1d,
  exact    = timespan("1.02:03:04.500")   // 1 d 2 h 3 m 4.5 s
```

The letter suffixes are:

* `ms`  → milliseconds  
* `s`   → seconds  
* `m`   → minutes  
* `h`   → hours  
* `d`   → days  
* `w`   → weeks (7 days)

---

## 3. Converting data that comes as text or numbers

```kusto
Events
| extend
    dt = todatetime(timestampString),        // ISO 8601 text
    dur = totimespan(durationInMs * 1ms)     // integer → ms → timespan
```

---

## 4. Basic arithmetic & comparison

```kusto
let start = ago(1h);
let end   = now();

print
  span       = end - start,          // → timespan (1 h)
  earlier    = start - 30m,          // datetime – timespan → datetime
  doubled    = 90s * 2,              // timespan * number
  isLong     = 5m > 2m               // true
```

Note: dividing two `timespan` values returns a plain number:

```kusto
print ratio = (3m) / (45s)   // 4
```

---

## 5. Filtering with dates

```kusto
Logs
| where TimeGenerated between (ago(7d) .. now())   // last 7 days
| where TimeGenerated > datetime(2025-06-01)        // after 1-Jun-2025
```

---

## 6. Extracting calendar parts

```kusto
Orders
| extend
    dow  = dayofweek(TimeGenerated),           // 0 = Sun … 6 = Sat
    hour = datetime_part("Hour", TimeGenerated)
```

Common helpers:

* `dayofyear()`, `weekofyear()`
* `startofhour()`, `startofday()`, `startofweek()` – round *down*  
* `endofmonth()` – round *up*

---

## 7. Putting events into buckets

### 7.1 Fixed step with `bin()`

```kusto
Telemetry
| summarize hits = count() 
           by bin(TimeGenerated, 5m)   // every 5 minutes
| order by TimeGenerated
```

Missed buckets are **absent** – you get only rows that had events.

### 7.2 Calendar-aligned start functions

```kusto
| summarize sales = sum(Amount) by startofday(TimeGenerated)
```

Neat when you want exact days, weeks or months without thinking about daylight-saving shifts.

---

## 8. Counting or charting by time

```kusto
PageViews
| where TimeGenerated > ago(24h)
| summarize views = count() 
           by bin(TimeGenerated, 1h)
| render timechart
```

`render timechart` works with any two columns: X = datetime, Y = numeric.

---

## 9. Measuring how long something took

If your table has `StartTime` and `EndTime`:

```kusto
| extend Duration = EndTime - StartTime          // → timespan
| summarize avgDur = avg(Duration)
```

If you only have one timestamp per row and want gaps between rows:

```kusto
| order by TimeGenerated
| extend Gap = TimeGenerated - prev(TimeGenerated)
```

---

## 10. Converting a duration into numbers or text

```kusto
| extend
    seconds = todouble(Duration / 1s),          // 14.35
    niceTxt = format_timespan(Duration, "hh:mm:ss")
```

---

## 11. Example “cookbook” snippets

1. **Average response time per hour last 2 days**

   ```kusto
   Requests
   | where TimeGenerated > ago(2d)
   | summarize avg(todatetime(DurationMs * 1ms))   // just to illustrate conversion
             by bin(TimeGenerated, 1h)
   ```

2. **Latency histogram in 50 ms buckets**

   ```kusto
   Requests
   | extend Latency = totimespan(DurationMs * 1ms)
   | summarize hits = count() by bin(Latency, 50ms)
   | order by Latency
   ```

3. **Events per day, Monday = start of week**

   ```kusto
   | summarize cnt = count() by startofweek(TimeGenerated, 1)
   ```

---

## 12. Quick cheat-sheet (copy & keep)

```kusto
now()                            // current time
ago(30m)                         // 30 minutes ago
1h + 30m                         // 1.5 hours as timespan
dt + 2d                          // datetime## 12. Quick cheat-sheet (copy & keep)

```kusto
now()                                // current time
ago(30m)                             // 30 minutes ago
1h + 30m                             // 1.5 hours as timespan
dt + 2d                              // datetime plus two days
dt1 - dt2                            // timespan difference
todatetime("2025-06-18T09:30Z")      // string → datetime
totimespan(1500 * 1ms)               // number (ms) → timespan
bin(Time, 1h)                        // 1-hour bucket
startofmonth(Time)                   // first second of that month
datetime_part("Hour", Time)          // 0-23
format_timespan(ts, "hh:mm:ss")      // 02:15:07
```

---

### Key takeaways

1. **Two types only**: `datetime` (moments) and `timespan` (lengths).  
2. Learn six core helpers: `now()`, `ago()`, `bin()`, `startof*()`, `todatetime()`, `totimespan()`.  
3. Datetime ± Timespan = Datetime, Datetime – Datetime = Timespan.  
4. Bucket with `bin()` for charts; use `startof*()` for calendar-true groupings.  
5. Everything in Kusto is UTC, so you rarely worry about time zones.  

## Working with string dates

## Converting the plain **`"YYYY-MM-DD"`** string to a proper `datetime`

A value like `2025-06-18` is just text.  
Turn it into a first-class `datetime` with **`todatetime()`**.

```kusto
// Demo table: id + the raw date as string
let Raw =
    datatable (Id:int, DateStr:string)
    [
        1, "2025-06-18",
        2, "2025-06-19",
        3, "2025-06-20"
    ];

Raw
| extend Date = todatetime(DateStr)      // ← the conversion
```

Outcome:

```
Id | DateStr     | Date
---|-------------|---------------------
1  | 2025-06-18  | 2025-06-18 00:00:00
```

Notes  
1. `todatetime()` returns **midnight UTC** of that calendar day because no time-of-day was supplied.  
2. If a row contains an invalid string the result is `null`. You can test with `isnull(Date)`.
