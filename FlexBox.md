
FlexBox can be contrasted with CSS grid, because flexbox deals with layout in one dimension at a time, and CSS grid deals with layout in two dimensions at a time.

### FlexBox vs CSSGrid

flex items can be allowed to wrap but, once they do so, each line becomes a flex container of its own. When space is distributed flexbox does not look at the placement of items in other rows and tries to line things up with each other.


### default values in web

1. `align-items`: `stretch`
2. `flex-direction`: `row`
3. `justify-content`: `flex-start`
4. `order`: 0
5. `position`: `static`
6. `flex-wrap`: `nowrap`
7. `flex-shrink`: 1
8. `flex-grow`: 0
9. `flex-basis`: `auto` -> browser looks to see if items have size.
Then that is used. If size is not specified, content size is used as flex-basis. flex-basis is seen as the beginning size when considering to add more space.


## Remembering shorthand for flex is GSB -> Grow shrink basis

## default flex setting

default flex setting without specifying anything at all is: `0 1 auto`
or:
`flex-grow flex-shrink flex-basis: 0 1 auto`

## flex-shrink

flex shrink only kicks in after there is no space in container in the main axis to fit all items. till then it has no role.

## flex-basis

The flex-basis CSS property **sets the initial main size of a flex item**. It sets the size of the content box unless otherwise set with box-sizing.

An absolute `<length>`, a `<percentage>` of the parent flex container's main size property, or the keyword `auto`. Negative values are invalid. **Defaults to auto**

### `flex-flow` shorthand

`flex-flow` is a shorthand for 
`flex-direction flex-wrap`.

E.g. below are equivalent

```css
flex-direction: row;
flex-wrap: wrap;

/* same as above*/
flex-flow: row wrap;
```

### Multi argument flex (Flex shorthand)

`<flex-grow> <flex-shring> <flex-bais>`

1. single unitless argument specifies proportion, also known as `flex-grow`.
e.g. 
```css
flex: 1
```

2. second unitless argument specifies `flex-shrink`.
comes into play when the flex items are overflowing their container. This specifies how much of the overflowing amount is taken away from each flex item's size, to stop them overflowing their container. Used sparingly

3. Unit argument specifies initial/minimum dimensions, also known as `flex-basis`.
e.g. 
```css
/* first give 200px in main axis,
and when space is left, assign by 1 proportion
*/
flex: 1 200px;
```


## what does `flex: auto` mean?

The item is sized according to its width and height properties, but grows to absorb any extra free space in the flex container, and shrinks to its minimum size to fit the container. This is equivalent to setting `"flex: 1 1 auto"`.


## what does `flex: initial` mean?

The item is sized according to its width and height properties. It shrinks to its minimum size to fit the container, but does not grow to absorb any extra free space in the flex container. This is equivalent to setting `"flex: 0 1 auto"`.


## What does `flex: none` mean?

The item is sized according to its width and height properties. It is fully inflexible: it neither shrinks nor grows in relation to the flex container. This is equivalent to setting `"flex: 0 0 auto"`.


#### Flex shorthand list

1. `flex: auto`: `flex: 1 1 auto`
2. `flex: initial`: `flex: 0 1 auto`
3. `flex: none`: `flex: 0 0 auto`
4. `flex: <number>`: `flex: <number> 1 0px`: Note basis size is 0. 
5. `flex: width`: same as `flex: 1 1 <width>` e.g. `flex: 20em`



## Flex box grow/shrink sizing issue with item borders/padding present

```
<div style="display: flex">
    <div style="flex: 2"></div>
    <div style="flex: 1"></div>
</div>
```
If we add **padding or borders**, the flex items are **not actually distributed at thirds** according to the algorithm, even if box-sizing is set to border-box. 

Basically, that means that sizes (widths, flex bases) have an inner an an outer variant. The inner size includes only the content, the outer one also includes paddings and border widths.

Demo: https://codepen.io/MartinMa/pen/bGdMrjx

Another example:
```html
<div class="flexbox">
  <div class="flex-item">113px</div>
  <div class="flex-item">187px</div>
</div>
<p>
  The flexbox above has a width of 300px and consists of two flex items, which should appear in a ratio of 1:2. The first item should have a width of 100px and the second one should have a width of 200px.  That is what you get, when distributing 300px in a ratio of 1:2. At least, this is the behavior I would have expected.
</p>
<p>
  Instead, the space of the border is NOT included for the ratio calculation. So, 300px minus the border of both item boxes of overall 80px (20px + 20px + 20px + 20px) makes 220px remaining. Distributing 220px in a ratio of 1:2 makes 113px and 187px as seen above.
</p>
<p>
  Tested in Chrome 80.
</p>
```

css:
```css

.flexbox {
  display: flex;
  width: 300px;
}
.flex-item {
  box-sizing: border-box;
  border: 20px solid #007;
}
.flex-item:nth-child(1) {
  flex: 1;
  background: #cc0;
}
.flex-item:nth-child(2) {
  flex: 2;
  background: #0cc;
}
p {
  width: 600px;
}
```

**Solution** - wrap each item into a div with no borders/paddings, and child will considered as content so that the algorithm works out.

https://stackoverflow.com/questions/39581644/flex-grow-doesnt-respect-border-box-bug-or-not-and-any-way-to-overcome

### `flex-order`

Ability to change layout order,
without affecting source order.

`source order`: originally specified order of items.

By `default`, all flex items have an order value of `0`.

Higher `order` value items appear after items of lower order value.

Given `same order` value will result in source order.
e.g.
So if you have four items with order values of 2, 1, 1, and 0 set on them respectively, their display order would be 4th, 2nd, 3rd, then 1st.

### Relationship of flexbox with other layout methods

### Mastering flex wrapping

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items

Creating gutter in flexbox system: speciy uniform margin on all items, but add one more container & specify negative margin on it. say C1 and C2.
* C1 > C2 > items.
* C1 will be regular container.
* C2 will have negative margin to take care of uniform margins on items.
items are regular items.

