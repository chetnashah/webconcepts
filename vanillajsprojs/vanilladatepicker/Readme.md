

### scope

* ability to select date.
* need some arrow buttons to move to next month and previous months.
* show current date with a default color.
* selection must have a different color.
* Are we restricting date selection (some dates disabled)?
* Jump between months/years?
* callback trigger when date is selected
* A row or column representing day type e.g. (Mo,Tu,We,Th,Fr,Sa,Su)
* cancel date selection (on press outside)?


### demo image




### starting markup
1. `form-group` container with two elements: `input` and `label`.

### add some markup for overlay

Overlay will contain:
1. header (next/prev arrow and selects to select year and month)
2. body (for days of week)

### Layout and pushing items on grid

https://zellwk.com/blog/calendar-with-css-grid/
```css
 /* Positioning the first day on a Friday */
.date-grid button:first-child {
  grid-column: 6;
}
```