
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


## UICollectionViewCell

A cell object that presents a single data item when that item is within the collection view’s visible bounds.

```swift
class MyCell: UICollectionViewCell {
    @IBOutlet weak var textLabel: UILabel!
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
