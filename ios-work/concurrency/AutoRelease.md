
Autorelease pool blocks provide a mechanism whereby you can relinquish ownership of an object, but avoid the possibility of it being deallocated immediately (such as when you return an object from a method).

An autorelease pool block is marked using `@autoreleasepool`.


