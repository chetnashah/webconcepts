
### `transition`

**tip**: DO not confuse `transition` with `transform`. 

`transition` specifies animation via taking in a property (basically sets up listener on property for changes and runs timers on change) and a timing. (thus being declarative in nature i.e. no explicit "start" etc required).

`transform` tells the browser to rotate, scale or translate a view (does not animate on its own, needs `transition` to work)

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


### transition vs animation property

`Transition`:

Works on a property e..g `opacity` or `transform`.
* Needs a triggering element (`:hover`, `:focus` etc.)
* Only 2 animation states (`start` and `end`)
* Used for simpler animations (buttons, dropdown menus and so on)
* Easier to create but not so many animation/effect possibilities

`Animation @keyframes`:

Animations have a `name`, which corresponds to a `keyframe` that has to be defined as well.
* It can be used for endless animations
* Can set more than 2 states, e..g `0%{}, 25%{}, 50%{}, 100%{}`.
* Jumps to original by default, in order to keep all the properties after animation is over, it can be overriden using `forwards`.
* No boundaries
* Can be iterated over and over, with a specified count.
* `animation-play-state` can control play/pause via `paused`/`running`.

### Animation with `@keyframes`

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations

Name your keyframes with `@keyframes name`
e.g.
```css
@keyframes slide {
    from {
        transform: translate(0px);
    }
    to {
        transform: translate(200px);
    }
}
```

**Note** `0%` and `100%` can also be used instead of `from`/`to`.

Now use that `keyframe` via `animation-name` where you are applying it
and duration is specified via `animation-duration`.

```css
div {
    width: 40;
    height: 40;
    animation-name: slide;
    animation-duration: 1s;
}
```

By default above attributes, all the animation values are reset at the end of animation.

To instruct the system to persist or work with property values after the animation is done, `animation-fill-mode` is used.

e.g. `animation-fill-mode: forwards` will retain values set by the last keyframe.
i.e. `to` part of keyframe

```css
div {
  height: 50px;
  width: 50px;
  background-color: yellow;
  animation-name: slide;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
```

Similarly backwards will backwards will setup values set by first keyframe i.e. `from` part of keyframe.

To setup values both before and after animation, use `animation-fill-mode: both`.

`animation-direction`: It is one of `reverse`, `alternate` or `normal`. which will reverse alternate or normally work for going from `from`/`to` sections in keyframes.

#### Animation timing functions

Functions like `cubic-bezier`, `ease-in-out`, `linear` etc. specify curve of how a property changes over time. Default value is usaually `ease`.
Can be modified via specifying `animation-timing-function`.
Make custom timing functions by using cubic-bezier.com

#### Animation shorthand

Specify all properties in a single line.

```css
animation: name duration timingfn delay itercount direction fillmode;
animation: slide 2s ease 0.2s infinite reverse forwards;
```

#### chaining animations

Animations seperated by comma in `animation` field are chained


