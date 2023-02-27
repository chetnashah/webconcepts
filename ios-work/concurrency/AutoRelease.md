
Autorelease pool blocks provide a mechanism whereby you can relinquish ownership of an object, but avoid the possibility of it being deallocated immediately (such as when you return an object from a method).

An autorelease pool block is marked using `@autoreleasepool`.


**Threads that the system creates for you, such as the main thread or threads created as part of Grand Central Dispatch (GCD), have an implicit autorelease pool that is drained each time the thread goes through its event loop.**

Nested autoreleasepools help in scoped release of temporary objects.

```objc
NSArray *databaseRecords = /* ... */;
NSMutableArray *people = [NSMutableArray new];
for (NSDictionary *record in databaseRecords) {
    @autoreleasepool {
        EOCPerson *person =
            [[EOCPerson alloc] initWithRecord:record];
        [people addObject:person];
    }
}
```