# URLSession - Quick Reference Notes

> Swift 5.10 · iOS 17 / macOS 14

---

## 1. Anatomy & Terminology  

| Term | What it is |
|------|------------|
| **URLSession** | Manages a pool of **tasks** that talk to the network. |
| **Task subclasses** | `URLSessionDataTask`, `URLSessionUploadTask`, `URLSessionDownloadTask`. |
| **Configuration** | `URLSessionConfiguration.default / .ephemeral / .background` + 30-ish knobs. |
| **Delegate** | Object that receives streaming/progress/auth callbacks. |
| **Completion-handler API** | Factory method returns a *suspended* task → you must `resume()`. |
| **Swift-concurrency helpers** | High-level `async` functions (`data`, `bytes`, `upload`, `download`) that **start immediately**. |
| **Combine publisher** | `dataTaskPublisher(for:)`. |

---

## 2. API Surface Cheatsheet  

### 2.1 High-level `async` helpers (task auto-started)  

```swift
let (data, resp)     = try await session.data(from: url)
let (bytes, resp)    = try await session.bytes(for: req)
let (fileURL, resp)  = try await session.download(from: url)
let (data, resp)     = try await session.upload(for: req, from: bodyData)
```

### 2.2 Completion-handler factories (return suspended task → `resume()`)  

```swift
session.dataTask(with: url)       { data, resp, err in … }.resume()
session.dataTask(with: request)   { … }.resume()
session.uploadTask(with: request, from: data)   { … }.resume()
session.downloadTask(with: url)   { fileURL, resp, err in … }.resume()
```

### 2.3 Delegate-driven factories (streaming)  

```swift
session.dataTask(with: url)                    // use URLSessionDataDelegate
session.uploadTask(with: request, fromFile: f) // URLSessionTaskDelegate
session.downloadTask(with: request)            // URLSessionDownloadDelegate
// all return suspended tasks → call resume()
```

### 2.4 Combine  

```swift
session.dataTaskPublisher(for: request)
```

---

## 3. Session Configuration Nuggets  

```
.default      // cookies, cache, keychain, cellular allowed
.ephemeral    // nothing persists to disk
.background(id)  // continues when app suspended (uploads & downloads only)
```

Important keys:

* `timeoutIntervalForRequest / Resource`
* `waitsForConnectivity`
* `allowsCellularAccess`, `allowsConstrainedNetworkAccess`
* `httpMaximumConnectionsPerHost`
* `urlCache`, `httpCookieStorage` (set to `nil` to disable)

---

## 4. Common Gotchas  

1. **`resume()` forgotten** → request never sent.  
2. **Task retains session; session retains delegate** – call `finishTasksAndInvalidate()` or keep a strong reference.  
3. **Background sessions** require *file* uploads (`fromFile:`) and produce file downloads (`didFinishDownloadingTo`).  
4. **Redirects** handled automatically (≤20) unless you implement `willPerformHTTPRedirection`.  
5. **Auth challenges** must be answered in delegate; ATS/TLS required by default.  
6. **`await` only inside `async` closures** – otherwise wrap work in `Task { … }`.  
7. **Caches & cookies** unexpected? Disable or use `.ephemeral`.

---

## 5. Usage Mini-Recipes  

### 5.1 One-shot JSON fetch (async/await)  

```swift
struct Post: Decodable { let id: Int, title: String }

func fetchPost(_ id: Int) async throws -> Post {
  let url = URL(string: "https://api.example.com/posts/\(id)")!
  let (data, _) = try await URLSession.shared.data(from: url)
  return try JSONDecoder().decode(Post.self, from: data)
}
```

### 5.2 Progress download with delegate  

```swift
final class Loader: NSObject, URLSessionDownloadDelegate {
  private lazy var session = URLSession(configuration: .default,
                                        delegate: self, delegateQueue: nil)

  func start() {
    session.downloadTask(with: URL(string:"https://example.com/big.zip")!).resume()
  }

  func urlSession(_ s: URLSession, downloadTask: URLSessionDownloadTask,
                  didWriteData bytes: Int64, totalBytesWritten: Int64,
                  totalBytesExpectedToWrite: Int64) {
    print(Double(totalBytesWritten) / Double(totalBytesExpectedToWrite))
  }

  func urlSession(_ s: URLSession, downloadTask: URLSessionDownloadTask,
                  didFinishDownloadingTo location: URL) {
    try? FileManager.default.moveItem(at: location,
                                      to: FileManager.default.temporaryDirectory.appendingPathComponent("big.zip"))
  }
}
```

### 5.3 Wrapping closure-style API into async/await  

```swift
extension URLSession {
  func dataCompat(for req: URLRequest) async throws -> (Data, URLResponse) {
    try await withCheckedThrowingContinuation { cont in
      dataTask(with: req) { data, resp, err in
        if let data, let resp { cont.resume(returning: (data, resp)) }
        else { cont.resume(throwing: err ?? URLError(.badServerResponse)) }
      }.resume()
    }
  }
}
```

---

## 6. Debug & Inspection  

```swift
for await task in session.delegateQueue {
   print(task.state, task.countOfBytesSent)
}

let tasks = await session.getAllTasks()   // async helper
```

---

### TL;DR

* Choose **async/await helpers** whenever possible – no `resume()`, no delegate.  
* Remember `resume()` for classic APIs.  
* Pick the right configuration (`default` / `ephemeral` / `background`).  
* Manage delegates’ lifetimes and invalidate sessions when done.  
* Use delegate APIs for streaming, authentication and large transfers, otherwise prefer closure or async helpers.