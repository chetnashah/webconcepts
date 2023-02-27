

## `retain`, `release`, `autorelease` are not allowed in ARC

**All retain/release insertion is done by compiler based on names of functions**

**Do not try to follow retain/releases**. Instead think in terms of object ownership graph and strong/weak references to break cycles.

## ARC standardizes the memory-management rules through naming conventions

1. all methods named starting with `new`, `alloc`,`copy`,`mutablecopy` return objects with increased retain count, and callers are owning these objects.
2. Objects created and returned from methods that start with prefix other than above 4, e.g. `someMethod()`,then these method will return a `autorelease`able version from the method.
3. When the block ends, anything explicitly owned by calling first 4 methods, will be explicitly `release`ed.

```objc
+ (EOCPerson*)newPerson {
    EOCPerson *person = [[EOCPerson alloc] init];
    return person;
    /**
     * The method name begins with 'new', and since 'person'
     * already has an unbalanced +1 retain count from the
     * 'alloc', no retains, releases, or autoreleases are
     * required when returning.
     */
}

+ (EOCPerson*)somePerson {
    EOCPerson *person = [[EOCPerson alloc] init];
    return person;
    /**
     * The method name does not begin with one of the "owning"
     * prefixes, therefore ARC will add an autorelease when
     * returning 'person'.
     * The equivalent manual reference counting statement is:
     *   return [person autorelease];
     */
}

- (void)doSomething {
    EOCPerson *personOne = [EOCPerson newPerson];
    // ...

    EOCPerson *personTwo = [EOCPerson somePerson];
    // ...

    /**
     * At this point, 'personOne' and 'personTwo' go out of
     * scope, therefore ARC needs to clean them up as required.
     * - 'personOne' was returned as owned by this block of
     *   code, so it needs to be released.
     * - 'personTwo' was returned not owned by this block of
     *   code, so it does not need to be released.
     * The equivalent manual reference counting cleanup code
     * is:
     *    [personOne release];
     */
}
```


## You must still implement `dealloc` method to do cleanup

best idea is to nill out things/cleanup resources, avoid calling other work methods/async stuff, because obj will be deallocated by the time work finishes.

**never call dealloc yourself, system will call it**

**Dealloc is called on thread where final release(that made retain cnt 0) was called!!**

An Objective-C++ object has to call the destructors for all C++ objects held by the object during deallocation


`[super dealloc]` is automatically added as last line by ARC.
e.g
```objc
- (void)dealloc {
    // no [obj release] needed here, but cleanup other resources
    CFRelease(_coreFoundationObject);
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    free(_heapAllocatedMemoryBlob);
}
```

An example of dealloc, where we can do cleanup, if explicit cleanup method was not called:
```objc
- (void)close {
    /* clean up resources */
    _closed = YES;
}

- (void)dealloc {
    if (!_closed) {
        NSLog(@"ERROR: close was not called before dealloc!");
        [self close];
    }
}
```

## Exception handling

```objc
@try {
    EOCSomeClass *object = [[EOCSomeClass alloc] init];
    [object doSomethingThatMayThrow];
}
@catch (...) {
    NSLog(@"Whoops, there was an error. Oh well...");
}
```

surely ARC handles this situation, you are probably thinking. 

Well, by default, it does not; to do so requires a large amount of boilerplate code to be added to track the objects that potentially need cleaning up if an exception is thrown

**The reason no cleanup happens when exception is thrown because ObjC thinks exception should only be thrown if application will terminate**

