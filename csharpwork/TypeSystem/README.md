
## Value types vs reference types

Value types differ from reference types in that variables of the value types directly contain their data, whereas variables of the reference types store references to their data, the latter being known as objects. 

* With reference types, it is possible for two variables to reference the same object, and thus possible for operations on one variable to affect the object referenced by the other variable. 
* With value types, the variables each have their own copy of the data, and it is not possible for operations on one to affect the other.

## "object" super type

Every type in C# directly or indirectly derives from the object class type, and object is the ultimate base class of all types. 

Values of reference types are treated as objects simply by viewing the values as type object. Values of value types are treated as objects by performing boxing and unboxing operations

## Open types vs closed types

All types can be classified as either open types or closed types. An open type is a type that involves type parameters. More specifically:

* A type parameter defines an open type.
* An array type is an open type if and only if its element type is an open type.
* A constructed type is an open type if and only if one or more of its type arguments is an open type. A constructed nested type is an open type if and only if one or more of its type arguments or the type arguments of one or more of its containing types is an open type.
* A closed type is a type that is not an open type.

