
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



