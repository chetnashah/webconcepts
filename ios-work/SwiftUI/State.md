
## `@State` holds data for the view with persistent across re-renders

`@State` is a property wrapper that lets SwiftUI manage a piece of state data for a view. When the state changes, SwiftUI automatically re-renders the view to reflect the new state.

It is meant for value types like `Int`, `String`, `Bool`, and custom structs that conform to `Equatable`.

# `@State` in SwiftUI — the Big Picture

`@State` is the *simplest* of SwiftUI’s property-wrapper family.  
It is intended for **view-local, ephemeral, value-type data** that can mutate during the life of a single view instance.

---

## 1. Mental Model

| Concept | Explanation |
|---------|-------------|
| Ownership | The view *owns* the data. When the view disappears, the state disappears. |
| Storage | SwiftUI stores the value outside the struct so that it survives the view’s value-type re-creations. |
| Trigger | Any write to the `@State` variable marks the **current view** as “dirty”, causing SwiftUI to re-run `var body`. |
| Isolation | `@State` must be declared as `private` (or `fileprivate`) unless you explicitly expose bindings (`$`). |

Think of `@State` as **“a private source of truth, scoped to this view”**.

---

## 2. Typical Use-Cases

1. **Simple UI State**
   * Toggle on/off, selected tab index, text‐field contents, stepper value, etc.

2. **Transient Flags**
   * Is an alert shown?  
   * Currently highlighted card?

3. **Animation & Gestures**
   * Drag offsets, scale factors, rotation angles that reset when the view is rebuilt.

4. **View-local Caching**
   * A small computed result you want to keep around for a quick redraw.

---

## 3. Practical Examples

```swift
struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var isSecure = true
    @State private var showError = false

    var body: some View {
        Form {
            TextField("Email", text: $email)
            if isSecure {
                SecureField("Password", text: $password)
            } else {
                TextField("Password", text: $password)
            }
            Toggle("Show password", isOn: $isSecure.animation())
            Button("Sign in") {
                Task {
                    if await authenticate(email, password) == false {
                        showError = true          // ← mutating @State
                    }
                }
            }
            .alert("Login failed", isPresented: $showError) {
                Button("OK", role: .cancel) { }
            }
        }
    }
}
```

Gesture + animation:

```swift
struct Card: View {
    @State private var offset: CGSize = .zero

    var body: some View {
        Rectangle()
            .fill(.purple)
            .frame(width: 200, height: 300)
            .offset(offset)
            .gesture(
                DragGesture()
                    .onChanged { offset = $0.translation }
                    .onEnded   { _ in withAnimation { offset = .zero } }
            )
    }
}
```

---

## 4. Key Points to Remember

1. Only **value types** (struct, enum, basic types) should be stored.  
   If you need reference semantics, jump to `@StateObject`.
2. Do *not* pass `@State` directly to child views. Pass a **binding** (`$value`) or hoist state upward.
3. A `@State` variable **must be initialized** at declaration (or in the view’s initializer).
4. Updating `@State` from a background thread? Wrap in `MainActor` or `DispatchQueue.main.async`.
5. Two views declaring `@State` with the same name have **independent storage**.

---

## 5. `@State` vs. `@StateObject`

|                                      | `@State` | `@StateObject` |
|--------------------------------------|----------|----------------|
| Stores              | *Value* types | *Reference* types (`ObservableObject`) |
| Ownership           | The **view** | The **view** (first creator) |
| Life-cycle          | Dies with the view | Dies with the view **unless** handed off |
| Re-creation policy  | Re-initialized every new view instance | Instantiates **once**; survives subsequent re-renders |
| Typical data        | Booleans, Ints, Strings, small structs | Models, network loaders, view models |
| How to share with other views | Pass a binding (`$`) | Pass as `@ObservedObject` / `EnvironmentObject` |

Quick illustration:

```swift
class CounterModel: ObservableObject {
    @Published var count = 0
}

struct CounterView: View {
    @StateObject private var model = CounterModel()   // ref type, needs StateObject

    var body: some View {
        VStack {
            Text("\(model.count)")
            Button("Increment") { model.count += 1 }
        }
    }
}
```

Attempting the same with `@State` would compile *but* you’d get a **new instance** of `CounterModel` every body rebuild, losing the count.

---

## 6. When to Choose Which?

1. Need a few simple flags for this view only? → `@State`
2. Need a reference-type view model, async loader, or published properties? → `@StateObject`
3. State is created **outside** the view and merely observed here? → `@ObservedObject`
4. State should be shared app-wide? → `@EnvironmentObject`, `@AppStorage`, etc.

---

## 7. One-Sentence Summary

Use `@State` for small, view-scoped, value-type data whose mutation should refresh **only the declaring view**; graduate to `@StateObject` when you must hold on to a long-lived `ObservableObject`.