## Deep-dive: SQLite **multi-thread** mode  
(key: you, not SQLite, must serialize every individual **connection**)

---

### 1. What “multi-thread” really flips inside SQLite

Build–time flag  
```
SQLITE_THREADSAFE=1
```

Run-time option  
```c
sqlite3_config(SQLITE_CONFIG_MULTITHREAD);
```

Effect on SQLite sources:

```
api/prepare.c, vdbe/*, btree.c …        connection-local
 └── uses SQLITE_MUTEX_OWNER(db->mutex)  ← compiled **out**

main.c, os_unix.c, mem.c, pcache1.c …   process-global
 └── still wrapped in sqlite3_mutex_…()  ← kept
```

1. A `sqlite3` handle contains a pointer `sqlite3_mutex *mutex`.  
   * In **serialized** builds this is a real recursive mutex.  
   * In **multi-thread** it is literally `NULL`, so every  
     `sqlite3_mutex_enter(db->mutex)` compiles to *no code*.

2. Global objects (the malloc subsystem, temp-file list, PRNG, look-aside slot
   freelist, etc.) keep their mutexes even in multi-thread mode because they
   can be touched by *any* connection.

Bottom line:  
• Two different connections may run in parallel (they only collide on those
  few global mutexes).  
• Inside one connection nothing guards `db->` fields any more – that’s your
  job.

---

### 2. Anatomy of a connection (simplified)

```
sqlite3
 ├─ mutex            (NULL in multi-thread)
 ├─ db->aDb[i].pBt   B-tree of attached db i
 │    └─ Pager       (owns file descriptors & file-level locks)
 ├─ pSchema          Parsed table/index metadata
 ├─ lookaside        Small-alloc cache
 ├─ Vdbe list        Prepared statements
 └─ txn state        Deferred/Immediate/Exclusive
```

Any API call that touches two of those sub-objects must be serialized or you
get *use-after-free*, corrupt queues, double finalise, etc.

---

### 3. Correct ways to use multi-thread mode

#### 3.1 One connection per worker thread (most common)

```
Thread A ── db_A
Thread B ── db_B
Thread C ── db_C
```

• No cross-thread objects ⇒ **no mutex required in your code**.  
• Still safe to share the *same* database file; the pager layer arbitrates.

Pros  
  – zero application-side locking overhead  
  – true parallel read/write mix if the database is in WAL mode

Cons  
  – Each connection holds its own page cache & schema (≈ 28–48 kB idle,
    grows with page cache).  
  – All write connections fight for the single WAL writer slot.

#### 3.2 Connection pool

```
Pool[4]  (mutex/condvar protects this table)
  idx  busy   sqlite3*
   0    0   ──► db0
   1    0   ──► db1
   2    1   ──► db2  ← checked-out by Thread T
   3    0   ──► db3
```

Typical flow:

```c
sqlite3 *getConnection(void) {
    std::unique_lock<std::mutex> lk(poolMx);
    poolCv.wait(lk, []{ return free_slot_exists(); });
    mark_slot_busy(idx);
    return pool[idx].db;
}

void releaseConnection(sqlite3* db) {
    std::lock_guard<std::mutex> lk(poolMx);
    mark_slot_free(idx_for(db));
    poolCv.notify_one();
}
```

Rules you **still** have to respect:

* While a thread owns `db`, **no other thread uses it**.  
* Prepared statements belong to that connection → never cache them outside.

Pros  
  – Keeps connection count bounded.  
  – Lets you use transactions larger than a single request.

Cons  
  – A stalled thread inside SQLite blocks other borrowers of that connection.  
  – More locking code to get right (double-checkout, forgotten release,
    destruction order).

#### 3.3 External mutex around a shared connection  
(Do this only if you *really* need one connection, e.g. to reuse a TEMP
table.)

```c
std::mutex dbMx;
void doWork(sqlite3 *db) {
    std::lock_guard<std::mutex> lock(dbMx);
    sqlite3_stmt *st = ...
    while(sqlite3_step(st)==SQLITE_ROW) { ... }
}
```

Downside: you have reinvented **serialized** mode but slower; threads queue on
your mutex *plus* still wait for disk IO.

---

### 4. What **not** to do

1. Two threads calling `sqlite3_step()` concurrently on the same `sqlite3_stmt`
   (or even two different statements of the same `db`).  
   ➜ Race → internal vectors modified without a lock.

2. Creating a connection in one thread, using it in another **while the first
   closes it**.  
   ➜ Likely use-after-free.

3. Sharing a write transaction: Thread A `BEGIN IMMEDIATE`, Thread B tries
   `INSERT` on same connection.  
   ➜ Undefined; B could see `SQLITE_MISUSE`.

4. Copying `sqlite3_value*` or `sqlite3_blob*` between threads after the
   originating connection stepped/finalised.  
   ➜ Dangling pointers.

---

### 5. File-level concurrency is still the limiter

Irrespective of your in-process design:

* Readers: unlimited and concurrent (SHARED lock).  
* Writers: **exactly one connection across all processes** can hold `RESERVED`
  → `EXCLUSIVE`. WAL helps by moving writer contention off the hot path, but it
  is still single-writer.

Therefore the sweet spot with multi-thread mode + WAL is:
• Many read-only threads each with its own connection.  
• A small set (often one) of writer threads pooling one or two connections.

---

### 6. Gotchas & diagnostics

* `PRAGMA compile_options;` returns `ENABLE_THREADSAFE=1 THREADSAFE=1` but
  you **still** might be in single-thread or serialized at run-time. Query it:

  ```c
  int mode;
  sqlite3_db_config(0, SQLITE_DBCONFIG_GETTHREADSAFE, &mode, 0);
  // 1 = single, 2 = multi, 3 = serialized
  ```

* `SQLITE_MISUSE` is your clue you broke a rule. Build with
  `-DSQLITE_DEBUG` and set the env var `SQLITE_FORCE_FAILURE=1` to get
  assert-heavy binaries.

* Watch for schema-cache reloading. Attaching/detaching databases forces a
  schema reset on **all** sibling connections → suddenly large mutex waits on
  the global schema mutex even in multi-thread mode.

---

### 7. Design recipe

1. Pick **multi-thread** if your workload is parallel and the language lets
   you hold distinct connection objects effortlessly.  
2. Enforce at most one thread per connection using one of:
   • natural “owning thread” pattern,  
   • a pool with a mutex/condvar,  
   • lock-free ring passing exclusive ownership.  
3. Never share prepared statements or blobs between threads.  
4. Turn on WAL and proper `busy_timeout` for smoother writer / reader
   coexistence.  
5. If any of these rules feels painful → switch to **serialized** mode; the
   extra 10 ns of mutex is cheaper than debugging races.

---

**Remember:** In multi-thread mode SQLite trusts you; one missed mutex and your
process has undefined behaviour. Keep ownership simple, keep scopes tight, and
you get near-serialized safety with much better parallelism.