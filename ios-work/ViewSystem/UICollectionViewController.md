
https://guides.codepath.com/ios/Using-UICollectionView

## CollectionView vs TableView

Collection views share similarities with table views, however collection views have the power to do multi-column layouts and much more. Collection views are designed to support any layout style, not just single-column layouts. 

## Definitin

```swift
open class UICollectionViewController : UIViewController, UICollectionViewDelegate, UICollectionViewDataSource {

// holds reference to collectionView and collectionViewLayout
    open var collectionView: UICollectionView!
    open var collectionViewLayout: UICollectionViewLayout { get }
}
```

## self.collectionView property in UICollectionViewController

`self.collectionView` is a property of `UICollectionViewController` class. It is a `UICollectionView` object that is created by the collection view controller when its view is requested. The collection view controller automatically assigns the layout object to the same object as the collection view’s `collectionViewLayout` property.

## UICollectionView : UIScrollView

An object that manages an ordered collection of data items and presents them using customizable layouts.

`dataSource` - The collection view gets its data from the data source object, stored in the collection view’s `dataSource` property.

Data in the collection view is organized into individual items, which you can group into sections for presentation. An item is the smallest unit of data you want to present

## Layout (UICollectionViewLayout) in `collectionViewLayout` property

Defines positioning of items, e..g list or grid.

A layout object defines the visual arrangement of the content in the collection view. A subclass of the `UICollectionViewLayout` class, the layout object defines the organization and location of all cells and supplementary views inside the collection view.

**The layout object is like another data source, except it provides visual information instead of item data.**

You typically specify a layout object when you create a collection view, but you can also change the layout of a collection view dynamically. 
The layout object is stored in the `collectionViewLayout` property

### Types of Collection Layouts

https://www.youtube.com/watch?v=cWfG79NaOv4

1. **UICollectionViewFlowLayout** - A layout object that organizes items into a grid with optional header and footer views for each section. Items in the collection view flow from one row or column (depending on the scrolling direction) to the next, with each row containing as many cells as will fit. Cells can be the same sizes or different sizes.
Flow layouts lay out their content using a fixed distance in one direction and a scrollable distance in the other. For example, in a vertically scrolling grid, the width of the grid content is constrained to the width of the corresponding collection view while the height of the content adjusts dynamically to match the number of sections and items in the grid.
2. **UICollectionViewCompositionalLayout** - A layout object that lets you combine items in highly adaptive and flexible visual arrangements. https://developer.apple.com/documentation/uikit/uicollectionviewcompositionallayout#overview. A compositional layout can have multiple sections, each section containing a header and a group (list of items) to render.



## UICollectionViewCell

A cell object that presents a single data item when that item is within the collection view’s visible bounds.

```swift
class MyCell: UICollectionViewCell {
    @IBOutlet weak var textLabel: UILabel!
}
```

### Getting cell's content configuraiton

Using a content configuration, you can set the cell’s content and styling for a variety of different cell states.

```swift
var contentConfiguration = cell.defaultContentConfiguration()
```

### CellRegistration

Cell registration specifies how to configure the content and appearance of a cell.

`Why`?

In iOS 14 you can use the new `UICollectionView.CellRegistration` class to register and configure your `UICollectionViewCell` instances. So no more `let cellIdentifier = "MyCell"`, no more `collectionView.dequeueReusableCell(withReuseIdentifier: "MyCell", for: indexPath)` and best of all, you no longer need to cast the cell returned by `dequeueReusableCell(withReuseIdentifier:for:)` to your custom cell class.

Definition:
```swift
struct CellRegistration<Cell, Item> where Cell : UICollectionViewCell
```

1. The struct in its initializer takes a closure to setup the cell.
2. This closure receives a cell, an index path and the model that's used to configure the cell.

How to use:
```swift
// CellRegistration takes a lambda that sets up the cell content
let simpleConfig = UICollectionView.CellRegistration<MyCollectionViewCell, String> { (cell, indexPath, model) in
  cell.label.text = model
}
```



## UICOllectionViewDataSource


```swift
extension ViewController: UICollectionViewDataSource {

    func numberOfSections(
        in collectionView: UICollectionView
    ) -> Int {
        1
    }

    func collectionView(
        _ collectionView: UICollectionView, 
        numberOfItemsInSection section: Int
    ) -> Int {
        10
    }

    func collectionView(
        _ collectionView: UICollectionView, 
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(
            withReuseIdentifier: "MyCell", 
            for: indexPath
        ) as! MyCell

        cell.textLabel.text = String(indexPath.row + 1)
        return cell
    }
}
```

## UICollectionViewDelegate

```swift
extension ViewController: UICollectionViewDelegate {

    func collectionView(
        _ collectionView: UICollectionView, 
        didSelectItemAt indexPath: IndexPath
    ) {
        print(indexPath.item + 1)
    }
}
```


## UICollectionLayoutListConfiguration
A configuration for creating a list layout.

Use this configuration to create a list section for a compositional layout (`UICollectionViewCompositionalLayout`), or a layout containing only list sections. 

A configuration can be used to create a `Layout`.
```swift
private func listLayout() -> UICollectionViewCompositionalLayout {
    var listConfiguration = UICollectionLayoutListConfiguration(appearance: .grouped)
    listConfiguration.showsSeparators = false
    listConfiguration.backgroundColor = .clear
    return UICollectionViewCompositionalLayout.list(using: listConfiguration)
}
```

## UICollectionViewDiffableDataSource
The object you use to manage data and provide cells for a collection view.

To connect a diffable data source to a collection view, you create the diffable data source using its `init(collectionView:cellProvider:)` initializer, passing in the collection view you want to associate with that data source

```swift
var dataSource = UICollectionViewDiffableDataSource<Int, UUID>(collectionView: collectionView) {
    (collectionView: UICollectionView, indexPath: IndexPath, itemIdentifier: UUID) -> UICollectionViewCell? in
    // Configure and return cell.
}
```