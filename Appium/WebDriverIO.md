
WebdriverIO is an all in one framework for your web app development

## Features

1. test runner (optional)
2. assertion library
3. Session manager/driver - only use for session management, tests can be run by other test runners like `jest`

## Runtime environment

The APIs are supposed to run on/called on NOdejs environment

## Using only as a session manager

https://webdriver.io/docs/api/modules#webdriverio

Use `remote` method to get reference to the driver.

## Finding elements (Use driver.$ or driver.$$)

Use `$$` https://webdriver.io/docs/api/browser/$$

It returns a ChainablePromiseArray containing a set of WebdriverIO elements.


### Accessibility ID search syntax : ~

```js
const el = await driver.$('~buttonStart');
```

### XPath search syntax : //

```js
const el = await driver.$('//android.widget.TextView[@content-desc="buttonStart"]');
```
### 

## Writing tests with Appium + UiAutomatorDriver + WebdriverIO

https://github.com/appium/appium-uiautomator2-driver/tree/master/test/functional/commands/find

https://github.com/appium/appium-uiautomator2-driver/blob/master/test/functional/commands/general/context-e2e-specs.js

## Writing tests with Appium + XCUiTest + Webdriver IO + web
https://github.com/appium/appium-xcuitest-driver/blob/master/test/functional/web/safari-alerts-e2e-specs.js

https://appium.github.io/appium-xcuitest-driver/5.7/execute-methods/#mobile-runxctest

