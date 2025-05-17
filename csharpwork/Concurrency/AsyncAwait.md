
## Advanced content (TODO watch)
https://devblogs.microsoft.com/dotnet/how-async-await-really-works/
https://www.youtube.com/watch?v=zwwL9uMgKAE
https://www.youtube.com/watch?v=R-z2Hv-7nxk

## How to convert sync code to async

If you have a sync method like `doSyncWork()`, you can convert it to async by: `await Task.Run(() => doSyncWork())`. This will run the sync method in a separate thread and return a Task representing that work.


## Async Function Return Types in C#

Yes, when you make a function `async` in C#, you **must** change its return type to one of the following:
- `Task` (for void-like operations)
- `Task<T>` (for operations returning a value of type T)
- `ValueTask` or `ValueTask<T>` (for performance optimization in certain cases)
- `void` (Not recommened, but used for event handlers) 

### Key Rules

1. **Async methods cannot return regular types directly**:
   ```csharp
   // Invalid - won't compile
   public async int GetNumberAsync() { ... }
   ```

2. **The `async` keyword requires a task-like return type**:
   ```csharp
   // Valid
   public async Task<int> GetNumberAsync() { ... }
   ```

## Transformation Examples

### Before Async
```csharp
public int GetNumber() 
{
    return 42;
}

public void DoWork()
{
    Console.WriteLine("Working");
}
```

### After Adding Async
```csharp
public async Task<int> GetNumberAsync() 
{
    await Task.Delay(100);
    return 42;
}

public async Task DoWorkAsync()
{
    await Task.Delay(100);
    Console.WriteLine("Working");
}
```

## Special Cases

1. **Event handlers** can use `async void` (but should be avoided elsewhere):
   ```csharp
   private async void Button_Click(object sender, EventArgs e)
   {
       await Task.Delay(100);
   }
   ```

2. **Methods that don't actually need await** can skip the `async` keyword:
   ```csharp
   // This doesn't need to be async
   public Task<int> GetNumberAsync()
   {
       return Task.FromResult(42);
   }
   ```

## Why This Matters

1. **The compiler enforces this** - you'll get CS1983 ("The return type of an async method must be void, Task, or Task<T>") if you don't comply.

2. **Callers need to know** how to properly await your method.

3. **Exception handling** works correctly only with proper return types.

## Best Practice

Always use `Task` or `Task<T>` as the return type when marking a method as `async`, except for:
- Event handlers (`async void`)
- Methods that can complete synchronously (consider `ValueTask`)

Remember: The `async` keyword fundamentally changes how your method executes, and the return type must reflect this to work with C#'s async/await pattern.

## Tasks and threads

Here's a clear breakdown of the relationship between async/await, Tasks, and threads, with practical examples for common I/O scenarios:

### **Async/Await, Tasks, and Threads Relationship Table**  

| **Concept**       | **What It Represents** | **Thread Behavior** | **Common Use Cases** | **Example** |
|-------------------|----------------------|------------------|------------------|-----------|
| **`async`/`await`** | A C# language feature for writing non-blocking asynchronous code. | *Does not block the calling thread* during I/O waits. The thread is freed to do other work while waiting. | Any operation that involves waiting (file I/O, network calls, DB queries). | `await File.ReadAllTextAsync()` |
| **`Task`** | A promise of future completion (success, failure, or cancellation). Represents an asynchronous operation. | - **CPU-bound tasks**: Uses a `ThreadPool` thread.<br>- **I/O-bound tasks**: Uses an OS-level I/O completion thread (no managed thread blocked). | - Wrapping CPU work (`Task.Run`)<br>- Running async operations (`Task.Delay`, `Task.FromResult`). | `Task.Run(() => HeavyCalc())` |
| **Thread (ThreadPool)** | An actual OS thread used for executing work. | Blocked if used synchronously (e.g., `Thread.Sleep`). | CPU-intensive work (calculations, image processing). | `Task.Run(() => ProcessData())` |
| **File I/O (`File.ReadAsync`, `Stream`)** | Reading/writing files asynchronously. | *No .NET thread blocked* during the actual disk operation (uses OS I/O completion ports). | Loading large files, logging, config reads. | `await File.ReadAllTextAsync()` |
| **Network I/O (`HttpClient`, Web Requests)** | HTTP calls, API requests, WebSocket communication. | *No .NET thread blocked* while waiting for the response. The OS handles the network stack. | REST APIs, WebSocket communication, scraping. | `await httpClient.GetAsync()` |
| **Database I/O (`EF Core`, `SqlCommand`)** | Querying databases asynchronously. | *No .NET thread blocked* while waiting for the DB response (uses I/O completion). | SQL queries, NoSQL operations (MongoDB, Redis). | `await dbContext.Users.ToListAsync()` |

---

### **Key Takeaways (Easy to Remember)**
1. **`async`/`await`**  
   - Lets you write asynchronous code that looks synchronous.  
   - *Does NOT create threads*—just allows the calling thread to be freed during I/O waits.  

2. **`Task`**  
   - Represents an ongoing operation (like a "promise").  
   - **CPU-bound work** (`Task.Run`) → Uses a `ThreadPool` thread.  
   - **I/O-bound work** (`Task.Delay`, HTTP calls) → Uses OS-level async I/O (no thread blocked).  

3. **Threads (`ThreadPool`)**  
   - Used for CPU work (calculations, parsing).  
   - Blocking a thread (e.g., `Thread.Sleep`) is bad for scalability.  

4. **File/Network/DB I/O**  
   - *No .NET thread is blocked* during the actual I/O operation.  
   - Uses OS-level async I/O (completion ports, kernel threads).  

---

### **Example Scenarios**
#### **1. File I/O (No Thread Blocked)**
```csharp
async Task ReadFileAsync()
{
    // No thread blocked while waiting for disk
    string content = await File.ReadAllTextAsync("file.txt");
    Console.WriteLine(content);
}
```
- **Thread Behavior**:  
  - Calls the OS for file read → frees the .NET thread.  
  - Resumes on a `ThreadPool` thread when done.  

#### **2. Network Call (HTTP Request)**
```csharp
async Task GetWebDataAsync()
{
    // No thread blocked while waiting for network
    HttpResponseMessage response = await httpClient.GetAsync("https://api.example.com");
    string data = await response.Content.ReadAsStringAsync();
    Console.WriteLine(data);
}
```
- **Thread Behavior**:  
  - OS handles the TCP/IP stack → no .NET thread is blocked.  
  - Resumes when the response arrives.  

#### **3. CPU-Bound Work (Uses ThreadPool)**
```csharp
async Task CalculatePrimeAsync()
{
    // Offload CPU work to ThreadPool
    int result = await Task.Run(() => FindPrime(1_000_000));
    Console.WriteLine(result);
}
```
- **Thread Behavior**:  
  - `Task.Run` schedules work on `ThreadPool`.  
  - The UI thread (if in WPF) remains responsive.  

---

### **Final Answer to Original Question**
- **`async`/`await`** → A way to write non-blocking code (frees threads during waits).  
- **`Task`** → Represents an async operation (I/O or CPU-bound).  
- **Threads (`ThreadPool`)** → Used only for CPU work (`Task.Run`), not for I/O.  
- **File/Network/DB I/O** → Uses OS-level async I/O (no managed thread blocked).  

This separation allows high scalability—your app can handle thousands of concurrent I/O operations with very few threads. 🚀