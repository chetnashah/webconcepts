



### Observer

An object with three methods: `onNext`, `onComplete` and `onError`.


### Subject

**Subjects are multicast**

It is like an Observer.
Since a Subject is an Observer, this also means you may provide a Subject as the argument to the subscribe of any Observable

A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

Every Subject is an Observable. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. 

From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

It is an object with the methods `next(v), error(e), and complete()`. To feed a new value to the Subject, just call `next(theValue)`, and it will be multicasted to the Observers registered to listen to the Subject.

```js
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

```js
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

### Observables
Observables are lazy Push collections of multiple values.

An observable is just a function that takes in an `observer` and schedules its execution and calls the observer callbacks.

#### Creating Observable

Constructor takes a function named as subscribe.
The function subscribe takes in a subscriber(also known as observer).

```js
const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi')
  }, 1000);
});
```

#### Subscribing to an Observable

The function subscribe provided above is the same that would be called
to subscribe to the observable.
```js
observable.subscribe({
    onNext :() => {},
    onComplete: () => {},
    onError: () => {}
});
```
Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.

#### Execution of observable

The code inside `new Observable(function subscribe(subscriber) {...})` represents an "Observable execution", a lazy computation that only happens for each Observer that subscribes. The execution produces multiple values over time, either synchronously or asynchronously.

In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.

It is a good idea to wrap any code in subscribe with try/catch block that will deliver an Error notification if it catches an exception:

```js
import { Observable } from 'rxjs';
 
const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

#### Disposing observable execution

When `observable.subscribe` is called, the Observer gets attached to the newly created Observable execution. This call also returns an object, the Subscription:

```js
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();
```

Proper example:
```js
const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```



