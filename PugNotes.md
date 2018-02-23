
* Element attributes are defined in parentheses after their associated element

``` pug
script(type='text/javascript')

link(rel='stylesheet', href='/stylesheets/style.css')
```

* If a tag is followed by the equals sign, the following text is treated as a JS expression. 

Below heading content is title variable
``` pug
h1= title
```

* Javascript Code in pug files.

    1. Unbuffered code - starts with a hyphen i.e. '-', does not add anything to output file
      ``` pug
      - for (var x = 0; x < 3; x++)
        li item
      ```
    2. Buffered code - starts with an equal '=', result is output in file
      ``` pug
      .buffered
      = 'unbuffered vs buffered'
      ```