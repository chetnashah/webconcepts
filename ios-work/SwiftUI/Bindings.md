
## Bindings

* Some components take a binding in their initializer
* Don't want to pass a value but a reference/binding
* Uses `$` to create a binding from a state i.e. `@State` variable and pass it as a prop to child view

## `@Binding` to declare props coming from parent view

## `@State` vs `@Binding`

## `@State` vs `@Binding` in SwiftUI

| Property Wrapper | Who **creates** the value? | Who **owns & mutates** it? | Who **reads** it? | Typical use |
|------------------|---------------------------|----------------------------|-------------------|-------------|
| `@State`         | The *view itself* (source of truth) | The *view itself* | All sub-views of that view | View-local model data (e.g. a toggle’s on/off value) |
| `@Binding`       | *Some other view* (or model object) | The *owner* noted above | The view that receives the binding | Passing a `@State` value **down** so child views can mutate it |

Think of `@State` as **“I store it here.”**  
Think of `@Binding` as **“I borrow it from elsewhere so I can change it.”**

---

### Minimal but useful example

We’ll build a tiny counter with two views:

1. `CounterView` – owns the integer using `@State`.  
2. `StepperView` – receives a `@Binding<Int>` so it can increase/decrease the same integer.

```swift
import SwiftUI

struct CounterView: View {
    // 1️⃣ Local source of truth
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 24) {
            Text("Count: \(count)")
                .font(.largeTitle)
            
            // 2️⃣ Pass a binding down
            StepperView(count: $count)
        }
        .padding(40)
    }
}

struct StepperView: View {
    // 3️⃣ Borrow the value; may read *and* write it
    @Binding var count: Int
    
    var body: some View {
        HStack(spacing: 32) {
            Button("−")  { count -= 1 }
            Button("+")  { count += 1 }
        }
        .font(.title)
    }
}

#Preview {
    CounterView()
}
```

How data flows:

1. `CounterView` creates `count` and marks it `@State`.
2. `CounterView` passes **a reference to `count`** using the `$` prefix (`$count` is a `Binding<Int>`).
3. `StepperView` declares `@Binding var count`, receiving that reference.
4. When `StepperView` mutates `count`, SwiftUI immediately updates the single source of truth in `CounterView`. Both views re-render with the new value.

### Key take-aways

* Use `@State` only where the data is born—**one place per piece of state**.
* Use `@Binding` to let child views *edit* that state without owning it.
* The `$` operator converts a `@State` (or any `@Binding`) into a binding when you pass it along.