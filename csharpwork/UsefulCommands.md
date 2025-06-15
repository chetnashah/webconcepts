# .NET CLI Useful Commands

- `dotnet help`: This shows the command-line help.
- `dotnet new`: This creates a new .NET project or file. `dotnet new --list` shows available templates.
- `dotnet tool`: This installs or manages tools that extend the .NET experience.
- `dotnet workload`: This manages optional workloads like .NET MAUI.
- `dotnet restore`: This downloads dependencies for the project.
- `dotnet build`: This builds, aka compiles, a .NET project. A new switch introduced with .NET 8 is `--tl` (meaning terminal logger), which provides a modern output. For example, it provides real-time information about what the build is doing. You can learn more at: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options.
- `dotnet build-server`: This interacts with servers started by a build.
- `dotnet msbuild`: This runs MS Build Engine commands.
- `dotnet clean`: This removes the temporary outputs from a build.
- `dotnet test`: This builds and then runs unit tests for the project.
- `dotnet run`: This builds and then runs the project.
- `dotnet pack`: This creates a NuGet package for the project.
- `dotnet publish`: This builds and then publishes the project, either with dependencies or as a self-contained application. In .NET 7 and earlier, this published the Debug configuration by default. In .NET 8 and later, it now publishes the Release configuration by default.
- `dotnet add`: This adds a reference to a package or class library to the project.
- `dotnet remove`: This removes a reference to a package or class library from the project.
- `dotnet list`: This lists the package or class library references for the project.
- `dotnet sln`: This manages solution files, such as adding or removing projects.
- `dotnet package search`: This allows you to search one or more package sources for packages that match a search term. The command format is `dotnet package search [search term] [options]`. Learn more at: https://devblogs.microsoft.com/nuget/announcing-nuget-6-9/#support-for-dotnet-search-command.
