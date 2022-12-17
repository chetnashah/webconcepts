
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

## Argument labels are always needed at call site (unless you opt out of it at definition)

If no explicit argument lables are declared in function definition, argument label is same as parameter name.
If you really want to opt out of passing argument label at call site of function, you must use `_` at the definition site of the function.

```swift

public class Person {
    public class func doMeOneArg(n: String) -> String {// must be called as Person.doMeOneArg(n: "Hi")
        print("dome one arg")
        return n
    }
    
    public class func doMeNoArg() -> Void { // call doMeNoArg()
        print("dome no arg")
    }
    
    // must be called as var p3 = Person.doMeTwoArg(n1: "Df", n2: "Adf")
    public class func doMeTwoArg(n1: String, n2: String) -> String{ 
        return n1 + n2
    }
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


