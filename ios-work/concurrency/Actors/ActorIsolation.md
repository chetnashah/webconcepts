### What “actor-isolated” really means  

A declaration is *actor-isolated* when Swift guarantees that it will be executed
on a particular actor’s executor and therefore has exclusive, race-free access
to that actor’s mutable state.

*If you want to mutate or even read data that belongs to an actor,
you must be running on that actor’s executor; actor isolation is the rule that
enforces this.*

---

## How to recognise an actor-isolated method

1. **Instance member of an `actor` type**  
   • If the declaration is an *instance* method/ property/ subscript of an
     `actor` and it is **not** explicitly marked `nonisolated` **and**
     **not** `static`/`class`, it is *automatically* isolated to `self`
     (the current actor instance).

2. **Member annotated with a global actor**  
   ```swift
   @MainActor               // ≈ isolated to the global MainActor
   func reloadUI() { … }
   ```
   The `@SomeGlobalActor` attribute isolates the function to *that*
   global actor even if it lives in a struct, class, enum or top level.

3. **Everything else is *not* actor-isolated**  
   • `static` / `class` members of an actor  
   • Declarations marked `nonisolated` or `nonisolated(unsafe)`  
   • Anything in a non-actor type that lacks a global-actor annotation.

---

## Quick reference table

| Location / annotation                          | Isolation result                     |
| ---------------------------------------------- | ------------------------------------ |
| `actor Play { func f() {…} }`                  | isolated to the *instance* (`self`)  |
| `actor Play { static func s() {…} }`           | **not** isolated (free to call)      |
| `actor Play { nonisolated func g() {…} }`      | **not** isolated                     |
| `@MainActor func h() {…}`                      | isolated to the `MainActor`          |
| `struct Foo { func bar() {…} }`                | **not** isolated (unless annotated)  |

---

## How do I “see” it in Xcode?

* Quick Help (⌥-click) shows a little note, e.g.  
  `actor-isolated to instance of MyActor`.
* The compiler forces you to write `await` when you
  try to call it from outside the owning actor.

---

## Why does Swift isolate by default inside an `actor`?

An actor is defined as “a reference type whose *mutable* state is protected
from data races by the Swift concurrency runtime.”  
Auto-isolating its instance members is what provides that protection;
you only opt *out* with `nonisolated` when you are absolutely sure the
member does not touch actor-owned state.

---

### Key take-aways

1. “Actor-isolated” is decided by the declaration’s context and annotations,
   not by an `async` keyword.
2. *Instance* members of an `actor` are isolated to **that instance** unless
   you say otherwise.
3. Outside callers must `await` (asynchronous hop) to use an
   actor-isolated member.