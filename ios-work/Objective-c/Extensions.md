
## Extensions are for private stuff

## You can have multiple extensions of same class to classify/organize methods & properties

Yes, in Objective-C, you can place multiple extensions of a class in separate files. This can be useful for organizing your code, especially in larger projects where different aspects of a class might be implemented by different developers or teams. Each extension can be placed in its own `.m` file, and you can include the necessary headers to ensure everything is properly linked.

### Example

Here's an example demonstrating the use of multiple extensions for a class, each placed in a separate file:

#### MyClass.h (Header File)

```objective-c
#import <Foundation/Foundation.h>

@interface MyClass : NSObject

// Public properties
@property (nonatomic, strong) NSString *publicProperty;

// Public methods
- (void)publicMethod;

@end
```

#### MyClass.m (Main Implementation File)

```objective-c
#import "MyClass.h"
#import "MyClass+Extension1.h"
#import "MyClass+Extension2.h"

@implementation MyClass

// Synthesize public properties
@synthesize publicProperty = _publicProperty;

// Implement public method
- (void)publicMethod {
    NSLog(@"This is a public method.");
}

@end
```

#### MyClass+Extension1.h (Header File for First Extension)

```objective-c
#import "MyClass.h"

@interface MyClass ()

// Private properties for the first extension
@property (nonatomic, strong) NSString *privateProperty1;

// Private methods for the first extension
- (void)privateMethod1;

@end
```

#### MyClass+Extension1.m (Implementation File for First Extension)

```objective-c
#import "MyClass+Extension1.h"

@implementation MyClass (Extension1)

// Synthesize private properties
@synthesize privateProperty1 = _privateProperty1;

// Implement private method from the first extension
- (void)privateMethod1 {
    NSLog(@"This is a private method from the first extension.");
}

@end
```

#### MyClass+Extension2.h (Header File for Second Extension)

```objective-c
#import "MyClass.h"

@interface MyClass ()

// Private properties for the second extension
@property (nonatomic, strong) NSString *privateProperty2;

// Private methods for the second extension
- (void)privateMethod2;

@end
```

#### MyClass+Extension2.m (Implementation File for Second Extension)

```objective-c
#import "MyClass+Extension2.h"

@implementation MyClass (Extension2)

// Synthesize private properties
@synthesize privateProperty2 = _privateProperty2;

// Implement private method from the second extension
- (void)privateMethod2 {
    NSLog(@"This is a private method from the second extension.");
}

@end
```

### Explanation

- **MyClass.h:**
  - This file contains the public interface of the main class, including public properties and methods.

- **MyClass.m:**
  - This file contains the main implementation of the class and includes the headers for the extensions (`MyClass+Extension1.h` and `MyClass+Extension2.h`).

- **MyClass+Extension1.h and MyClass+Extension1.m:**
  - These files contain the first extension, declaring and implementing additional private properties and methods.

- **MyClass+Extension2.h and MyClass+Extension2.m:**
  - These files contain the second extension, declaring and implementing additional private properties and methods.

### Benefits

- **Code Organization:** Placing extensions in separate files helps organize the code better, especially in large projects.
- **Modularity:** Different aspects of the class can be implemented in separate files, making it easier to manage and update.
- **Collaboration:** Different developers or teams can work on different extensions without interfering with each other.

### Important Notes

- **Header Inclusion:** Ensure that the main implementation file (`MyClass.m`) includes the headers for the extensions (`MyClass+Extension1.h` and `MyClass+Extension2.h`).
- **Naming Conventions:** Use clear and consistent naming conventions for the extension files to make it easy to understand their purpose.

By placing multiple extensions in separate files, you can effectively organize and modularize your class implementation, making it easier to manage and maintain.