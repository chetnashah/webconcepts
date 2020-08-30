
#### What is load event for a web page?
The load event only happens once per URL/location, when all its resources
are loaded.

### Want to read chrome source code?

https://cs.chromium.org/ has well x-refed chromium source.
Refresh your c++ a little.

#### What are block and inline elements?

Block elements take up full space of parent, examples of block elements are
* div,
* p,
* h1, h2, h3, h4, h5, h6,
* ol,
* ul,
* li,
* section,
* table,
* canvas,
* form,
* footer,
* figure,
* nav,
* video,
* header,
* pre

Inline elements only take up the space they need. Inline elements can start anywhere in a line, You cannot put block elements inside inline elements.

Examples of iniline elements are :
* a anchor,
* b bold,
* i italics,
* br break,
* img image,
* q ,
* script,
* span,
* input (All types),
* button,
* label,
* select,
* textarea.

### Name vs id attributes in elements

id is used to identify the HTML element through the Document Object Model (via JavaScript or styled with CSS). id is expected to be unique within the page.

name corresponds to the form element and identifies what is posted back to the server, e.g. in a form.

### `<template>` element

https://www.html5rocks.com/en/tutorials/webcomponents/template/

The HTML Content Template (`<template>`) element is a mechanism for holding html that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.

Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the `<template>` element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.

Any content within a template won't have side effects. Script doesn't run, images don't load, audio doesn't play,...until the template is used.

e.g.
```html
<template id="mytemplate">
  <img src="" alt="great image">
  <div class="comment"></div>
</template>
```


### What is a Dom Element ?
Element is general base class from which all objects in a `Document` inherit.
For e.g. `HTMLElement` interface is base interface for HTML Elements.

### Difference between Node and Element
For the most part they are same.
but Element hierarchy starts only at
`document.documentElement.parentElement === null` which is
root Element and it's parentElement is null.
Where as Nodes are more generic than Element, e.g. documentElement has parentNode `document.documentElement.parentNode === document`.
Also non-tag parts like Text, Comments are all nodes, have parentNodes etc.

Other differences are nodeName exists for all Nodes, where as tagName exists only if an object is an Element. 

### What is Document?
Document interface represents any webpage
loaded in browser and serves as entry point
into web page's content, which is Dom Tree.
It contains elements like `document.body`
and `document.head` and many other direct properties, like a facade for the webpage.
Although, the root Element is `document.documentElement` which represents
`<html></html>`.

### Changing class values of elements in JS

`className` property in JS gets and sets the value of the `class` attribute of the specified element in html.

```js
let el = document.getElementById('item');
// we are replacing class of html element
if (el.className === 'active'){
  el.className = 'inactive';
} else {
  el.className = 'active';
}

// appending instead of replacing classes
```

### htmlElement.innertext

`HTMLElement.innerText`: A `DOMString` representing the rendered text content of an element. If the element itself is not being rendered (e.g detached from the document or is hidden from view), the returned value is the same as the `Node.textContent` property.


## Events

### Key events

Key Events contain two data properties. KeyCode and Charachter code.

#### `keydown` event

Fired when a key goes down. Repeats.
``` js
// try document.body for el
el.onkeydown = function(e) {
    var realKey = e.keyCode;
    console.log('realKey = ', realKey);
}
```

Preventing default key behavior (can be useful in providing custom navigation behavior):
``` js
// try document.body for el
el.onkeydown = function(e) {
    var realKey = e.keyCode;
    console.log('realKey = ', realKey);
    if (realKey === 40) {// down arrow key
        console.log('one of arrow key will not work');
        e.preventDefault();// this will prevent scrolling which is default behavior of down arrow key
    }
}
```

#### `keypress` event

Fired only when a charachter key goes down. Repeats.

#### `keyup` event

Fired when a key goes up. Once.

### Mouse Event

#### Simple Mouse Events

**mousedown/mouseup** - mouse button clicked or released over element.
**mouseover/mouseout** - mouse pointer is brought in the same area, removed from the area.
**mousemove** - between mouse over and mouseout

#### Complex Mouse Events

These are made from simple ones but are present for convinience.

**click** - triggered if mousedown and mouseup occured over a same element with left button clicked. order is mousedown->mouseup->click.
Click event has a which property which tells left(1),middle(2) or right(3) mouse-button was clicked.

**contextmenu** - triggered if mousedown and mouseup occured with right mouse button

**dblclick** - some delay between clicks

#### Mouse modifier keys

All mouse events include the information about pressed modifier keys.

The properties are:

shiftKey
altKey
ctrlKey
metaKey (Cmd for Mac)
Try below
``` js
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('Hooray!');
    }
  };
</script>
```

Window-relative coordinates: clientX/clientY.

Document-relative coordinates: pageX/clientX.



### Touch Event

Three basic types:
touchstart, touchmove and touchend

Each touch event includes three lists of touches:

**touches**: a list of all fingers currently on the screen.
**targetTouches**: a list of fingers on the current DOM element.
**changedTouches**: a list of fingers involved in the current event. For example, in a touchend event, this will be the finger that was removed.


These lists consist of objects that contain touch information:
**identifier**: a number that uniquely identifies the current finger in the touch session.
**target**: the DOM element that was the target of the action.
**client/page/screen coordinates**: where on the screen the action happened.
radius coordinates and rotationAngle: describe the ellipse that approximates finger shape.

### Change Event

The change event is fired when the value of
a form field is changed.

The onChange event is only called when you have changed the value of the field and it loses focus. e.g. onChange event does not fire when you change text in a textfield, but when you leave the textfield, onChange is fired.

For checkboxes&radios though, onChange should be fired as soon as value changes, no need of blurring to happen

### Event bubbling and event capturing

Mouse and key events -> bubble all the way to document,
Interface events - submit, load, change, focus and blur. In general they do not bubble.

click is one of the some rare events,
that can be fired via a mouse click,
as well as as a keyboard click

https://javascript.info/ui
https://javascript.info/bubbling-and-capturing
https://www.quirksmode.org/js/events_order.html

Let's say you are clicking, hovering, etc. on an element (like a button) you are not only triggering the eventlistener
on button , but all its ancestors in the dom tree.

When the event handler/listener is invoked, the `this` keyword inside the handler is set to the DOM element on which the handler is registered. The event handler also gets access to the event as first argument of the callback.

When discussing the various methods of listening to events,
event listener refers to a function or object registered via EventTarget.addEventListener(),
whereas event handler refers to a function registered via on... attributes or properties. e.g. onclick


### Event listeners and this

Eventlisteners get a function parameter `evt` which indicates the event raised,
and has useful methods like `stopPropogation` and `preventDefault`.

Adding a normal function in dom based event listeners using `addEventListener`,
The `this` within the listener function is set to the target that received the event.
```js
const button = document.getElementById('myButton');
button.addEventListener('click', function() {
  console.log(this === button); // => true
  this.innerHTML = 'Clicked button';
});
```

In case of using arrow function for a dom based event listener using `addEventListener`,
The `this` is the lexically bound this.
```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
```


### Some of browser default actions for given events

**mousedown** – starts the selection (move the mouse to select).
**click on `<input type="checkbox">`** – checks/unchecks the input.
**submit – clicking an `<input type="submit">` or hitting Enter inside a form field** causes this event to happen, and the browser submits the form after it.
**wheel** – rolling a mouse wheel event has scrolling as the default action.
**keydown** – pressing a key may lead to adding a character into a field, or other actions.
**contextmenu** – the event happens on a right-click, the action is to show the browser context menu.



### event.stopPropogation vs event.preventDefault

propogation means propogation in hierarchy via bubbling.
preventdefault on the other hand prevents default action like checking checkbox, or submitting form etc.

``` js
function() {
  return false;
}

// IS EQUAL TO

function(e) {
  e.preventDefault();
  e.stopPropagation();
}
```


#### Throttling and debouncing of events.

Throttle(function, durationms) returns a a function that will called
at most once per duration ms.
e.g. you want a function to be called only once per 250 ms, use throttle.

debounce(fn, waitms)
Debounce is used to know when some repeated event stopped happening.
It will keep delaying the call to given function until waitms elapsed,
if the call was received within waitms, the countdown timer is reset.


#### How to use Drag and drop in HTML5?
Steps on draggable element:
1. declare an element to be dragabble by specifying draggable="true" attribute on element.
2. add a ondragstart implementation to draggable element.
3. set drag data transfer data in the ondragstart method defined above

* Drag data - All DragEvent hold a property named as dataTransfer which is instance of
DataTransfer and contains data that the drop receiving element might need

All drag events have data to be transferred to the drop site. This is often referred to as drag data.

Drag data consists of two peices:
1. type of data
2. drag data itself

During drag start above data is added to DragEvent by draggable element.
On drop site receiver listener, the data is received and decided whether and what to drop
i.e. act upon data as per listeners wish.

Steps on drop receiving element:
1. specify drop element by returning ev.preventDefault() in ondragover method of drop receiving element.


#### How can one listen to scroll events in a div?
One can provide onScroll function as a property to div
``` html
<div onscroll="myFunction()">In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.
<br><br>
'Whenever you feel like criticizing anyone,' he told me, just remember that all the people in this world haven't had the advantages that you've had.'</div>
```
Note these events fire at a high rate and thus function will be called numerouse times and hence its execution must be throttled.

* **Speculative Parsing** : Both WebKit and Firefox do this optimization. While executing scripts, another thread parses the rest of the document and finds out what other resources need to be loaded from the network and loads them. In this way, resources can be loaded on parallel connections and overall speed is improved. Note: the speculative parser only parses references to external resources like external scripts, style sheets and images: it doesn't modify the DOM tree–that is left to the main parser.


### Evaluation of Scripts

Synchronous. Authors expect scripts to be parsed
and executed immediately when parser reaches a script tag.
Parsing of document halts until script is executed (yes executed).
In case script is an external resource, then it must be fetched (synchronously). Authors can add "defer" attribute to script to skip halting of document parsing, and such deferred script will execute after document is parsed.

### Evaluation of stylesheets

Ideally scripts should not affect dom tree, and hence should be parsed independently but,
Often scripts will ask for style information in stylesheets, and Firefox blocks all scripts when there is a style sheet that is still being loaded and parsed. WebKit blocks scripts only when they try to access certain style properties that may be affected by unloaded style sheets. 


### What is module bundling ?
It refers to bundling javascript modules(e.g. es6 modules, commonjs, AMD, UMD) into a single file/bundle for use in production environments.

### What is server side rendering ?

Generate HTML and CSS on the server and sent it to client, usually very useful for first loads.
If our first render itself is dependent on JS to construct HTML, it will take some time to show first load since the JS has to be parse and executed
in order to generate that HTML.

### Mobile quirks...

Apparently in IOS devices, onScroll events in javascript are not triggered during scroll, but only when scrolling is stopped. Apparently all javascript is paused while scrolling is happening(confirm this).


### ScrollTop bug

Sometimes `document.documentElement.scrollTop` always returns 0, i.e. does not reflect viewport but the body element reflects the viewport and so correct values are achieved when using `document.body.scrollTop` and `document.body.clientHeight`.

Find more at: https://dev.opera.com/articles/fixing-the-scrolltop-bug/

### Using anchor tag for clicks

Adding `#` to the `href` attribute jumps to top of the page so not recommended.

Instead do `href="javascript:void(0)"`.
e.g.
```html
<a href="javascript:void(0);">LinkText</a>
```

### What is quirks mode?

Modern browsers generally try to render HTML content according to the W3C recommendations. However, to provide compatibility with older web pages, and to provide additional "intuitive" functionality, all browsers support an alternative "quirks mode".

Quirks mode is not, however, a standard. The rendering of any page in quirks mode in different browsers may be different. Whenever possible, it is better to adhere to the W3C standards and try and avoid depending on any past or present browser quirks.

Generally, quirks mode is turned on when there is no correct DOCTYPE declaration, and turned off when there is a DOCTYPE definition. However, invalid HTML - with respect to the chosen DOCTYPE - can also cause the browser to switch to quirks mode.


## Scheduling in JS

There are four main APIs used for user based scheduling:
1. setTimeout(cb, timeinms)
2. setInterval(cb, timeinms)
3. requestIdleCallback(cb, [options])
4. requestAnimationFrame(cb)

### requestIdleCallback

The `window.requestIdleCallback()` method queues a function to be called during a browser's idle periods. This enables developers to perform background and low priority work on the main event loop, without impacting latency-critical events such as animation and input response. Functions are generally called in first-in-first-out order; however, callbacks which have a timeout specified may be called out-of-order if necessary in order to run them before the timeout elapses.

You can call requestIdleCallback() within an idle callback function to schedule another callback to take place no sooner than the next pass through the event loop.

Ideally don't do dom mutations in idlecallbacks. Use it for stuff that has less priority. Your idle callback should avoid doing anything that could take an unpredictable amount of time

### HTML events

#### e.target vs e.currentTarget

`e.target` is what triggers the event dispatcher to trigger and `e.currentTarget` is what you assigned your listener to.

### Drag-drop

All event names are fully lower case (no camel casing).
E.g. `dragenter` instead of `dragEnter` etc.

Allowing drop:
Calling the preventDefault method during both a `dragenter` and `dragover` event will indicate that a drop is allowed at that location.

You must cancel the default action for `ondragenter` and `ondragover` in order for ondrop to fire. In the case of a div, the default action is not to drop. This can be contrasted with the case of an input type=text element, where the default action is to drop. In order to allow a drag-and-drop action on a div, you must cancel the default action

#### Requirements for a drop

To accept a drop, the drop target has to listen to the following events:

1. The `dragenter` event handler reports whether or not the drop target is potentially willing to accept the drop, by canceling the event.

2. The `dragover` event handler specifies what feedback will be shown to the user, by setting the dropEffect attribute of the DataTransfer associated with the event. This event also needs to be canceled.

3. The `drop` event handler has a final chance to accept or reject the drop. If the drop is accepted, the event handler must perform the drop operation on the target. This event needs to be canceled, so that the dropEffect attribute's value can be used by the source. Otherwise, the drop operation is rejected.

#### dropEffect

Provide visual feedback
Controlled by `ev.dataTransfer.effectAllowed`

possible values for `ev.dataTransfer.dropEffect`
are `move` | `copy` | `link` | `none`

#### Transferring data via drag

Primarily revolves around `ev.dataTransfer.setData` and `ev.dataTransfer.getData`.

1. setup data transfer in `dragstart` event listener.
```js
function dragStartHandler(ev){
    console.log('drag start!');
    ev.dataTransfer.setData('text/plain', ev.target.innerText);
}
```
Returning `false` from dragstart handler means the element is not interested in being dragged.

2. retrieve data in the `drop` event handler by preventing default `ev.preventDefault` along with using `ev.dataTransfer.getData(type)`
```js
function dragDropHandler(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log('drop, got data = ', data);
    ev.target.innerText = data;
}
```

### drag end handling

Within the `drop` and `dragend` events, you can check the dropEffect property to determine which effect was ultimately chosen. 

If the chosen effect were "move", then the original data should be removed from the source of the drag within the dragend event.

**Note** The target for `dragstart`, `drag` and `dragend` events is source node.
The target for `dragover` and `drop` events is current node.

This data can be useful for swapping src and drop-target at end of a drag.


### Animations

Ways to animate:
1. modify `element.style.top/left` etc and other style props in periodic/frame callbacks.
2. `Element.animate([JSONKeyframes, options])`
3. CSS animations with `transition`: all property changes are animated automatically.
4. CSS animation with `animation` attribute.  syntax looks like: `animation: name duration timing-function delay iteration-count direction fill-mode play-state;` where `name` is keyframe declaration via `@keyframe`