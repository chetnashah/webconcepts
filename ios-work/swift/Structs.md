
Useful guide: https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes#Use-Structures-When-You-Dont-Control-Identity



## Common structs

1. Int
2. String
3. Range
4. Array

## Structs represent value types

In Swift, the keywords `func` and `mutating func` are used to define functions, but they have different contexts and use cases.

### `func`
The `func` keyword is used to define a regular function. Functions defined with `func` can be part of classes, structures, or enumerations. They can also be global functions. Regular functions do not modify the instance of the structure or enumeration they belong to.

```swift
struct Point {
    var x: Int
    var y: Int

    func printPoint() {
        print("Point(\(x), \(y))")
    }
}

let point = Point(x: 10, y: 20)
point.printPoint()  // Output: Point(10, 20)
```

### `mutating func`
The `mutating func` keyword is used to define a function that can modify the properties of a value type (struct or enum) instance. Value types are immutable by default, so if a function needs to modify the instance, it must be marked with the `mutating` keyword.

```swift
struct Point {
    var x: Int
    var y: Int

    mutating func moveBy(xDelta: Int, yDelta: Int) {
        x += xDelta
        y += yDelta
    }
}

var point = Point(x: 10, y: 20)
point.moveBy(xDelta: 5, yDelta: 5)
print("Point(\(point.x), \(point.y))")  // Output: Point(15, 25)
```

### Key Differences

1. **Modification of Value Types**:
   - `func`: Cannot modify the properties of a value type instance.
   - `mutating func`: Can modify the properties of a value type instance.

2. **Use Case**:
   - `func`: Used for functions that do not need to change the state of the instance.
   - `mutating func`: Used for functions that need to change the state of the instance.

3. **Applicability**:
   - `func`: Can be used in classes, structures, enumerations, and globally.
   - `mutating func`: Can only be used in structures and enumerations.

### Example in Classes
In classes, you do not need to use `mutating` because classes are reference types and their instances are mutable by default.

```swift
class Point {
    var x: Int
    var y: Int

    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }

    func moveBy(xDelta: Int, yDelta: Int) {
        x += xDelta
        y += yDelta
    }
}

let point = Point(x: 10, y: 20)
point.moveBy(xDelta: 5, yDelta: 5)
print("Point(\(point.x), \(point.y))")  // Output: Point(15, 25)
```

In summary, use `func` for functions that do not modify the instance and `mutating func` for functions that need to modify the instance of a value type (struct or enum).

## Structs have Copy on assignment semantics

Like other value types, structs are copied on assignment

## Structs need Explicitly marked mutating instance methods

In order to modify the properties of a value type, 
you have to use the **mutating** keyword in the instance method. This same restriction is not for class based types, only enum/struct which are value types, as they are considered immutable.

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

## Initializers explained for structs

I'll expand on each point about struct initializers:

1. **Memberwise Initializer**
```swift
struct Book {
    let title: String
    var pages: Int
}
// Free memberwise initializer
let book = Book(title: "Swift", pages: 300)
```

2. **Custom Initializers & Losing Memberwise**
```swift
struct Book {
    let title: String
    var pages: Int
    
    // Adding this custom initializer removes memberwise
    init(title: String) {
        self.title = title
        self.pages = 0
    }
}
// Now this won't work:
// let book = Book(title: "Swift", pages: 300)
```

3. **Preserving Memberwise Using Extension**
```swift
struct Book {
    let title: String
    var pages: Int
}

extension Book {
    // Custom initializers in extension preserve memberwise
    init(title: String) {
        self.title = title
        self.pages = 0
    }
}
// Both work now:
let book1 = Book(title: "Swift", pages: 300) // memberwise
let book2 = Book(title: "Swift") // custom
```

4. **Failable Initializers**
```swift
struct Book {
    let title: String
    var pages: Int
    
    init?(title: String, pages: Int) {
        guard pages > 0 else { return nil }
        self.title = title
        self.pages = pages
    }
}

let book = Book(title: "Swift", pages: -1) // returns nil
```

5. **Delegating Initializers**
```swift
struct Book {
    let title: String
    var pages: Int
    
    init(title: String, pages: Int) {
        self.title = title
        self.pages = pages
    }
    
    // Delegates to main initializer
    init(title: String) {
        self.init(title: title, pages: 0)
    }
}
```
