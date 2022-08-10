
## Render a table of data with rows and columns


## ApI design

Input: take a container div with id where we will render the data grid

Output: class instance with public API to manipulate rows/columns etc on the fly.

## Height and width need to be given, for the grid container.

Fixed Height and width are applied on the container, 

the container provides a window view into the infinite possible content in all four directions.

## Customizable cell rendering

On Class instance, we can have an api/option to set a custom cell renderer, which would be a functional component, invoked per cell to get custom HTML.

can be set on column levell or global

Will be a functional component:
1. input:  rowIdx, columnIdx, global state/data
2. output: text or HTMLDOMElement that can be rendered

## Customizable loading rendering



### Additional features: paginated data

This means rows can always be dynamically updated via an interface exposed to JS

### Additional feature: filterable data (col values filter)

### additional feature: sortable data (sort any column)

### Additional feature: virtualization

### Additional feature: configurations of columns

### additional feature: selectable rows or range-selection (both in col/rows) + action on selectable rows

### Additional feature: drag/reorder rows

### Additional feature: row grouping

Rows can be grouped/aggregated into a group, based on particular value of column being same.

ability expand/collapse a row group.

Nested row grouping

### Additional feature: col grouping

### Additional feature: live streaming data updating grid

