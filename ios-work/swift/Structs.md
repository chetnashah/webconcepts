

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

