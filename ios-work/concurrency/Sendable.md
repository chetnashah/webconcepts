
## Sendable protocol

A type whose values can safely be passed across concurrency domains by copying.

All of the following can be marked as sendable:

1. Value types
2. Reference types with no mutable storage
3. Reference types that internally manage access to their state
4. Functions and closures (by marking them with `@Sendable`)

### Sendable classes

To satisfy the requirements of the Sendable protocol, a class must:

1. Be marked final
2. Contain only stored properties that are immutable and sendable
3. Have no superclass or have NSObject as the superclass

### Sendable funcs and closures

```swift
let sendableClosure = { @Sendable (number: Int) -> String in
    if number > 12 {
        return "More than a dozen."
    } else {
        return "Less than a dozen"
    }
}
```