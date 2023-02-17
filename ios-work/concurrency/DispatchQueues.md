

You define tasks by placing the corresponding code inside either a function or a block object and adding it to a dispatch queue.

**A dispatch queue is an object-like structure that manages the tasks you submit to it. All dispatch queues are first-in, first-out data structures.**

**Dispatch queues execute their tasks concurrently with respect to other dispatch queues**

The system takes queue priority levels into account when choosing which new tasks to start

## Crash case: with nested inner sync on same dispatch queue

**Nested dispatch inside same queue will cause crash if there is sync inside async or sync inside sync, i.e. inner sync on same queue can cause a crash**.

CRASHING case:
```objc
    dispatch_queue_t sq = dispatch_queue_create("myserialqueue", NULL);
    dispatch_async(sq, ^(void){
        dispatch_sync(sq, ^(void){
            NSLog(@"Running on serial q 2: sq");
        });

        for(int i=0;i<1000;i++) {
            NSLog(@"ADF");
        }
        NSLog(@"Running on serial q: sq");
    });
```

## Serial queues

Serial queues (also known as private dispatch queues) execute one task at a time in the order in which they are added to the queue. 
**The currently executing task runs on a distinct thread (which can vary from task to task) that is managed by the dispatch queue.** 
**Serial queues are often used to synchronize access to a specific shared resource.**

Application created queues are serial by default:
```objc
dispatch_queue_t queue;
queue = dispatch_queue_create("com.example.MyQueue", NULL);
```

## (global) Concurrent queue

Concurrent queues (also known as a type of global dispatch queue) execute one or more tasks concurrently, but tasks are still started in the order in which they were added to the queue. The currently executing tasks run on distinct threads that are managed by the dispatch queue.

**Technically queue tasks might start in insertion order, but finish in arbitrary order.**

The system provides each application with four concurrent dispatch queues. These queues are global to the application and are differentiated only by their priority level:
 * It is recommended to use quality of service class values to identify the
 * well-known global concurrent queues:
 *  - QOS_CLASS_USER_INTERACTIVE
 *  - QOS_CLASS_USER_INITIATED
 *  - QOS_CLASS_DEFAULT
 *  - QOS_CLASS_UTILITY
 *  - QOS_CLASS_BACKGROUND
 *
 * The global concurrent queues may still be identified by their priority,
 * which map to the following QOS classes:
 *  - DISPATCH_QUEUE_PRIORITY_HIGH:         QOS_CLASS_USER_INITIATED,QOS_CLASS_USER_INTERACTIVE
 *  - DISPATCH_QUEUE_PRIORITY_DEFAULT:      QOS_CLASS_DEFAULT
 *  - DISPATCH_QUEUE_PRIORITY_LOW:          QOS_CLASS_UTILITY
 *  - DISPATCH_QUEUE_PRIORITY_BACKGROUND:   QOS_CLASS_BACKGROUND

You do not need to create global queue, just get it:
```objc
dispatch_queue_t aQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
```

## Main serial queue

The main dispatch queue is a globally available serial queue that executes tasks on the application’s main thread. This queue works with the application’s run loop (if one is present) to interleave the execution of queued tasks with the execution of other event sources attached to the run loop. 
Because it runs on your application’s main thread, the main queue is often used as a key synchronization point for an application.


## Dispatch groups

**A dispatch group is a way to monitor a set of block objects for completion.**

Groups provide a useful synchronization mechanism for code that depends on the completion of other tasks.

## Dispatch semaphores

A dispatch semaphore is similar to a traditional semaphore but is generally more efficient. Dispatch semaphores call down to the kernel only when the calling thread needs to be blocked because the semaphore is unavailable. If the semaphore is available, no kernel call is made.

## Dispatch Sources

A dispatch source generates notifications in response to specific types of system events. You can use dispatch sources to monitor events such as process notifications, signals, and descriptor events among others.

When an event occurs, the dispatch source submits your task code asynchronously to the specified dispatch queue for processing.

## Blocks and queues

**Dispatch queues copy blocks that are added to them, and they release blocks when they finish executing. In other words, you do not need to explicitly copy blocks before adding them to a queue.**

## Context/data sharing in a queue

If tasks in the same queue need to share data, use the context pointer of the dispatch queue to store the data instead.

If your block creates more than a few Objective-C objects, you might want to enclose parts of your block’s code in an @autorelease block to handle the memory management for those objects. Although GCD dispatch queues have their own autorelease pools, they make no guarantees as to when those pools are drained. If your application is memory constrained, creating your own autorelease pool allows you to free up the memory for autoreleased objects at more regular intervals.



