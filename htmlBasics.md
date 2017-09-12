
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