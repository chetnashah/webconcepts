
## Resources

https://www.youtube.com/watch?v=9zBsdzdE4sM

##

Declaring `display: grid` gives you a one column grid, 
so your items will continue to display one below the other 
as they do in normal flow.

### fr unit

This unit represents one fraction of the available space in the grid container.

In this case the space is equally given to all the columns saying `1fr`
```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```

### Showing gap between columns/rows

`grid-column-gap` and `grid-row-gap` and `grid-gap` should be used together with template-colums like mentioned above.


### grid-template-*

This rule is applied in the container css
`grid-template-*` declarations take `track size` in the arguments

```css
.container {
  /* this makes a 3 rows x 5 column grid with given track sizes */
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```

A shorthand `grid-template` stands for both rows and columns combined separated by a `/`: 
e.g.
```css
.container {
  grid-template: 40px 50px 1fr / 30px 30px;
}

grid-template: "a a a"
               "b b b";
grid-template: "a a a" 20%
               "b b b" auto;
```

### grid-row-* and grid-column-*

These rules are applied in the grid-item css
These rules take `start and end lines` or `start line with span` as arguments
These rules will override whatever is specified in `grid-template-*` mentioned above

```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: 1;
  grid-row-end: 3;
}

.item-b {
  grid-column: 2 / 5; /* column occupation of this item goes from line-2 to line-5 */
  grid-row: 1 / span 2 /* row occupation of this item goes from line-1 to line-3 */
}
```

### grid-area and grid-template-areas

The `grid-area` CSS property is a shorthand property for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, specifying a grid item’s size and location.
Other way is it should to refer to a predefined name present in `grid-template-areas` which has already a layout.

The `grid-template-areas` CSS property specifies named grid areas.
https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
```css
#page {
  display: grid;
  width: 100%;
  height: 250px;
  grid-template-areas: "head head"
                       "nav  main"
                       "nav  foot";
                       /* seeing below makes a 3row x 2col layout  */
                       /* which will be alloted to 4 names mentioned above */
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 150px 1fr;
}

#page > header {
  grid-area: head;
  background-color: #8ca0ff;
}

#page > nav {
  grid-area: nav;
  background-color: #ffa08c;
}

#page > main {
  grid-area: main;
  background-color: #ffff64;
}

#page > footer {
  grid-area: foot;
  background-color: #8cffa0;
}
```

### Properties of grid container

* display
* grid-template-columns
* grid-template-rows
* grid-template-areas
* grid-template
* grid-column-gap
* grid-row-gap
* grid-gap
* justify-items
* align-items
* place-items
* justify-content
* align-content
* place-content
* grid-auto-columns
* grid-auto-rows
* grid-auto-flow
* grid

### properties of grid items

* grid-column-start
* grid-column-end
* grid-row-start
* grid-row-end
* grid-column
* grid-row
* grid-area
* justify-self
* align-self
* place-self

### Container spec

Specify `display: grid` in container selector.
Grid shape can be specified in container selector using `grid-template-columns` and `grid-template-rows`. column dimension usually specifies colum width, and row dimension specifies row height
e.g.
```css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}
```

### For items inside grid

When `grid-column-start` is used alone, the grid item by default will span exactly one column. However, you can extend the item across multiple columns by adding the `grid-column-end` property.

Typing both `grid-column-start` and `grid-column-end` every time can get tiring. Fortunately, `grid-column` is a shorthand property that can accept both values at once, separated by a slash.

For example, `grid-column: 2 / 4;` will set the grid item to start on the 2nd vertical grid line and end on the 4th grid line.

If typing out both `grid-column` and `grid-row` is too much for you, there's yet another shorthand for that. `grid-area` accepts four values separated by slashes: `grid-row-start`, `grid-column-start`, `grid-row-end`, followed by `grid-column-end`.

If grid items aren't explicitly placed with `grid-area`, `grid-column`, `grid-row`, etc., they are automatically placed according to their order in the source code. We can override this using the order property, which is one of the advantages of grid over table-based layout.

By default, all grid items have an order of 0, but this can be set to any positive or negative value, similar to z-index.

Specifying a bunch of columns with identical widths can get tedious. Luckily there's a repeat function to help with that.

For example, we previously defined five 20% columns with the rule `grid-template-columns: 20% 20% 20% 20% 20%;`. This can be simplified as `grid-template-columns: repeat(5, 20%);`

Grid also introduces a new unit, the fractional `fr`. Each `fr` unit allocates one share of the available space. For example, if two elements are set to `1fr` and `3fr` respectively, the space is divided into 4 equal shares; the first element occupies 1/4 and the second element 3/4 of any leftover space.



### Useful links
https://cssgridgarden.com/
https://learncssgrid.com/