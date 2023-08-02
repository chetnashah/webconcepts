

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
