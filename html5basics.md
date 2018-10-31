
### HTMLElement vs jQuery objects

I would like to understand relationship between jQuery object and DOM element

A jQuery object is an array-like object that contains DOM element(s). A jQuery object can contain multiple DOM elements depending on the selector you use.

Also what methods can operate on jQuery object vs DOM element? Can a single jQuery object represent multiple DOM elements ?

jQuery functions (a full list is on the website) operate on jQuery objects and not on DOM elements. You can access the DOM elements inside a jQuery function using `.get()` or accessing the element at the desired index directly:
```js
$("selector")[0] // Accesses the first DOM element in this jQuery object
$("selector").get(0) // Equivalent to the code above
$("selector").get() // Retrieve a true array of DOM elements matched by this selector
```
In other words, the following should get you the same result:
```html
<div id="foo"></div>
```
```js
alert($("#foo")[0]);
alert($("#foo").get(0));
alert(document.getElementById("foo"));
```
For more information on the jQuery object, see the documentation. Also check out the documentation for .get()

### What are HTML forms?
An HTML form is a collection of widgets containing data, that can be sent to
a server.

A form element is a form tag that just behaves like a container e.g. div
```
<form action="/my-handling-form-page" method="post">
  <!-- input widgets here -->
</form>
```
The two important attributes here are:
  * action : defines location URL where the form's collected data
  should be sent when it is submitted. If action is empty string, the form data will be sent to same location as current URL.

  * method : the HTTP method used to send the data with.

#### HTML forms and buttons

A button in a form is created using a `<button>` element or an `<input>` element. 
Technically speaking, there is almost no difference between a button defined with the `<button>` element or the `<input>` element. The only noticeable difference is the label of the button itself. Within an `<input>` element, the label can only be character data, whereas in a `<button>` element, the label can be HTML, so it can be styled accordingly.

It's the value of type that specifies what kind of button is displayed:
  1. submit - submit form on button click
  2. reset - rest form on button click

``` html
<button type="submit">
    This a <br><strong>submit button</strong>
</button>

<input type="submit" value="This is a submit button">
```

If the user hits enter when a text field is focused, the browser should find the first submit button in the form and click it.
Or in other words pressing enter key submits forms.

So, in a form with no submit buttons, implicit submission will be done if only one input is present. Therefore, pressing enter in this textbox will submit the form:

``` js
<form>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
</form>
```
But in below form it will not because there are multiple fields:
```js
<form>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
    <label for="address">Address:</label>
    <input type="text" name="address" id="address">
</form>
```

Therefore, if you have a form with more than one input field, always include a submit button. Specifically an `<input>` with the type="submit" attribute, or a `<button>` element should be present.

If you need to run some JavaScript before the form is submitted (validation, data manipulation, etc), do it in a submit event handler on the form, not a click handler on a button.

When a form is sent using Enter on an input field, a click event triggers on the `<input type="submit">`.

#### Explicit form submit on clicks

Each formElement has a `submit()` method that should be called in order to
submit form manually, e.g. on a click listener.

```js
    document.getElementById('mylink').onclick = function() {
        document.getElementById('myform').submit();
        return false;
    };
```

#### Listening to form submit events

The submit event triggers when the form is submitted, it is usually used to validate the form before sending it to the server or to abort the submission and process it in JavaScript

**Note**
The `submit` event is raised when the user clicks a submit button in a form (`<input type="submit"/>`).

The submit event is not raised when the user calls `form.submit()` function directly.

The default action of submit event is to post form according to `action` attribute. This behaviour can be prevented in onSubmit listener.

Practical use case: The handler can check the data, and if there are errors, show them and call `event.preventDefault()`, then the form won’t be sent to the server.


Inline listener in form element:
```html
<form onsubmit="myFunction()">
  Enter name: <input type="text">
  <input type="submit">
</form>
```

Or via eventListener in JS
```js
formElement.addEventListener("submit", function(ev){
  console.log('checking validity');
  if (allValid){
    // do submission manually
  } else {
    // show errors
  }
  ev.preventDefault();// don't do action url stuff
});
```

### When and how to use images on your website?
If you own an image, it is usually good idea to put it
inside the filesystem where your webpage is, coz if you put to
a link e.g. src="https://www.example.com/imgname.png", it will
just lead to browser doing more work.


show images on your site only if 
1. you own the image
2. somebody else owns image, and you got explicit permission from owner
3. you have proof that image is in public domain.

In addition, never point your src to image on someone else's website 
image that you don't have permission to link to, also known as hotlinking.

alt attribute on images is useful for screenreaders, show text when
image does not load and SEO optimization


* A polyfill, or polyfiller is a peice of code that provides the technology that you the developer expect the browser to provide natively.

Example of a polyfill of String `startsWith()` method
``` js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```

### Form validation

Web forms that use a basic submit-and-refresh model of interactivity don’t respond until you hit the “submit” button—but it doesn’t have to be this way. Real-time inline validation (validation as you type) can help people complete web forms more quickly and with less effort, fewer errors, and (surprise!) more satisfaction.


* There are polyfills for all sorts of browser features:

SVG
Canvas
Web Storage (local storage / session storage)
Video
HTML5 elements
Accessibility
Web Sockets
and many more!

for which you can use Modernizr https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills


### pushState vs replaceState

Both of them manipulate url without loading them.

`replaceState()` will change the URL in the browser (ie. pressing the back button won't take you back)

`pushState()` will change the URL, and keep the old one in the browser history (ie. pressing the back button will take you back)

The definition looks like below
```js
history.pushState(stateObj, title, URL);

//e.g
//This will cause the URL bar to display http://mozilla.org/bar.html, but won't cause the browser to load bar2.html or even check that bar2.html exists.
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");

// get current state of history
var currentState = history.state;
```

