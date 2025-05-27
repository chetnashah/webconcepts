https://www.youtube.com/watch?v=tTJetZj3vg0

https://www.youtube.com/watch?v=M1jxLQu40qo

https://www.youtube.com/watch?v=Hhpq7oYcpGE

https://www.youtube.com/watch?v=yjUCKSKCQxg

https://www.youtube.com/watch?v=NSVZa4JuTl8

https://www.youtube.com/watch?v=tKEF6xaeoig

https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection

## Main classes

* `IServiceCollection`: Defines a contract for a collection of service descriptors.
* `IServiceProvider`: Defines a mechanism for retrieving a service object.
* `ServiceDescriptor`: Describes a service with its service type, implementation, and lifetime.

In .NET, DI is managed by adding services and configuring them in an `IServiceCollection`. After services are registered, an `IServiceProvider` instance is built by calling the `BuildServiceProvider` method. The `IServiceProvider` acts as a container of all the registered services, and it's used to resolve services.


## Service lifetimes

Not all services are created equally. 
1. Some services require a new instance each time that the service container gets them (**transient**), 
2. while others should be shared across requests (**scoped**) 
3. or for the entire lifetime of the app (**singleton**). 


## Usage
```csharp
public interface IConsole
{
    void WriteLine(string message);
}
// Implementation of IConsole
internal sealed class DefaultConsole : IConsole
{
    public bool IsEnabled { get; set; } = true;
    void IConsole.WriteLine(string message)
    {
        if (IsEnabled is false)
        {
            return;
        }
        Console.WriteLine(message);
    }
}
// another interface
public interface IGreetingService
{
    string Greet(string name);
}
internal sealed class DefaultGreetingService(
    IConsole console) : IGreetingService
{
    public string Greet(string name)
    {
        var greeting = $"Hello, {name}!";

        console.WriteLine(greeting);

        return greeting;
    }
}
// concrete class
public class FarewellService(IConsole console)
{
    public string SayGoodbye(string name)
    {
        var farewell = $"Goodbye, {name}!";

        console.WriteLine(farewell);

        return farewell;
    }
}

// Program.cs
using Microsoft.Extensions.DependencyInjection;

// 1. Create the service collection.
var services = new ServiceCollection();

// 2. Register (add and configure) the services.
services.AddSingleton<IConsole>(
    implementationFactory: static _ => new DefaultConsole
    {
        IsEnabled = true
    });
services.AddSingleton<IGreetingService, DefaultGreetingService>();
services.AddSingleton<FarewellService>();

// 3. Build the service provider from the service collection.
var serviceProvider = services.BuildServiceProvider();

// 4. Resolve the services that you need.
var greetingService = serviceProvider.GetRequiredService<IGreetingService>();
var farewellService = serviceProvider.GetRequiredService<FarewellService>();

// 5. Use the services
var greeting = greetingService.Greet("David");
var farewell = farewellService.SayGoodbye("David");
```