

## Member overriding

Classes in Swift can call and access methods, properties, and subscripts belonging to their superclass and can provide their own overriding versions of those methods, properties, and subscripts to refine or modify their behavior.

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise() {
        // do nothing - an arbitrary vehicle doesn't necessarily make a noise
    }
}

// subclassing
class Bicycle: Vehicle {
    var hasBasket = false
    // override methods
    override func makeNoise() {
        print("Choo Choo")
    }
}
```


## What can be overriden?

A subclass can provide its own custom implementation of 
1. an instance method, 
2. type method, 
3. instance property, 
4. type property, or subscript that it would otherwise inherit from a superclass. This is known as overriding.

## Override is mandatory if overriding

Overriding by accident can cause unexpected behavior, and any overrides without the override keyword are diagnosed as an error when your code is compiled.

The override keyword also prompts the Swift compiler to check that your overriding class’s superclass (or one of its parents) has a declaration that matches the one you provided for the override.

## Access superclass methods, properties and sbscripts

Use `super.method()`, `super.propertyname` and `super[idx]`.

### Overriding properties

You can provide a custom getter (and setter, if appropriate) to override any inherited property, regardless of whether the inherited property is implemented as a stored or computed property at source.

The stored or computed nature of an inherited property isn’t known by a subclass—it only knows that the inherited property has a certain name and type.

```swift
class Car: Vehicle {
    var gear = 1
    override var description: String {
        return super.description + " in gear \(gear)"
    }
}
```

## Initializers

When you write a subclass initializer that matches a superclass designated initializer, you are effectively providing an override of that designated initializer. Therefore, **you must write the override modifier before the subclass’s initializer definition**. This is true even if you are overriding an automatically provided default initializer.

## Preventing subclass overrides: use `final`

You can prevent a method, property, or subscript from being overridden by marking it as `final`. 
Mark everything as final using `final class`.
Do this by writing the final modifier before the method, property, or subscript’s introducer keyword (such as `final var`, `final func`, `final class func`, and `final subscript`).

## Properties overriding

**Main Restriction** - **subclass property override cannot be a stored property!**

There are nuances depending on base class property being stored/computed, search the cases online.


## Static vs class methods/properties

**Yes both static and class methods/properties are different and can co-exist**

static and class both associate a method with a class, rather than an instance of a class. 

The difference is that **subclasses can override class methods; they cannot override static methods**.

class properties function in the same way (subclasses can override them).

