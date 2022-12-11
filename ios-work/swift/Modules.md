
https://www.swift.org/package-manager/

Swift provides a way to **group several files into a group, called module.**

A set of parts that can be assembled into a structure like a framework or app.

**Each module specifies a namespace** and enforces access controls on which parts of that code can be used outside of the module.

## Package

A package consists of Swift source files and a manifest file. The manifest file, called Package.swift, defines the package’s name and its contents using the PackageDescription module.

A package has one or more targets. Each target specifies a product and may declare one or more dependencies.

## Product

Products
A target may build either a library or an executable as its product. A library contains a module that can be imported by other Swift code. An executable is a program that can be run by the operating system.


## Namespacing

A module is a single unit of code distribution—a framework or application that’s built and shipped as a single unit and that can be imported by another module with Swift’s import keyword.

**Each build target (such as an app bundle or framework) in Xcode is treated as a separate module in Swift.**

`Namespacing` - **Namespace in Swift is based on the module. Every module represents a namespace in Swift**


`Same names not allowed in the same target` - That means two classes with the same name are forbidden in one target. It would be a good habit to put different things into different target.

But same name is allowed in different frameworks:
```swift
// MyFramework.swift in MyFramework.framework
// This class exists in MyFramework.framework
public class MyClass {
    public class func hello() {
        print("hello from framework")
    }
}

// MyApp.swift in App target
// This class exists in app's target
class MyClass {
    class func hello() {
        print("hello from app")
    }
}
```

### Same Class name Conflict at usage site

If there is any conflict in context when using these two classes, we are required to add the module name before it. For example, when we write the code below in a file in app's target:
```swift
MyClass.hello()
// hello from app target

MyFramework.MyClass.hello()
// hello from framework
```


## Usage

You start using modules by importing them.

```swift
import SwiftUI
```

### Importing individual declarations of a module

```
import kind module.symbol
``` 
e.g. `import class Pentathlon.Car`
kind can be any of:
1. struct
2. class 
3. enum
4. var
5. let
6. func
7. protocol
8. typealias


 the Swift compiler resolves this reference by consulting the following, in order:

* Local Declarations
* Imported Declarations
* Imported Modules
e.g.
```swift
import Triathlon
import func Pentathlon.swim

// Local function shadows whole-module import of Triathlon
func run() {
    print("🏃‍ Run 42.195 km")
}

swim() // OK, calls Pentathlon.swim
bike() // OK, calls Triathlon.bike
run() //  OK, calls local run
```

### Importing a submodule

Syntax:
```swift
import module.submodule
```
e.g. `import CoreServices.DictionaryServices`

## Module members visibility

After you import a module, **everything that that module declares public will be visible** inside your application code.

