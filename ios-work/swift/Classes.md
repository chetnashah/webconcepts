
## Create class instance - No `new` keyword needed 

Similar to kotlin, there is no `new` keyword.

If you call a `class` as a function, a new instance will be constructed

```swift
class P {}
var p = P()
print(p)
```

## Basic class with members, method, constructor

```swift
class Person {
  var name: String // class member
  
  init() {  /// constructor
    self.name = "default";// name = "default"; is also OK
  }

  // method
  func sayHello() {
    print("Hello" + self.name) // self refers to class instance
  }
}
```


**Note: Usually you do not need to use `self` unless you want to disambiguate same named variable in scope, i.e. instance variable name vs parameter**

By far the most common reason for using `self` is inside an initializer,
 where you’re likely to want parameter names that match the property names of your type,


## Constructors are called "initializers" in swift lingo

## Access control

Access control restricts access to parts of your code from code in other source files and modules. This feature enables you to hide the implementation details of your code, and to specify a preferred interface through which that code can be accessed and used.

### Default access control is internal (to the module).

A module is typically a target like framework/app.

`Default/internal case` - the member is public within the module, but not accessible outside the module.

`Private` - Private member is only accessible within the same class, (or extension if extnesion is in the same file).

`open class/member` - open/public to everyone, including all code outside the module as well, subclass anywhere in any module.

`public class/member` - same as `open`, but the class is only allowed to be subclassed within a module. (Kind of like protected in java).

## Making default initializers public

```swift
public class Person {
    public var name : String = "default name";
    
    public init() {} // this needed for name to be initialized above, for a public class
    
    public func sayName() {
        print("Name is " + name);
    }
}
```

## Initializers and Deinitializers (or Constructors and Destructors)

**Note** - `deinit` does not take any parameters or access control modifiers.

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    // Note: how deinit clause does not take parameters or access control modifiers
    deinit {
        print("\(name) is being deinitialized")
    }
}
```
