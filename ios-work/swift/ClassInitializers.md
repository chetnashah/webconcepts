

## What is an initializer?

In other languages, it is referred to as a constructor - a type level function that sets up memory/variables for the instance.

In swift, it does not need the func keyword or return type

```swift
class Dog {
    var name = ""
    var license = 0
    init(name:String) {
        self.name = name
    }
    init(license:Int) {
        self.license = license
    }
    init(name:String, license:Int) {
        self.name = name
        self.license = license
    }
}
```

Note - no need of new keyword after class to create instances:
```swift
let fido = Dog(name:"Fido")
let rover = Dog(license:1234)
let spot = Dog(name:"Spot", license:1357)
```

## It is mandatory to initialize all stored properties in initializer

if not done, error shows up: Return from initializer without initializing all stored properties.

## initializer and self

an initializer may not refer (read) to self, explicitly or implicitly, until all instance properties have been initialized.
This also includes method calls because all instance method calls implicitly refer self.

```swift
struct Cat {
    var name : String
    var license : Int
    init(name:String, license:Int) {
        self.name = name
        meow() // too soon - compile error, implicitly refers self via self.meow()
        self.license = license
    }
    func meow() {
        print("meow")
    }
}
```

## let property initialization in initializer

Because immutable `let` property initialization in initializer also counts as initializaiton, following is valid:
```swift
class Dog {
    let name : String // let is ok as long as init happens in initializer
    let license : Int  // let is ok as long as init happens in initializer
    init(name:String = "", license:Int = 0) {
        self.name = name
        self.license = license
    }
}
```

## Default meember property values

If a property always takes the same initial value, provide a default value rather than setting a value within an initializer. The end result is the same, but the default value ties the property’s initialization more closely to its declaration. It makes for shorter, clearer initializers and enables you to infer the type of the property from its default value. The default value also makes it easier for you to take advantage of default initializers and initializer inheritance, as described later in this chapter.

Properties of optional type are automatically initialized with a value of nil, indicating that the property is deliberately intended to have “no value yet” during initialization.



## Customize initialization with params

You can customize the initialization process with input parameters.


## Parameter and argument names

As with function and method parameters, initialization parameters can have both a parameter name for use within the initializer’s body and an argument label for use when calling the initializer.

Swift provides an automatic argument label for every parameter in an initializer if you don’t provide one.

**the names and types of an initializer’s parameters play a particularly important role in identifying which initializer should be called.**

If you don’t want to use an argument label for an initializer parameter, write an underscore (_) instead of an explicit argument label for that parameter to override the default behavior.

e.g.
```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
    init(_ celsius: Double) {
        temperatureInCelsius = celsius
    }
}
let bodyTemperature = Celsius(37.0) // this matches
// bodyTemperature.temperatureInCelsius is 37.0
```


## default initialzers

Swift provides a default initializer for any structure or class that provides default values for all of its properties and doesn’t provide at least one initializer itself. The default initializer simply creates a new instance with all of its properties set to their default values.

```swift
class ShoppingListItem {
    var name: String?
    var quantity = 1
    var purchased = false
}
var item = ShoppingListItem()
```


##  class inheritance and initializers

All of a class’s stored properties—including any properties the class inherits from its superclass—must be assigned an initial value during initialization.


**Note** - Unlike other languages, A designated initializer must ensure that all of the properties introduced by its class are initialized before it delegates up to a superclass initializer. (self init before superclass init).

e.g.
```swift
class MyClassViewController: UIViewController{
    let previewLayer: AVCaptureVideoPreviewLayer // will be inited in initializer
    
    // subclass initializer
    required init?(coder aDecoder: NSCoder) {
        self.previewLayer = AVCaptureVideoPreviewLayer() // always self init first
        super.init(coder: aDecoder) // superclass init comes later
    }
}
```

**Note** - If subclass has no initializers, then superclass initializers are inherited, otherwise there is no link between superclass initializer and subclass initializer. If you want to have a subclass initializer with same signature as parent class initializer, use `override init` in subclass.

```swift
class Point {
    let x: Int
    let y: Int

    init(x: Int, y: Int) {
        self.x = x
        self.y = y
    }
}

class NamedPoint: Point {
    let label: String?

    override init(x: Int, y: Int) {
        self.label = nil

        super.init(x: x, y: y)
    }
}

let p1 = NamedPoint(x: 1, y: 1)
```

**Note** - A designated initializer must delegate up to a superclass initializer before assigning a value to an inherited property. Don't touch inherited stuff before it's init(i.e. `super.init` is done).

**Note** - Unavailable `self` in first phase. An initializer can’t call any instance methods, read the values of any instance properties, or refer to self as a value until after the first phase of initialization is complete.



### Designated initializer

Designated initializers are the **primary initializers for a class.** A designated initializer fully initializes all properties introduced by that class and calls an appropriate superclass initializer to continue the initialization process up the superclass chain.

**You can have many designated initializers**

```swift
init(parameters) {
    statements
}
```

### Convinience initializer

Convenience initializers are secondary, supporting initializers for a class. You can define a convenience initializer to call a designated initializer from the same class as the convenience initializer with some of the designated initializer’s parameters set to default values.

Designated initializers for classes are written in the same way as simple initializers for value types:

Convenience initializers are written in the same style, but with the convenience modifier placed before the init keyword, separated by a space:
```swift
convenience init(parameters) {
    statements
}
```


### Rules for initializer delegation

Rule 1: A designated initializer must call a designated initializer from its immediate superclass.

Rule 2: A convenience initializer must call another initializer from the same class.

Rule 3: A convenience initializer must ultimately call a designated initializer.

A simple way to remember this is:

* Designated initializers must always delegate up.

* Convenience initializers must always delegate across.


## Two phase initilization

### 

* A designated initializer must ensure that all of the properties introduced by its class are initialized before it delegates up to a superclass initializer.

* A designated initializer must delegate up to a superclass initializer before assigning a value to an inherited property. If it doesn’t, the new value the designated initializer assigns will be overwritten by the superclass as part of its own initialization.

*  convenience initializer must delegate to another initializer before assigning a value to any property (including properties defined by the same class). If it doesn’t, the new value the convenience initializer assigns will be overwritten by its own class’s designated initializer.

* An initializer can’t call any instance methods, read the values of any instance properties, or refer to self as a value until after the first phase of initialization is complete.

## Phase 1 (Populate memory of self and superclass memory)

`Phase 1` means: Every stored property is assigned an initial value by the class that introduced it.

1. A designated or convenience initializer is called on a class.

2. Memory for a new instance of that class is allocated. The memory isn’t yet initialized.

3. A designated initializer for that class confirms that all stored properties introduced by that class have a value. The memory for these stored properties is now initialized.

4. The designated initializer hands off to a superclass initializer to perform the same task for its own stored properties.

5. This continues up the class inheritance chain until the top of the chain is reached.

6. Once the top of the chain is reached, and the final class in the chain has ensured that all of its stored properties have a value, the instance’s memory is considered to be fully initialized, and phase 1 is complete.

## Phase 2 (self access allowed now)

`Phase 2`: Every class is given opportunity to customize its stored proeprties.

1. Working back down from the top of the chain, each designated initializer in the chain has the option to customize the instance further. Initializers are now able to access self and can modify its properties, call its instance methods, and so on.

2. Finally, any convenience initializers in the chain have the option to customize the instance and to work with self.

## Override initializer

**NOte** - In Swift initializers are not inherited for subclasses by default (if subclass provides an initializer), otherwise if subclass does not provide. If you want to provide the same initializer for a subclass that the parent class already has, you have to use the override keyword.



