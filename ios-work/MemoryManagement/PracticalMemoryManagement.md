
## Swift and ARC

https://developer.apple.com/videos/play/wwdc2021/10216/

Object lifetime begins at initialisaition and ends at last use of the reference.
retain count is 1 on a initialized object, and does not require explicit retain.
A retain is inserted before a refernce assignment, and a release is inserted after last use. (contrast to deallocation on scope end like C++).

Relying on observed object lifetimes can cause bugs!

* Weak and unowned references in reference counting.

## autorelease 

So autorelease is a way of extending the lifetime of an object, just enough so that it can survive across method call boundaries. But the pool will be drained at the end of event loop.

## Weak references

**the object with the delegate should not retain its delegate, management/owning of the delegate is not the delegators responsibility, and must be weakly held by delegator. The real owner of a delegate is only the entity registering the delegate**

Typically in observer pattern, the source/observable has a larger object lifecycle than the observers, and observers/delegates must be weakly held.

The other alternative is to **kill the link between observer/observable by explicit unregistration on destruction of object with shorter lifetime**, assuming we have a way to know that.

### Listeners/notification delegates held by notification centers are weak references

**assigning delegates the 'assign' property vs 'retain'. Delegators should not retain delegates**
https://stackoverflow.com/questions/918698/why-are-objective-c-delegates-usually-given-the-property-assign-instead-of-retai

The reason that you avoid retaining delegates is that you need to avoid a retain cycle:
1. A creates B A sets itself as B's delegate … A is released by its owner
2. If B had retained A, A wouldn't be released, as B owns A, thus A's dealloc would never get called, causing both A and B to leak.
3. You shouldn't worry about A going away because it owns B and thus gets rid of it in dealloc.

object sending the delegate messages does not own the delegate.
**Under ARC you should use `weak` instead of `assign`**


### Delegates held by delegators should be weak references

The weak reference enforces the concept that the management of the delegate is not the delegators responsibility.

The summary here is: delegators don't own the delegates, but it is the delegate restierers that should be owning the delegates.

Same goes for data sources, datasource users don't own the datasource protocol implementor/delegate, but the registerer of the datasource delegate owns it.

## Data source pattern

A data source is like a delegate except that, instead of being delegated control of the user interface, it is delegated control of data.

A data source is an outlet held by NSView and UIView objects such as table views and outline views that require a source from which to populate their rows of visible data.