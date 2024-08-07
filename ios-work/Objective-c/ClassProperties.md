

**Properties Control Access to an Object’s Values**

Syntax: `@property (attribute-list) property-type property-name;`


`@property` can also appear in the declaration of a `protocol` or `category` or `extension` (This is useful if you want to hide the declaration of private properties).

## Implementation of properties

By default, a readwrite property will be backed by an instance variable, which will again be synthesized automatically by the compiler.

An instance variable is a variable that exists and holds its value for the life of the object. The memory used for instance variables is allocated when the object is first created (through alloc), and freed when the object is deallocated.

Unless you specify otherwise, **the automatically synthesized instance variable has the same name as the property, but with an underscore prefix.** For a property called `firstName`, for example, the **synthesized instance variable** will be called `_firstName`. you rarely need these instance variables.


## List of property attributes

![here](images/classproperties.png)

* By default, **properties are atomic** - i.e thread safe, you can specify `nonatomic` to make it faster.
* By default, **properties are readwrite** - i.e. getters and setters are generated.
* By default, **properties are strongly held, also known as retain**, if you want weak references use `weak` attribute.

`assign` - use for primitives.

If you do not have an object, you cannot use strong, because strong tells the compiler how to work with pointers. But if you have a primitive (i.e. int, float, bool, or something without the little asterisk after the type), then you use `assign`, and that makes it work with primitives.

`copy` - mostly used for strings. copy
Specifies that a copy of the object should be used for assignment.
The previous value is sent a `release` message.
The copy is made by invoking the copy method. 

Lastly, there’s a keyword called copy. Copy I have seen most commonly with strings. It works really well with all kinds of mutable objects. If you set a copy property, instead of just setting both references to the same object, what it actually does is it makes a copy of the object you are setting and then sets the property to that copy. If I write in a string, it just copies that string so there are now two copies of that string. It leaves mine with me at the variable I passed in and just saves the copy. That way I can keep going with my string and I can modify it, and the one that I set remains the way that it was when I set it.

* `nonnull` or `nullable` - specify as an attribute for good interop with swift side types. https://developer.apple.com/documentation/swift/designating-nullability-in-objective-c-apis

e.g. 
```objc
@interface MyList : NSObject
- (nullable MyListItem *)itemWithName:(nonnull NSString *)name;
- (nullable NSString *)nameForItem:(nonnull MyListItem *)item;
@property (copy, nonnull) NSArray<MyListItem *> *allItems;
@end
```
converts to
```swift
class MyList: NSObject {
    func item(withName name: String) -> MyListItem?
    func name(for item: MyListItem) -> String?
    var allItems: [MyListItem]
}
```

## setter property access is same as dot based assignment

**Note** - setter accessor has name `setPropName`.

Dot Syntax Is a Concise Alternative to Accessor Method Calls



```objc
mikey.weight = 98;
// is same as
[mikey setWeight] = 98; // setter is auto synthesized from property
```

```objc
// synthesized accessor
- (void)setWeight: (int)weight; // set accessor
- (int)weight; // get accessor
```

## getter property accessor is same as dot based access

**NOte - No `get` keyword in accessor method, accessor method name is same as property name** 

Dot Syntax Is a Concise Alternative to Accessor Method Calls

```objc
float w = mikey.height;
float w = [mikey height]; // note no get 
```

## How to access properties declared in implementation (`.m`) file if they were declared in `.h` file?

Ans: use `self`.

```objc
@implementation BNRPerson
- (float)bodyMassIndex {
    float h = [self heightInMeters];           // heightInMeters property was declared in interface/.h file
    return [self weightInKilograms] / (h * h); // weightInKilograms property was declared in interface/.h file
}
@end
```
## properties holding NSString or NSAArray should have copy attribute, why?

## Dot notation for calling accessors

dot property access calls the accessor for get/set (which themsselves are auto synthesized for properties).


## type of instance var and type of property may not be same

You can expose a read-only var, while being backed by read-write property.
e.g. `NSArray` as a public interface in header, but `NSMutableArray` in implementation.

## What is instance variables?

An instance variable is unique/private to a class. By default, only the class and subclasses can access it. Therefore, as a fundamental principal of object-oriented programming, instance variables (ivars) are private—they are encapsulated by the class.

unless an ivar is declared in a public header it is difficult to even determine that such an ivar exists

## property

a property is a public value that may or may not correspond to an instance variable. If you want to make an ivar public, you'd probably make a corresponding property. But at the same time, instance variables that you wish to keep private do not have corresponding properties, and so they cannot be accessed from outside of the class. You can also have a calculated property that does not correspond to an ivar.

## Define instance vars without property

If you do need to define your own instance variables without declaring a property, you can add them inside braces at the top of the class interface or implementation, like this:

```objc
@interface SomeClass : NSObject {
    NSString *_myNonPropertyInstanceVariable;
}
...
@end
 // or recommended
@implementation SomeClass {
    NSString *_anotherCustomInstanceVariable;
}
...
@end
```

## Have a Immutable public property backed by mutable local instance var

```objc
@interface BNREmployee : BNRPerson

@property int employeeId; // 0,1,3
@property (nonatomic, strong, readonly) NSArray *tags; // Immutable interface

@end
```


In implementaiton/private parts:
```objc
// BNREmployee.m
@interface BNREmployee (){
    NSMutableArray *_tags; // mutable internal backing storage.
}
@end

@implementation BNREmployee

- (void)addTag:(NSString*) tag {
    if(!_tags) {
        _tags = [[NSMutableArray alloc] init];
    }
    [_tags addObject:tag];
}
```

## Even subclasses cannot access class instance vars, only properties

In `Employee.m`, even though `Employee` is a subclass of `Person`,
you cannot access `_weight` of `Person`, only allowed way is property accessors.

## Marking variables as weak with `__weak typename name`;

If you are explicitly declaring a pointer variable that should be weak, mark it with `__weak` like this:

```objc
__weak BNRPerson *parent;
```

## property redeclaration (in subclasses or implementations)

The ability to redeclare a read-only property as read/write enables two common implementation patterns: 
1. a mutable subclass of an immutable class (NSString, NSArray, and NSDictionary are all examples) and 
2. a property that has a public API (header) that is readonly but a private readwrite implementation (file) internal to the class. 

The following example shows using a class extension to provide a property that is declared as read-only in the public header but is redeclared privately as read/write.

```objc
// public header file
@interface MyObject : NSObject
@property (readonly, copy) NSString *language;
@end
 
// private implementation file
@interface MyObject ()
@property (readwrite, copy) NSString *language;
@end
 
@implementation MyObject
@synthesize language;
@end
```

## Computed property (if you override getter/setter of the property to not refer backing field)

```objc
// Declare a computed property called radius
@property (assign, nonatomic) CGFloat radius;

// Implement the getter method
- (CGFloat)radius {
  // Return some computed value based on other properties or variables
  return self.width / 2;
}

// Implement the setter method
- (void)setRadius:(CGFloat)radius {
  // Update some other properties or variables based on the new value of radius
  self.width = radius * 2;
}
```