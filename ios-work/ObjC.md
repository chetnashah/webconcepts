

const data-type variable-name = value;

type notation is c style i.e. `int k`

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

```
- (return_type) function_name:(argumentType1) argumentName1 
joiningArgument2:(argumentType2)argumentName2 ... 
joiningArgumentn:(argumentTypeN)argumentNameN
{
   body of the function
}
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

1. In Objective-C, class is defined in two sections named @interface and @implementation
2. Classes hides the implementation of an object
3. Almost everything is in the form of objects
4. Objects contains instance variables
5. Objects and instance variables have scope
6. Properties are used to provide access to the class instance variables in other classes
7. Objects receive messages and objects are often referred as receivers

A class definition starts with the keyword named `@interface` followed by the interface(class) `name`; and the `class body`, enclose by a pair of curly braces. All the classes are derived from the base class that is `NSObject` in Objective-C. This is the superclass of all the classes in Objective-C.

```
@interface Box:NSObject
{
    /* these are instance variables
    The instance variables are private and are only accessible inside the class
     */
    double len;   // Length of Box
    double bre;   // Breadth of Box
}
@property(nonatomic, readwrite) double hei;
@end
```

#### alloc

```
Box box1 = [[Box alloc]init];
Box box2 = [[Box alloc]init];
```