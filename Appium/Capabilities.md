
## What are capabilities?

**"Capabilities" (formerly known as "desired capabilities") are the parameters you use to start an Appium session.**

They come in key/value pairs, (for example, platformName which allows you to specify which platform you want to automate, whether that is iOS, Android, Mac, Windows, etc...). Depending on your Appium client, you define capabilities in a variety of ways, either using capability enum objects or strings (as in Java) or by constructing a dict (as in Python).

Individual drivers and plugins can support other capabilities, so refer to their documentation for lists of extension-specific capability names.


### Vendor prefix in capabilities

There are very few capabilities in official standared which are web specific - https://github.com/jlipps/simple-wd-spec#capabilities.

### Appium capabilities

Appium understands these browser-focused capabilities, but introduces a number of additional capabilities. According to the WebDriver spec, any non-standard "extension capabilities" must include a namespace prefix (signifying the vendor introducing the capability), ending in a `:`. Appium's vendor prefix is `appium:`, and so any Appium-specific capabilities must include this prefix.

Required appium capabilities: `platformName` - platform to use and `appium:automationName` - driver to use.

Other common capabilities for mobile:
1. `appium:app` - path to installable app
2. `appium:deviceName` - name of device to install
3. `appium:platformVersion` - The version of a platform, e.g., for iOS, 16.0
