
### glyphicons

Glyphicons are images and not a font. All the icons are found within a sprite image (also available as individual images) and they are added to the elements as positioned backround-images:

### font-awesome

Actual font icons (FontAwesome, for instance) do involve downloading a specific font and make use of the content property, for instance:

```css
@font-face {
    ...
    src: url('../font/fontawesome-webfont.eot?#iefix&v=3.0.1') format('embedded-opentype'),
         url('../font/fontawesome-webfont.woff?v=3.0.1') format('woff'),
         url('../font/fontawesome-webfont.ttf?v=3.0.1') format('truetype');
    ...
}

.icon-beer:before {
    content: "\f0fc";
}
```