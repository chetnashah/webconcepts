
### Variables

`var` for mutable variables
`let` for constant variables

### Type Notation
The type notation is pascal.

e.g. 
```swift
var person: String
```

### Value types

A value type is a type whose value is copied when it’s assigned to a variable or constant, or when it’s passed to a function. i.e. `copy by value on assignment`

You’ve actually been using value types extensively throughout the previous chapters. In fact, all of the basic types in `Swift—integers`, `floating-point numbers`, `Booleans`, `strings`, `arrays` and `dictionaries`—are value types, and are implemented as structures behind the scenes.

All `structures` and `enumerations` are value types in Swift

```swift
struct Resolution {
    var width = 0;
    var height = 0;
}

let hd = Resolution(width: 1920, height: 1080)
var cinema = hd // different instances
```

### Reference Types

Unlike value types, reference types are not copied when they are assigned to a variable or constant, or when they are passed to a function. Rather than a copy, a reference to the same existing instance is used.

`Class` are reference types. which means assignment of class instances are done by reference.


### Identity and equality

Swift provides two identity operators:

1. Identical to `(===)`
2. Not identical to `(!==)`
3. Equal to `(==)`
4. Not Equal to `(!=)`

Note that `identical to` (represented by three equals signs, or `===`) doesn’t mean the same thing as equal to (represented by two equals signs, or `==`). Identical to means that two constants or variables of class type refer to exactly the same class instance. `Equal to` means that two instances are considered equal or equivalent in value, for some appropriate meaning of equal, as defined by the type’s designer.

By default structs are not equatable!
By default, custom classes and structures don’t have an implementation of the equivalence operators, known as the equal to operator `(==)` and not equal to operator `(!=)`.

You provide an implementation of the == operator in the same way as you implement other infix operators:
```swift
extension Vector2D: Equatable {
    static func == (left: Vector2D, right: Vector2D) -> Bool {
        return (left.x == right.x) && (left.y == right.y)
    }
}

let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
// Prints "These two vectors are equivalent."
```

### String interpolation

Use double quotes and interpolated part uses `\(expr)`
e.g.
```swift
"The name of the movie is \(movie.name)"
```

### Normal functions

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
```

#### Argument labels and parameter names

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body,
    // parameterName refers to the argument value for that parameter
}

// parameter usage in fn body is as usual
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)! Glad u could visit via \(hometown)"
}

// using argumentlabel at the place of argument
print(greet(person: "John", from: "Cupertino"))
```

**Omitting argument labels**:
```swift
func someFunction(_ firstParamName: Int, secondParamName: Int) {

}

someFunction(1, secondParamName: 2)
```

Calling without argument labels will crash if `_` is not specified
e.g.
```swift
func someFunc(parm: String) {
    print(parm)
}

someFunc("Hi") // This will crash
someFunc(parm: "Hi")// this works
```

**Default Param Values**:

```swift
func someFunction(normalParam: Int, paramWithDefault: Int = 23) {

}

someFunction(normalParam: 3, paramWIthDefault: 4)
someFunction(normalParam: 2); // default value used
```


### Closures

Closures have following general form:
```swift
{ (parameters) -> return type in
    statements
}

// e.g.
reversedNames = names.sorted(by: {(s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

`return` keyword can be omitted for single expr functions/expressions
and types can also be inferred.

```swift
reversedNames = names.sorted(by: {s1, s2 in s1 > s2})
```

#### Trailing closures

if you need to pass closure as last argument of a function, there is an alternate way to do
it. 

```swift
func someFunThatTakesClosure(closure: () -> Void) {
    // implementation
}

// normal calling
someFunctionThatTakesClosure(
    {() -> Void in
        // something useless
    }
)

// alternate way of calling
someFunctionThatTakesClosure() 
{ () -> Void in
    // something useless
}

// similarly
reversedNames = names.sorted() {$0 > $1}

// or even more like gradle, skip parens if no other arguments
reversedNames = names.sorted {$0 > $1}

// the above technique can be used in forEach,map etc.
let strings = numbers.map { (number) -> String in
    var number = number
    var output = ""
    repeat {
        output = digitNames[number % 10]! + output
        number /= 10
    } while number > 0
    return output
}
```

### Structs and classes

Structs/Classes introduce a type, and should be having first Capital letter.

```swift
struct SomeStructure {
    // struct definition here
}

class SomeClass {
    // class definition here
}

struct Resolution {
    var width = 0;
    var height = 0;
}

class VideoMode {
    var resolution = Resolution()
    var frameRate = 0.0
}

// structure and class instances :
// NOte: no "new" keyword necessary

var someVideoMode = VideoMode()
```

**Note** - No `new` keyword required to create instances!

By default, custom classes and structures don’t have an implementation of the equivalence operators, known as the equal to operator `(==)` and not equal to operator `(!=)`.

With methods:
```swift
class Counter {
    var count = 0
    func increment() {
        count += 1
    }
    func increment(by amount: Int) {
        count += amount
    }
    func reset() {
        count = 0
    }
}
```

`self`:
Every instance of a type has an implicit property called self, which is exactly equivalent to the instance itself. You use the self property to refer to the current instance within its own instance methods.

The increment() method in the example above could have been written like this:
```swift
func increment() {
    self.count += 1
}
```
In practice, you don’t need to write self in your code very often. If you don’t explicitly write self, Swift assumes that you are referring to a property or method of the current instance whenever you use a known property or method name within a method. This assumption is demonstrated by the use of count (rather than self.count) inside the three instance methods for Counter.



#### Initialization

Struct can have their members initialized either in
1. definition
2. instance creation e.g. `Person(age: 11)`
3. init block of definition

Class can have their members initialized either in
1. definition
2. init block of defintion

#### Properties

https://docs.swift.org/swift-book/LanguageGuide/Properties.html

`Stored properties` store constant and variable values as part of an instance, whereas computed properties calculate (rather than store) a value. 

`Computed properties` are provided by classes, structures, and enumerations. Stored properties are provided only by classes and structures.

`lazy stored properties` A lazy stored property is a property whose initial value is not calculated until the first time it is used. You indicate a lazy stored property by writing the lazy modifier before its declaration.

**Computed properties** work via defining getters and setters:
```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
```

`ReadOnly computed properties` simplified (no get/getter keyword):
```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
```

`Property observers`:
Property observers observe and respond to changes in a property’s value. Property observers are called every time a property’s value is set, even if the new value is the same as the property’s current value.

`Propert wrappers`: A property wrapper adds a layer of separation between code that manages how a property is stored and the code that defines a property.