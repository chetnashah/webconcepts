
https://developer.apple.com/documentation/xcode/supporting-associated-domains

https://www.branch.io/resources/blog/what-is-an-aasa-apple-app-site-association-file/#:~:text=The%20AASA%20%28short%20for%20apple-app-site-association%29%20is%20a%20file,safe%20way%20to%20prove%20domain%20ownership%20to%20iOS.

## What are associated domains?

Associated domains establish a secure association between domains and your app so you can share credentials or provide features in your app from your website.

## What feeatures use Associated domains?

1. Shared web credentials, 
2. universal links, 
3. Handoff, and 
4. App Clips 

all use associated domains


## What are universal links?

universal links, a feature that allows an app to present content in place of all or part of its website,
Users who don’t download the app get the same information in a web browser instead of the native app

## What Is An AASA (apple-app-site-association) File?

The AASA (short for apple-app-site-association) is a file that lives on your website and associates your website domain with your native app

it’s a safe way to prove domain ownership to iOS

## Why do site association?

If it is important for your particular use case that your app and only your app is registered on the device as capable of handling a particular URL, then prefer universal links over custom URL schemes

### Why not custom URI schemes?

app developers could register any URI scheme of their liking and iOS, without any verification, would respond to those URI schemes by opening apps. For example, if an indie developer registers the `fb://` URI scheme for a test app, there was nothing to stop that, even though `fb://` is used by the Facebook native app

### Another gotchas for URI schemes

If you have two apps on your device with the same URL scheme, and you delete the one that actually gets launched, the other one will not get launched by the URL without rebooting the iOS device.

Your best solution is to ensure your custom URL scheme is not trivial so there is little chance another app will have the same scheme

## How to associate domain?


### Where to host the association file?

`https://<fully qualified domain>/.well-known/apple-app-site-association` You must host the file using `https://` with a valid certificate and with no redirects.


