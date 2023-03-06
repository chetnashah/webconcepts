Try online swift at

https://swiftfiddle.com/

Good guides:
https://appventure.me/pages/guides.html

## How to prevent swift program from terminating?
We wneed to make it interactive by adding `RunLoop.main.run()` at the end of swift program

## if/switch are statements, not expressons!

if/switch blocks do not return values, since they are statements.

## initializers

Unlike Objective-C initializers, Swift initializers do not return a value.

Only for failable initalizeers, we can return `nil`.

Swift initializers don’t return a value, while Objective-C initializers return self.

Swift initializers must initialize all non-inherited properties before calling `super.init()`, while Objective-C initializers can set inherited properties before or after calling `super.init()`.

## It is ok to have `let` for optional variables

optional variables are like enums. can be set once, but cannot be changed later. If they gonna change later, use `var` instead.
Cannot change after 
```swift
let k : String? = nil
let j : String? = "ADsf"
//Error
// k = "Hi"
```