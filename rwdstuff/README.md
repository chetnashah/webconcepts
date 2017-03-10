

default behaviour is showing tiny in smaller viewport.

You would want sizes similary but re-arranged.

first things first : specify viewport meta device width

in Console you can check viewport width with : window.innerWidth

Media queries :
Syntax - 
```
   @media <media-type> and (expressions){}
   
   @media screen and (max-width: 800px){}
   @media TV and (max-width: 800px){}
```

Fluid layouts/Auto Layouts : use relative (to the viewport size) measurements(percentages) and respond to the change in width of viewport

Fixed layouts : use static measurements and do not respond to change in the width of the viewport


When desigining for a particular media query it is a good idea to be in that
media query mode in the browser also, so you can see what is happening.

To see styles controlling a particular element, always use dev tools inspect.
It will show you the styles after cascading.

Although we write px in media queries it is actually points.

Responsive design using media queries define breakpoints:
Sizes of viewport at which presentation changes. 
