
Useful guide: https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes#Use-Structures-When-You-Dont-Control-Identity

## Common structs

1. Int
2. String
3. Range
4. Array

## Structs represent value types

## Copy on assignment semantics

Like other value types, structs are copied on assignment

## Explicitly marked mutating instance methods

In order to modify the properties of a value type, 
you have to use the **mutating** keyword in the instance method.

## Initializers

**If you add any explicit initializer, you lose implict memberwise initializer**

### Automatic/implicit member wise initializer

A struct automatically has a memberwise initializer which does not initialize all its properties.

```swift

struct Car {
    var model: String
    var year = "2000"
}

var n = Car(model: "ses", year: "11")
var n2 = Car(model:"adf")
```

## Direct recursive types are not possible with structs

Structs are plain blocks of inline memory (no involvement of pointers).
Due to lack of pointers, it is not possible to have cyclic structures, and a recursive struct will have infinite memory.
```swift
struct Dog {
    var puppy: Dog // ERROR! Value type 'Dog' cannot have a stored property that recursively contains it
}
```

error: **Value type 'Dog' cannot have a stored property that recursively contains it**

Circular chains are also illegal: More complex circular chains, such as a Dog with a Puppy property and a Puppy with a Dog property, are similarly illegal.

## Use structs when you don't control identity

Use structures when you’re modeling data that contains information about an entity with an identity that you don’t control.

e.g. server side records:
In an app that consults a remote database, for example, an instance’s identity may be fully owned by an external entity and communicated by an identifier. If the consistency of an app’s models is stored on a server, you can model records as structures with identifiers

```swift
struct PenPalRecord {
    let myID: Int
    var myNickname: String
    var recommendedPenPalID: Int
}

var myRecord = try JSONDecoder().decode(PenPalRecord.self, from: jsonResponse)
```