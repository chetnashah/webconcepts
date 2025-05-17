## Pure C#.net serviceCollection/ServiceProvider DI

# Dependency Injection with Microsoft.Extensions.DependencyInjection

Yes, pure C# (.NET) has built-in dependency injection APIs available in the `Microsoft.Extensions.DependencyInjection` namespace, which is part of the .NET Base Class Library (BCL). This is a lightweight DI container that doesn't require ASP.NET or any other frameworks.

## Basic Dependency Injection Example

Here's a complete example using only the built-in DI container:

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;

// 1. Define interfaces and implementations
public interface IMessageService
{
    void SendMessage(string message);
}

public class EmailService : IMessageService
{
    public void SendMessage(string message)
    {
        Console.WriteLine($"Sending email: {message}");
    }
}

public class NotificationService
{
    private readonly IMessageService _messageService;

    // Constructor injection
    public NotificationService(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public void Notify(string message)
    {
        _messageService.SendMessage(message);
    }
}

class Program
{
    static void Main(string[] args)
    {
        // 2. Create service collection
        var services = new ServiceCollection();
        
        // 3. Register services
        services.AddTransient<IMessageService, EmailService>();
        services.AddTransient<NotificationService>();
        
        // 4. Build service provider
        var serviceProvider = services.BuildServiceProvider();
        
        // 5. Resolve and use services
        var notificationService = serviceProvider.GetRequiredService<NotificationService>();
        notificationService.Notify("Hello from pure C# DI!");
        
        // 6. Dispose when done (important for scoped services)
        serviceProvider.Dispose();
    }
}
```

## Key Features of Built-in DI

### Service Lifetimes

1. **Transient**: New instance every time
   ```csharp
   services.AddTransient<IService, ServiceImplementation>();
   ```

2. **Scoped**: One instance per scope (similar to per-request in web apps)
   ```csharp
   services.AddScoped<IService, ServiceImplementation>();
   ```

3. **Singleton**: Single instance for the entire application
   ```csharp
   services.AddSingleton<IService, ServiceImplementation>();
   ```

### Advanced Registration Options

```csharp
// Register with factory method
services.AddTransient<IService>(provider => 
    new ServiceImplementation(provider.GetRequiredService<IDependency>()));

// Register existing instance
var instance = new ServiceImplementation();
services.AddSingleton<IService>(instance);

// Register multiple implementations
services.AddTransient<IMessageService, EmailService>();
services.AddTransient<IMessageService, SmsService>();
```

### Working with Scopes

```csharp
using (var scope = serviceProvider.CreateScope())
{
    var scopedService = scope.ServiceProvider.GetRequiredService<IScopedService>();
    // Use scoped service
}
```

## Practical Console Application Example

Here's a more complete console application example:

```csharp
using System;
using Microsoft.Extensions.DependencyInjection;

// Interfaces
public interface ILogger
{
    void Log(string message);
}

public interface IDataService
{
    string GetData();
}

// Implementations
public class ConsoleLogger : ILogger
{
    public void Log(string message) => Console.WriteLine($"[LOG] {DateTime.Now}: {message}");
}

public class DatabaseService : IDataService
{
    private readonly ILogger _logger;
    
    public DatabaseService(ILogger logger)
    {
        _logger = logger;
        _logger.Log("DatabaseService created");
    }
    
    public string GetData()
    {
        _logger.Log("Fetching data from database");
        return "Sample data from database";
    }
}

// Main service
public class AppService
{
    private readonly IDataService _dataService;
    private readonly ILogger _logger;
    
    public AppService(IDataService dataService, ILogger logger)
    {
        _dataService = dataService;
        _logger = logger;
    }
    
    public void Run()
    {
        _logger.Log("AppService started");
        var data = _dataService.GetData();
        _logger.Log($"Data received: {data}");
    }
}

class Program
{
    static void Main()
    {
        // Setup DI container
        var services = new ServiceCollection();
        
        // Register services
        services.AddTransient<ILogger, ConsoleLogger>();
        services.AddTransient<IDataService, DatabaseService>();
        services.AddTransient<AppService>();
        
        // Build provider
        var provider = services.BuildServiceProvider();
        
        // Run application
        using (var scope = provider.CreateScope())
        {
            var app = scope.ServiceProvider.GetRequiredService<AppService>();
            app.Run();
        }
    }
}
```

The built-in DI container in .NET provides a solid foundation for dependency injection without requiring ASP.NET or any third-party libraries. It supports constructor injection, different service lifetimes, and service resolution.