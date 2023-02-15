If you implemented your tasks using operation objects, the choice of queue is often less interesting than the configuration of your objects. To perform operation objects serially, you must configure dependencies between the related objects.

**Dependencies prevent one operation from executing until the objects on which it depends have finished their work.**

## NSOperation object

An operation object is an instance of the NSOperation class (in the Foundation framework) that you use to encapsulate work you want your application to perform.

## NSBlockOperation object

A class you use as-is to execute one or more block objects concurrently. Because it can execute more than one block, a block operation object operates using a group semantic; only when all of the associated blocks have finished executing is the operation itself considered finished.

## NSInvocationOperation object

A class you use as-is to create an operation object based on an object and selector from your application. You can use this class in cases where you have an existing method that already performs the needed task

