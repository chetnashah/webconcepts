
Types conform to protocols.

## Protocols can specify methods

## Class implementing protocols

**Note**: unlike objc, where `<protocolName>` was used for protocol conformance, in Swift, `<xyz>` is used for generics.

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}
```

## PRotocols can specify properties

The protocol doesn’t specify whether the property should be a stored property or a computed property — it only specifies the required property name and type. 

The protocol also specifies whether each property must be gettable or gettable and settable.

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

## Protocols and statics

Type level properties must be prefixed with static keyword:
```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

## Type checking protocol conformance



## Protocols can inherit other protocols

## Class only protocls

You can limit protocol adoption to class types (and not structures or enumerations) by adding the `AnyObject` protocol to a protocol’s inheritance list.

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```


## Error: Cannot declare conformance to 'NSObjectProtocol' in Swift; 'NotificationCenterDelegate' should inherit 'NSObject' instead

This is because one cannot directly implement a protocol, you need `NSObject` also as a placeholder class.

```Swift
//Error! - Cannot declare conformance to 'NSObjectProtocol' in Swift
// class NotificationCenterDelegate : UNUserNotificationCenterDelegate {
    
// }

//Correct
class NotificationCenterDelegate : NSObject, UNUserNotificationCenterDelegate {
    
}
```

## Protocol extensions

**You can use protocol extensions to provide a default implementation to any method or computed property requirement of that protocol**

`Note` - If a conforming type provides its own implementation of a required method or property, that implementation will be used instead of the one provided by the extension.

This allows you to define behavior on protocols themselves, rather than in each type’s individual conformance or in a global function. This way a `protocol + extension` can give you behavior without declaring any classes



### Example

For example, the `RandomNumberGenerator protocol` can be extended to provide a `randomBool()` method, which uses the result of the required `random()` method to return a random Bool value:

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

**By creating an extension on the protocol, all conforming types automatically gain this method implementation without any additional modification**