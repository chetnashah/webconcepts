
### CopyWebpackPlugin

Copies individual files or entire directories to the build directory.

### ExtractTextPlugin

Extract text from a bundle, or bundles, into a separate file.

### Custom plugins

`Plugin`s can be hooked into events of all instances of classes that extend Tapable.
The classes `compiler` and `compilation` extend `Tapable`, hence you can modify behavior of building process via plugins.

```js
class CustomPlugin {
    constructor(options) {

    }

    apply(compiler) {
        compiler.plugin("done", function(stats){
            // code to execute after compilation has finished.
        });
    }
}
```

Usage of the plugin in webpack config file

```js
// webpack.config.js
//...
plugins: [
    new CustomPlugin({
        options: 'nothing'
    })
]
```

