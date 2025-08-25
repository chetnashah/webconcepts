## What *is* `ViewBuilder`?

`ViewBuilder` is SwiftUI’s **result-builder** (formerly called *function-builder*) that turns the DSL-style code you write inside many SwiftUI closures into a single value that conforms to `View`.

Think of it as the compiler whispering:

> “Write several view expressions in normal Swift syntax;  
> I’ll glue them together into one compound view that SwiftUI can render.”

Without `ViewBuilder` you would have to return *exactly one* view from the closure—and you would have to compose that view manually (e.g. `TupleView<(Text, Image, Button<Text>)>`). The builder automates this compositing and unlocks control-flow (if / switch / loops) inside view closures.

---

### Type signature (in simplified form)

```swift
@resultBuilder
public struct ViewBuilder {

    // The essential entry point every builder must provide
    public static func buildBlock<V: View>(_ components: V...) -> V
}
```

In practice you rarely talk to `ViewBuilder` directly.  
You *consume* it because many initializers are declared like this:

```swift
public struct VStack<Content: View>: View {
    public init(
        alignment: HorizontalAlignment = .center,
        spacing: CGFloat? = nil,
        @ViewBuilder content: () -> Content   // ← here
    )
}
```

So every time you write

```swift
VStack {
    Text("Hello")
    Image(systemName: "globe")
}
```

the closure after `VStack` is compiled using `ViewBuilder`.

---

## What does the builder actually do?

Given:

```swift
VStack {
    Text("One")
    Text("Two")
    if showExtra {          // control-flow is allowed
        Text("Three")
    }
}
```

The compiler performs (conceptually):

1. Calls `ViewBuilder.buildBlock(_:)` with the views inside the closure.
2. Generates a nested `TupleView` or `Optional`/`EitherView` depending on flow.
3. Hands the final **single** `some View` to `VStack`.

You never see the intermediate types; SwiftUI treats them opaquely.

---

## Common use cases & motivating examples

### 1. Building container views

Any SwiftUI container (`HStack`, `VStack`, `ZStack`, `Group`, `List`, `Form`, `Section`, `NavigationSplitView`, …) uses `@ViewBuilder` to let you list children naturally.

```swift
List {
    Text("First")
    ForEach(items) { item in
        Row(item: item)          // loop is fine
    }
}
```

### 2. Conditional UI without boilerplate

```swift
Group {
    if isLoading {
        ProgressView()
    } else {
        ResultsView(results)
    }
}
```

`ViewBuilder` handles the fact that the `if` branches return different `some View` concrete types.

### 3. Your own composite components

You can expose a `@ViewBuilder` parameter so callers get the same ergonomic syntax.

```swift
struct Card<Content: View>: View {
    private let content: Content
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        VStack(spacing: 16) {
            content
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}
```

Usage:

```swift
Card {
    Text("Title").font(.headline)
    Divider()
    Text("Body text goes here")
}
```

### 4. View modifiers that inject extra children

Even modifiers like `.toolbar { … }`, `.background { … }`, `.sheet(isPresented:) { … }` rely on `@ViewBuilder` so you may supply *multiple* toolbar items or background layers.

---

## Things to remember

* A builder closure must ultimately produce **one** `View`, but you can write many view expressions inside it.
* Up to 10 direct children are packed into `TupleView`; nest `Groups` or `ForEach` to exceed that.
* Because the result type is opaque (`some View`), you seldom care what concrete composite type was chosen.
* `ViewBuilder` is not limited to SwiftUI—you can use it in your own libraries to build other DSLs.

`ViewBuilder` is thus the secret sauce that makes SwiftUI code read like declarative layout instead of verbose view graphs.