

## Class to manage images

## Has a property named `image: UIImage` that must be set

```swift

```


## Images stored in assets.xcassets are directly available by name

```swift
let imgView = UIImageView()
imgView.image = UIImage(named: "photo1") // present in assets
view.addSubview(imgView)
```

