
What are HTML forms?
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
  should be sent when it is submitted.

  * method : the HTTP method used to send the data with.


When and how to use images on your website?
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


