https://developer.apple.com/documentation/photokit/selecting_photos_and_videos_in_ios

## Privacy

Go see Settings > Privacy > Photos.


## UIImagePickerController - out of process image picking (Consider deprecated) - use PHPicker

https://developer.apple.com/documentation/uikit/uiimagepickercontroller

A view controller that manages the system interfaces for taking pictures, recording movies, and choosing items from the user’s media library.

https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/CameraAndPhotoLib_TopicsForIOS/Articles/TakingPicturesAndMovies.html#//apple_ref/doc/uid/TP40010406-SW1

### savedPhotosAlbum vs photolibrary

`PhotoLibrary` - contains all synced photos

`savedPhotosAlbum` - Contains only camera saved photos i.e CameraRoll.

## PHPickerViewController - out of process image picking

A view controller that provides the user interface for choosing assets from the photo library.

The PHPickerViewController class is an alternative to UIImagePickerController. PHPickerViewController improves stability and reliability, and includes several benefits to developers and users, such as the following:

* Deferred image loading and recovery UI
* Reliable handling of large and complex assets, like RAW and panoramic images
* User-selectable assets that aren’t available for `UIImagePickerController`
* Configuration of the picker to display only Live Photos
* Availability of PHLivePhoto objects without library access
* Stricter validations against invalid inputs

### PHPicker (Recommended way)

Only what is actually selected is passed backed to the host app.

https://developer.apple.com/videos/play/wwdc2020/10652

### Setup PHPickerConfiguration before showing PHPickerViewController

```swift
var configuration = PHPickerConfiguration(photoLibrary: .shared())

var newFilter = PHPickerFilter.any(of: [.livePhotos, .videos])
// Set the filter type according to the user’s selection.
configuration.filter = filter
// Set the mode to avoid transcoding, if possible, if your app supports arbitrary image/video encodings.
configuration.preferredAssetRepresentationMode = .current
// Set the selection behavior to respect the user’s selection order.
configuration.selection = .ordered
// Set the selection limit to enable multiselection.
configuration.selectionLimit = 0
// Set the preselected asset identifiers with the identifiers that the app tracks.
configuration.preselectedAssetIdentifiers = selectedAssetIdentifiers
```

### Show picker with configuration & delegate

**Events and data of interest are called back into PHPickerViewControllerDelegate**

```swift
let picker = PHPickerViewController(configuration: configuration)
picker.delegate = self
present(picker, animated: true)
```

### 



### Result is an array of PHPickerResult, we have to dismiss ourself in callback delegate

When completing a picker session, the delegate provides a list of result objects that contain an item provider that allows for loading data asynchronously. The results contain local identifiers because of initializing the configuration with a photo library.

```swift
// dlegaate
@MainActor func picker(
    _ picker: PHPickerViewController,
    didFinishPicking results: [PHPickerResult]
) {
    picker.dismiss()
    // process results
}
```

### Item providers in PHPickerResult

Item provider are async

### What are PHAssets?



## PHotokit - for advanced use cases

