
**A protocol is an interface(collection of methods/abilities), that is these collection of methods a part of type**. 

`Note` - **Protocols can have properties in addition to methods**

This idea of collection of methods as capabilities helps in subtyping/polymorphism.
This is also known as protocol oriented programming.

Protocols are also useful in situations where the class of an object isn’t known, or needs to stay hidden.


subtyping polymorphism help in decoupling/injection.

## Protocol definition/declaration

```objc
@protocol ProtocolName <ParentProtocol>
// list of methods and properties
@end
```

e.g.
In normal case, all methods are considered **required**.
```objc
@protocol XYZPieChartViewDataSource 
- (NSUInteger)numberOfSegments;
- (CGFloat)sizeOfSegmentAtIndex:(NSUInteger)segmentIndex;
- (NSString *)titleForSegmentAtIndex:(NSUInteger)segmentIndex;
@end
```

Protocol with optional and required methods:
```objc
@protocol XYZPieChartViewDataSource
- (NSUInteger)numberOfSegments;
- (CGFloat)sizeOfSegmentAtIndex:(NSUInteger)segmentIndex;
@optional
- (NSString *)titleForSegmentAtIndex:(NSUInteger)segmentIndex;
- (BOOL)shouldExplodeSegmentAtIndex:(NSUInteger)segmentIndex;
@required
- (UIColor *)colorForSegmentAtIndex:(NSUInteger)segmentIndex;
@end
```

## Usage: Object Interface implementing/confirming to a protocol (goes in header file)

```objc
// MyClass extends NSObject and also implements MyProtocol
// Note that protocol confirmation is specified at Interface site.
@interface MyClass : NSObject <MyProtocol, AnotherProtocol, YetAnotherProtocol>
...
@end
```
i.e. `@interface ClassName: ParentClass <ProtocolNamesList>`

## How to refer/have a variable to an object that confirms to a protocol?

Basically we have some object of anytime that confirms to given ProtocolName.
```objc
id <ProtocolName> myVar; // myVar is a variable that convirms to ProtocolName
```

## Protocols can have properties, not just methods.

example::
```objc
@protocol CoordinateSupport <NSObject>
@property double x;
@property double y;
@property double z;
- (NSArray *)arrayFromPosition;
- (double)magnitude;
- (double)getDistanceFromObject:(id <CoordinateSupport>)theObject;
@end
```