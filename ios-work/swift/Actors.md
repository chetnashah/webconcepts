

## What is an Actor?

A combination of a `DispatchQueue`, the `data that queue protects`, and `messages that can be run on that queue`. 

Because they are embodied by an (internal) queue abstraction, you communicate with Actors asynchronously, and actors guarantee that the data they protect is only touched by the code running on that queue. This provides an "island of serialization in a sea of concurrency".



## Use "actor" instead of class to define actor

```swift
// shared mutable state, see "actor" keyword instead of class
actor Counter {
    var value: Int = 0
    
    func increment() -> Int {
        value+=1
        return value
    }
}
```

## all Actor methods become async

In above example, `increment()` becomes async.

## Usage with async await

```swift
// ContentView.swift

// shared mutable state
actor Counter {
    var value: Int = 0
    
    func increment() -> Int {
        value+=1
        return value
    }
}

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, world!")             
            Button("increment") {
                let counter = Counter()
                DispatchQueue.concurrentPerform(iterations: 100) { _ in
                    Task {
                        let v = await counter.increment()
                        print(v)
                    }
                }
            }
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

### Actor-isolated instance method 'increment()' can not be referenced from the main actor