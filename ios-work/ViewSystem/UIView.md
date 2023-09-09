

## frame property

It is an instance of `CGRect` signifying `x`,`y`,`width`, `height`.

## How to add child views?

Use `uiView.addSubview(subviewRef)` to add subviews to a view.

## How IOS renders view

https://www.objc.io/issues/3-views/moving-pixels-onto-the-screen/

## Frame and bounds

frame is seen from the perspective of the view’s superview coordinate system (think frame on a wall), and bounds is seen from the perspective of the view’s own coordinate system.

Changing `bounds` of a view lets you translate within the view's internal canvas, e.g. this can be used for scrolling drawing content of a view.

https://stackoverflow.com/questions/1210047/cocoa-whats-the-difference-between-the-frame-and-the-bounds/28917673#28917673

https://www.objc.io/issues/3-views/scroll-view/

## UIView initializer accepts frame (i.e. x,y from parent)

```swift
func viewDidLoad(){
    super.viewDidLoad()
    // create view with frame rect
    let myView = {
        let redView = UIView(frame: CGRect(x: 0, y: 25, width: 385, height: 200))
        redView.backgroundColor = .red
        return redView
    }()
    // add view as subview of viewcontroller view
    view.addSubView(myView)
}
```


