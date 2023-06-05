

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
