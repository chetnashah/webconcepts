

### code transformation

Code transformation instrumentation
is done by `babel-plugin-instanbul`.
only add it in env `test`.

e.g.
```js
{
    presets: ["@babel/preset-react"],
    env: {
        test: {
            plugins: ["istanbul"]
        }
    },
    plugins: ['transform-class-properties']
}
```

Internally it will add counters in front of each line. which is finally used to generate
coverage report.

### `window.__coverage__`

`window.__coverage__` contains all the coverage info.


### `@cypress/code-coverage` plugin

This plugin `__coverage__` from Cypress
end-to-end and unit tests, has middlewares for server side as well

```sh
npm -i -D @cypress/code-coverage nyc istanbul-lib-coverage
```

Add following import:
```js
// cypress/support/index.js
import '@cypress/code-coverage/support'
```

One more file to be added:
```js
// cypress/plugins/index.js
module.exports =(on, config) => {
    on('task', require('@cypress/code-coverage/task'))
}
```

Some example tasks: `resetCoverage`, `combineCoverage`, `coverageReport` come from plugin

### lcov.info/clover.xml

Standard machine format for communicating coverage info of a codebase.

### lcov-report

Contains coverage report index.html

### istanbuljs

code instrumentation library.

### nyc

cli around istanbuljs,
also gives coverage report.

e.g.
```sh
npx nyc --reporter html --reporter text node index.js
```


### Unit test coverage + E2e coverage

1. jest - save unit test coverage
2. cypress - save e2e test coverage

Use `nyc merge` to merge these two coverages.

Check at https://github.com/bahutmov/cypress-and-jest

#### cypress way
Run both unit tests and e2e tests with cypress.
i.e. cypress can also run unit tests.

For this way:
```js
//cypress/plugins/index.js
module.exports = (on, config) => {
    on('task', require('@cypress/code-coverage/task'))
    on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
}
```

### command to guarantee minimum coverage

```sh
# fails if coverage less than 80 percent
npx nyc report --reporter text-summary --check-coverage --statements 80
```

### external services for coverage management

* coveralls
* codecov
* sonarqube

### Instrumenting server side code with nyc

```sh
nyc --silent node server.js
```

```js
const express = require('express');
const app = express();
if (global.__coverage__) {
    require('@cypress/code-coverage/middleware/express')(app);
}
```