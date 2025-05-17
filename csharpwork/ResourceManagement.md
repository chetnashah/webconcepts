
## Why we need resource management in C#?

External resources like files, network connections, and database connections are limited and need to be managed properly and cannot be cleaned up by compiler automatically. 
Failing to do so can lead to resource leaks, performance issues, and application crashes. C# provides several mechanisms for managing these resources effectively.

### Why resource management is important?

There are cases where resources are not automatically cleaned up by the garbage collector, such as:
- **File Handles**: Open file handles are not automatically released until the process exits.
- **Network Connections**: Open network connections can lead to resource exhaustion if not closed properly.
- **Database Connections**: Open database connections can lead to connection pool exhaustion.

We might forget to close these resources, leading to resource leaks. Or an exception might occur, preventing the cleanup code from executing.

### What is IDisposable?

`IDisposable` is an interface in C# that provides a mechanism for releasing unmanaged resources. It contains a single method, `Dispose()`, which is called to free up resources.
```
public interface IDisposable
{
    void Dispose();
}
```

### How to implement IDisposable?

What to write in Dispose method?
```csharp
public void Dispose()
{
    // Free unmanaged resources
    if (resource.isOpen())
    {
        // Close file handle, network connection, etc.
        resource.Close();
    }
}
```

## How does `using` statement work?

```csharp
using (var resource = new SomeDisposable())
{
    // Use resource
}
// ← as soon as you exit this block, resource.Dispose() is called
```
Automatically calls `Dispose()` on the object when the block is exited, even if an exception occurs. This ensures that resources are cleaned up properly, because compiler generates code like this:
```csharp
SomeDisposable resource = new SomeDisposable();
try
{
    // Use resource
}
finally
{
    if (resource != null)
        resource.Dispose();
}
```

Here’s an easy‐to‐follow rundown of `IDisposable`, the `using` statement (and the newer using‐declaration), and exactly when disposal happens.

---

## 1. What is IDisposable?

- Any class that holds _unmanaged_ resources (files, sockets, GDI objects…) or needs to do clean-up should implement  
  ```csharp
  public interface IDisposable
  {
      void Dispose();
  }
  ```
- `Dispose()` is your “tear-down” method. Consumers call it to release resources deterministically (instead of waiting for the garbage collector).

---

## 2. The classic `using` statement

### Syntax  
```csharp
using (var resource = new SomeDisposable())
{
    // Use resource
}
// ← as soon as you exit this block, resource.Dispose() is called
```

### What it really does  
Under the hood, the compiler turns it into:
```csharp
SomeDisposable resource = new SomeDisposable();
try
{
    // Use resource
}
finally
{
    if (resource != null)
        resource.Dispose();
}
```

So you get:

1. Automatic `Dispose()` even if an exception is thrown  
2. No need to write try/finally yourself  

---

## 3. Scoping & disposal timing

```csharp
using (var fs = new FileStream("data.txt", FileMode.Open))
{
    // fs is open and usable here
    // …
} 
// fs.Dispose() ran here—file handle closed

// fs is no longer in scope; can't use it further.
```

- **Scope**: the variable introduced by `using(...)` is only visible inside its `{ … }` block.
- **Disposal**: happens immediately after the closing brace, before any code that follows it.

---

## 4. Multiple resources & disposal order

```csharp
using (var db = new SqlConnection(...))
using (var tx = db.BeginTransaction())
using (var writer = new StreamWriter("log.txt"))
{
    // All three are in scope.
    // Use db, tx, writer…
}
// Disposal order: writer.Dispose(), then tx.Dispose(), then db.Dispose()
```

- Nesting `using` statements this way is common.
- Disposal happens in **reverse creation order** (LIFO).

---

## 5. C# 8 “using declaration”

C# 8 introduced a shorter form. Instead of a block, you write:

```csharp
using var fs = new FileStream("data.txt", FileMode.Open);
// … use fs …

// At the end of the _enclosing_ block (e.g. method), fs.Dispose() is called.
```

- No extra `{ }` needed.
- Disposal happens when the _current_ block (method, `if`, `for`, etc.) exits.

Example:

```csharp
void Process()
{
    using var conn = new SqlConnection(...);
    // … work with conn …

    if (needLogging)
    {
        using var log = new StreamWriter("log.txt");
        // … write to log …
    } // log.Dispose() here if needLogging==true

} // conn.Dispose() here, when Process() returns
```

---

## 6. Custom Disposable Example

```csharp
class MyResource : IDisposable
{
    private bool _disposed = false;
    public void DoWork()
    {
        if (_disposed) throw new ObjectDisposedException(nameof(MyResource));
        Console.WriteLine("Working…");
    }
    public void Dispose()
    {
        if (_disposed) return;
        Console.WriteLine("Cleaning up!");
        // free unmanaged resources here…
        _disposed = true;
    }
}

static void Main()
{
    using (var r = new MyResource())
    {
        r.DoWork();
    } 
    // Output:
    //   Working…
    //   Cleaning up!
}
```

1. You call `DoWork()` inside the using block.
2. Exiting the block auto‐invokes `r.Dispose()`, printing “Cleaning up!”.

---

### Key Takeaways

- **IDisposable** → implement when you need deterministic cleanup.
- **using statement** → scope‐bound, translates to try/finally + Dispose.
- **Disposal timing** → at the end of the `using` block (or end of the enclosing block with the C# 8 using declaration).
- **Order** → nested usings dispose inner‐first (reverse order).

With this pattern, you never forget to free critical resources—and your code stays concise and exception‐safe.

## Common usage with files

Here are some common patterns for working with files in C#, all of which rely on types that implement `IDisposable` (e.g. `FileStream`, `StreamReader`, `StreamWriter`, etc.) and the `using` construct to ensure files are closed (and buffers flushed) even if exceptions occur.

---

## 1. Reading a text file with `StreamReader`

Classic using‐statement:

```csharp
string path = "data.txt";

using (var reader = new StreamReader(path))
{
    // Read the entire file
    string contents = reader.ReadToEnd();
    Console.WriteLine(contents);
} 
// reader.Dispose() → underlying FileStream is closed here
```

C# 8+ using‐declaration:

```csharp
string path = "data.txt";
using var reader = new StreamReader(path);

string contents = reader.ReadToEnd();
Console.WriteLine(contents);

// reader.Dispose() runs automatically when the enclosing method/block exits
```

---

## 2. Writing (or appending) text with `StreamWriter`

### Overwrite a file

```csharp
string path = "output.txt";
using (var writer = new StreamWriter(path, append: false))
{
    writer.WriteLine("Hello, world!");
    writer.WriteLine("Goodbye!");
} 
// writer.Dispose() ⇒ data flushed, file closed
```

### Append to a file

```csharp
string path = "log.txt";
using var log = new StreamWriter(path, append: true);
log.WriteLine($"{DateTime.Now:o} - Operation completed");
// log.Dispose() at end of method/block
```

---

## 3. Copying a binary file with `FileStream`

```csharp
string sourcePath = "picture.jpg";
string destPath   = "backup.jpg";

// Open both streams in a single using‐statement
using (var source = new FileStream(sourcePath, FileMode.Open,   FileAccess.Read))
using (var dest   = new FileStream(destPath,   FileMode.Create, FileAccess.Write))
{
    source.CopyTo(dest);
}
// Both streams are closed in reverse order when the block exits
```

---

## 4. Reading line-by-line in a `using` loop

```csharp
string path = "records.csv";

using (var reader = new StreamReader(path))
{
    string? line;
    while ((line = reader.ReadLine()) != null)
    {
        // Process each line...
        Console.WriteLine(line);
    }
}
// reader.Dispose() → file closed
```

---

## 5. Why `using` matters

- **Deterministic cleanup**: The file handle is released as soon as the block (or method) ends—no need to wait for garbage collection.
- **Exception safety**: Even if `ReadToEnd()`, `WriteLine()` or your processing logic throws, `Dispose()` still runs (the compiler emits a `try/finally` for you).
- **Buffer flushing**: `StreamWriter.Dispose()` calls `Flush()`, ensuring all data actually makes it to disk.

---

### C# 8+ “using declaration” recap

```csharp
void ProcessLog()
{
    using var reader = new StreamReader("in.txt");
    using var writer = new StreamWriter("out.txt");

    string? line;
    while ((line = reader.ReadLine()) != null)
        writer.WriteLine(line);

    // reader.Dispose() and writer.Dispose() run here, when ProcessLog() returns
}
```

No extra braces needed—disposal happens at the end of the enclosing scope.

---

With these patterns you can safely open, read, write, and copy files in C# without leaking file handles or risking partial writes.