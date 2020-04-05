

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
and the tings to the right of the argumentType are the parameter names and should be used in the implementation.

Would be called as following:
```objc
[someobj function_name:11 joiningArgument2:22 joiningArgumentn:99]
```

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