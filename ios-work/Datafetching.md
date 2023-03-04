
https://matteomanferdini.com/network-requests-rest-apis-ios-swift/

## URL

URL can be file URL or remote URL.

## URLSession

You use a `URLSession` instance to create one or more `URLSessionTask` instances, which can fetch and return data to your app, download files, or upload data and files to remote locations. 
You can use one session repeatedly to create tasks.

To configure a session, you use a `URLSessionConfiguration` object, which controls behavior like how to use caches and cookies, or whether to allow connections on a cellular network.


## URLSessionTask

You use a URL session instance to create the task. If your needs are fairly simple, you can use the shared instance of the URLSession class.


## URLRequest

Represents a HTTPRequest, including parameters like URL, http method and headers.

### Rest API calls via URLSessionDataTask

For small interactions with remote servers, you can use the URLSessionDataTask class to receive response data into memory

The simplest way to fetch data is to create a data task that uses a completion handler. With this arrangement, the task delivers the server’s response, data, and possibly errors to a completion handler block that you provide.

**The completion handler is called on a different Grand Central Dispatch queue than the one that created the task. Therefore, any work that uses data or error to update the UI — like updating webView — should be explicitly placed on the main queue**

Data can be fetched via `let task = URLSession.shared.dataTask(with: url) { // handler code}`

Start task fetching with `task.resume()`

For response serialization, refer:  [here](Serialization&Deserialization.md)

Short version:
```swift
import Foundation

let url = URL(string: "example.com")!
let task = URLSession.shared.dataTask(with: url) { (data: Data?, response: URLResponse?, error: Error?) -> Void in
    // Parse the data in the response and use it
}
task.resume()
```


Long version:
e.g.
```swift
class MyClass{
    func callAPI() {
        let url = URL(string: "https://httpbin.org/get")
        if let url = url {
            let task = URLSession.shared.dataTask(with: url) { data,response,error in
                if let error = error {
                    self.handleError(error: error)
                }
                if let response = response {
                    self.handleResponse(response: response)
                    if let data = data {
                        self.handleData(data: data, response: response)
                    }

                }
            }
            task.resume()
        }
    }
    
    func handleResponse(response: URLResponse) {
        print("response = ", response)
    }
    
    func handleData(data: Data, response: URLResponse) {
        if response.mimeType == "application/json" {
            print("data = ", data)
            let str = String(data: data, encoding: .utf8)
            print("str = ", str)
        }
    }
    
    func handleError(error: Error) {
        print("Error found was ", error)
    }
}
```

### File downloads via `URLSessionDownloadTask`

stores the data directly to the file system

## Getting more details of a network request with Delegate

For a greater level of access to the task’s activity as it proceeds, when creating the data task, you can set a delegate on the session, rather than providing a completion handler.

### URLSessionTaskDelegate

A protocol that defines methods that URL session instances call on their delegates to handle task-level events.

```swift
func urlSession(URLSession, task: URLSessionTask, didCompleteWithError: Error?)
Tells the delegate that the task finished transferring data.
```

### URLSessionDataDelegate

A protocol that defines methods that URL session instances call on their delegates to handle task-level events specific to data and upload tasks.

Your session delegate should also implement the methods in the URLSessionTaskDelegate protocol to handle task-level events that are common to all task types, and methods in the URLSessionDelegate protocol to handle session-level events.

```swift
func urlSession(URLSession, dataTask: URLSessionDataTask, didReceive: Data)
Tells the delegate that the data task has received some of the expected data.

func urlSession(URLSession, dataTask: URLSessionDataTask, didReceive: URLResponse, completionHandler: (URLSession.ResponseDisposition) -> Void)
Tells the delegate that the data task received the initial reply (headers) from the server.
```

### URLSessionDownloadDelegate

A protocol that defines methods that URL session instances call on their delegates to handle task-level events specific to download tasks.

```swift
func urlSession(URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo: URL)
Tells the delegate that a download task has finished downloading.
```

