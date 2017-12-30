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

### Event bubbling and event capturing
https://javascript.info/ui
https://javascript.info/bubbling-and-capturing
https://www.quirksmode.org/js/events_order.html

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

