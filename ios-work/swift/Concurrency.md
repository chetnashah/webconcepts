
https://docs.swift.org/swift-book/LanguageGuide/Concurrency.html

https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782

https://github.com/apple/swift-evolution/blob/main/proposals/0304-structured-concurrency.md

##

## Pyramid of doom with callbacks/closures based APIs

```swift
func processImageData2(completionBlock: (result: Image?, error: Error?) -> Void) {
    loadWebResource("dataprofile.txt") { dataResource, error in
        guard let dataResource = dataResource else {
            completionBlock(nil, error)
            return
        }
        loadWebResource("imagedata.dat") { imageResource, error in
            guard let imageResource = imageResource else {
                completionBlock(nil, error)
                return
            }
            decodeImage(dataResource, imageResource) { imageTmp, error in
                guard let imageTmp = imageTmp else {
                    completionBlock(nil, error)
                    return
                }
                dewarpAndCleanupImage(imageTmp) { imageResult in
                    guard let imageResult = imageResult else {
                        completionBlock(nil, error)
                        return
                    }
                    completionBlock(imageResult)
                }
            }
        }
    }
}
```

## All async function calls must be marked with await

All async function calls must be marked with await, it is hard to get hold references of promise like objects. Instead `await` usage in async function call is enforced by the compiler

```swift
Task {
    let v = counter.incrementasync()// Error!
    let v = await counter.incrementasync()// Correct!
}
```



## Tasks

**Task Bridges the gap between synchronous and asynchronous code**

A `Task` represents a unit of asynchronous work, and gives us access to a concurrent context in which we can call async-marked APIs to perform various operations in the background.


### Tasks run automatically

**A task runs immediately after creation and does not require an explicit start.**



### Task inheritance

The relationship between a given Task and its parent can be quite important, at least within `@MainActor`-marked classes, such as views and view controllers. That’s because child tasks are not only connected to their parents in terms of cancellation — they also automatically inherit the same execution context as their parent uses.

### Task dispatching to a thread (defaults to parent Task config)

although the above `Task` will indeed be performed asynchronously, it will still be executed on the main thread, since it’s being dispatched using the `MainActor` (it inherits that context from the viewWillAppear method that it was created in). 

So, essentially, our above Task is more or less equivalent to performing that same database call within a `DispachQueue.main.async` closure

```swift
class ProfileViewController: UIViewController {
    private let userID: User.ID
    private let database: Database
    private var user: User?
    private var loadingTask: Task<Void, Never>?
    //...

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        guard loadingTask == nil else {
            return
        }

        // runs on main thread because inherits MainActor's main queue
        loadingTask = Task {
            do {
                let user = try database.loadModel(withID: userID)
                userDidLoad(user)
            } catch {
                handleError(error)
            }
            loadingTask = nil
        }
    }
    // ...
}
```

### Running Task on non-main thread/queue

```swift
class ProfileViewController: UIViewController {
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        guard loadingTask == nil else {
            return
        }

        loadingTask = Task.detached(priority: .userInitiated) { [weak self] in
            guard let self = self else { return }

            do {
                let user = try self.database.loadModel(withID: self.userID)
                await self.userDidLoad(user)
            } catch {
                await self.handleError(error)
            }

            await self.loadingTaskDidFinish()
        }
    }

    private func loadingTaskDidFinish() {
        loadingTask = nil
    }
}
```


### `Task.detached`

Detached tasks should be your last resort. In many cases, you’ll be able to run tasks in parallel using task groups instead and benefit from parent-child relationships. The latter will allow you to cancel the parent task and all related child tasks automatically.

```swift
Task.detached(priority: .background) {
    // Runs asynchronously
    await self.asyncPrint("Operation two")
}
```

### `await` result of a `Task` with `await task.value`

Finally, let’s take a look at how we can await the result of a given Task instance. For example, let’s say that we wanted to extend our above Database-based view controller implementation with support for loading the current user’s image over the network.

To do that, we’ll wrap our detached task within yet another Task instance, and we’ll then use the await keyword to wait for our database loading operation to complete before proceeding with our image download — like this:

```swift
let basicTask = Task {
    return "This is the result of the task"
}
print(await basicTask.value)
// Prints: This is the result of the task

```

Note how we can once again call our view controller’s methods directly within our top-level Task, since it’s now MainActor-bound, just like before. That illustrates just how smoothly we can now mix work that’s performed both on and off the main queue, without having to worry about accidentally performing UI updates on the wrong thread.


### TaskGroup

You can see a Task Group as a container of several child tasks that are dynamically added. Child tasks can run in parallel or in serial, but the Task Group will only be marked as finished once its child tasks are done.

## MainActor

The `@MainActor` annotation in Swift is part of the concurrency model introduced in Swift 5.5. **It's used to indicate that a class, structure, or function should only be accessed on the main dispatch queue, which is typically used for UI updates and other tasks that must occur on the main thread.**. Think of it more like **Run on Main Actor**

Here's a breakdown of what `@MainActor` does:

1. Thread Safety: It ensures that the annotated code runs on the main thread, preventing race conditions and other threading issues when dealing with UI-related code.

2. Compile-time Checks: The compiler enforces that any code calling a `@MainActor`-annotated entity does so from the main actor (main thread) or uses `await` if called from a different context.

3. **Implicit Dispatch to main thread**: When you call a `@MainActor`-annotated method from a non-main actor context, Swift automatically dispatches the call to the main thread.

4. Global Actor: `@MainActor` is a global actor, meaning it's a singleton that represents the main thread across your entire app.

Here are some examples to illustrate its use:

1. Annotating a class:

```swift
@MainActor
class ViewController: UIViewController {
    func updateUI() {
        // This method is guaranteed to run on the main thread
        label.text = "Updated"
    }
}
```

2. Annotating a specific method:

```swift
class DataManager {
    func fetchData() async -> [String] {
        // Fetch data asynchronously
        return ["Data1", "Data2"]
    }
    
    @MainActor
    func updateUI(with data: [String]) {
        // This method will always be called on the main thread
        // Update UI components here
    }
}
```

3. Using `@MainActor` with async/await:

```swift
class ViewModel {
    @MainActor
    func refreshData() async {
        let data = await fetchDataFromNetwork()
        // Update UI here, guaranteed to be on the main thread
        updateUIComponents(with: data)
    }
    
    func fetchDataFromNetwork() async -> [String] {
        // Simulating network call
        return ["NetworkData1", "NetworkData2"]
    }
}

// Usage
Task {
    await viewModel.refreshData()
}
```

4. Implicit dispatch to main thread:

```swift
@MainActor
func updateLabel(_ text: String) {
    label.text = text
}

func someBackgroundWork() async {
    let result = performComputation()
    await updateLabel(result)  // Automatically dispatched to main thread
}
```

Benefits of using `@MainActor`:

1. Improved code safety by preventing accidental UI updates from background threads.
2. Cleaner code by eliminating explicit dispatch to the main queue.
3. Better performance through compiler optimizations.
4. Clearer intent in your code, making it easier for other developers to understand where UI updates occur.

It's important to note that while `@MainActor` is powerful, it should be used judiciously. Overuse can lead to unnecessary main thread congestion. It's best used for UI-related code and other operations that specifically need to run on the main thread.

Would you like me to elaborate on any specific aspect of `@MainActor` or provide more complex examples?