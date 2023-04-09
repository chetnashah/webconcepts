

## Use of property wrappers is common in SwiftUI

SwiftUI relies heavily on property wrappers to make our code easier to read, write, and maintain, but if you’ve never used them before you might wonder where all the `@` and `$` signs have come from – they can seem quite alien at first.



## Create a struct extending App and annotated with `@main`

Should contain a `body` property which is a `Scene`

```swift
// LeariOSSDKApp.swift
import SwiftUI

@main
struct LearniOSSDKApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
// any regular SwiftUI view
struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, world!")
        }
        .padding()
    }
}
```

## To Add UIApplicationDelegate to App class, we need an adapter

UIApplicationDelegateAdaptor' requires that 'some Scene' conform to 'UIApplicationDelegate

```swift
@main
struct NewIn14App: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```