
## Queues are everywhere


1. In an event loop = thread + queue, messages are processed from a queue.
2. In a message broker, messages are processed from a queue.
3. In a job/task queue, jobs are processed from a queue, .e.g. ThreadPoolExecutor in Java.
4. Dispatch queues in Grand Central Dispatch in iOS.
5. For concurrency synchronization, a queue of locks is used.
6. If Two threads need to communicate, a queue is used.
7. For capacity planning & resource limitations,  queue is used.
8. For a resource contention, a queue is used.
9. All logs are queues.
    