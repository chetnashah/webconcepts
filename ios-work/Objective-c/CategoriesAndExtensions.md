
https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/CustomizingExistingClasses/CustomizingExistingClasses.html#//apple_ref/doc/uid/TP40011210-CH6-SW1

Sometimes, you may find that you wish to extend an existing class by adding behavior that is useful only in certain situations.
Furthermore, it might not make sense to subclass the existing class.

Instead, Objective-C allows you to add your own methods to existing classes through `categories` and `class extensions.`


## Categories (add method to existing class)

If you need to add a method to an existing class, use a category.

**Use parentheses to specify category with interface class definition**

The syntax to declare a category uses the @interface keyword, just like a standard Objective-C class description, but does not indicate any inheritance from a subclass. Instead, it specifies the name of the category in parentheses.


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

## Class extensions (extend internal implementation)

Class extension can only be added to a class for which you have the source code at compile time

Because no name is given in the parentheses, class extensions are often referred to as `anonymous categories`.

**Unlike regular categories, a class extension can add its own properties and instance variables to a class.**

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


