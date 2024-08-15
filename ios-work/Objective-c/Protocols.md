
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


## type of objects that implement protocols

Below we have a property that refers to an object implementing `UITableViewDataSource` protocol.
```objc
@property(nonatomic, assign) id<UITableViewDataSource> dataSource;
```


## Managing optional methods of protocol

First check for selector presence via `respondsWithSelector`.
e.g.
```objc
if ([_dataSource respondsToSelector:@selector(numberOfSectionsInTableView:)]) {
    _numberOfSections = [_dataSource numberOfSectionsInTableView:self];
} else {
    _numberOfSections = 1; // 1 is the default number of sections
}
```

## Access control (All protocol members considered public)

In Objective-C, protocol methods are inherently public. When you define a protocol, the methods declared within that protocol are intended to be implemented publicly by any class that adopts the protocol. There is no concept of private protocol methods in Objective-C.

**The methods declared in the protocol are automatically considered part of the class's public interface when the class conforms to the protocol.**

### Example

Here's an example to illustrate the use of protocols and their methods:

#### MyProtocol.h (Protocol Header File)

```objective-c
#import <Foundation/Foundation.h>

@protocol MyProtocol <NSObject>

// Required protocol method
- (void)requiredMethod;

// Optional protocol method
@optional
- (void)optionalMethod;

@end
```

#### MyClass.h (Class Header File)

```objective-c
#import <Foundation/Foundation.h>
#import "MyProtocol.h"

@interface MyClass : NSObject <MyProtocol>

// Public properties
@property (nonatomic, strong) NSString *publicProperty;

// Public methods
- (void)publicMethod;

@end
```

#### MyClass.m (Class Implementation File)

```objective-c
#import "MyClass.h"

@implementation MyClass

// Synthesize public properties
@synthesize publicProperty = _publicProperty;

// Implement public method
- (void)publicMethod {
    NSLog(@"This is a public method.");
}

// Implement required protocol method
- (void)requiredMethod {
    NSLog(@"This is a required protocol method.");
}

// Implement optional protocol method
- (void)optionalMethod {
    NSLog(@"This is an optional protocol method.");
}

@end
```

### Explanation

- **MyProtocol.h:**
  - Defines a protocol `MyProtocol` with a required method `requiredMethod` and an optional method `optionalMethod`.

- **MyClass.h:**
  - Declares that `MyClass` conforms to the `MyProtocol` protocol.
  - Declares public properties and methods.

- **MyClass.m:**
  - Implements the public methods and the required protocol method.
  - Optionally implements the optional protocol method.

### Key Points

- **Protocol Methods are Public:** All methods declared in a protocol are intended to be implemented as public methods by any class that adopts the protocol.
- **Required vs. Optional:** Protocols can have required methods and optional methods. Required methods must be implemented by any class adopting the protocol, while optional methods can be implemented if needed.
- **Conformance:** A class must publicly declare its conformance to a protocol using the `<ProtocolName>` syntax in its interface declaration.

### Important Notes

- **No Private Protocol Methods:** There is no concept of private protocol methods in Objective-C. If you need to define methods that should not be part of the public interface, you should declare them as private methods within the class implementation.
- **Encapsulation:** While protocol methods are public, you can still encapsulate the internal implementation details of your class by using private methods and properties.

By understanding that protocol methods are public, you can design your classes and protocols effectively, ensuring that the public interface is well-defined and that the internal implementation details are properly encapsulated.