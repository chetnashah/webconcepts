## Sharing a `@StateObject` With Child Views

The golden rule is:

* **The view that *creates* the `ObservableObject` owns it with `@StateObject`.**  
* All other views that merely *observe* the same instance use `@ObservedObject` (or `@EnvironmentObject` for wide broadcast).

Below is a small, self-contained demo that shows both techniques.

---

### 1. The model

```swift
import SwiftUI
import Combine

final class PomodoroTimer: ObservableObject {
    @Published var secondsRemaining: Int = 1_500  // 25 min

    private var cancellable: AnyCancellable?

    func start() {
        // fire every second
        cancellable = Timer.publish(every: 1, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in
                guard let self else { return }
                if secondsRemaining > 0 { secondsRemaining -= 1 }
            }
    }

    func stop() { cancellable = nil }
}
```

---

### 2. Parent view — **creates** and owns the instance

```swift
struct DashboardView: View {
    @StateObject private var timer = PomodoroTimer()   // <- single source of truth

    var body: some View {
        VStack(spacing: 40) {
            // Child views get *the same* instance two different ways:
            TimerReadout(model: timer)                 // via @ObservedObject
            ControlsView()                             // via @EnvironmentObject
        }
        .padding()
        .environmentObject(timer)                      // <-- make it available to subtree
        .onAppear { timer.start() }
        .onDisappear { timer.stop() }
    }
}
```

---

### 3. Child A — receives with `@ObservedObject`

```swift
struct TimerReadout: View {
    @ObservedObject var model: PomodoroTimer          // just observes

    private var minutes: Int { model.secondsRemaining / 60 }
    private var seconds: Int { model.secondsRemaining % 60 }

    var body: some View {
        Text("\(minutes):\(seconds, specifier: "%02d")")
            .font(.system(size: 64, weight: .bold, design: .rounded))
            .monospacedDigit()
    }
}
```

---

### 4. Child B — receives with `@EnvironmentObject`

```swift
struct ControlsView: View {
    @EnvironmentObject private var timer: PomodoroTimer

    var body: some View {
        HStack(spacing: 30) {
            Button("Reset")   { timer.secondsRemaining = 1_500 }
            Button("Skip")    { timer.secondsRemaining = 0 }
        }
        .buttonStyle(.borderedProminent)
    }
}
```

Both `TimerReadout` and `ControlsView` point to the **same `PomodoroTimer` instance** managed by `DashboardView`, so any mutation instantly propagates to every subscriber.

---

### 5. What to remember

1. Exactly **one** view in the hierarchy should instantiate an `ObservableObject` with `@StateObject`.
2. Downstream views:
   • use `@ObservedObject` when you pass the instance explicitly in an initializer.  
   • use `@EnvironmentObject` when you’d rather inject it implicitly to many descendants.
3. Never mark the same object `@StateObject` in multiple places—each marker would create a new copy and break the shared state.

## `@StateObject` + `ObservableObject` / View-Model — One-Pager 📌

### 1. Cast of Characters

| Term | One-line definition | Why it exists |
|------|--------------------|---------------|
| **ObservableObject** | A reference type that publishes change notifications (`objectWillChange`) so SwiftUI (and Combine) can refresh dependent views. | Lets you store **mutable, shared, long-lived** data outside the view value struct. |
| **View-Model** | An `ObservableObject` that sits between the view and your domain layer, exposing *presentation-ready* state and UI commands. | Keeps the view lightweight, testable, and free of business logic. |
| **`@StateObject`** | Property wrapper that tells SwiftUI: “This view *creates and owns* the ObservableObject; keep it alive while I’m on screen.” | Ensures the object isn’t recreated on every `body` run, and that mutations trigger automatic redraws. |

---

### 2. Core Rules for `@StateObject`

1. **Single owner** – exactly one view should instantiate a given object with `@StateObject`.
2. **Reference types only** – always classes conforming to `ObservableObject`.
3. **Persistent across re-builds** – SwiftUI stores the instance once; `body` can run thousands of times without losing it.
4. **Deallocates with the view** – when the owning view disappears from the hierarchy.
5. **Initialize early** – at declaration or in a custom `init`, never inside `body`.

---

### 3. Typical Use-Cases

• MVVM view-models (network fetchers, form coordinators, validation logic).  
• Objects performing async or continuous work (location manager, timer, WebSocket).  
• Large mutable data you’ll pass further down the tree.  
• Anything that needs reference semantics (caches, singletons, services) *but* should still be scoped to the view’s lifetime.

---

### 4. Mini Demo

```swift
// 1️⃣ Model / service layer
struct Weather: Decodable { /* … */ }

final class WeatherService {
    func fetch() async throws -> Weather { /* network call */ }
}

// 2️⃣ View-Model (ObservableObject)
@MainActor
final class WeatherVM: ObservableObject {
    @Published var state: LoadingState = .idle
    
    private let service = WeatherService()
    
    enum LoadingState {
        case idle, loading, failed(Error), loaded(Weather)
    }
    
    func load() async {
        state = .loading
        do   { state = .loaded(try await service.fetch()) }
        catch { state = .failed(error) }
    }
}

// 3️⃣ View that *owns* the VM
struct WeatherScreen: View {
    @StateObject private var vm = WeatherVM()       // <- ownership
    
    var body: some View {
        content
            .task { await vm.load() }               // mutate -> UI updates
    }
    
    @ViewBuilder private var content: some View {
        switch vm.state {
        case .idle, .loading:          ProgressView("Loading…")
        case .failed(let e):           Text("Error: \(e.localizedDescription)")
        case .loaded(let weather):     WeatherDetailView(weather: weather)
        }
    }
}

// 4️⃣ Deeper child just *observes*
struct WeatherDetailView: View {
    let weather: Weather                // or @ObservedObject vm
    /* … */
}
```

---

### 5. Interaction Matrix

| Wrapper in a view | What it means | Typical usage |
|-------------------|---------------|---------------|
| `@StateObject`    | “I **create** and keep this object.” | First owner view |
| `@ObservedObject` | “Someone else created it; I just watch.” | Child / peer views |
| `@EnvironmentObject` | “Inject it implicitly from higher up.” | Widely shared app state |

Never mark the **same instance** as `@StateObject` twice—each declaration would create a new object and you’d lose shared state.

---

### 6. Gotchas & Best Practices

1. Do not write value types into `@StateObject`; use plain `@State` instead.
2. Avoid creating the object inside `body {}` or a view modifier; you’ll get a new instance every render.
3. To update from background threads, make your `ObservableObject` `@MainActor` or dispatch back to the main thread.
4. For global, cross-screen models (user session, theme), prefer `@EnvironmentObject` injected from `App` or a top-level view.

---

### TL;DR

• **ObservableObject**: a class that publishes changes.  
• **View-Model**: an ObservableObject that holds UI logic & state.  
• **`@StateObject`**: the *one* place a view instantiates and owns that object so it survives SwiftUI’s struct churn and automatically refreshes the UI when its `@Published` properties change.