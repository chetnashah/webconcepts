
### Getting reference to domnodes

use `document.querySelector('#somdid')`

### Dom nodes are mutable

### DOM node interface

https://developer.mozilla.org/en-US/docs/Web/API/Node

Node.nodeType can have one of the following values that represents the type of the node:

1. Node.ELEMENT_NODE
2. Node.ATTRIBUTE_NODE
3. Node.TEXT_NODE
4. Node.CDATA_SECTION_NODE
5. Node.PROCESSING_INSTRUCTION_NODE
6. Node.COMMENT_NODE
7. Node.DOCUMENT_NODE
8. Node.DOCUMENT_TYPE_NODE
9. Node.DOCUMENT_FRAGMENT_NODE
10. Node.NOTATION_NODE


#### HOw to get the node type?
```js
const paragraph = document.querySelector('p');
paragraph.nodeType === Node.ELEMENT_NODE; // => true
```
```js
const paragraph = document.querySelector('p');
const firstChild = paragraph.childNodes[0];
firstChild.nodeType === Node.TEXT_NODE; // => true
```

#### DOM Element

 an element is a node that’s written using a tag in the HTML document. `<html>`, `<head>`, `<title>`, `<body>`, `<h2>`, `<p>` are all elements because they are represented by tags.

 an element is a node of a specific type — element (Node.ELEMENT_NODE).

`Node` is constructor of a node, and `HTMLElement` is a constructor of an element in JavaScript DOM. A `paragraph`, being a node and also an element, is an instance of both `Node` and `HTMLElement`:
```js
const paragraph = document.querySelector('p');
paragraph instanceof Node;        // => true
paragraph instanceof HTMLElement; // => true
```


### Creating elements

`document.createElement()` method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.

```js
// let element = document.createElement(tagName[, options]);
document.body.onload = addElement;

function addElement () {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
```

### Ways of selecting elements

1. `document.getElementById`
2. `document.getElementByClassName`
3. `querySelector` - all in one selector e.g. `h1`, `#red`, `.myclass`. In case of multiple matches, will return the first match. Returns instance of `Element`.
4. `document.getElementsByTagName` - return value not an array but array like object, extending protolink over `HTMLCollection`.


5. `element.getElementsByClassName`: gets matching elements by class in the subtree of the element on which the method is being run.
6. `element.getElementsByTagName`: similar to above.

7. `querySelectorAll`: similar to queryselector, but returns a `NodeList` of `Element`.


### Printing selected element properties

Use `console.dir`, e.g. `console.dir($0)`, where `$0` stands for selected element from devtools.
or `console.dir(document)`


### Manipulating the DOM

#### innerText

The `innerText` property of the `HTMLElement` interface represents the `rendered text content` of a node and its descendants.

#### textContent

`textContent` differs from `innerText` as `textContent` means the text content before the rendering, which is present in source.

e.g. 
```html
<p>
    Hey hi how are
    <script>console.log('Hey hi');</script>
</p>
```

For above `p` element,
`innerText` is:
`Hey hi how are`
where as `textContent` is:
```txt
Hey hi how are
console.log('Hey hi');
```

#### innerHTML