
### Outlet and actions


`Outlet`: ViewController talks to View by using outlet.
Outlet is used as `@property` in ViewController which means that:
- you can set something like lable text or bg-color.
- you can get something like label text or stepper value.

`Action`: View pass on messages/events about view to ViewController by using Action.
(Or in technical terms ViewController sets itself as Target for any Action inView)


### UIControl

The base class for controls which are visual elements that convey specific action or intention
in response to user interactions(events).

Controls implement elements such as `buttons`, `sliders` Controls use Target-Action mechanism
to report user interactions to your app.

Controls can be in one of several states, which are defined by `UIControl.State` type. Which also allowes to change state of a control programatically, but user interactions can also change it.

