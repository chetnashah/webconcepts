

## Note: EQuality is separate from identity

The identity of a class instance is not part of an instance’s value.
Identity is usually reference/address based (for objects), structs most likely have no identity (apart from address?)

For identity comparision, use `===`, instead of `==` (value equality).

## Signature

```swift
static func == (lhs: Self, rhs: Self) -> Bool
```
Example
```swift
extension StreetAddress: Equatable {
    static func == (lhs: StreetAddress, rhs: StreetAddress) -> Bool {
        return
            lhs.number == rhs.number &&
            lhs.street == rhs.street &&
            lhs.unit == rhs.unit
    }
}
```

## Semantic requirement equivalence relation

Any protocol confirming struct/class should have equivalence relation to make sense
1. reflexive - `A == A`
2. Symmetric - `A == B` implies `B == A`.
3. Transitivity - `A == B` and `B == C` implies `A == C`.
