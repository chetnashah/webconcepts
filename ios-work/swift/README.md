Try online swift at

https://swiftfiddle.com/

Good guides:
https://appventure.me/pages/guides.html

## Top level code

The top-level code in a Swift source file consists of zero or more statements, declarations, and expressions. **By default, variables, constants, and other named declarations that are declared at the top-level of a source file are accessible to code in every source file that’s part of the same module.** You can override this default behavior by marking the declaration with an access-level modifier, as described in Access Control Levels.

There are two kinds of top-level code: top-level declarations and executable top-level code. Top-level declarations consist of only declarations, and are allowed in all Swift source files. Executable top-level code contains statements and expressions, not just declarations, and is allowed only as the top-level entry point for the program.

```
Grammar of a declaration

declaration → import-declaration
declaration → constant-declaration
declaration → variable-declaration
declaration → typealias-declaration
declaration → function-declaration
declaration → enum-declaration
declaration → struct-declaration
declaration → class-declaration
declaration → actor-declaration
declaration → protocol-declaration
declaration → initializer-declaration
declaration → deinitializer-declaration
declaration → extension-declaration
declaration → subscript-declaration
declaration → macro-declaration
declaration → operator-declaration
declaration → precedence-group-declaration \
```

## Top level file variables are global variables (singleton)

Yes, you can declare variables at the top level in Swift. 
These are called global variables. When you declare variables at the top level:

1. They are accessible throughout the entire module
2. They are not static in the traditional class sense (since they're not part of any type), but they are effectively singleton instances
3. They are lazily initialized (only when first accessed)

Here's an example:

```swift
// Global variables
let globalConstant = 42
var globalVariable = "Hello"

// Can be accessed from anywhere in the module
class SomeClass {
    func someMethod() {
        print(globalConstant)     // Accessible here
        globalVariable = "World"  // Modifiable (if var)
    }
}
```

However, it's generally considered better practice to:
1. Avoid global variables when possible (prefer dependency injection)
2. Use static properties on types instead
3. If needed, use a singleton pattern

Example of preferred approaches:
```swift
// Using static properties
enum Constants {
    static let maxAttempts = 3
    static var currentUser = "Guest"
}

// Using singleton
class DataManager {
    static let shared = DataManager()
    private init() {}
    
    var data: [String] = []
}
```

## Where are properties allowed?

Here's a breakdown specifically for stored and computed properties:

| Property Type | Top Level | Class/Struct/Enum | Function |
|--------------|:---------:|:-----------------:|:--------:|
| Stored       | ✅ | ✅ | ✅ |
| Computed     | ✅ | ✅ | ❌ |

In top-level code and types, both stored and computed properties are allowed:
```swift
// Top level
let stored = 42
var computed: Int {
    get { return 42 }
    set { /* ... */ }
}

// In class/struct
class Example {
    let stored = 42
    var computed: Int {
        get { return 42 }
        set { /* ... */ }
    }
}
```

In functions, you can only declare stored variables/constants:
```swift
func example() {
    let stored = 42
    // Computed properties NOT allowed here
}
```

## How to prevent swift program from terminating?
We wneed to make it interactive by adding `RunLoop.main.run()` at the end of swift program

## if/switch are statements, not expressons!

if/switch blocks do not return values, since they are statements.

## initializers

Unlike Objective-C initializers, Swift initializers do not return a value.

Only for failable initalizeers, we can return `nil`.

Swift initializers don’t return a value, while Objective-C initializers return self.

Swift initializers must initialize all non-inherited properties before calling `super.init()`, while Objective-C initializers can set inherited properties before or after calling `super.init()`.

## It is ok to have `let` for optional variables

optional variables are like enums. can be set once, but cannot be changed later. If they gonna change later, use `var` instead.
Cannot change after 
```swift
let k : String? = nil
let j : String? = "ADsf"
//Error
// k = "Hi"
```