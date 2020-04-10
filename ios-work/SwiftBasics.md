
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

3 use cases.
```swift
func some1(alabel aname: Int) {

}
func some2(_ aname: Int) {

}
func some3(aname: Int) {

}
// calls allowed are below only
// any other way will result in compiler error
some1(alabel: 22);
some2(11);
some3(aname: 88);
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

Classes and structs must set stored properties to initial values, they
cannot be left in indeterminate state on creation.
There is not a concept of constructor here, only init blocks.
Both `struct` and `class` can have `init` blocks.

Struct can have their members initialized either in
1. definition (property default values)
2. instance creation e.g. `Person(age: 11)` (known as member initializer)
3. `init` block of definition

Class can have their members initialized either in
1. definition (property default values)
2. `init` block of defintion

Instances of class types can also implement a deinitializer,
which performs custom cleanup.

If all the properties in class/struct have a default value,
there is no need for `init` block.(we call this `default initializer`).
These are called when `no inits are present`.

**Member initializer for struct** - Structs are given
a default member initializer for each member name.
e.g.
```swift
struct s1{
    var a: Int;
    var b: String;
}
var ss = s1(a:2, b:"Adfa");
```

**NOTE** - If you define a custom `init` block, you cannot invoke
the default or member initalizer anymore..In order to still use them, see `Extensions`.

There can be multiple `init` blocks with different signatures,
and they can make use of each other, within `init` blocks using `self.init`.


#### Class inheritance and initalization

Use `override init` in subclasses.

**required initializers** - use `required` keyword in fron t of `init` to
indicate every subclass must implement that initializer
Also the subclass implementation also needs to have `required` keyword
indicating further subclasses in the chain need to fulfill the requirement.

```swift
class SomeClass {
    required init(){
        // init impl
    }
}
class SomeSubClass : SomeClass {
    required init(){
        // subclass init impl
    }
}
```

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
    var volume: Double {// note there is no func here, means its a read-only computed property, also note the lack of equals sign here
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
```
**Constant properties** - Can only be set once in `init`. Declared
using `let` instead of `var`.

`Property observers`:
Property observers observe and respond to changes in a property’s value. Property observers are called every time a property’s value is set, even if the new value is the same as the property’s current value.

`Propert wrappers`: A property wrapper adds a layer of separation between code that manages how a property is stored and the code that defines a property.

#### Optional values

`nil` is null value.
Explicityly encoded in type e.g.
```swift
var resp: String? // value is nil by default
```

if you print it, it will print like `Optionl("SomeString")`
So to use it, one has to explicitly unwrap it like following:
```swift
var resp: String?
print("The value of resp is \(resp!)")
```

**optional chaining** - does graceful unwrapping by returning `nil` if
value 
e.g
`resp?.message?.text` returns nil if either of the optional values are nil.

**`if let` binding**:  

### Protocol

A `Protocol` defines a blueprint of methods,properties and other requirements that suit a particular task or piece of functionality.
Also `Protocols can be used as types`.

Protocols can inherit more protocols to add more requirements.

e.g. `Showable`, `Comparable` etc. would be some examples.
Any type that satisfies the requirements of protocol is said to confirm
to a protocol.

Protocol definition:
```swift
protocol SomeProtocol {
    // protocol requirements here
}
```

Protocol usage:
```swift
struct SomeStructure : FirstProtocol, AnotherProtocol {

}
class SomeClass: FirstProtocol, AnotherProtocol {

}
```

`Confirming Properties`: can require confirming type to provide instance property
with given name and type. and whether it must be gettable or gettable and settable. Property requirements are always declared as variable properties.
```swift
protocol SomeProtoCol {
    var mustBeSettable: Int {get set}
    var doesNotNeedtoBesettable: Int { get }
}
```
If property is a `type level property`, it should have `static var propName`

`Confirming Methods`: 
```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```
mutating methods to have `mutating` keyword in front of func:
```swift
protocol Toggleable {
    mutating func toggle()
}
```

`initalizers`:
```swift
protocol SomeProtocol {
    init(someParam: Int)
}
class SomeClass: SomeProtocol {
    required init(someParam: Int) {// Note the use of required!
        // init implementation
    }
}
```


### Delegation

`Delegation` is a design pattern that enables a class or structure to
handoff some of its responsibilities to instance of another type.

`Delegate` are defined using protocols.

A confirming type known as a delegate is guaranteed to provide
the functionality that has been delegated. Delegate callers often use
`delegate?.delegateprotocolmethod`
Here is an exmaple
```swift
// a delegate that can be adopted to track game progress
protocol DiceGameDelegate: AnyObject {
    func gameDidStart(_ game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(_ game: DiceGame)
}

class SnakesAndLadders{
    let finalSquare = 25
    let dice = Dice(sides: 6, generator: LinearGenerator())
    var square = 0
    var board: [Int]

    init() {
        board = Array(repeating:0, count: finalSquare + 1)
        // some more board stuff
    }
    weak var delegate: DiceGameDelegate?
    func play(){
        square = 0
        delegate?.gameDidStart(self)
        gameLoop: while square != finalSquare {
            let diceRoll = dice.roll()
            delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
            // some snake game logic stuff
        }
        delegate?.gameDidEnd(self)
    }
}

class DiceGameTracker: DiceGameDelegate{
    var numOfTurns = 0
    func gameDidStart(_ game: DiceGame){
        numOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game")
        }
    }
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        numOfTurns += 1
        print("Rolled a \(diceRoll)")
    }
    func gameDidEnt(_ game: DiceGame) {
        print("Game lasted for \(numOfTurns)")
    }
}
```

### Adding protocol conformance with Extensions

protocol specify functional requirements, and extensions help add them,
see below.

### Extensions

Extensions can add `new properties, methods and subscripts` to an existing
type. kind of like `objc category`.

```swift
extension SomeType {
    // new functionality for SomeType goes here
}
```
Extension can also make adopt the existing type to new protocols e.g.
```swift
extension SomeType: ANewProtocol {
    // code to support to confirm ANewProtocol
}
```
e.g.
```swift
protocol TextRepresentable {
    var textualDesc: String { get } 
}
extension Dice: TextRepresentable {
    var textualDesc: String {
        return "A \(sides)-sided dice"
    }
}

//if a type already confirms to all requirements 
// of a protocol, but has not stated that it adopts the protocol
// you can make it adopt protocol with empty extension
struct Hamster {
    var name: String
    var textDesc: String {
        return "A hamster named \(name)"
    }
}
extension Hamster: TextRepresentable {} // Hamster already confirms
```
`Note`: extensions can add compute properties but cannot add stored properties or add property observers to existing properties.

