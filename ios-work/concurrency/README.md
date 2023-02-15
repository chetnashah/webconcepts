
https://developer.apple.com/library/archive/documentation/General/Conceptual/ConcurrencyProgrammingGuide/Introduction/Introduction.html

The traditional way for an application to use multiple cores is to create multiple threads. However, as the number of cores increases, there are problems with threaded solutions. The biggest problem is that threaded code does not scale very well to arbitrary numbers of cores. You cannot create as many threads as there are cores and expect a program to run well. 

What you would need to know is the number of cores that can be used efficiently, which is a challenging thing for an application to compute on its own. Even if you manage to get the numbers correct, there is still the challenge of programming for so many threads, of making them run efficiently, and of keeping them from interfering with one another.

**OS X and iOS provide technologies to allow you to perform any task asynchronously without having to manage the threads yourself.**

## Blocks

Variables accessed by the block are copied to the block data structure on the heap so that the block can access them later. When blocks are added to a dispatch queue, these values must typically be left in a read-only format. However, blocks that are executed synchronously can also use variables that have the `__block` keyword prepended to return data back to the parent’s calling scope.

e.g.
```objc
int x = 123;
int y = 456;
 
// Block declaration and assignment
void (^aBlock)(int) = ^(int z) {
    printf("%d %d %d\n", x, y, z);
};
 
// Execute the block
aBlock(789);   // prints: 123 456 789
```

**Note** - you should not try to capture large structures or other pointer-based variables that are allocated and deleted by the calling context. By the time your block is executed, the memory referenced by that pointer may be gone. 

Of course, it is safe to allocate memory (or an object) yourself and explicitly hand off ownership of that memory to the block.


## GCD

All you have to do is define the tasks you want to execute and add them to an appropriate dispatch queue. 
(thread pool like pattern)
GCD takes care of creating the needed threads and of scheduling your tasks to run on those threads. Because the thread management is now part of the system, GCD provides a holistic approach to task management and execution, providing better efficiency than traditional threads

## Dispatch queue (part of GCD)

A dispatch queue executes tasks either serially or concurrently but **always in a first-in, first-out order**. (In other words, a dispatch queue always dequeues and starts tasks in the same order in which they were added to the queue.

**serial dispatch queue** - A serial dispatch queue runs only one task at a time, waiting until that task is complete before dequeuing and starting a new one. 

**concurrent dispatch queue** - a concurrent dispatch queue starts as many tasks as it can without waiting for already started tasks to finish.

**The tasks you submit to a dispatch queue must be encapsulated inside either a function or a block object.**

## dispatch sources (part of GCD)

A dispatch source encapsulates information about a particular type of system event and submits a specific block object or function to a dispatch queue whenever that event occurs. You can use dispatch sources to monitor the following types of system events:

* Timers
* Signal handlers
* Descriptor-related events
* Process-related events
* Mach port events
* Custom events that you trigger


## Operation queues

Operation queues are Objective-C objects that act very much like dispatch queues. 
You define the tasks you want to execute and then add them to an operation queue, which handles the scheduling and execution of those tasks. Like GCD, operation queues handle all of the thread management for you, ensuring that tasks are executed as quickly and as efficiently as possible on the system.

An operation queue is the Cocoa equivalent of a concurrent dispatch queue and is implemented by the NSOperationQueue class. Whereas dispatch queues always execute tasks in first-in, first-out order, **operation queues take other factors into account when determining the execution order of tasks**. Primary among these factors is whether a given task depends on the completion of other tasks. **You configure dependencies when defining your tasks and can use them to create complex execution-order graphs for your tasks.**

**Although operation queues always execute operations concurrently, you can use dependencies to ensure they are executed serially when needed.**



## Operations

