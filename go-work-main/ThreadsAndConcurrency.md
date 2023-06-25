
Go concurrency patterns - https://www.youtube.com/watch?v=f6kdp27TYZs

## Concurrency

Concurrency is the composition of independently executing computations.
It is not same as parellism.

## Goroutines vs Threads

**Goroutines are multiplexed onto a small number of OS threads, rather than a 1:1 mapping**
You can run more goroutines on a typical system than you can threads.

They are `Green threads`, which means the **Go runtime does the scheduling, not the OS**. 
The runtime multiplexes the goroutines onto real OS threads, the number of which is controlled by GOMAXPROCS

* Goroutines come with built-in primitives to communicate safely between themselves (channels).
* Goroutines allow you to avoid having to resort to mutex locking when sharing data structures
* Goroutines have growable segmented stacks

## Lightweight growable stack for goroutine

A goroutine is created with initial only 2KB of stack size. Each function in go already has a check if more stack is needed or not and the stack can be copied to another region in memory with twice the original size. This makes goroutine very light on resources.



## Locking and shared memory

The mantra is don’t communicate by sharing memory, share memory by communicating.

if two goroutines need to share data, they can do so safely over a channel. Go handles all of the synchronization for you, and it’s much harder to run into things like deadlocks.

