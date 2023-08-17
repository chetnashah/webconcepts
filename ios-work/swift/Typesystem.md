

## typealias

Useful to provide nominal types for an existing type. 

Popular for **Closure** and **Tuple** types, and large 

```
typealias StudentName = String

typealias CompletionHandler = (Int)->(String)

typealias Message = String
```



### Why?

1. gives a semantic meaning to base type. e.g. `typealias TimeInterval = Double`
2. Helps in refactoring.
3. Reduce verbosity - `typealias AppReducer = Reducer<AppState, AppAction, AppEnvironment> `
4. Improve clarity - `typealias PresentableViewController = UIViewController & UIPopoverPresentationControllerDelegate`
5. typing functions/closures - `public typealias ClosureType = (x: Int, y: Int) -> Int`
6. Convinient for tuples: `typealias Cordinates = (Lat: Float, Lng: Float)`
7. Long worded closure types `public typealias Handler = (_ cell: Cell, _ indexPath: IndexPath, _ itemIdentifier: Item) -> Void`
8. Large typenames with generics - `typealias DataSource = UICollectionViewDiffableDataSource<Int, String>`
