
## Methods are functions inside classes


### use `self` to refer to method instance (on which method was invoked)

Functions inside classes (or methods), have an **implicit parameter** `self` to refer to the same object, during exectuion of the method, it is also known as `this` in Java.

It is optional to use `self`, but can be useful to disambiguate a similarly named argument/parameter from instance variable.

If you don’t explicitly write self, Swift assumes that you are referring to a property or method of the current instance whenever you use a known property or method name within a method.

```swift
class Person {
  var name: String // class member
  
  init() {  /// constructor
    name = "default";
  }

  // method
  func sayHello() {
    print("Hello" + self.name) // self refers to class instance
  }
}
```


## Typing of methods


```swift
    public func sayName() -> String {
        return "name is " + name
    }
    
    public func sayWithArg(s: String) -> String {
        return "arg is " + s + " and name is " + name
    }
```


## Class Static member func with `public class func` 

```swift
public class Person {
    private var name : String?;
    
    public class func getStaticVar() -> String {
        return "Static member";
    }   
}
```


## Class Static member property is not obvious

Instead of `public class var`, we should use `public static var` for a static member property.

```swift
public class Person {
    public static var stname = "Adsf";
}
```


