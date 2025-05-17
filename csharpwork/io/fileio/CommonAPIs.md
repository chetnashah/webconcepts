# 📘 C# File I/O Utility Cookbook

## 📁 1. Check if a File or Directory Exists
```csharp
bool fileExists = File.Exists("path/to/file.txt");
bool directoryExists = Directory.Exists("path/to/directory");
```

## 📄 2. Read All Text from a File
```csharp
string content = File.ReadAllText("file.txt");
```

## ✍️ 3. Write Text to a File (Overwrites if Exists)
```csharp
File.WriteAllText("file.txt", "Hello, world!");
```

## 🧩 4. Append Text to a File
```csharp
File.AppendAllText("file.txt", "Additional content\n");
```

## 🗃️ 5. Read All Lines
```csharp
string[] lines = File.ReadAllLines("file.txt");
```

## 🧾 6. Write Multiple Lines to a File
```csharp
string[] lines = { "Line 1", "Line 2" };
File.WriteAllLines("file.txt", lines);
```

## 📤 7. Copy a File
```csharp
File.Copy("source.txt", "destination.txt", overwrite: true);
```

## 🗑️ 8. Delete a File or Directory
```csharp
File.Delete("file.txt");
Directory.Delete("directory", recursive: true);
```

## 🧱 9. Create a Directory
```csharp
Directory.CreateDirectory("newFolder");
```

## 🔍 10. Enumerate Files / Directories
```csharp
var files = Directory.EnumerateFiles("path", "*.txt", SearchOption.AllDirectories);
var dirs = Directory.EnumerateDirectories("path");
```

# 🔄 Streaming APIs (Efficient I/O for Large Files)

## 📥 11. Read File Using StreamReader
```csharp
using (StreamReader reader = new StreamReader("file.txt"))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}
```

## 📤 12. Write File Using StreamWriter
```csharp
using (StreamWriter writer = new StreamWriter("file.txt"))
{
    writer.WriteLine("First line");
    writer.WriteLine("Second line");
}
```

## 💾 13. Binary File Read/Write (FileStream)
```csharp
// Write binary data
using (FileStream fs = new FileStream("data.bin", FileMode.Create))
{
    byte[] bytes = Encoding.UTF8.GetBytes("Binary content");
    fs.Write(bytes, 0, bytes.Length);
}

// Read binary data
using (FileStream fs = new FileStream("data.bin", FileMode.Open))
{
    byte[] buffer = new byte[fs.Length];
    fs.Read(buffer, 0, buffer.Length);
    string result = Encoding.UTF8.GetString(buffer);
}
```

## 📚 14. Buffered File Copy (Streaming)
```csharp
using (FileStream source = File.Open("source.txt", FileMode.Open))
using (FileStream destination = File.Create("destination.txt"))
{
    byte[] buffer = new byte[4096];
    int bytesRead;
    while ((bytesRead = source.Read(buffer, 0, buffer.Length)) > 0)
    {
        destination.Write(buffer, 0, bytesRead);
    }
}
```

## ⏺️ 15. MemoryStream for In-Memory I/O
```csharp
byte[] byteArray = Encoding.UTF8.GetBytes("Hello from memory!");
using (MemoryStream stream = new MemoryStream(byteArray))
{
    using (StreamReader reader = new StreamReader(stream))
    {
        string text = reader.ReadToEnd();
    }
}
```

## 📂 16. Get File Information (FileInfo)
```csharp
FileInfo info = new FileInfo("file.txt");
Console.WriteLine(info.Length);           // Size in bytes
Console.WriteLine(info.LastWriteTime);    // Last modified date
```

## 🔧 17. Path Utilities (Path class)
```csharp
string fullPath = Path.Combine("folder", "file.txt");
string ext = Path.GetExtension("file.txt");  // ".txt"
string fileName = Path.GetFileName("path/file.txt");  // "file.txt"
string dirName = Path.GetDirectoryName("path/file.txt");
```

# 📦 Optional: Async Streaming

## 🔄 18. Async File Read (StreamReader)
```csharp
using (StreamReader reader = new StreamReader("file.txt"))
{
    string line;
    while ((line = await reader.ReadLineAsync()) != null)
    {
        Console.WriteLine(line);
    }
}
```

# 🔧 Additional File I/O Use Cases

## 📄 19. Overwrite a File
```csharp
// Overwrites if exists, creates if not
File.WriteAllText("file.txt", "New content");
```

## ✂️ 20. Truncate a File
```csharp
using (FileStream fs = new FileStream("file.txt", FileMode.Truncate))
{
    // File is now empty
}
```

## 🗃️ 21. Delete a File (Safe Check)
```csharp
if (File.Exists("file.txt"))
{
    File.Delete("file.txt");
}
```

## 🚮 22. Delete a Directory Recursively
```csharp
if (Directory.Exists("myDir"))
{
    Directory.Delete("myDir", recursive: true);
}
```

## 📤 23. Copy a File with Overwrite Option
```csharp
File.Copy("source.txt", "destination.txt", overwrite: true);
```

## 🔁 24. Move a File
```csharp
File.Move("oldLocation.txt", "newLocation.txt");
```

## 🔁 25. Move a Directory
```csharp
Directory.Move("oldDirectory", "newDirectory");
```

## 📏 26. Get File Size
```csharp
long size = new FileInfo("file.txt").Length;
```

## 🕒 27. Get File Last Modified Time
```csharp
DateTime lastModified = File.GetLastWriteTime("file.txt");
```

## 🔐 28. Set File Attributes (e.g., ReadOnly)
```csharp
File.SetAttributes("file.txt", FileAttributes.ReadOnly);
```

# 🗂️ File Opening and Creation Use Cases

## 📝 29. Create a New File (Returns FileStream)
```csharp
using (FileStream fs = File.Create("newfile.txt"))
{
    byte[] info = new UTF8Encoding(true).GetBytes("New file created!");
    fs.Write(info, 0, info.Length);
}
```

## 🔓 30. Open Existing File for Reading
```csharp
using (FileStream fs = File.Open("existingfile.txt", FileMode.Open))
{
    byte[] buffer = new byte[fs.Length];
    fs.Read(buffer, 0, buffer.Length);
}
```

## ✏️ 31. Open or Create File for Writing
```csharp
using (FileStream fs = new FileStream("file.txt", FileMode.OpenOrCreate, FileAccess.Write))
{
    byte[] data = Encoding.UTF8.GetBytes("Data written to file.");
    fs.Write(data, 0, data.Length);
}
```

## 🛠️ 32. Open File with Read/Write Access
```csharp
using (FileStream fs = new FileStream("file.txt", FileMode.Open, FileAccess.ReadWrite))
{
    byte[] data = Encoding.UTF8.GetBytes("Updated content.");
    fs.Write(data, 0, data.Length);
}
```

## 🆕 33. Create a New Text File with StreamWriter
```csharp
using (StreamWriter sw = File.CreateText("log.txt"))
{
    sw.WriteLine("Log file created");
}
```
