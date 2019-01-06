

### Css loader

Resolves css imports and `url()` references, and copies them as string in JS. does not actually do anything to affect browser.


### styles-loader

Often used in conjunction with css loader,
The style string given by css-loader is picked up by styles-loader
and injected in `<head>` tag as a `<style>` tag in an inline fashion.

Together they are used in following form `import * from 'styles!css!app.css'`,
The loaders are applied from right to left i.e. first css loader is applied followed by styles loader.




