

## Class Objects

A class definition contains various kinds of information, much of it about instances
of the class:
* The name of the class and its superclass
* A template describing a set of instance variables
* The names and types of instance methods
* Method implementations

**The compiler creates just one object, a class object, to represent the class**

Main role - Class objects are thus full-fledged objects that can be dynamically typed, receive
messages, and inherit methods from other classes. They’re special only in that
they’re created by the compiler, lack data structures (instance variables) of their
own other than those built from the class definition, and are the agents for
producing instances at runtime.

### +initialize available to class objects

The runtime system sends an `initialize` message to every class object before the
class receives any other messages. This gives the class a chance to set up its runtime
environment before it’s used. If no initialization is required, you don’t need to write
an initialize method to respond to the message; the NSObject class defines an
empty version that your class inherits.


## isa pointer

`isa` property is available in all objects that points to the corresponding class object.

## Type introspection

Instances can reveal their types at runtime. The `isMemberOfClass:` method, defined
in the NSObject class, checks whether the receiver is an instance of a particular class:
```objc
if ( [anObject isMemberOfClass:someClass] )
 . . .
```
The `isKindOfClass:` method, also defined in the NSObject class, checks more
generally whether the receiver inherits from or is a member of a particular class
(whether it has the class in its inheritance path):
```objc
if ( [anObject isKindOfClass:someClass] )
 . . .
```
The set of classes for which `isKindOfClass:` returns `YES` is the same set to which the
receiver can be statically typed.

