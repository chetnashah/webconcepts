## First principles: actor isolation & cross-actor calls

## No async/await needed on the same actor
Example:
```swift
actor Counter {
  private var value = 0

  // No async here
  func increment() {
    value += 1
  }

  func addTwo() {
    increment() // no async/await needed on the same actor interaction
    increment()
  }
}

// ── Somewhere outside the actor ─────────────────────────────
let counter = Counter()

func bump() async {
  await counter.increment()   // must await – cross-actor hop
  await counter.addTwo()
}
```

## Example contrasting same actor and cross-actor method interaction

```swift
import Foundation

// ─────────── An actor that owns some mutable state ───────────
actor BankAccount {
  private var balance: Double = 0
  
  /// Synchronous instance method — *actor-isolated to `self`*.
  func deposit(_ amount: Double) {
    balance += amount
  }
  
  /// Another synchronous method that *calls `deposit(_:)`*.
  /// Because the caller is already running on the **same** actor
  /// executor, no `await` is necessary.
  func paySalary() {
    deposit(2_000)      // ✅ same-actor call → no await
  }
  
  /// Read-only accessor so we can inspect the state from the outside.
  func getBalance() -> Double { balance }
}

// ─────────── Scenario 1: same-actor call ───────────
extension BankAccount {
  /// Still runs on the **BankAccount** actor.
  func endOfMonth() {
    paySalary()         // ✅ same-actor ⇒ no await
  }
}

// ─────────── Scenario 2: cross-actor call ───────────
let alice = BankAccount()
let bob   = BankAccount()

func transfer(_ amount: Double,
              from source: BankAccount,
              to destination: BankAccount) async {
  // hop to *source* actor first
  await source.deposit(-amount)        // ✅ must await (cross-actor)
  
  // hop to *destination* actor; this is a *different* executor
  await destination.deposit(amount)    // ✅ must await
}

// ─────────── Driving the example ───────────
Task {
  await alice.deposit(1_000)           // outside → need await
  await transfer(300, from: alice, to: bob)
  
  print("Alice:", await alice.getBalance())   // 700
  print("Bob:  ", await bob.getBalance())     // 300
}
```

### Each actor instance owns its mutable state.
The only code allowed to touch that state must run on that actor’s executor.

### Instance methods are isolated to the actor by default.
From outside the actor you cannot call them synchronously; Swift automatically treats such a call as potentially suspending.

### The compiler does a purely static check.
It cannot prove that the playlist parameter is the same object as self, so it assumes it might be a different actor.
(If at runtime the two references are actually the same, that is fine — the await will just stay on the same executor, but the compiler still requires it.)

### Cross-actor hop ⇒ await.
The hop is always asynchronous even if the callee’s declaration is not marked async; Swift inserts the wrapper that turns the synchronous implementation into an async thunk.

