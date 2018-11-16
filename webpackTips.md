

### Use source-maps

`dev-tool: 'source-map'` is a life saver,
it generates source-maps at the same level as index.html, 
will automatically help you debug code in devtools.


### Debuggin webpack plugins

Put below in package.json script and put breakpoints in webpack.config.js code
```
    "debug": "node --inspect-brk node_modules/webpack/bin/webpack.js --verbose"
```

### Tapable

Many objects in webpack extend the Tapable class. The class exposes tap, tapAsync, and tapPromise methods which plugins can use to inject custom build steps that will be fired throughout a compilation.

