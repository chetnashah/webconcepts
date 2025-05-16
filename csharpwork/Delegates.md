
## Delegate definition is a type definition (not a variable definition)

A `delegate` is a type that defines a method signature (think function type, holding function pointer or reference). It can be used to encapsulate a method with a specific signature, allowing methods to be passed as parameters or assigned to variables.

1. Delegates allow methods to be passed as parameters.
2. Delegates can be used to define callback methods.
3. Delegates can be chained together, such as calling multiple methods on a single event.
4. Methods don't have to match the delegate type exactly. For more information, see Using Variance in Delegates.
5. Useful in async programming
6. Makes lambda expressions first class objects by declaring a delegate type.

**A delegate has no knowledge of the instance type aside from the method it wraps. A delegate can refer to any type of object as long as there's a method on that object that matches the delegate signature.**

## Callback function type declared with delegate keyword

### Method reference style assignment
```csharp
// type declaration
public delegate void Callback(string message);

// Usage
// Create a method for a delegate.
public static void PrintMessage(string message)
{
    Console.WriteLine(message);
}
// Method reference assignment
Callback callback = PrintMessage;
// Call the delegate
callback("Hello, World!"); // Output: Hello, World!
```

### Delegate instantiation using `new` keyword
The method that implements delegate function signature must be passed to the delegate type constructor as the only parameter.
```csharp
Callback callback = new Callback(DelegateMethod);
callback("Hello, World!"); // Output: Hello, World!
```

### Lambda expression assignment
```csharp
Callback callback = (message) => Console.WriteLine(message);
callback("Hello, World!"); // Output: Hello, World!
```

## Delegate multicasting with `+=` and `-=` operators
### Multicast delegate

A multicast delegate is a delegate that can hold references to multiple methods. When invoked, it calls all the methods in its invocation list in the order they were added.

Multicast delegates are used extensively in event handling. Event source objects send event notifications to recipient objects that registered to receive that event. To register for an event, the recipient creates a method designed to handle the event, then creates a delegate for that method and passes the delegate to the event source. The source calls the delegate when the event occurs. The delegate then calls the event handling method on the recipient, delivering the event data

```csharp
        MyDelegate allDelegates = myDelegate + myLambdaDelegate + myRefDelegate;
        Console.WriteLine("Number of delegates in allDelegates: " + allDelegates.GetInvocationList().Length);
        allDelegates("Hello from All Delegates!");
```