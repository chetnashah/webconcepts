The URL Loading System provides access to resources identified by URLs, using standard protocols like https or custom protocols you create. Loading is performed asynchronously, so your app can remain responsive and handle incoming data or errors as they arrive.


## What does it support?

The URL loading system supports:

* File Transfer Protocol (ftp://)
* Hypertext Transfer Protocol (http://)
* Hypertext Transfer Protocol with encryption (https://)
* Local file URLs (files://)
* Data URLs (data://)


https://developer.apple.com/documentation/foundation/url_loading_system/fetching_website_data_into_memory

For small interactions with remote servers, you can use the `URLSessionDataTask` class to receive response data into memory (as opposed to using the `URLSessionDownloadTask` class, which stores the data directly to the file system).

