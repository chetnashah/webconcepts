
https://www.youtube.com/watch?v=ZVug65gW-fc&list=PLZlA0Gpn_vH8DWL14Wud_m8NeNNbYKOkj&index=24

Doing it using CSS

## For images: Create a class shimmer that animates background color

Image sizes are known before hand and we have given them width and height.
After image loads, the background is no longer used, one can also remove this class in image onLoad callback.

e.g.
```css
.skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
    0% {
        background-color: gray;
    }
    100% {
        background-color: white;
    }
}
```


## For text shimmer

Some div place holders have to be created, and give them the skeleton class mentioned above.
On loading the data, one can put `display:none;` on these place holder divs.

```css
/* additional class along with skeleton class above */
.skeleton-text {
    width: 100%;
    height: 0.5rem;
    margin-bottom: 0.25rem;
}
```