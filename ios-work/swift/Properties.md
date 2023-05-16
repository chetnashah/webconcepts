

https://docs.swift.org/swift-book/LanguageGuide/Properties.html

Properties can be part of `class`, `struct` or `enum`.

Stored properties store constant and variable values as part of an instance, whereas computed properties calculate (rather than store) a value.

Properties can be present at both `instance level` and `type level`.

## Stored properties

supoorted by `class` and `struct`.

a constant or variable that’s stored as part of an instance of a particular class or memory structure

**A stored property must be given an initial value** - either through default value in declaration, or via initializer functions.

Setter observers are not called during initialization of properties.

### lazy stored properties (must be var)

A lazy stored property is a property whose initial value isn’t calculated until the first time it’s used. You indicate a lazy stored property by writing the lazy modifier before its declaration.

When/why use lazy properties?
1. Lazy properties are useful when the initial value for a property is dependent on outside factors whose values aren’t known until after an instance’s initialization is complete. 
2. Lazy properties are also useful when the initial value for a property requires complex or computationally expensive setup that shouldn’t be performed unless or until it’s needed.

```swift
class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    // the DataManager class would provide data management functionality here
}
```


## Properties and self

A property declaration cannot fetch an instance property or instance method (via self). 
because there is no self constructed yet.

property initializers must run before 'self' is available.

```swift
class Moi {
    let first = "Matt"
    let last = "Neuburg"
    let whole = self.first + " " + self.last // compile error: Cannot find 'self' in scope
}
```

### self allowed in computed properties

### self allowed for lazy property declarations

lazy properties are not evaluated till first access.

```swift
class Moi {
    let first = "Matt"
    let last = "Neuburg"
    lazy var whole = self.first + " " + self.last
}
```

## static properties are lazily initialized

```swift
struct Greeting {
    static let friendly = "hello there"
    static let hostile = "go away"
    static var ambivalent : String {
        self.friendly + " but " + self.hostile
    }
}
```

## lazy cannot be used with let

**lazy can only be used with var** - why?

You must always declare a lazy property as a variable (with the var keyword), 
because its initial value might not be retrieved until after instance initialization completes. 

Constant properties must always have a value before initialization completes, 
and therefore can’t be declared as lazy.

```swift
class Moi {
    lazy let first = "Matt"; // lazy cannot be used on let
    lazy var second = "hii"; // ok
}
```

### Use cases for lazy var

Lazy properties are useful when the initial value for a property is dependent on outside factors whose values aren’t known until after an instance’s initialization is complete. 

Lazy properties are also useful when the initial value for a property requires complex or computationally expensive setup that shouldn’t be performed unless or until it’s needed.





## Computed properties (always use var), cannot use let

You must declare computed properties—including read-only computed properties—as variable properties with the `var` keyword, because their value isn’t fixed.

supported by `class`, `struct` and `enum`.

Computed properties have `get`ers and `set`ters
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
        set(newCenter) { // if you want to have set { ... }, then use newValue instead of newCenter in body 
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
```

### Read-only computed properties (useful for formulas etc)

They only have a getter, have shorthand syntax as below
```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double { // implicit getter for read-only computed property volume
        return width * height * depth
    }
}
```


## Property observers

Property observers observe and respond to changes in a property’s value. Property observers are called every time a property’s value is set, even if the new value is the same as the property’s current value.

You can add property observers in the following places:
* Stored properties that you define
* Stored properties that you inherit
* Computed properties that you inherit
* Why not self-defined computed properties? For a computed property that you define, use the property’s setter to observe and respond to value changes, instead of trying to create an observer.

Use `didSet` and `willSet`:
```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) { // if no param named, newValue is used
            print("About to set totalSteps to \(newTotalSteps)")
        }
        didSet { // here we use oldValue as no explicit param specified
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}
```

## Property Wrappers

**A property wrapper adds a layer of separation between code that manages how a property is stored and the code that defines a property.**

A property wrapper is made using:
1. class,struct or enum
2. decorated with `@propertyWrapper`
3. provides `get`ters/`set`ters for `var wrappedValue` - mandatory with same name!


**Note** - It is mandatory to have a property named `wrappedValue` in the `@propertyWrapper` implementation.

e.g.
```swift
@propertyWrapper
struct TwelveOrLess {
    private var number = 0 // backing property storage
    // mandatory to have this property named wrappedValue!!
    var wrappedValue: Int { // additional wrapping logic in getters/setters over backing property above
        get { return number }
        set { number = min(newValue, 12) }
    }

    init() {
        maximum = 12
        number = 0
    }
    
    // wrapped Property default value calls initializers
    init(wrappedValue: Int) {
        maximum = 12
        number = min(wrappedValue, maximum)
    }

}

// Usage
struct SmallRectangle {
    @TwelveOrLess var height: Int
    @TwelveOrLess var width: Int
}
```



## Type level/static properties

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 6
    }
}
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

## Warning - Instance will be immediately deallocated because property 'delegate' is 'weak'

