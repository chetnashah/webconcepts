

## Simplest logging

Use `NSLog` on objc, and `print` in swift.

## Creating log objects

In Swift, create a `Logger` structure and use its methods to generate log messages. Import `import OSLog` in swift to use `Logger`.ß

In Objective-C, create an `OSLog` object and pass it to logging functions.

### Subsystem 
identifies a large functional area within your app or apps

### Category

The category string identifies a particular component or module in a given subsystem. For example, you might define separate strings for your app’s user interface, data model, and networking code.

### Loglevel


