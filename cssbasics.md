
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

https://hacks.mozilla.org/2015/03/understanding-inline-box-model/

### css @import

The `@import` CSS at-rule is used to `import style rules from other style sheets`.
Imported rules must precede all other types of rules.
e.g.
```css
@import 'custom.css';
@import url("chrome://communicator/skin/");
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
```


### css variables

Custom properties (sometimes referred to as CSS variables or cascading variables) are entities defined by CSS authors that contain specific values to be reused throughout a document. 

Custom properties allow a value to be stored in one place, then referenced in multiple other places. An additional benefit is semantic identifiers. For example, `--main-text-color` is easier to understand than `#00ff00`, especially if this same color is also used in other contexts.

They are set using custom property notation (e.g., `--main-color: black;`) and are accessed using the `var()` function 
(e.g., `color: var(--main-color);`).


* A common best practice is to **define custom properties on the `:root` pseudo-class**, so that it can be applied globally across your HTML document:

```css
:root {
  --main-bg-color: brown;
}
```


### display block

Now, the difference between display: inline-block and display: block is that, with display: block, a line break happens after the element, so a block element doesn’t sit next to other elements.

### display inline

the width and height are not respected, and how the padding top and bottom are present, but overlap over the lines above and under.

1. respect left & right margins and padding, but not top & bottom
2. cannot have a width and height set
3. allow other elements to sit to their left and right.
4. see very important side notes on this here.


### display inline-block

Compared to display: inline, the major difference is that inline-block allows to set a width and height on the element. Also, with display: inline, top and bottom margins & paddings are not respected, and with display: inline-block they are.

Here the width, height and padding are respected, but the two copies of the element can still sit side by side.

1. allow other elements to sit to their left and right
2. respect top & bottom margins and padding
3. respect height and width

### Formatting context

Elements that establish a formatting context are
1. table container
2. flex container
3. grid container
4. block container

### Positioning

Default value for `position` is `static`.

1. `static`: This is the default value, the `top`, `left`, `right`, `bottom`, `z-index` do not have any effect.

2. `relative`: The element is positioned according to normal flow of document. Then it is offset from it's decided position using `top`, `left`, `right`, `bottom`.

3. `absolute`: Element is first  removed from normal document flow.
It is positioned relative to it's closest non-static positioned ancestor.

4. `sticky`: Lookup on MDN.

### `display:none` vs `visibility:hidden`

`display:none` means that the tag in question will not appear on the page at all (although you can still interact with it through the dom). There will be no space allocated for it between the other tags.

`visibility:hidden` means that unlike `display:none`, the tag is not visible, but space is allocated for it on the page

#### Identifying the containing block

1. `position` is `static` or `relative`: containing block is formed by edge of content box of nearest ancestor element that is block container(`block`, `inline-block` element) or which establishes a formatting context(`table`, `flex container`, `grid container`)

2. `position` is `absolute`: containing block is formed by edge of padding box of nearest ancestor that has **position value other than** `static`.

3. `position` is `fixed`: containing block is viewport.


#### Selectors syntax

A CSS Rule consists of a list of (one or more)selectors and a list
of declarations.
To check in detail: https://kittygiraudel.github.io/selectors-explained/?

A CSS declaration consists of a property and a value seperated by ':'

* Element/Type/Tag Selector : Simple consists of tag name. e.g.
``` css
p {
    text-align: center;
    color: red;
}
```

* Class Selector: Uses a period before class name (.) , matches class name e.g.
``` css
.center {
    text-align: center;
    color: red;
}
```

* Id Selector: Uses a hash '#' to match elements in html with specified id. e.g.
``` css
#para1 {
    text-align: center;
    color: red;
}
```

* Attribute Selector: Attribute selectors are a special kind of selector 
that will match elements based on their attributes and attribute values. 
Their generic syntax consists of square brackets ([]) containing an attribute name 
followed by an optional condition to match against the value of the attribute. 
Attribute selectors can be divided into two categories depending on the 
way they match attribute values: 
Presence and value attribute selectors and Substring value attribute selectors
(https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Attribute_selectors)

* Grouping/Multiple Selectors: When you want to have more than one selectors to have
same declarations, you should seperate them by comma ','
e.g. 
``` css
h1, h2, p, .yetanotherclass {/* reads as h1 or h2 or p or yetanother class all get these rules */
    text-align: center;
    color: red;
}
```

* Next sibling combinator: 'E + F', i.e. uses + between two selectors.
Only match when E and F share same parent and E immediately preces F.
``` css
h1 + h2 {
    opacity: 0.8;
}
```

* Nested/descendant selectors: `Uses Space (' ')`, also known as `decendent combinator`. 
Only match when given nesting matches in dom structure.
e.g.
``` css
#top p { /* only matches when there is a p tag inside a div with id top */
    color: red;
    font-weight: bold;
}
```
**Note**: only descendant is selected.

In order to `match only direct children, use child combinator '>'`
e.g. `#top > p` will match only p's that are direct children of elemnts with id top.


* Pseudo classes: Psedu-classes are bolted on to a selector with colon ':',
to specify a relation/state along with selector. commonly used for hover etc. 
``` css
selector:pseudo-class {
    property:value;
}
```


### Multiple selectors

`AND selection`: no spaces between selectors.
Have them without spaces, think of it as an `and` selector:
e.g.
```css
div.red { /* matches all divs and having class red */
    /* rules */
}
```

`OR selection`: put comma between selectors:
```css
span, li { /* matches span, also matches with li i.e. span or li */

}
```

### Multiple class selectors

#### multiple classes applied

* Both classes are applied on same element:
```css
.classa.classb {
    /* rules */
}
```

* element of classa has a descendant element of classb:
```css
.classa .classb {
    /* rules */
}
```

* classa or classb, both should have these ruleset
```css
.classa,.classb {
    /* rules */
}
```

* About links:

  * Sometimes we want to add links, before hand knowing where they
  will link to, in which case, set href="#" also known as a dead link.

  * you can turn any dom element into link(e.g img(, by nesting them into anchor tag

* Understanding CSS border-radius:
(Find out more at https://www.w3.org/TR/css3-border/#border-radius)
Whenever we give border radius, border-radius actually takes
two values x/y (horizontal raidus/vertical radius) i.e.
```
border-radius: 12;
```
is same as
```
border-radius: 12 12;
```

So what is it look like to have different x/y radius for
border-radius?
It is a 90 degree part of ellipse, you know ellipse has two radii
so greater x/horizontal radius will result n a horiontally fatter
ellipse portion, and greater y/vertical radius is vertically longer
ellipse portion

Using percentages in border radius: percentages are calcualted
with respect to border box width for x/horizontal
and with respect to border box height for y/vertiical

Corner curves must not overlap: When the sum of any two adjacent border radii exceeds the size of the border box, UAs must proportionally reduce the used values of all border radii until none of them overlap
and
reducing the radii of the circle to half the size of the smallest side.
e.g. 
https://stackoverflow.com/questions/29966499/border-radius-in-percentage-and-pixels-px-or-em




* CSS borders have properties like style, color and width,
which are aptly named : border-color, boder-width and border-style
e.g.
```
.thick-green-border {
  border-color: green;
  border-width: 10px;
  border-style: solid;
}
```

* give two classes to an tag using spaces in class string e.g.
```
<img class="class1 class2">
```

Note: also check to use devtools to maximize style work productivity

CSS has rules about inheritance and cascading,
in case of conflicts, some styles will take precedence over other,
and styles are inherited into children,
The order and rules in which the final styles are determined can
be found in:

https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance

Importance:

Specificity:
Specificity is measure of how specific a selector is.
Element selectors have lower specifity that class selectors.
So class selectors will win against element selectors,
Similarly id selectors will win against class selectors.
The only way to win against ID selector is to use !important

Source order:

If multiple competing selectors have same importance,
and same specificity, the third factor that comes into
play is source order, i.e. later rules will win over
earlier rules

e.g.
  p {
      color: blue;
  }

  p {
      color: red;
  }

will result in red color for paragraph selector

Also order of overriding as follows:

1. browser default
2. External stylesheet
3. internal stylesheet
4. inline style



* https://github.com/reworkcss/css is a good CSS parser, i.e. converts css string input
to CSS AST. used in various css tooling.


### width and max-width

```css
width: 98%;
max-width: 1140px;
```
you are telling the browser to give a width of 98% of the screen, but not bigger than 1140px.

In your second example,
```css
width: 1140px;
max-width: 98%;
```
you are telling the browser to give a width of 1140px but not larger than 98% of the browser.

### SCSS and SaSS

Meta language (supports variables etc) that compiles to css,
SCSS has semicolons, Sass does not, otherwise both are same. 

### BEM convention

BEM stands for block-element-modifier.

Always using classes, no element selectors etc.
No nesting of selectors

```css
.some-blockName__some-elementName--some-modifier
```

The whole point of a naming convention is to make things easier on humans. You can read the selector and get some good information about how and where it should be used. The BEM naming convention could have started off with "--" for modifiers and "__" for elements, but it didn't. They went with "__" for elements and "--" for modifiers.

Take a look at these classes: `button`, `button__icon`, `button--secondary`

Without a convention, there's no real rhyme or reason to the above. With the rules in place though you can glance at those three a know that we:

1. Have a button class
2. Have a secondary button style available to use
3. Can add icons into the button with button__icon


### Complex cases

`div.form-square > div` consists of 1 class selector + 2 type selectors (plus a child combinator).

`.seven-col` consists of 1 class selector.

The number of class selectors is equal, so the comparison is done in type selectors. The first selector has more type selectors so it is more specific.

Specificity is based on the number of each kind of selector in the entire thing, not for the part on the right hand side of the rightmost combinator.

### Generic flex based overlay

Positioned absolutely with left top to 50%, and translate adjust for its own size, and z-index applied.

```css
.overlay-box {
    position: absolute; /* parent container needs to have position: relative */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background: #ccc;
    opacity: 0.7;
    z-index: 1000;
}
```

### borders vs outlines

In CSS, borders and outline are nearly the same thing, with two main differences:

With borders, you can target each side individually (i.e. top, left, right, and bottom), by using border-top, border-left, etc. With outlines, it's either all four sides, or none at all.

Borders take up physical space on your page, but outlines don't. So for example, if you added a 1px border to a box that is 200px wide, then the total width of the box with the border would be 202px. If you added an outline to that same box, the total width would still be 200px, since outlines overlay on top of the element, instead of to the side of the element.

### margins and paddings

If the margin property has four values:

`margin: 10px 5px 15px 20px;`
top margin is 10px
right margin is 5px
bottom margin is 15px
left margin is 20px
If the margin property has three values:

`margin: 10px 5px 15px;`
top margin is 10px
right and left margins are 5px
bottom margin is 15px
If the margin property has two values:

`margin: 10px 5px;`
top and bottom margins are 10px
right and left margins are 5px
If the margin property has one value:

`margin: 10px;`
all four margins are 10px

### input and focus

You can hide default outline shown in focused state of input using:
```css
.form-control input:focus {
    outline: 0;
}
```

### CSS Variables

Variables are declared within a scope.
For a global scope you can use either the :root or the body selector.

The variable name must begin with two dashes (--) and is case sensitive.

e.g.
```css
:root {
  --main-bg-color: coral;
}
/* usage by var()*/
#div1 {
  background-color: var(--main-bg-color);
}
```

### z-index

Learn about stacking context.

**Note**: z-index only works on positioned elements (position:absolute, position:relative, or position:fixed).


### pseudo stuff



#### pseudo elements

single colon `:` or double colon `::`?
CSS3 specifies pseudo classes be specified with double colon: `::`

`before` and `after`, part of the same element, e.g. part of the element with `.required` class mentioned below.
You can have only one `before` and one `after` per element.
`content` attribute is necessary in the pseudo element.

specified in css with a class e.g.
```css
.required::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: red;
}
```


pseudo elements are not possible on inputs.

When to use?
Automatically add content via css if a class is applied.
can also be used for tooltips if placed inside `element:hover::after`.

Another pseudo element, is `::selection`.
another one is `::first-line`


#### pseudo classes

Use a single colon i.e. `:`.
represent `state` of an element.

List of pseudo classes:
1. `:hover`
2. `:active`
3. `:link`
4. `:focus`
5. `:checked`
6. `:visited`
7. `:optional`
8. `:required`
9. `:valid`
10. `:invalid`
11. `:disabled`
12. `:empty`
13. `:in-range`
14. `:lang()`
15. `:not(innerSelector)` - takes one more normal css selector inside which is negated.
16. `:out-of-range`
17. `:root`
18. `:only-of-type`
19. `:nth-child()`
20. `:nth-of-type()`
21. `first-child`
22. `last-child`
23. `first-of-type`
24. `last-of-type`


### css only tooltip

tooltip text content will come from `data-` attribute from DOM.
Can be made by adding a before pseudo element that hosts the tooltip view.

Content is hosted by `before` pseudo element
```css
.avatar:hover::before {
    content: attr(data-tooltip);
}
```

Triangle arrow is hosted by `after` pseudo element.


### inset property

### Matching media queries in javascript

Use `window.matchMedia(query)` to check media query matching.


## box model border-box

### Default box model is `content-box`

In `content-box` model, `border` is not a part of the width.
The `width` and `height` properties include the content, but **does not include the padding, border, or margin**

### Border-box

In this model `border width` is considered part of the width.
**The `width` and `height` properties include the `content`, `padding`, and `border`, but do not include the `margin`.**

## Remove bullets from li items

`list-style: none`

## Change cursor to hand on hover

```css
li:hover {
    cursor: pointer;
}
```

## Creating separators/dividers using css

```css
li:not(:first-child){ /* apply css on everything except the first child */
  border-left:2px solid white;
}
```


## nth-of-type vs nth-child

`xyz:nth-of-type(n)` : In a group of siblings of same type `xyz`, select nth one. This is normally preferred.

`xyz:nth-child(n)`: if `n`th child of parent of `xyz`,  is actually of type `xyz`, select it.

Example in given html:
```html
<ul>
    <p>hi</p>
    <p>hey</p>
    <li>one</li>
    <li>two</li>
    <li>three</li>
</ul>
```
How following css reacts:
```css
li:nth-child(2) { /* selects nothing because 2nd child of ul is not li */

}

li:nth-of-type(2) { /* selects "two" li item */

}
```

e.g. in 
