

## Answer/output display (modeled via div)
 
The input is modeled as a `div` instead of `input` to keep validation simple and straightforward, so in this case input would be happening via buttons majorly.

Have two smaller divs inside:
1. for current operand
2. for previous operand

e.g.
```html
<div class="output">
   <div class="previous-operand"></div>
   <div class="current-operand"></div>
</div>
```

`Concern`: operands can grow arbitrarily large.

To have one of the rows auto height, specify it in template:
e.g
```css
.container {
    height: auto;
    width: 300px;
    margin: 0 auto;
    background-color: white;
    align-content: center;
    justify-content: center;
    display: grid;
    gap: 2px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: minmax(120px, auto) 1fr 1fr 1fr 1fr 1fr;/* first row can have auto height, remaining 5 rows have same height fixed */
}
```

## Identifying buttons

Setup data attributes.
e.g. `data-operation` on operations.
e.g.
```html
<button data-number class="btn">1</button>
```

And in js, you can get reference to them by
```js
const numbers = document.querySelectorAll('[data-number]');
```

## Operation mode

Choosing any operation, moves the currently entered number along with operation to the previous operand text section, and clears current operand text section for newer number.

previous operand will always have some operation with it.

Equals press or another operation press triggers pending compute() of pending operation.
compute always clears current operation remembered

chooseOperation (invoked on operation press) remembers operation to do in calculator class. It also check if there is a pending operation, then that pending operation is computed first before registering this operation.

## Number parsing

Use `parseFloat` to interpret strings as numbers

## Organizing data operations and state

make a `Calculator` class.

## Validation aspects

1. Only allow numbers.
2. Decimal dot only allowed once
3. 

## Layout

One input.
Many buttons.

Can try css grid to have a nice quick layout


## How to setup grid?

No of columns go in grid-template-columns, and no. of rows go in grid-template-rows:

```css
.container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}
```

## Do we need to give id to all buttons?

## Do we need to setup click listeners for all the buttons?


