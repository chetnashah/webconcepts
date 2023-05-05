
## 

`@IBOutlet` is a way of connecting code to storyboard layouts, and `@IBAction` is a way of making storyboard UI events like touchup/down events make trigger code handler/listeners.


## Programmatically Adding a click handler from code (via control.addTarget)

We need to specify 3 things:
1. target - the UIView on which we want to be notified for events
2. action selector - the function to run when event fires
3. for (eventtype) - the type of event that should fire the above listener e.g. `touchupinisde` or `touchdown`

```swift
let button = UIButton(type: .system)
button.addTarget(target: self, action: #selector(doAnotherThing), for: .touchUpInside);

@objc func doAnotherThing(_ button: UIButton) {

}
```