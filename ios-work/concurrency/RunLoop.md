
## RunLoop

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/RunLoopManagement/RunLoopManagement.html#//apple_ref/doc/uid/10000057i-CH16-SW1

**A run loop is an event processing loop that you use to schedule work and coordinate the receipt of incoming events. The purpose of a run loop is to keep your thread busy when there is work to do and put your thread to sleep when there is none.**. Similar to Looper in Android.

### setting up/running thread loop

each thread, including the application’s main thread, has an associated run loop object. The app frameworks automatically set up and run the run loop on the main thread as part of the application startup process.
**Only secondary threads need to run their run loop explicitly.**


* **Input sources deliver async events**

* **Timer sources deliver events to their handler routines but do not cause the run loop to exit.**

### RunLoopModes

1. `default` - you should use this mode to start your run loop and configure your input sources.
2. `connection` - Cocoa uses this mode in conjunction with NSConnection objects to monitor replies. You should rarely need to use this mode yourself.
3. `Modal` - Cocoa uses this mode to identify events intended for modal panels.
4. `Event tracking` - Cocoa uses this mode to restrict incoming events during mouse-dragging loops and other sorts of user interface tracking loops.


### When to use runLoop?

Run loops are intended for situations where you want more interactivity with the thread.

* Use ports or custom input sources to communicate with other threads.
* Use timers on the thread.
* Use any of the performSelector… methods in a Cocoa application.
* Keep the thread around to perform periodic tasks.

### Using runLoop objects
1. Get a runLoop object - use utility methods to get it
2. Configure the runLoop - Before you run a run loop on a secondary thread, you must add at least one input source or timer to it.
3. Start the runLoop
4. Exit the runLoop

### Getting runLoop (NSRunLoop) object

1. use the `currentRunLoop` class method of `NSRunLoop` to retrieve an `NSRunLoop` object. you can get a CFRunLoopRef opaque type from an NSRunLoop object when needed. The `NSRunLoop` class defines a getCFRunLoop method that returns a CFRunLoopRef type that you can pass to Core Foundation routines. via `NSRunLoop* myRunLoop = [NSRunLoop currentRunLoop];`
2. Use the `CFRunLoopGetCurrent` function i.e. `CFRunLoopGetCurrent();`


### Configuring the run Loop (with sources)

**It must happen in thread entry point routine/method**

Before you run a run loop on a secondary thread, **you must add at least one input source or timer to it.**

If a run loop does not have any sources to monitor, it exits immediately when you try to run it.

**Adding runLoop observers** - you can also install run loop observers and use them to detect different execution stages of the run loop. To install a run loop observer, you create a `CFRunLoopObserverRef` opaque type and use the `CFRunLoopAddObserver` function to add it to your run loop. Run loop observers must be created using Core Foundation, even for Cocoa applications.


#### Configuring runloop sources (And their handlers)

1. Custom input source
2. Timer source
3. Port based input source

### Starting runLoop

A run loop must have at least one input source or timer to monitor. If one is not attached, the run loop exits immediately.

Several ways:
1. Unconditionally - `[myRunLoop run]`
2. With a set time limit - 
3. In a particular mode

### Complete runLoop example

```objc
@implementation AppDelegate

// handlers for timers
- (void)myDoFireTimer1 {
    NSLog(@"my do fire timer 1 on %@", [NSThread currentThread]);
}

- (void)myDoFireTimer2 {
    NSLog(@"my do fire timer 2 on %@", [NSThread currentThread]);
}

// 
- (void)entryPointForThread {
    NSLog(@"running on a thread on %@", [NSThread currentThread]);
    // getting thread loop object
    NSRunLoop* myRunLoop = [NSRunLoop currentRunLoop];
     
     // configuring runLoop with sources
    // Create and schedule the first timer.
    NSDate* futureDate = [NSDate dateWithTimeIntervalSinceNow:1.0];
    NSTimer* myTimer = [[NSTimer alloc] initWithFireDate:futureDate
                            interval:0.1
                            target:self
                            selector:@selector(myDoFireTimer1)
                            userInfo:nil
                            repeats:YES];
    [myRunLoop addTimer:myTimer forMode:NSDefaultRunLoopMode];
     
    // Create and schedule the second timer.
    [NSTimer scheduledTimerWithTimeInterval:0.2
                            target:self
                            selector:@selector(myDoFireTimer2)
                            userInfo:nil
                            repeats:YES];
    
    // asking runLoop to run indefinitely
    [myRunLoop run];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.

    NSThread* thread = [[NSThread alloc] initWithTarget:self selector:@selector(entryPointForThread) object:nil];
    
    [thread start];

    return YES;
}
@end
```

### Port based sources vs custom input sources (performSelectors)

In addition to port-based sources, Cocoa defines a custom input source that allows you to perform a selector on any thread. 

Like a port-based source, perform selector requests are serialized on the target thread, alleviating many of the synchronization problems that might occur with multiple methods being run on one thread. 

Unlike a port-based source, a perform selector source removes itself from the run loop after it performs its selector.

### RunLoop observers (vs source handlers)

In contrast to sources, which fire when an appropriate asynchronous or synchronous event occurs, run loop observers fire at special locations during the execution of the run loop itself. You might use run loop observers to prepare your thread to process a given event or to prepare the thread before it goes to sleep. You can associate run loop observers with the following events in your run loop:

* The entrance to the run loop.
* When the run loop is about to process a timer.
* When the run loop is about to process an input source.
* When the run loop is about to go to sleep.
* When the run loop has woken up, but before it has processed the event that woke it up.
* The exit from the run loop.

