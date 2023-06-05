
https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/ImplementingaContainerViewController.html#//apple_ref/doc/uid/TP40007457-CH11-SW1

##

a container view controller displays other view controllers, arranging them onscreen and handling navigation between them.

A container view controller manages the presentation of content of other view controllers it owns, also known as its child view controllers. A child’s view can be presented as-is or in conjunction with views owned by the container view controller.

**A container view controller is a subclass of UIViewController and can be added to the view hierarchy like any other view controller.** 

**The view of a container view controller can also be added to the view hierarchy of another view controller.**

## How to add a ViewController inside a ViewController?

Use `func addChild(_ childController: UIViewController)` method on `UIViewController`. This method is only intended to be called by an implementation of a custom container view controller.

Parent-child relationship between view controllers: This method creates a parent-child relationship between the current view controller (Container viewcontroller) and the object in the `childController` parameter.

 This relationship is necessary when embedding the child view controller’s view into the current view controller’s content. If the new child view controller is already the child of a container view controller, it is removed from that container before being added.


Access children viewcontrollers using `vc.children` property, which is an array of view controllers that are children of the current view controller.




