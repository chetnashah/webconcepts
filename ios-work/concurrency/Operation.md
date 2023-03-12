If you implemented your tasks using operation objects, the choice of queue is often less interesting than the configuration of your objects. To perform operation objects serially, you must configure dependencies between the related objects.

**Dependencies prevent one operation from executing until the objects on which it depends have finished their work.**

In objc, it is named `NSOperation`, in swift it is `Operation`.

## NSOperation object

An operation object is an instance of the NSOperation class (in the Foundation framework) that you use to encapsulate work you want your application to perform.

An **NSOperationQueue** is an object that manages a queue of NSOperations. 

An **NSOperation** is an abstract class that represents a unit of work that can be executed concurrently. 
Examples of tasks that lend themselves well to NSOperation include 
1. network requests, 
2. image resizing, 
3. text processing, 
4. or any other repeatable, structured, long-running task that produces associated state or data.

### API usage:

1. create a subclass of `NSOperation` and override `main` method in this subclass to do the imp work that will be done concurrently
2. Get reference to `NSOperationQueue nsoperationqueue = NSOperationQueue()`
3. Create `NSOperation` instance by invoking new Subclass with appropriate params
4. `nsoperationqueue.addOperation(operation)` 

e.g.
Operation definition:
```swift
@objc
class DownloadOperation: Operation {
    override func main() {
        print("doing main downloading stuff in operation")
    }
}
```

Adding a `NSOperation` to a `NSOperationQueue`:
```objc
NSOperationQueue *backgroundQueue = [[NSOperationQueue alloc] init];
NSOperation* downloadOp = [[DownloadOperation alloc] init];
[backgroundQueue addOperation:downloadOp];
```

## NSBlockOperation object

A class you use as-is to execute one or more block objects concurrently. Because it can execute more than one block, a block operation object operates using a group semantic; only when all of the associated blocks have finished executing is the operation itself considered finished.

## NSInvocationOperation object

A class you use as-is to create an operation object based on an object and selector from your application. You can use this class in cases where you have an existing method that already performs the needed task

