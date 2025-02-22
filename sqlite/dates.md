
## Three main ways to store dates

1. (Recommended) as TEXT in ISO 8601 format - decreasing units 
2. (Not Recommended) as JDN (Julian Day number) - 
3. (Somtimes) As unix timestamp millis 1st jan 1970

### COmmon operations/functions

```
sqlite> select date(); // returns as Text ISO 8601
┌────────────┐
│   date()   │
├────────────┤
│ 2025-02-22 │
└────────────┘
sqlite> select datetime();
┌─────────────────────┐
│     datetime()      │
├─────────────────────┤
│ 2025-02-22 07:11:45 │
└─────────────────────┘
sqlite> select unixepoch();
┌─────────────┐
│ unixepoch() │
├─────────────┤
│ 1740208471  │
└─────────────┘
sqlite> select timediff(date(), date());
┌──────────────────────────┐
│ timediff(date(), date()) │
├──────────────────────────┤
│ +0000-00-00 00:00:00.000 │
└──────────────────────────┘
// useful to find age or time elapsed
sqlite> select timediff('now', '1991-05-03');
┌───────────────────────────────┐
│ timediff('now', '1991-05-03') │
├───────────────────────────────┤
│ +0033-09-19 07:20:49.952      │ // 33 years!
└───────────────────────────────┘

// conversion from unix epoch to ISO
sqlite> select datetime(1740208471, 'unixepoch');
┌───────────────────────────────────┐
│ datetime(1740208471, 'unixepoch') │
├───────────────────────────────────┤
│ 2025-02-22 07:14:31               │
└───────────────────────────────────┘

// chaining of modifiers
// 1. modifier - start of month -> feb
// 2. modifier - +1 month -> march
sqlite> select datetime('now', 'start of month', '+1 month');
┌───────────────────────────────────────────────┐
│ datetime('now', 'start of month', '+1 month') │
├───────────────────────────────────────────────┤
│ 2025-03-01 00:00:00                           │
└───────────────────────────────────────────────┘



```

### Stored as TEXT ISO 8601 format

ISO 8601 is a standardized date/time format that goes from largest to smallest units (year -> month -> day -> hour -> minute -> second).

Basic formats and examples:

#### Dates:
YYYY-MM-DD (2024-02-22)
YYYYMMDD (20240222)

#### Times:
hh:mm:ss (14:30:15)
hhmmss (143015)
With milliseconds: hh:mm:ss.sss (14:30:15.123)

#### Combined date and time:
YYYY-MM-DDThh:mm:ss (2024-02-22T14:30:15)
YYYYMMDDThhmmss (20240222T143015)

#### Time zones:
UTC/Zulu: YYYY-MM-DDThh:mm:ssZ (2024-02-22T14:30:15Z)
With offset: YYYY-MM-DDThh:mm:ss±hh:mm (2024-02-22T14:30:15+05:30)

#### Weeks:
YYYY-Www (2024-W08)
YYYY-Www-D (2024-W08-4)
