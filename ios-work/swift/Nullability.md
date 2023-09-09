

## nullable type is "TypeName?"

e.g.
```swift
let url: URL? = URL(string:"ASDF") // URL initializer returns nil if string contains invalid chars
let url2: URL? = nil // URL? = URL | nil
```

## optional property vars are set to nil automatically 
optional `var` variables are always automatically set to `nil`.

```swift
class Person {
  var str: String?
}
var pp = Person()
```

## optional immutable (let based) variables must be explicitly set

```swift
var str: String? // value assigned is nil
let st2: String? // ERROR!, must be initialized by inline declaration or initializer!

func abc() {
    st2 = "ASdf"
}

abc()

print(str)
print(st2)
```

## optional immutable properties (let based) need to be explicitly set in initializer

```swift
class Person {
    let name: String? // let optional properties need to be explicitly given a value
    init(name: String) {
        self.name = name
    }
}

var pp = Person(name: "Kk")
```

## Class constructor/initializer that might return nil (e.g. invalid params)

A initializer that can return `nil` is called a `failable initializer` and has name `init?`
e.g.
```swift
class Folder {
    var name: String
    // note the "?" in init method
    init? (name: String) {
        if (name.isEmpty) {
            return nil
        }
        self.name = name
    }
}

val f = Folder("") // type of f is Folder?
```

## It is ok to have `let` for optional variables

optional variables are like enums. can be set once, but cannot be changed later. If they gonna change later, use `var` instead.
Cannot change after 
```swift
let k : String? = nil
let j : String? = "ADsf"
//Error
// k = "Hi"
```

## Nil handling

### Optional binding `if let v = mightBeNil {}`

Unwraps and assigns if value is not nil, otherwise executes else block

```swift
if let name = name {
  print ("Hello, \ (name)!")
} else {
  print ("No name given.")
}
```

**Note** - observe how `if let` uses a single equals (assignment) instead of a double equals (comparision)

### Optional binding `guard let v = mightBeNil else { // nil here } normal code`

```swift
func greet (name: String?) {
  guard let name = name else {
      // early return here
    print ("No name given.")
    return
  }
  // normal flow, non-nil case
  print ("Hello, \ (name)!")
}
```

### guard-let vs if-let use case

guard let is designed to exit the current function (brings else part into focus first), loop, or scope if the check fails so any values you unwrap using it will stay around after the check.
Early exit from scope implies that the else block generally requires return or aborting the program.

if-let usually skips code if optional is nil, return is not necessary. 


### nil coalescing operator `??` (Elvis operator in some languages ?:)

The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

```swift
let v = mightBeNil ?? "OK";// v = "OK" if first expression is nil
```

In some languages it is also called the `Elvis operator` i.e `?:`, e.g. in Kotlin.

### Force Unwrapping with `mightBeNil!` 

```swift
let name = name!
print ("Hello, \ (name)!") // crashes if name is nil
```


## Weak vars must always be optional/nullable

Since they are weak references, they can point to `nil` whenever the object referred is de-allocated, hence they must be `var` and `optional`. Similarly `weak let` is not possible. 

**Note**  - this is also a reason why `weak self` is referred like `self?.prop` in closures commonly.

```swift
class Pet {
    let name: String
    
    weak var owner: Owner? // must always be optional for weak references
    
    weak var belt: Belt // compiler ERROR!, must be optional i.e. Belt? in type

    init(name: String) { self.name = name }
    
    deinit {
        print("Pet deallocated")
    }
}
```

## Implicitly unwrapped optional

You write an implicitly unwrapped optional by placing an exclamation point (`String!`) rather than a question mark (String?) after the type that you want to make optional

**they do not need to be checked before accessing. It’s called implicitly unwrapped since Swift force unwraps it every time.**

The drawback of this is same as forced unwrapping - if the value is nil when accessing, it leads to a fatal error.

```swift
//Defining an implicitly unwrapped optional
var name: String!
//It will lead to runtime error if the value is nil when accessing
print(name) 
```

Use case: Implicitly unwrapped optionals are mainly used for convenience when the value once initialised is never nil.

