
## Only one concurrent writer allowed

But writes are so fast, you can easily support thousands of writes per second.

## Lock states

1. Unlocked
2. Shared lock - multiple readers reading.
3. Reserved Lock - Going to write, not writing yet.
4. Pending - no new readers can start, waiting for readers to finish.
5. Exclusive lock - make writes and finish as soon as possible.