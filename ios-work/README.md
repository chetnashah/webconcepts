resources:

https://github.com/jrasmusson/swift-arcade

https://www.vadimbulavin.com/

https://www.avanderlee.com/

## Core graphics

https://github.com/jrasmusson/swift-arcade/tree/master/Animation/CoreGraphicsIntro

Everything in coregraphics is driven by `context`i.e. `let ctx = UIGraphicsGetCurrentContext()` in a `ViewController, draw method`, think of this equivalent to `Paint/Canvas` state holder in other UI frameworks.

## new is just sugar over alloc + init

```objc
+ (id) new
{
    return [[self alloc] init];
}
```

## Data/NSData is byte array convinience class

Object oriented interface for blobs of bytes/memory.

Can be used to hold bytes from files/URL.
