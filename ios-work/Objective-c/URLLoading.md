The URL Loading System provides access to resources identified by URLs, using standard protocols like https or custom protocols you create. Loading is performed asynchronously, so your app can remain responsive and handle incoming data or errors as they arrive.

https://medium.com/@neroxiao/ios-url-session-and-networking-a0764c12abd3

## What does it support?

The URL loading system supports:

* File Transfer Protocol (ftp://)
* Hypertext Transfer Protocol (http://)
* Hypertext Transfer Protocol with encryption (https://)
* Local file URLs (files://)
* Data URLs (data://)


https://developer.apple.com/documentation/foundation/url_loading_system/fetching_website_data_into_memory

For small interactions with remote servers, you can use the `URLSessionDataTask` class to receive response data into memory (as opposed to using the `URLSessionDownloadTask` class, which stores the data directly to the file system).

## NSURLConnection

The name `NSURLConnection` actually refers to a group of the interrelated components that form the Foundation URL Loading System: `NSURLRequest`, `NSURLResponse`, `NSURLProtocol`, `NSURLCache`, `NSHTTPCookieStorage`, `NSURLCredentialStorage`, and its namesake, `NSURLConnection`.



`NSURLRequest` objects are passed to an `NSURLConnection` object. The delegate (conforming to the erstwhile informal `<NSURLConnectionDelegate>` and `<NSURLConnectionDataDelegate>` protocols) responds asynchronously as an NSURLResponse, and any associated NSData are sent from the server.



## URLSession

### You need URLSessionConfiguration class

Uses persistent disk based cache.

Helps you control:
1. timeout
2. headers
3. caching

### get data with URLSession.shared.dataTask(with: url) { completionHandlerClosure }


### types of sessions
The NSURLSession API supports three types of sessions, as determined by the type of configuration object used to create the session:

1. `Default sessions`: behave similarly to other Foundation methods for downloading URLs. They use a persistent disk-based cache and store credentials in the user’s keychain.
2. `Ephemeral sessions`: do not store any data to disk; all caches, credential stores, and so on are kept in RAM and tied to the session. Thus, when your app invalidates the session, they are purged automatically.
3. `Background sessions`: are similar to default sessions, except that a separate process handles all data transfers.


### NSURLSession task types

1. `Data tasks`: send and receive data using NSData objects. Data tasks are intended for short, often interactive requests from your app to a server. Data tasks can return data to your app one piece at a time after each piece of data is received, or all at once through a completion handler.
2. `Download tasks`: retrieve data in the form of a file, and support background downloads while the app is not running.
3. `Upload tasks`: send data in the form of a file, and support background uploads while the app is not running.

**URLSessionTask is the class responsible for making request to the web API and uploading / downloading data.**

You can access the response data returned from the URLSession by using completion block or delegate.



### Request setup with sessionConfiguration

Steps:
1. Setup a `NSURLSessionConfigruation`
2. Optionally have a `NSURLSessiondelegate` object to get callbacks
3. Specify an `NSOperationQueue` on which to run the request
4. Create `NSURLSession` object by calling a intitializer on `NSURLSession`, specifying all three above.
5. Have a `NSURL` from which to fetch data.
6. Create a `NSURLSessionDataTask` by callng a method on `[NSURLSession dataTaskWithURL: url]` to create a task
7. Call `[task resume]` to finally fire request. 

Three different delegate protocols available: `NSURLSessionDelegate`, `NSURLSessionDataDelegate`, `NSURLSessionTaskDelegate` - methods for didReceiveData etc. are in `NSURLSessionTaskDelegate`

```objc
NSURLSessionConfiguration *defaultConfiguration = [NSURLSessionConfiguration defaultSessionConfiguration];
id <NSURLSessionDelegate> delegate = [[MySessionDelegate alloc] init];
NSOperationQueue *operationQueue = [NSOperationQueue mainQueue];

// create default type NSURLSEssion
// connects sessionConfiguration, delegate and operation queue where to execute
NSURLSession *defaultSession = [NSURLSession sessionWithConfiguration:defaultConfiguration delegate:delegate operationQueue:operationQueue];

// Finally fetch with specifying NSURL and calling task.resume
NSURL *url = [NSURL URLWithString: @"https://www.example.com/"];
NSURLSessionDataTask *dataTask = [defaultSession dataTaskWithURL:url]; // create task from session
[dataTask resume];// call resume on task to fire request
```