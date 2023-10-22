
http://appium.io/docs/en/2.1/guides/context/

## primarily for switching to webview and other contexts

A common feature of many app platforms is the ability for developers to embed web content inside of the platform-native app frame. This allows developers to leverage web technologies or existing web content for some or all of the app functionality. However, the additional complexity of mixing "modes" within a single application can make it difficult for automation tools that are designed to target the "native" elements and behaviours.

Appium provides a set of APIs for working with different app modes, called "contexts", that Appium drivers can implement if they support automation commands in these different modes. There are three basic commands that Appium has added to the W3C WebDriver spec for this purpose:


## Three APIs

### List all contexts

### Get current context

### Set current context

