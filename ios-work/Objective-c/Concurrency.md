

## Thread (Lowest level of abstraction)

Virtually all concurrency APIs are built on top of threads under the hood.

The operating system assigns small slices of computing time to each thread, so that it seems to the user as if multiple tasks are executed at the same time. 

If multiple CPU cores are available, then multiple threads can be executed truly in parallel, therefore lessening the total time needed for a certain workload.

**The important thing to keep in mind is that you have no control over where and when your code gets scheduled, and when and for how long its execution will be paused in order for other tasks to take their turn.**

you can either use the `POSIX thread API`, or the Objective-C wrapper around this API, `NSThread`, to create your own threads. `NSThread` is a simple Objective-C wrapper around `pthreads`.



## Grand central dispatch

Grand Central Dispatch (GCD) was introduced in OS X 10.6 and iOS 4 in order to make it easier for developers to take advantage of the increasing numbers of CPU cores in consumer devices.

**With GCD you don't interact with threads directly anymore. Instead you add blocks of code to queues, and GCD manages a thread pool behind the scenes.**

threads are now centrally managed and abstracted away from application developers.

The other important change with GCD is that you as a developer **think about work items in a queue rather than threads.**


## Operation Queues (Highest level of abstraction)

Operation queues are a Cocoa abstraction of the queue model exposed by GCD.

operation queues implement several convenient features on top of GCD, which often makes it the best and safest choice for application developers.

