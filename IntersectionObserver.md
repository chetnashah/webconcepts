
##

https://www.youtube.com/watch?v=2IbRtjez6ag

## Applications

1. lazy loading
2. infinite scrolling.
3. visibility of ads to calculate ad revenues
4. deciding wether or not to perform tasks or animations based on whether or not user will see the result.

## Past implementations

Loop or `setInterval + Element.getBoundingClientRect()` - The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

##

Asynchronously observe changes in intersection of target element with an ancestor element.

The Intersection Observer API lets code **register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount**.

## Creating intersection observer (specify root)

```js
let options = {
  root: document.querySelector('#scrollArea'), // specify root as null if viewport relative
  rootMargin: '0px',
  threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);
```

## Targeting an element to be observed

```js
let target = document.querySelector('#listItem');
observer.observe(target);

// the callback we setup for the observer will be executed now for the first time
// it waits until we assign a target to our observer (even if the target is currently not visible)
```

## Callback shape

The callback receives a list of `IntersectionObserverEntry` and the observer.

```js
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```

## Intersection root

The top/outer container to track against is known a root.
This intersection root is used to check against target/targets.

if set to null while creating Intersection observer, it is the viewport bounds,
else it is intersection root's bounding client rectangle(as returned by calling `getBoundingClientRect` on it).

## Thresholds

Rather than reporting every infinitesimal change in how much a target element is visible, the Intersection Observer API uses thresholds. When you create an observer, you can provide one or more numeric values representing percentages of the target element which are visible. Then, the API only reports changes to visibility which cross these thresholds.

For example, if you want to be informed every time a target's visibility passes backward or forward through each 25% mark, you would specify the array `[0, 0.25, 0.5, 0.75, 1]` as the `list of thresholds when creating the observer`.

## Stop observing inside the callback

```js
function callback(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) { // visible on screen
            observer.unboserve(entry.target);
        }
    });
}
```