
https://github.com/apple/swift-evolution/blob/main/proposals/0306-actors.md

## Tasks

You can use tasks to break up your program into isolated, concurrent pieces. Tasks are isolated from each other, which is what makes it safe for them to run at the same time, but sometimes you need to share some information between tasks. 

Actors let you safely share information between concurrent code.

## Actors have synchronized/monitor like access

Unlike classes, **actors allow only one task to access their mutable state at a time**, which makes it safe for code in multiple tasks to interact with the same instance of an actor.

Think of them as **Synchronized classes**

## Declaring an actor 

Actor are reference types declared similar to classes.

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int


    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```


## Property usage is indirect (use await)

You create an instance of an actor using the same initializer syntax as structures and classes. **When you access a property or method of an actor, you use await to mark the potential suspension point.**

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// Prints "25"
```

## method invocation are messages in mailbox and processed async

Such asynchronous function invocations are turned into "messages" requesting that the actor execute the corresponding task when it can safely do so. 

These messages are stored in the actor's "mailbox", and the caller initiating the asynchronous function invocation may be suspended until the actor is able to process the corresponding message in its mailbox

An actor processes the messages in its mailbox one-at-a-time, so that a given actor will never have two concurrently-executing tasks running actor-isolated code.

For example, if we wanted to make a deposit to a given bank account account, we could make a call to a method `deposit(amount:)` on another actor, and that call would become a message placed in the actor's mailbox and the caller would suspend. 
When that actor processes messages, it will eventually process the message corresponding to the deposit, executing that call within the actor's isolation domain when no other code is executing in that actor's isolation domain

e.g
```swift
actor BankAccount {
  let accountNumber: Int
  var balance: Double

  init(accountNumber: Int, initialDeposit: Double) {
    self.accountNumber = accountNumber
    self.balance = initialDeposit
  }

  func deposit(amount: Double) {
    assert(amount >= 0)
    balance = balance + amount
  }

}

extension BankAccount {
  func transfer(amount: Double, to other: BankAccount) async throws {
    assert(amount > 0)

    if amount > balance {
      throw BankError.insufficientFunds
    }

    print("Transferring \(amount) from \(accountNumber) to \(other.accountNumber)")

    // Safe: this operation is the only one that has access to the actor's isolated
    // state right now, and there have not been any suspension points between
    // the place where we checked for sufficient funds and here.
    balance = balance - amount
    
    // Safe: the deposit operation is placed in the `other` actor's mailbox; when
    // that actor retrieves the operation from its mailbox to execute it, the
    // other account's balance will get updated.
    await other.deposit(amount: amount) // cross actor reference needs message passing
  }
}
```

## sync allowed on self (already actor isolated)

Synchronous actor functions can be called synchronously on the actor's self.

## Cross actor property mutations are not permitted

```swift
func checkBalance(account: BankAccount) async {
  print(await account.balance)   // okay
  await account.balance = 1000.0 // error: cross-actor property mutations are not permitted
}
```

## Actors are Sendable by default

Actors protect their mutable state, so actor instances can be freely shared across concurrently-executing code, and the actor itself will internally maintain synchronization. Therefore, every actor type implicitly conforms to the Sendable protocol.

All actor types implicitly confirm to below `Actor` protocol
```swift
protocol Actor : AnyObject, Sendable { }
```