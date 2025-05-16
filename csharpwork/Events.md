## What are Events in C#?

Events enable a class or object to notify other classes or objects when something of interest occurs. The class that sends (or raises) the event is called the publisher and the classes that receive (or handle) the event are called subscribers.

Go understand **delegates** first. Events are built on top of delegates. An event is a special kind of delegate that is used to provide notifications. 

The event keyword is used to declare an event in a class. The event can be raised by the publisher and handled by the subscribers.

## Who can raise an event?

**only the class (or struct) that declares an event can raise that event. This is a key encapsulation feature of C# events.**

## What are events really?
**They are just a multicast delegate.** 

When you declare an event, you are actually creating a delegate type that can hold references to multiple methods. When the event is raised, all the methods in the invocation list of the delegate are called.
**Events are multicast delegates that are used to provide notifications.**

## Ways to trigger events
1. Since they are just a multicast delegate, simply call it. e.g. `VibrationEvent(this, EventArgs.Empty);`
2. Use the `Invoke` method of the delegate. `VibrationEvent.Invoke(this, EventArgs.Empty);`
3. 

## Events are similar to EventEmitters in Nodejs

