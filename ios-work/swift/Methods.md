
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



## Closures

closures, like classes, are reference types. When you assign a closure to a property, you are assigning a reference to that closure.


### Closures expression syntax

Code inside curly brackets `{}` is a closure, and is called closure expression.

```swift
let myfn = { (parameters) -> return-type in
    statements
}
```

To make it easier to remember, visualize it as follows:
```
{                             // closure starts
  (parameters) -> return-type // type signature goes next
  in                          // in keyword sppecial for closures
  body-statements             // body statements as usual
}
```

an e.g.
```swift
var myfn = {
        (s: String) -> Void
        in
            print("s is "+s)
};
```

### Trailing closures (can move out of function call parens)

Whenever a closure is a last/single argument of a function, closure can be passed following functioncall, instead of inside call parentheses.

```swift
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body goes here
}

// Here's how you call this function without using a trailing closure:

someFunctionThatTakesAClosure(closure: {
    // closure's body goes here
})

// Here's how you call this function with a trailing closure instead:
// note how there is no func keyword, means its a function call, followed by trailing closure
someFunctionThatTakesAClosure() {
    // trailing closure's body goes here
}
```

Another example of use of trailing closure is `reversedNames = names.sorted() { $0 > $1 }`

**For single argument functions where the single argument are closures, even the call parens can be dropped**
If a closure expression is provided as the function’s or method’s only argument and you provide that expression as a trailing closure, you don’t need to write a pair of parentheses () after the function or method’s name when you call the function.

```swift
// both are valid/same
reversedNames = names.sorted { $0 > $1 }
// and
reversedNames = names.sorted() { $0 > $1 } // equivalent as above.
```

### Multiple trailing closures case

If a function takes multiple closures, you omit the argument label for the first trailing closure and you label the remaining trailing closures.

```swift
func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
    if let picture = download("photo.jpg", from: server) {
        completion(picture)
    } else {
        onFailure()
    }
}

loadPicture(from: someServer) { picture in // completion handler is implicitly inferred
    someView.currentPicture = picture
} onFailure: { // all other closures must be named
    print("Couldn't download the next picture.")
}
```

### Single argument function types, need parentheses around argument type

```swift
//SYNTAX ERROR: Single argument function types require parentheses
    var myffn :String -> String = { s in return s } 

    // instead do following:
    var myffn :(String) -> String = { s in return s } 
```

### Escaping closures

A closure is said to escape a function,
if it is passed to a function, but it is called after function returns.

When you declare a function that takes a closure as one of its parameters, you can write `@escaping` **before the parameter’s type** to indicate that the closure is allowed to escape.

A common use case would be :
1. a function that takes in a completion-handler closure, and registers it for future callback.

```swift
public class Person {
    private var handlers:[(String) -> String] = [];
        
    // we pass an escaping closure/handler for future invocation
    public func registerHandler ( fn : @escaping (String) -> String ) -> Void {
        handlers.append(fn)
    }
}
```

#### Memory considerations for escaping closures

An escaping closure that refers to self needs special consideration if `self` refers to an instance of a class. 

Capturing self in an escaping closure makes it easy to accidentally create a strong reference cycle.



## Closures capture enclosing instances (self) with strong reference (and might lead to memory leaks)

A strong reference cycle can also occur if you assign a closure to a property of a class instance, and the body of that closure captures the instance. 

This capture might occur because the closure’s body accesses a property of the instance, such as `self.someProperty`, or because the closure calls a method on the instance, such as `self.someMethod()`. these accesses cause the closure to “capture” self, creating a strong reference cycle.

All closures capture enclosing instance with a strong reference.
In order to prevent that one can use `[weak self]` at start of closure.

```swift
import Foundation
struct Post {
    let title: String
    var isPublished: Bool = false

    init(title: String) { self.title = title }
}

class Blog {
    let name: String
    let url: URL
    // weak var owner: Blogger?

    var publishedPosts: [Post] = []
    var onPublish: ((_ post: Post) -> Void)?

    init(name: String, url: URL) {
        self.name = name
        self.url = url

        print("Blog init ")
        // Adding a closure instead to handle published posts
        onPublish = { post in  // usefollowing to prevent memory leak: [weak self] post in
            self!.publishedPosts.append(post)
            print("Published post count is now: \(self!.publishedPosts.count)")
        }
    }

    deinit {
        print("Blog \(name) is being deinitialized")
    }

    func publish(post: Post) {
        /// Faking a network request with this delay:
        print("publish method called!")
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            print("Async after, self = ", self)
            self.onPublish?(post)
        }
    }
}

var blog: Blog? = Blog(name: "SwiftLee", url: URL(string: "www.avanderlee.com")!)
blog!.publish(post: Post(title: "Explaining weak and unowned self"))
blog = nil
// does not deallocate, use [weak self] in closure onPublish
RunLoop.main.run()
```


## Secret life of methods

### Instance methods are actually static methods that take instance as parameter

```swift
class MyClass {
    var s = ""
    func store(_ s:String) {
        self.s = s
    }
}
let m = MyClass()
let f = MyClass.store(m) // returns the currried function store, closed with instance memory of instance m, this fn when called with arguments, will execute store
f("Howdy"); // calls store("Howdy")
```
