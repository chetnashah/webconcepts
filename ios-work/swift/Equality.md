

## Equatable protocol

A type synthesizes conformance to `Equatable` if all of its members are `Equatable`. 
For example, this content struct automatically becomes comparable without the need to implement a custom equation method since all members (UUID and String) are comparable

```swift
struct Content: Equatable {
    let id = UUID()
    let title: String
}
```


## Relation with Comparable protocol

There’s also the Comparable protocol, which builds on Equatable to **refine inequality semantics to creating an ordering of values**

Conforming to Comparable confers a multitude of benefits.

* One such benefit is that arrays containing values of comparable types can call methods like `sorted()`, `min()`, and `max()`
* Having a defined ordering also lets you create ranges

## Relation with Hashable protocol

`Equatable` is also a requirement for conformance to `Hashable`.

## Equality of reference types (classes)

For reference types, the notion of equality becomes conflated with identity.

