

const data-type variable-name = value;

type notation is c style i.e. `int k`

### NSLog

use `@` before strings

Use `%i` for integers
`%c` for chars
`%f` for floats
`%@` for NSString

```objc
NSLog(@"Hello world!");
```

### functions

#### declaration

```objc
- (return_type) function_name:(argumentType1)argumentName1 
joiningArgument2:(argumentType2)argumentName2 ... 
joiningArgumentn:(argumentTypeN)argumentNameN;
```

e.g
```
-(int) max:(int)num1 andNum2:(int)num2;
```

the argument names can be empty.

#### definition

You can think of `:` as the part of the function-name;
```objc
- (return_type) function_name:(argumentType1) paramName1 
joiningArgument2:(argumentType2)paramName2 ... 
joiningArgumentn:(argumentTypeN)paramNameN
{
   //body of the function
   // use paramName1, paramName2, paramNameN
}
```
The things to the left of the argumentType are `named arguments` and should be used at the calling site.
First argument will not have an argument name only paramName
and the tings to the right of the argumentType are the parameter names and should be used in the implementation.

Would be called as following:
```objc
[someobj function_name:11 joiningArgument2:22 joiningArgumentn:99]
```

The argumentnames can be emtpy. 
If argument names are empty, nothing goes before `:` in callsite. 
e.g. `[someobj fun_name:11 :22 :99]`
but you can never call using param names.


#### calling
```
#import <Foundation/Foundation.h>
@interface SampleClass:NSObject
/* function declaration */
- (int)max:(int)num1 andNum2:(int)num2;
@end

@implementation SampleClass

/* function returning the max between two numbers */
- (int)max:(int)num1 andNum2:(int)num2
{
	int res;
	if(num1>num2)
	{
		res = num1;
	}	
	else
	{
		res = num2;
	}
	return res; 
}
@end

int main()
{
	int a = 10;
	int b = 20;
	int ret;
	SampleClass *sampleClass = [[SampleClass alloc]init];
	/* calling a method to get the maximum value */
	ret = [sampleClass max:a andNum2:b];
	NSLog(@"Maximum Value = %d\n", ret);
	return 0;
}
```

### Structure
The struct statement simply defines a new data type, with more than one member for your Objective-C program.

```
struct [structure tag]
{
	member definition;
	member definition;
	.
	.
	.
	member definition;
   
} [structure variable(s)];

struct STUDENTS
{
	int rollno;
	NSString *name;
	NSString *branch;
	NSSString *batch;
} stud;
```

To access any structure member in Objective-C, you have to use the member access operator, that is, dot (.) operator

```
	struct STUDENTS stud1;        /* Declared stud1 of type STUDENTS */
	struct STUDENTS stud2;        /* Declared stud2 of type STUDENTS */
	
	/* stud1 specification */
	stud1.rollno = 12;
	stud1.name = @"Devraj Singh"; 
	stud1.branch = @"Computer Science & Engineering";
	stud1.batch = @"C";
```

Pointer based access happens with arrow
```
struct STUDENTS *struct_ptr;
struct_ptr = &stud1;
struct_ptr->rollno;
```

### typedef

Typedef is a keyword, used in giving a new name for a data type in Objective-C.

e.g.
```
typedef struct BOOKS
{
	NSString *title;
	NSString *author;
	NSString *subject;
	int bookid;
} Book;

int main()
{

	Book book;
	book.title = @"Objective-C Typedef Tutorial";
	book.author = @"codescracker";
	book.subject = @"Objective-C Programming Tutorial";
	book.book_id = 100;
}
```
### id data type

Generic data type that can store value of any data type.
e.g.
```objc*
- (id) method: (int) apples;
```
Can be used to `store objects of any type` in a variable with `id` data type.
```objc
id han;
Car* c = [[Car alloc] init];
Man* m = [[Man alloc] init];
// assign any value to `id` type variable
han = Car;
han = Man;
```

### Error/Exception handling

```objc
@try {
	// statements
}
@catch (NSException * e) {
	// handler code
}
```

### Classes

When you are defining your own classes, you should at a minimum inherit from `NSObject`.

Class names must be unique across the whole app, even across included libraries and frameworks.

1. In Objective-C, class is defined in two sections named `@interface` and `@implementation`
2. Classes hides the implementation of an object
3. Almost everything is in the form of objects
4. Objects contains instance variables
5. Objects and instance variables have scope
6. Properties are used to provide access to the class instance variables in other classes
7. Objects receive messages and objects are often referred as receivers

The `interface` of a class defines expected interactions/messages. written in `.h`.
The `implementation` of a class provides its internal behavior. written in `.m`, also need to import header containing the `interace` above.

A class definition starts with the keyword named `@interface` followed by the interface(class) `name`; and the `class body`, enclose by a pair of curly braces. All the classes are derived from the base class that is `NSObject` in Objective-C. This is the superclass of all the classes in Objective-C.

```objc
// interface syntax
@interface Box:NSObject
{
    /* these are instance variables
    The instance variables are private and are only accessible inside the class
     */
    double len;   // Length of Box
    double bre;   // Breadth of Box
}
// properties are intended for public access
@property(nonatomic, readwrite) double hei;
@end
```

property attributes like `nonatomic`, `readwrite`, `readonly` indicate data accessibility and storage considerations.

`methods`: `-` in front of a method indicates it is an instance method, means it can be called on any instance of the class. e.g. `- (void)someMethod`. Within an instance method, you can directly use instance vars
without a need of `this` or `self` etc.

`self`: It refers to the receiver of the message, i.e. object to the left of of `.` or in case of objc 
the value `a` in `[a b:c]` where `b` is the method being called, `c` is the argument value and `a` is the receiver.

```objc
#import "Person.h"
@implementation Person
- (void)setAge: (int)a {
	age = a;
}
- (void)setWeight: (int)w {
	weight = w;
}
- (void)printPerson {
	NSLog(@"this person is %i years old and weighs %i kg", age, weight);
}
@end
```

#### Access modifiers

```objc
@interface Tuna: NSObject{
@private // only members of this class allowed to access
	int x;
	int y;
@protected // default: this class + subclasses
	int z;
	int a;
}
```

### enum

Introduces a data type where values are only possible from given list.
```objc
enum day {m, t, w, h, f}
enum day today = w;
```

### class categories

Add functionality to existing source (without subclassing).
Many times you cannot modify original interface or implementation
because it is a framework class e.g. `NSString` etc.

Objective C allows you to `add your own methods` to existing
classes through categories and class extensions.

Where to add this code:
In a separate header file like `XYZPerson+XYZPersonNameDisplayAdditions.h`
and implementation in `XYZPerson+XYZPersonNameDisplayAdditions.m`.

**Note** - It is not possible to declare
additional instance variable in a category. The only way to add a traditional property backed by new instance variable is to use class extension, not category.

1. `Categories add method to existing classes`.
Syntax is same as class (which already exists) followed by category name in parens.
```objc
@interface ClassName (CategoryName)
- (int) someMethod;
@end
```

```objc
@implementation ClassName (CategoryName)
- (int) someMethod {
	// something something
}
@end
```
Any methods declared in category will be available to all instances
of original class as well as any subclasses of original class.
At runtime there is no difference between method added by category vs original class.

Category method names should not clash.
In order to prevent this undefined behavior, best practice
to add prefix to method names in categories on framework classes.
e.g. `xyz_methodname` where `xyz` identifiers your app.

2. Class Extensions extend the internal implementation.
##### Class extension
Similar to a Cateogry, but only be added to a class for which you have
source code at compile time.

Syntax is similar to category, but no name given to Category, so
class extensions are often referred to as anonymous categories.
```objc
@interface ClassName ()
@end
```
e.g.
```objc
@interface XYZPerson () {
	int _someCustomInstanceVar;
}
- (int) someMethod;
@property NSObject * extraProperty;// property allowed in class extension
@end
```


### global/extern vars

vars that are global in the process, accesss across multiple files
Defined outside main function.
Prefix variable with lowercase `g`.
e.g. `int gStarted = 1`.

```objc
// main.m
int gStarted = 1; // global var definition
int main(int argc, const char* argv[]) {
	NSLog(@"%i", gStarted);
	return 0;
}
```
Usage of global vars in other files via `extern`:
```objc
// Person.m
@implementation Person
-(void) changeGstart{
	extern int gStarted;
	gStarted = 42;
}
@end
```


#### `@class` vs import

`#import` brings the entire header file in question into the current file; any files that THAT file #imports are also included.

`@class`, on the other hand (when used on a line by itself with some class names), just tells the compiler "Hey, you're going to see a new token soon; it's a class, so treat it that way).

This is very useful when you've got the potential for 'circular includes'; ie, `Object1.h` makes reference to `Object2`, and `Object2.h` makes reference to `Object1`. If you `#import` both files into the other, the compiler can get confused as it tries to `#import Object1.h`, looks in it and sees `Object2.h`; it tries to `#import Object2.h`, and sees `Object1.h`, etc.

If, on the other hand, each of those files has `@class Object1`; or `@class Object2;`, then there's no circular reference. Just be sure to actually #import the required headers into your implementation (.m) files.

#### Object allocation and initialization

`alloc` is a class method, where as `init` is an instance method on `NSObject`.

`alloc` will allocate enough memory to hold instance variables for an object.
`alloc` initializes new object's `isa` instance variable so that it points to object's class. all other
variables are set to 0. Usually to be followed by `init` which can be compared to a constructor.

```
Box box1 = [[Box alloc]init];
Box box2 = [[Box alloc]init];
```

Every object that declares instance variables should implement an initializing method, unless 
the default everything-zero initialization is sufficient. If object does not implement 
an initializer, cocoa invokes the initializer of nearest ancestor instead.

`NSObject` declares the `init` prototype for initializers, iti is an instance method
typed to return object of type `id`.
The initializers can take one or more parameters, the only requirement is that
initializing method begins with the letters `init`.

### Class properties

Introduced using `@property` in `interface declaration` i.e. the header file.
Compiler auto generates an instance var with an underscore along with setters and getters for that 
name. Morever the usage compared to method calls is with a `.` e.g. `instanceObj.propname`.
```objc
@interface Person
- @property (copy) NSString* name;// will generate ivar "_name" and getters/setters as "name" used via . and also method setName
@end
```

`@synthesize` a property within an implementation, allows you to use custom prop name instead of `_propName` ivar.

