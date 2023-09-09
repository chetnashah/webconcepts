
## 

```swift

import Foundation

class MyObjectToObserve: NSObject {
    // need both objc attribute and dynamic modifier - to make it observable
    @objc dynamic var myDate = NSDate(timeIntervalSince1970: 0)
    
    func updateDate() {
        myDate = myDate.addingTimeInterval(Double(2 << 30))
    }
}

class MyObserver: NSObject {
    // needs to be @objc var
    @objc var objectToObserve: MyObjectToObserve?
    var observation: NSKeyValueObservation?
    
 
    init(obj: MyObjectToObserve) {
        objectToObserve = obj
        super.init()
        
        // setup observe via passing object to observe, and lambda for change notifications
        observation = observe(\.objectToObserve?.myDate, options: [.old, .new]) {
            object, change in 
            print("mydate changed  \(change)")
        }
    }
}


let moo = MyObjectToObserve()
let mo = MyObserver(obj: moo)

// update date to trigger change notification
moo.myDate = NSDate(timeIntervalSinceNow: 0)
// mydate changed  NSKeyValueObservedChange<Optional<NSDate>>(kind: __C.NSKeyValueChange, newValue: Optional(Optional(2023-09-07 18:52:55 +0000)), oldValue: Optional(Optional(1970-01-01 00:00:00 +0000)), indexes: nil, isPrior: false)
```