
https://hacks.mozilla.org/2015/03/understanding-inline-box-model/
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

#### Identifying the containing block

1. `position` is `static` or `relative`: containing block is formed by edge of content box of nearest ancestor element that is block container(`block`, `inline-block` element) or which establishes a formatting context(`table`, `flex container`, `grid container`)

2. `position` is `absolute`: containing block is formed by edge of padding box of nearest ancestor that has **position value other than** `static`.

3. `position` is `fixed`: containing block is viewport.


#### Selectors syntax

A CSS Rule consists of a list of (one or more)selectors and a list
of declarations.

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
h1, h2, p, .yetanotherclass {
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

* Nested selectors: Uses Space (' '), also known as decendent combinator. 
Only match when given nesting matches in dom structure.
e.g.
``` css
#top p { /* only matches when there is a p tag inside a div with id top */
    color: red;
    font-weight: bold;
}
```
**Note**: only descendant is selected.

In order to match only direct children, use child combinator '>'
e.g. `#top > p` will match only p's that are direct children of elemnts with id top.


* Pseudo classes: Psedu-classes are bolted on to a selector with colon ':',
to specify a relation/state along with selector. commonly used for hover etc. 
``` css
selector:pseudo-class {
    property:value;
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

