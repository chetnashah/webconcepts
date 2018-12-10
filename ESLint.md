
Linting tool for javascript code.


### Config file

Without the config, Eslint will not do anything for your project
`.eslintrc` is name of the config file.
Can also be specified as `eslintConfig` field inside of `package.json`

One of the simplest ways to create one of this is using `eslint --init`

1. Environments: which environments your script is designed to run in. Each environment brings with it a certain set of predefined global variables.

2. Parser

Requirements for specifying a parser:

* It must be an npm module installed locally.
* It must have an Esprima-compatible interface (it must export a parse() method).
* It must produce Esprima-compatible AST and token objects.

`esprima`: Default eslint parser
`babel-eslint`: **Needed to be specified in eslint config file for doing react stuff** You only need to use babel-eslint if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel).

3. Plugins

Eslint plugins have a naming convention i.e `eslint-plugin-<plugin-name>`,
such as `eslint-plugin-jquery` or `eslint-plugin-react`.

To understand in depth, go into Airbnb eslint config.


### React Config

Apart from popular config, we need to specify parserOptions like following:
```js
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": 2
    }
}
```


### Delegating module resolution to webpack

With advanced config like usage of typescript etc.
Regular module resolution breaks down and eslint
starts giving error in import of ts files.
We can delegate module resolution to a literate tool like webpack using following:

1. Install `eslint-import-resolver-webpack`
2. Update `.eslintrc` to contain following:
```js
"settings": {
  "import/resolver": "webpack"
}
```