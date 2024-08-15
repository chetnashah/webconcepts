In Objective-C, instance variables can be declared in several ways. Here are the different methods to declare instance variables:

### 1. Using the `@interface` Block

Instance variables can be declared directly within the `@interface` block of a class. This is the traditional way to declare instance variables. Mark these instance vars with `@public`, `@private`, or `@protected` to specify their access level.

```objective-c
@interface MyClass : NSObject {
    // Public instance variable
    @public
    NSString *publicInstanceVariable;

    // Private instance variable
    @private
    NSString *privateInstanceVariable;

    // Protected instance variable
    @protected
    NSString *protectedInstanceVariable;
}

// Public properties and methods
@property (nonatomic, strong) NSString *publicProperty;
- (void)publicMethod;

@end
```

### 2. Using the `@implementation` Block

Instance variables can also be declared within the `@implementation` block. This approach is less common but is useful for **declaring private instance variables that are not exposed in the header file.**

```objective-c
@interface MyClass : NSObject

// Public properties and methods
@property (nonatomic, strong) NSString *publicProperty;
- (void)publicMethod;

@end

@implementation MyClass {
    // Private instance variable
    NSString *privateInstanceVariable;
}

// Implementation of methods
- (void)publicMethod {
    NSLog(@"This is a public method.");
}

@end
```

### 3. Using Properties

Instance variables can be automatically synthesized by declaring properties. The compiler will generate the corresponding instance variables and accessor methods.

```objective-c
@interface MyClass : NSObject

// Public properties
@property (nonatomic, strong) NSString *publicProperty;

// Public methods
- (void)publicMethod;

@end

@implementation MyClass

// Private properties
@property (nonatomic, strong) NSString *privateProperty;

// Implementation of methods
- (void)publicMethod {
    NSLog(@"This is a public method.");
}

@end
```

In this case, the instance variables `_publicProperty` and `_privateProperty` are automatically created by the compiler.

### 4. Using `@synthesize`

You can explicitly synthesize properties to create instance variables with custom names.

```objective-c
@interface MyClass : NSObject

// Public properties
@property (nonatomic, strong) NSString *publicProperty;

// Public methods
- (void)publicMethod;

@end

@implementation MyClass

// Explicitly synthesize properties
@synthesize publicProperty = _myPublicProperty;

// Implementation of methods
- (void)publicMethod {
    NSLog(@"This is a public method.");
}

@end
```

In this example, the instance variable `_myPublicProperty` is explicitly created for the property `publicProperty`.

### Summary

- **Using the `@interface` block:** Traditional way to declare instance variables.
- **Using the `@implementation` block:** Useful for declaring private instance variables.
- **Using properties:** Automatically synthesized by the compiler.
- **Using `@synthesize`:** Explicitly synthesize properties with custom instance variable names.

Each method has its use cases, and the choice depends on the specific requirements of your class design.