
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