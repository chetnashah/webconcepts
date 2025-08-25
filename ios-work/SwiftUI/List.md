
## List is similar to Vstack for adding multiple rows of same type

## "List" initializer with data:,id:,content: for repeatable views

1. `data:` is the collection of data to iterate over.
2. `id:` is a key path to a unique identifier for each item in the data collection. This helps SwiftUI differentiate between items, especially when the data changes.
3. `content:` is a closure that defines how each item in the data collection should be displayed in the list.

E.g
```swift
struct ContentView: View {
  let mix = MeowMix()
  
  var body: some View {
    VStack {      
      // Add a List of tracks
        List(mix.tracks, id: \.title) { item in
            TrackRow(track: item)
        }
    }
  }
}
```