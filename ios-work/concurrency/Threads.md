
## printing current thread

```objc
NSLog(@"%@", [NSThread currentThread]);
```

## Threading programming guide (Low level)

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/Introduction/Introduction.html#//apple_ref/doc/uid/10000057i


In a non-concurrent application, there is only one thread of execution. That thread starts and ends with your application’s main routine and branches one-by-one to different methods or functions to implement the application’s overall behavior.

By contrast, an application that supports concurrency starts with one thread and adds more as needed to create additional execution paths.

If you moved your custom computations onto a separate thread, however, your application’s main thread would be free to respond to user interactions in a more timely manner.

Problems - . Each thread has to coordinate its actions with other threads to prevent it from corrupting the application’s state information. Because threads in a single application share the same memory space, they have access to all of the same data structures. If two threads try to manipulate the same data structure at the same time, one thread might overwrite another’s changes in a way that corrupts the resulting data structure. Even with proper protections in place, you still have to watch out for compiler optimizations that introduce subtle (and not so subtle) bugs into your code.

### Thread alternatives

1. `Operation objects` - an operation object is a wrapper for a task that would normally be executed on a secondary thread.
2. `Grand Central dispatch/work queues` - you define the task you want to perform and add it to a work queue, which handles the scheduling of your task on an appropriate thread.
3. `Idle time notifications` - For tasks that are relatively short and very low priority, idle time notifications let you perform the task at a time when your application is not as busy.
4. `Separate process`

## Cocoa (NSThread) Threads

Cocoa implements threads using the `NSThread` class. Cocoa also provides methods on `NSObject` for spawning new threads and executing code on already-running threads. 

### Thread states

After starting a thread, the thread runs in one of three main states: `running`, `ready/runnable`, or `blocked`. 

If a thread is not currently running, it is either blocked and waiting for input or it is ready to run but not scheduled to do so yet. T

he thread continues moving back and forth among these states until it finally exits and moves to the terminated state.

### RunLoops

A run loop is a piece of infrastructure used to manage events arriving asynchronously on a thread. A run loop works by monitoring one or more event sources for the thread. 

**Run loops make it possible to create long-lived threads that use a minimal amount of resources. Because a run loop puts its thread to sleep when there is nothing to do, it eliminates the need for polling, which wastes CPU cycles and prevents the processor itself from sleeping and saving power.**

As events arrive, the system wakes up the thread and dispatches the events to the run loop, which then dispatches them to the handlers you specify. If no events are present and ready to be handled, the run loop puts the thread to sleep.

### inter thread communication

1. Direct method call - This capability means that one thread can essentially execute a method on any other thread
2. Shared heap/global variables - Fragile and prone to bugs due to lack of synchronization
3. `Conditions` - Conditions are a synchronization tool that you can use to control when a thread executes a particular portion of code. You can think of conditions as gate keepers, letting a thread run only when the stated condition is met. 
4. `Run loop sources` - A custom run loop source is one that you set up to receive application-specific messages on a thread. Because they are event driven, run loop sources put your thread to sleep automatically when there is nothing to do, which improves your thread’s efficiency.
   

## Exception handling

Failing to catch an exception in a secondary thread is the same as failing to catch an exception in your main thread: the owning process is terminated. 

You cannot throw an uncaught exception to a different thread for processing

If you need to notify another thread (such as the main thread) of an exceptional situation in the current thread, you should catch the exception and simply send a message to the other thread indicating what happened.

## Thread costs

The core structures needed to manage your thread and coordinate its scheduling are stored in the kernel using wired memory. Your thread’s stack space and per-thread data is stored in your program’s memory space. Most of these structures are created and initialized when you first create the thread—a process that can be relatively expensive because of the required interactions with the kernel.

## Create a thread

In all cases, **you must have a function or method to act as your thread’s main entry point** and you must use one of the available thread routines to start your thread.

### starting thread using detachNewThreadSelector:toTarget:withObject: NSThread class method

To detach a new thread, you simply provide 
1. the `name of the method` (specified as a selector) that you want to use as the thread’s entry point, 
2. the `object that defines that method`, and 
3. `any data` you want to pass to the thread at startup.

e.g.
```objc
// AppDelegate.m
@implementation AppDelegate

- (void)myThreadMainRoutine {
    NSLog(@"running on a thread");
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [NSThread detachNewThreadSelector:@selector(myThreadMainRoutine) toTarget:self withObject:nil];
    return YES;
}
@end
```

### starting thread by - Create a new NSThread object (initWithTarget:selector:object:) and call its start method

e.g.
```objc
// AppDelegate.m
@implementation AppDelegate

- (void)myThreadMainRoutine {
    NSLog(@"running on a thread");
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    NSThread* thread = [[NSThread alloc] initWithTarget:self selector:@selector(myThreadMainRoutine) object:nil];
    [thread start];
    return YES;
}
@end
```


