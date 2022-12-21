
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

