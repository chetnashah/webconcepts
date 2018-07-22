
**tip**: DO not confuse `transition` with `transform`. 

`transition` specifies animation via taking in a property and a timing.

`transform` tells the browser to rotate, scale or translate a view.

To create a transition effect, you must specify two things:

1. the CSS property you want to add an effect to
2. the duration of the effect

Consider given 100 x 100 px red colored div:
```css
div {
    width: 100px;
    height: 100px;
    background: red;
    -webkit-transition: width 2s; /* Safari */
    transition: width 2s; /* only comes in to effect when width changes */
}
```

Now somebody hovers and below happens:
```css
div:hover {
    width: 300px;
}
```

The properties can also be specified one by one e.g.
```css
div {
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: linear;
    transition-delay: 1s;/* 1s delay before starting */
}
```