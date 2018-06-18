
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
Grid shape can be specified in container selector using `grid-template-columns` and `grid-template-rows`.
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