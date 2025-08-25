
## Useful for assert (Guard) and early exit

Guard usually has a - assignment assertion, with an else condition (for early return if guard fails)

All code after the guard assumes that assignment/assertion was valid.
And it encourages early return pattern for invalid conditions.

For contrast with `if let`, `if let` allows business logic for valid code in braces if assignment passes, whereas `guard condition` allows business logic after the guard.

## Think of it as assert with else clause (which must exit scope)

In Swift, the `guard` statement is used to enforce certain conditions before executing the rest of the code. If the condition is not met, the `guard` statement exits the current scope, typically by using `return`, `break`, `continue`, or `throw`. This makes the code more readable and helps to avoid deeply nested `if` statements.

Here's the basic syntax of a `guard` statement:

```swift
guard condition else {
    // Code to execute if the condition is false
    // Must exit the current scope (e.g., return, break, continue, throw)
}
```

### Examples

#### Using `guard` to Ensure a Condition

```swift
func greet(_ name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    // guard passed, all following code has name well defined!
    print("Hello, \(name)!")
}

greet("Alice")  // Output: Hello, Alice!
greet(nil)      // Output: No name provided
```

In this example, the `guard` statement ensures that `name` is not `nil`. If `name` is `nil`, the function prints a message and exits early.

#### Using `guard` with Optional Binding

```swift
func process(value: Int?) {
    guard let value = value else {
        print("Value is missing")
        return
    }

    print("Processing value: \(value)")
}

process(value: 42)  // Output: Processing value: 42
process(value: nil) // Output: Value is missing
```

Here, the `guard` statement is used to unwrap the optional `value`. If `value` is `nil`, the function prints a message and exits early.

#### Using `guard` with Multiple Conditions

```swift
func divide(_ numerator: Int, by denominator: Int) {
    guard denominator != 0 else {
        print("Cannot divide by zero")
        return
    }

    let result = numerator / denominator
    print("Result: \(result)")
}

divide(10, by: 2)  // Output: Result: 5
divide(10, by: 0)  // Output: Cannot divide by zero
```

In this example, the `guard` statement ensures that `denominator` is not zero. If it is, the function prints a message and exits early.

#### Using `guard` with Early Exit in a Loop

```swift
func findIndex(of value: Int, in array: [Int]) -> Int? {
    for (index, element) in array.enumerated() {
        guard element == value else {
            continue
        }

        return index
    }

    return nil
}

let numbers = [1, 2, 3, 4, 5]
if let index = findIndex(of: 3, in: numbers) {
    print("Index of 3 is \(index)")  // Output: Index of 3 is 2
} else {
    print("Value not found")
}
```

In this example, the `guard` statement is used within a loop to continue to the next iteration if the current element does not match the value being searched for.

### Summary

The `guard` statement is a powerful tool in Swift for enforcing conditions and handling early exits in a clear and concise manner. It helps to improve code readability and reduces the need for deeply nested `if` statements. By using `guard`, you can make your code more expressive and easier to maintain.