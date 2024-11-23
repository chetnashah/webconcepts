

## What can extensions do?

1. add new initializers
2. Make a computed property (but not stored property)
3. Add new methods for instance and type level methods
4. Define and use new nested types

## Can you override existing functions in a Extension

Extensions cannot/should not override.

**Extensions can add new functionality to a type, but they cannot override existing functionality.**

The compiler is allowing you to override in the extension for compatibility with Objective-C. But it's actually violating the language directive.


## Extensions are allowed to have static vars

Since statics are not instance stored properties, they are allowed in extensions.

```swift
extension String {
  static let test = "Test"
  static var test2 = "Test2"
}
```

https://stackoverflow.com/questions/45467329/extension-may-not-contain-stored-property-but-why-is-static-allowed

## Use extensions to add more functionality to existing class

### Extensions to add protocol conformance

An extension can extend an existing type to make it adopt one or more protocols. To add protocol conformance, you write the protocol names the same way as you write them for a class or structure: 

```swift
extension SomeType: SomeProtocol, AnotherProtocol { 
    // implementation of protocol requirements goes here 
}
```

A good example is to make your ViewController conform to `UITableViewDataSource` and `UITableViewDelegate` protocols. 

```swift
//
//  ViewController.swift
//  Tasks
//
//  Created by jay shah on 03/06/23.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var myTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

// making ViewController confirm to tableview related protocols
extension ViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
       // <#code#>
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // <#code#>
    }   
}

extension ViewController: UITableViewDelegate {
    
}
```

## Constraining extensions using `where` clause

In Swift, you can use the `where` clause in extensions to constrain the types that the extension applies to. This is particularly useful for adding functionality to generic types or protocols that have certain requirements. Here’s a basic example to illustrate how you can use the `where` clause in an extension:

### Example 1: Extending a Generic Type with a `where` Clause

Let's say you have a generic struct and you want to add a method to it only when the generic type conforms to a specific protocol.

```swift
protocol Printable {
    func printSelf()
}

struct MyGenericStruct<T> {
    let value: T
}

extension MyGenericStruct where T: Printable {
    func printValue() {
        value.printSelf()
    }
}

struct MyPrintableType: Printable {
    func printSelf() {
        print("This is a printable type")
    }
}

let instance = MyGenericStruct(value: MyPrintableType())
instance.printValue()  // Output: This is a printable type
```

In this example, the `printValue` method is added to `MyGenericStruct` only when `T` conforms to the `Printable` protocol.

### Example 2: Extending a Protocol with a `where` Clause

You can also use the `where` clause to extend protocols that have associated types with specific requirements.

```swift
protocol MyProtocol {
    associatedtype Element
    var elements: [Element] { get }
}

extension MyProtocol where Element: Equatable {
    func containsElement(_ element: Element) -> Bool {
        return elements.contains(element)
    }
}

struct MyStruct: MyProtocol {
    typealias Element = Int
    var elements: [Int]
}

let myStructInstance = MyStruct(elements: [1, 2, 3, 4, 5])
print(myStructInstance.containsElement(3))  // Output: true
print(myStructInstance.containsElement(6))  // Output: false
```

In this example, the `containsElement` method is added to `MyProtocol` only when `Element` conforms to the `Equatable` protocol.

### Example 3: Extending a Collection with a `where` Clause

You can extend collections with the `where` clause to add functionality that is only applicable to certain types of collections.

```swift
extension Collection where Element: Numeric {
    func sum() -> Element {
        return reduce(0, +)
    }
}

let numbers = [1, 2, 3, 4, 5]
print(numbers.sum())  // Output: 15
```

In this example, the `sum` method is added to `Collection` only when `Element` conforms to the `Numeric` protocol.

These examples demonstrate how you can use the `where` clause in extensions to add functionality that is only applicable to certain types, making your code more expressive and type-safe.