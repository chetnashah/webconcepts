
https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html#//apple_ref/doc/uid/TP40011210-CH6-SW1

Sometimes, you may find that you wish to extend an existing class by adding behavior that is useful only in certain situations.
Furthermore, it might not make sense to subclass the existing class.

Instead, Objective-C allows you to add your own methods to existing classes through `categories` and `class extensions.`


## Categories (add method to existing class)

If you need to add a method to an existing class, use a category.

**Use parentheses to specify category with interface class definition**

The syntax to declare a category uses the @interface keyword, just like a standard Objective-C class description, but does not indicate any inheritance from a subclass. Instead, it specifies the name of the category in parentheses.

You use categories to **define additional methods of an existing class—even one whose source code is unavailable to you—without subclassing.**

**category can’t declare additional data/instance variables for the class; it includes only methods**

```objc
#include <ClassName.h>

// ClassName.m
@interface ClassName (CategoryName)

// extra method
- (NSString *)lastNameFirstNameString;

@end
```

**A category is usually declared in a separate header file and implemented in a separate source code file**

In the case of XYZPerson, you might declare the category in a header file called `XYZPerson+XYZPersonNameDisplayAdditions.h`.


e.g

```objc
// Car+Maintenance.h
#import "Car.h"

@interface Car (Maintenance)

- (BOOL)needsOilChange;
- (void)changeOil;
- (void)rotateTires;
- (void)jumpBatteryUsingCar:(Car *)anotherCar;

@end
```
impl of category
```objc
// Car+Maintenance.m
#import "Car+Maintenance.h"

@implementation Car (Maintenance)

- (BOOL)needsOilChange {
    return YES;
}
- (void)changeOil {
    NSLog(@"Changing oil for the %@", [self model]);
}
- (void)rotateTires {
    NSLog(@"Rotating tires for the %@", [self model]);
}
- (void)jumpBatteryUsingCar:(Car *)anotherCar {
    NSLog(@"Jumped the %@ with a %@", [self model], [anotherCar model]);
}

@end
```

### (Stored/syntehsized) Properties do not work on categories

Reason: **adding properties to a category is prohibited because it changes the object’s memory allocation and requires recompilation. Categories are meant to add new methods without changing the object’s structure.**

categories can be used to declare either instance methods or class methods but are not usually suitable for declaring additional properties. It’s valid syntax to include a property declaration in a category interface, but it’s not possible to declare an additional instance variable in a category. 

This means the compiler won’t synthesize any instance variable, nor will it synthesize any property accessor methods. 
You don't get the ivars and the methods synthesised in case of a category, but nothing prevents you from declaring them this way (under the hood it could be an associated ivar or a computed value)

You can write your own accessor methods in the category implementation, but you won’t be able to keep track of a value for that property unless it’s already stored by the original class (instance vars).

```objc
// Car.h
@interface Car : NSObject
@property (copy) NSString* name;
@end

@interface Car (CarCat)
@property NSString* carCatName;
- (void) hello;
@end

// main.m
    Car* cc = [[Car alloc] init];
    cc.carCatName = @"asdf"; // CRASH!
    NSLog(@"cc car Cat name = %@ ", cc.carCatName);// CRASH!
```

Workaround - use associated objects: https://nshipster.com/associated-objects/ to support properties on categories.


## Class extensions (empty parentheses with e.g. `@interface className ()`)

**A class extension is a set of declarations/members that is private to the class, usually declared in implementation i.e. `.m` file or `Original+Private.h` and then only implementation files include `Original+Private.h` for reference**

Class extension can only be added to a class for which you have the source code at compile time

Because no name is given in the parentheses, class extensions are often referred to as `anonymous categories`.

**Unlike regular categories, a class extension can add its own properties and instance variables to a class.**

`Relationship with properties` - **We can add extra instance variables and properties in class extension** but not in category. Infact same name properties with different attributes will override/redifine the original property.

Class extensions are often used to **extend the public interface with additional private methods or properties for use within the implementation of the class itself**. It usually makes sense to add these private extensions in the implementation file i.e. `.m` files itself.

It’s common, for example, to define a property as readonly in the interface, but as readwrite in a class extension declared above the implementation, in order that the internal methods of the class can change the property value directly.

e.g.
```objc
// XYZPerson.m
#include<XYZPerson.h>

// Private extension to the public interface(coz placed in .m file), note parens after interface name
@interface XYZPerson () { // note empty parantheses for missing category
    id _someCustomInstanceVariable; 
}
- (void)somePrivateMethod;
@end

// actual implementation
@implementation XYZPerson
...
@end
```


## Managing private/internal class extensions via private headers(private members like private methods/private property)

Named like : `ClassName+Private.h`

```objc
//BNRPerson.h
// this is public interface of the class
@interface BNRPerson 
- (void) publicMethod;
@end
```

```objc
// BNRPerson+Private.h
// all the private extensions go here, anonyone interested in accessing private/internal api must include this header
@interface BNRPerson ()
- (void) hiddenMethod;
@end
```

**Class implementer will need to import both public+private API to fulfill complete contract of class.**
e.g. `BNRPerson.m` will need to import both `BNRPerson.h` and `BNRPerson+Private.h`.

```objc
#import <BNRPerson.h>
#import <BNRPerson+Private.h>

@implementation BNRPerson 

- (void) publicMethod {
    NSLog(@"I am public method");
}

- (void) hiddenMethod {
    NSLog(@"I am hidden method");
}
@end
```

Usage of internal api in internal classes, private headers are not exposed outside of module/framework, but are available with module/framework.
```objc
// InternalModule.m
#import "BNRPerson.h"
#import "BNRPerson+Private.h" // now we can also access internal members/extension
// now internal module has access to both public/private api of BNRPerson class
```

## Inheritance and extensions

**A subclass has no access to its superclass’s class extensions.**