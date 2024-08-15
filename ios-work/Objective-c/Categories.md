
## Declaration

Categories in Objective-C should be declared and implemented in separate header (.h) and implementation (.m) files. Here’s a step-by-step guide on where and how to declare and implement categories:

**By default, all methods declared in a category are public and can be called from anywhere.**

### Declaration
1. **Header File (.h)**:
   - Create a new header file for the category, typically named after the class and the category name. For example, if you are adding a category to `NSString`, you might name the header file `NSString+Reversal.h`.

   ```objc
   // NSString+Reversal.h
   @interface NSString (Reversal)

   - (NSString *)reverseString;

   @end
   ```

### Implementation
2. **Implementation File (.m)**:
   - Create a corresponding implementation file named `NSString+Reversal.m`.

   ```objc
   // NSString+Reversal.m
   #import "NSString+Reversal.h"

   @implementation NSString (Reversal)

   - (NSString *)reverseString {
       NSMutableString *reversedString = [NSMutableString stringWithCapacity:[self length]];
       [self enumerateSubstringsInRange:NSMakeRange(0, [self length])
                                options:(NSStringEnumerationReverse | NSStringEnumerationByComposedCharacterSequences)
                             usingBlock:^(NSString *substring, NSRange substringRange, NSRange enclosingRange, BOOL *stop) {
                                 [reversedString appendString:substring];
                             }];
       return reversedString;
   }

   @end
   ```

### Importing the Category
3. **Using the Category**:
   - Import the category header file in any file where you want to use the category methods.

   ```objc
   // SomeOtherFile.m
   #import "NSString+Reversal.h"

   NSString *originalString = @"Hello, World!";
   NSString *reversedString = [originalString reverseString];
   NSLog(@"Reversed String: %@", reversedString);
   ```

### Summary
- **Declaration**: In a separate header file (e.g., `NSString+Reversal.h`).
- **Implementation**: In a corresponding implementation file (e.g., `NSString+Reversal.m`).
- **Usage**: Import the category header file wherever you need to use the category methods.

This approach keeps your code organized and makes it clear which methods are being added to the class through categories.