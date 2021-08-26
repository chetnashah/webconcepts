
### Webpack config important fields

1. `entry` - where to start
2. `output` - what do we want outputted.
3. `module` - module level processing & transformation, has a field called `rules`
4. `plugins` - more powerful processing and hooks into webpack compiler.
5. `resolve` - where to find modules/things etc.

### Webpack sync module loading in nutshell

Below is bundle code for a `index.js`, that uses
`multiply.js` and `add.js`.

```js
// the webpack bootstrap
(function (modules) {
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        // Create a new module (and put it into the cache)
        // Execute the module function
        // Flag the module as loaded
        // Return the exports of the module
    }


    // expose the modules object (__webpack_modules__)
    // expose the module cache
    // Load entry module and return exports
    return __webpack_require__(0);
})
/************************************************************************/
([
    // index.js - our application logic
    /* 0 */
    function (module, exports, __webpack_require__) {
        var multiply = __webpack_require__(1);
        var sum = __webpack_require__(2);
        var totalMultiply = multiply(5, 3);
        var totalSum = sum(5, 3);
        console.log('Product of 5 and 3 = ' + totalMultiply);
        console.log('Sum of 5 and 3 = ' + totalSum);
    },
    // multiply.js
    /* 1 */
    function (module, exports, __webpack_require__) {
        var sum = __webpack_require__(2);
        var multiply = function (a, b) {
            var total = 0;
            for (var i = 0; i < b; i++) {
                total = sum(a, total);
            }
            return total;
        };
        module.exports = multiply;
    },
    // sum.js
    /* 2 */
    function (module, exports) {
        var sum = function (a, b) {
            return a + b;
        };
        module.exports = sum;
    }
]);
```

### Useful Plugins

1. DefinePlugin : https://webpack.js.org/plugins/define-plugin/
2. HtmlWebpackPlugin : `index.html` management

### Using Eslint in a webpack project

`eslint` is a required dev-dependency.
Like usual, eslint specific config resides in .eslintrc.
And all the plugins need by .eslintrc are needed as dev-dependencies.

Using `eslint-loader` is necessary.
Loaders specified are executed in right to left fashion.
So use along with `babel-loader`, `eslint-loader` in that order.
or use something like `enforce: "pre"`

**Note**: By specifying loader, Eslint is a part of build process, not just running as a seperate entity, the webpack build will fail if there are any linting errors.

### Externals

We use the `externals` option to define dependencies that should be resolved in the target environment.

The `externals` configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's environment.

Use case: When bundling with Webpack for the backend - you usually don't want to bundle its node_modules dependencies.

Usage:
```js
const nodeExternals = require('webpack-node-externals');
//
const server = {
  //..
  externals: [nodeExternals()],
  //..
}
```

### Useful Loaders

1. `imports-loader`
2. `exports-loader`
3. `expose-loader`

### Using React

Telling webpack that we support importing/requiring of `.js` and `.jsx` files
as well as they are to be transpiled using `babel-loader`.

```js
  // require support
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // how to transform them
  module: {
    rules: [
      {// run linter before babel, by using enforce: "pre"
        test: /\.(js|jsx)$/, loader: 'eslint-loader', enforce: 'pre', exclude: /node_modules/,
      },
      { test: /\.(js|jsx)$/, loader: 'babel-loader' },
    ],
  },
```


### Rules

A rule has three parts:
1. condition
2. results
3. nested rules

#### Rule condition

There are two input values for the conditions:

1. The resource: An absolute path to the file requested. It's already resolved according to the resolve rules.

2. The issuer: An absolute path to the file of the module which requested the resource. It's the location of the import.

Example: When we `import './style.css'` within `app.js`, the resource is `/path/to/style.css` and the issuer is `/path/to/app.js`.

In a Rule the properties `test`, `include`, `exclude` and `resource` are matched with the resource and the property `issuer` is matched with the issuer.

#### Rule results

Rule results are used only when the Rule condition matches.

There are two output values of a Rule:

1. Applied loaders: An array of loaders applied to the resource.
2. Parser options: An options object which should be used to create the parser for this module.

#### Nested rules

Specified using Nested rules can be specified under `oneOf`.


### Tree Shaking

Also known as dead-code elimination.
Works only with ES6 style modules. i.e ESM import/export shaking.

For commonjs modules tree shaking, We need webpack 4 and 
plugin -> https://github.com/indutny/webpack-common-shake.

Mode `production` is need for tree shaking to work.

Add a `sideEffects` property to your project's **package.json** file (not webpack config).

Note that any imported file is subject to tree shaking. This means if you use something like css-loader in your project and import a CSS file, it needs to be added to the side effect list so it will not be unintentionally dropped in production mode:

```json
// this is package.json (not webpack.config.js)
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

#### Side Effects of modules

A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export.

### Code splitting

This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:

1. Entry Points: Manually split code using `entry` configuration.
2. Prevent Duplication: Use the `SplitChunksPlugin` to dedupe and split chunks.
3. `Dynamic Imports`: Split code via inline function calls within modules.


### Loaders

Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

At a high level, loaders have two properties in your webpack configuration:

The `test` property identifies which file or files should be transformed.
The `use` property indicates which loader should be used to do the transforming.

```js
module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

### Plugins 

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

In order to use a plugin, you need to require() it and add it to the plugins array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with the new operator.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

#### Plugins details

Make a class with `apply` method on the prototype,
that is given compiler as argument.
Provide your implementation in the `apply` method.

Core: https://github.com/webpack/tapable

#### Hooks

Each hook can be tapped with one or several functions.
A hook can act as event emitter and you can subscribe via
tap method on the hook.

#### Hooks public API signatures

```ts
interface Hook {
	tap: (name: string | Tap, fn: (context?, ...args) => Result) => void,
	tapAsync: (name: string | Tap, fn: (context?, ...args, callback: (err, result: Result) => void) => void) => void,
	tapPromise: (name: string | Tap, fn: (context?, ...args) => Promise<Result>) => void,
	intercept: (interceptor: HookInterceptor) => void
}

interface HookInterceptor {
	call: (context?, ...args) => void,
	loop: (context?, ...args) => void,
	tap: (context?, tap: Tap) => void,
	register: (tap: Tap) => Tap,
	context: boolean
}

interface HookMap {
	for: (key: any) => Hook,
	tap: (key: any, name: string | Tap, fn: (context?, ...args) => Result) => void,
	tapAsync: (key: any, name: string | Tap, fn: (context?, ...args, callback: (err, result: Result) => void) => void) => void,
	tapPromise: (key: any, name: string | Tap, fn: (context?, ...args) => Promise<Result>) => void,
	intercept: (interceptor: HookMapInterceptor) => void
}

interface HookMapInterceptor {
	factory: (key: any, hook: Hook) => Hook
}

interface Tap {
	name: string,
	type: string
	fn: Function,
	stage: number,
	context: boolean
}
```

** Creating Hooks **

```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

class Car {
	constructor() {
    // best practice to expose hooks as hooks property
		this.hooks = {
      // creating hooks
			accelerate: new SyncHook(["newSpeed"]),
			break: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}

	/* ... */
}

```

### Webpack runtime/Node API

```js
const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function(err, stats) {
  // ...
});
```

### module Resolution

A resolver is a library which helps in locating a module by its absolute path.

The resolver helps webpack find the module code that needs to be included in the bundle for every such require/import statement. webpack uses enhanced-resolve to resolve file paths while bundling modules.

### Webpack Manifest file

As the compiler enters, resolves, and maps out your application, it keeps detailed notes on all your modules. This collection of data is called the "Manifest" and it's what the runtime will use to resolve and load modules once they've been bundled and shipped to the browser. No matter which module syntax you have chosen, those import or require statements have now become `__webpack_require__` methods that point to module identifiers. Using the data in the manifest, the runtime will be able to find out where to retrieve the modules behind the identifiers.



### Use source-maps

`dev-tool: 'source-map'` is a life saver,
it generates source-maps at the same level as index.html, 
will automatically help you debug code in devtools.


### Debuggin webpack plugins

Put below in package.json script and put breakpoints in webpack.config.js code
```
    "debug": "node --inspect-brk node_modules/webpack/bin/webpack.js --verbose"
```

### Compiler

A configured webpack environment.
The object is built once upon starting
webpack and is configured with all operational
settings including options, loaders and plugins.
A plugin uses compiler to access the main webpack environment.

### Compilation

A compilation object represents a single build of versioned assets. A compilation surfaces info about present state of module resources, compiled assets, changed files and watched dependencies.
A compilation provides many callback points at which a plugin may choose to perform custom actions.

### Basic plugin architechture

Plugins are instanceable objects with `apply`
method on their prototype which is usually assigned a function that takes a `compiler`

### Tapable

Many objects in webpack extend the Tapable class. The class exposes tap, tapAsync, and tapPromise methods which plugins can use to inject custom build steps that will be fired throughout a compilation.

