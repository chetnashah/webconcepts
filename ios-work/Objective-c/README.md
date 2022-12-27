

## Sending messages to `nil` does not produce error

```objc
Dog *fido = nil;
[fido goGetTheNewspaper]; // cool!
```

Important thing #1: If you are sending messages and nothing is happening, make sure you are not
sending messages to a pointer that has been set to `nil`.

Important thing #2: If you send a message to `nil`, the return value is meaningless and should be
disregarded.

## id for generic pointer (like auto)

## Create Arrays using `NSArray` (Immutable by default)

**Once created, cannot be modified, i.e. no element addition/deletion allowed**

```objc
// Create three NSDate objects
NSDate *now = [NSDate date];
NSDate *tomorrow = [now dateByAddingTimeInterval:24.0 * 60.0 * 60.0];
NSDate *yesterday = [now dateByAddingTimeInterval:-24.0 * 60.0 * 60.0];
// Create an array containing all three
NSArray *dateList = @[now, tomorrow, yesterday];
```

![Ns array](images/nsarray.png)

Access and length
```objc
int len = [dateList count]; // count instead of length
NSDate* now = dateList[0]; // index by num
```

## Mutable/Changeable arrays using NSMutableArray

```objc
// Create an empty mutable array
NSMutableArray *dateList = [NSMutableArray array];
// Add two dates to the array
[dateList addObject:now];
[dateList addObject:tomorrow];
// Add yesterday at the beginning of the list
[dateList insertObject:yesterday atIndex:0];
// Iterate over the array
for (NSDate *d in dateList) {
NSLog(@"Here is a date: %@", d);
}
// Remove yesterday
[dateList removeObjectAtIndex:0];
NSLog(@"Now the first date is %@", dateList[0]);
```


## self

Inside any method, you have access to the implicit local variable self. **self is a pointer to the object
that is running the method. It is used when an object wants to send a message to itself.**


## What is an umbrella header of a framework?

An umbrella header is named by framework name usually(`<FrameworkName>.h`) 

##

You include framework header files in your code using the #include directive. If you are working in Objective-C, you may use the #import directive instead of the #include directive. The two directives have the same basic results. but the #import directive guarantees that the same header file is never included more than once. There are two ways for including framework headers:

```objc
#include <Framework_name/Header_filename.h>
#import <Framework_name/Header_filename.h>
```


https://gist.github.com/bgromov/f4327343ad67a5f7216262ccbe99c376