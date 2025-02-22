
## Why do we need journaling?

Short answer: **Atomic transactions and rollback/recovery.**
Long answer: SQLite uses a journal file to ensure atomic commits and rollback during transactions. This mechanism safeguards your database against corruption if a transaction (e.g., inserting or updating data) is interrupted (e.g., due to a crash or power failure). The journal mode determines how SQLite logs changes to recover from failures, balancing trade-offs between performance, durability, and concurrency.

## Two main ways of journaling

1. Rollback Journal (i.e. rollback mode) 
   1. DELETE
   2. TRUNCATE
   3. PERSIST
2. Write-ahead LOG (WAL) (i.e WAL mode)

## How journaling works?

1. **Before modifying the database**, SQLite writes the original data (from affected pages) to the journal.
2. **After a successful transaction**, the journal is deleted or invalidated.
3. **If a failure occurs**, SQLite uses the journal to roll back uncommitted changes, restoring consistency.


## Checking journal mode

```
sqlite> pragma journal_mode;
┌──────────────┐
│ journal_mode │
├──────────────┤
│ memory       │
└──────────────┘
```