
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
7. `flex-basis`: `auto` -> browser looks to see if items have size.
Then that is used. If size is not specified, content size is used as flex-basis.



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

#### Flex shorthand list

1. `flex: auto`: `flex: 1 1 auto`
2. `flex: initial`: `flex: 0 1 auto`
3. `flex: none`: `flex: 0 0 auto`
4. `flex: <number>`: `flex: <number> 1 0px`: Note basis size is 0. 
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

