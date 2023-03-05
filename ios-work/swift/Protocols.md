
Types conform to protocols.

## Protocols can specify methods

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
