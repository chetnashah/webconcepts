

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


HOw to interpret min-width and max-width in media queries, and what are
all the rules?

Image it this way : min-width < my-width < max-width

Read the media query as following:
is my-width less than max-width? Yes -> it matches.
is my-width greater than min-width? Yes -> it matches.
As per rules of cascading style sheets,
all subsequently matched queries will override properties when common
properties found.

Responsive images :
Responsive images are about saving download bandwidth on low width devices.
and not downloading full bleed images.

This is where picture tag (with source tags )comes in :
A typical tag is specified like following:
```
    <picture>
      <source srcset="small.jpg" media="(max-width: 480px)">
      <source srcset="medium.jpg" media="(max-width: 768px)">
      <img srcset="big.jpg">
    </picture>
```

Picturefill is a polyfill for picture tag if picture tag is not supported in browser

A responsive design framework is a bundling of best practices mentioned above into a package:
some of well known responsive design frameworks are 
1. Skeleton
2. Foundation
3. Bootstrap


