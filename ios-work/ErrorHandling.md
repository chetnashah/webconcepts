

in iOS land, Errors are normal, Exceptions are not

## NSException


Following properties:
1. `name`	An NSString that uniquely identifies the exception.

2. `reason`	An NSString that contains a human-readable description of the exception.

3. `userInfo`	An NSDictionary whose key-value pairs contain extra information about the exception. This varies based on the type of exception.

**Handled using try/catch** - exception-handling capabilities are not the most efficient, so you should only use `@try/@catch()` blocks to test for truly exceptional circumstances.

### Wellknown exceptions

`NSRangeException`	Occurs when you try to access an element that’s outside the bounds of a collection.
`NSInvalidArgumentException`	Occurs when you pass an invalid argument to a method.
`NSInternalInconsistencyException`	Occurs when an unexpected condition arises internally.
`NSGenericException`	Occurs when you don’t know what else to call the exception


## (NS)Error

If you’re trying to handle a problem that’s supposed to occur, you should be using an error object, not an exception.

**Errors must be inspected explicitly by the programmer, they are convention in callbacks, does not have any effect on program execution order** - Many Foundation APIs follow this convention.

Errors represent a failed operation in an iOS or OS X application. It’s a standardized way to record the relevant information at the point of detection and pass it off to the handling code.

The NSError class encapsulates the details surrounding a failed operation. Its main properties are similar to NSException.

Property	Description
1. `domain`	An NSString containing the error’s domain. This is used to organize errors into a hierarchy and ensure that error codes don’t conflict.
2. `code`	An NSInteger representing the ID of the error. Each error in the same domain must have a unique value.
3. `userInfo`	An NSDictionary whose key-value pairs contain extra information about the error. This varies based on the type of error.