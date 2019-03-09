
### default values in web

1. `align-items`: `stretch`
2. `flex-direction`: `row`
3. `justify-content`: `flex-start`
4. `order`: 0
5. `position`: `static`


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

