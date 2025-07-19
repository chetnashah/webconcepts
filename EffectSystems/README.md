## 1 “An effect value” in one sentence  
A value of type `IO A` (or `State S A`, `Either E A`, …) is **JUST A RECIPE** that *describes* what to do; nothing in the real world happens until somebody *cooks* the recipe with an **effect-handler / runner**.

---

## 2 The cast of characters

| Effect family | Usual data type | What the value means | Who is the “handler”? |
|---------------|-----------------|----------------------|-----------------------|
| Input / output | `IO a` | A to-do list for the real world | The language runtime (`main`) or an explicit interpreter |
| Mutable state | `State s a` | “Read/Write this variable while computing `a`” | `runState initialValue` |
| Exceptions | `Either e a` | “Either succeed with `a` or fail with `e`” | `catch`, pattern match, `runExcept` |
| Nondeterminism | `List a` or `Logic a` | “Here are many possible `a`s” | A search procedure (`for`, `sum`, back-tracker) |
| Concurrency | `Future a` | “Spawn a thread that eventually yields `a`” | The scheduler; `await` |

Same pattern every time:

1. **Build recipe (pure).**  
2. **Store / pass recipe around (still pure).**  
3. **Hand recipe to a handler ⇒ side-effects really occur.**

---

## 3 Walk through every effect, side-by-side

I’ll use a made-up but readable pseudo-language; only the names change in Haskell, Scala, Rust, Koka, etc.

### 3.1 IO

```
// 1. Build the recipe
val hello : IO<Unit> =
  IO.print("Hello, world!")

// 2. Still nothing printed:
val twice : IO<Unit> =
  hello *> hello        // combine two recipes

// 3. Hand to the runner
runIO(twice)            // "Hello, world!" printed twice
```

Key point: `hello` could be kept in a list, serialised, whatever—no output yet.

---

### 3.2 Mutable state

```
val increment : State<Int, Int> =      // recipe: returns old value
  get()           // read current state
  .flatMap(old =>
     put(old + 1) // write
     .map(_ => old))

val result = runState(init = 7, increment)
// --> (old = 7, finalState = 8)
```

Again, no variable is mutated until `runState` executes the recipe with an *initial* store.

---

### 3.3 Exceptions

```
val risky : Except<String, Int> =
  if coinFlip()
     then throw("boom")
     else pure(42)

handleExcept(risky) { ok -> "Got " + ok }
                   { err -> "Oops: " + err }
```

The recipe merely *describes* a branch that might throw. The handler decides what to do if that branch is taken.

---

### 3.4 Nondeterminism

```
val choose : List<Int> = [1, 2, 3]

val pairs : List<(Int,Int)> =
  choose.flatMap(a =>
    choose.map(b => (a,b)))

sum(pairs)          // handler = ‘sum all results’ → 36
first(pairs)        // handler = ‘take first’      → (1,1)
```

Building `pairs` allocates no pairs yet; the handler (`sum`, `first`, a DFS, BFS, etc.) materialises them.

---

### 3.5 Concurrency / async

```
val download : Future<Bytes> =
  asyncFetch("https://example.com")

// work is scheduled only when the runtime starts the task pool
await(download)   // handler = scheduler + await
```

Some libraries *eagerly* start the task, but the **effect of blocking** or **reading the result** still happens only at `await`.

---

## 4 What exactly is the “effect handler”?

1. A **function** that **unwraps** the data constructor and executes the protocol.
2. It usually requires *authority*:  
   • `runIO` is allowed to touch the outside world.  
   • `runState` owns a piece of mutable memory.  
   • A search handler owns backtracking machinery.

Mathematically, a handler has type

```
handle : EffectValue e a → (…capabilities…) → Result
```

---

## 5 Why separate recipe from execution?

* Safe laziness: you can delay pure recipes without silently firing guns.  
* Composition: higher-order functions can glue recipes while staying pure.  
* Testing: feed a fake handler (mock IO, in-memory state).  
* Optimisation: move, merge, or discard recipes whose effect row is empty.

---

## 6 Practical “feel” in three mainstream languages

1. Haskell  
   *Build*: `hello = putStrLn "hi"` (pure)  
   *Run*: `main = hello` (runtime is the handler).

2. JavaScript with Promises  
   *Build*: `const p = fetch(url)` (network starts, but **no value yet**)  
   *Run / observe*: `p.then(show)`; the effect of *handling the value* flows after `then`.

3. Rust + Tokio  
   *Build*: `let fut = async { println!("hi") };` (value of type `impl Future`)  
   *Run*: `tokio::runtime::run(fut)`.

---

## 7 Common misunderstandings

1. “Creating `IO` does IO.” — No, it *describes* IO.  
2. “`Future` is already running.” — Maybe, but its **observable effects** (await, callbacks) are still under the handler’s control.  
3. “Pure code can’t mention `IO`.” — It can *contain* `IO` values, it just can’t *execute* them.

---

## 8 Mini-exercise to cement the idea

Fill in the blanks so **nothing is printed**:

```haskell
silentTwice :: IO ()
silentTwice = _____

main :: IO ()
main = pure ()   -- still silent
```

One answer:

```haskell
silentTwice = let x = putStrLn "hello" in pure ()
```

`x` is an IO recipe never handed to the runtime.

---

### TL;DR

Every effect type is “a recipe in a box.”  
Building or passing the box around is safe and pure.  
Opening the box—the job of an effect handler—*causes* the side effects.