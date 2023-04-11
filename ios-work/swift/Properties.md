

https://docs.swift.org/swift-book/LanguageGuide/Properties.html

Properties can be part of `class`, `struct` or `enum`.

Stored properties store constant and variable values as part of an instance, whereas computed properties calculate (rather than store) a value.

Properties can be present at both `instance level` and `type level`.

## Stored properties

supoorted by `class` and `struct`.

a constant or variable that’s stored as part of an instance of a particular class or memory structure

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


## Computed properties (always use var)

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

