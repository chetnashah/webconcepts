
## Adding a community library

```bash
dotnet add package Spectre.Console
# or
nuget install Spectre.Console
# or
Install-Package Spectre.Console
```

## Restoring packages (i.e. install dependencies)

```bash
dotnet restore
# or
nuget restore
# or 
msbuild -t:restore
```

## Organize solution at top level

## Organize each project (.csproj) in its own folder

## Projects have a single .csproj file

Packages are installed via NuGet, which is a package manager for .NET. NuGet allows you to easily add, update, and remove libraries and tools in your `.csproj` projects.

Use `dotnet add package <PackageName>` to add a NuGet package to your project.

## ProjectReference vs PackageReference
- **ProjectReference**: Used to reference another project in the same solution. This is useful for sharing code between projects without creating a separate package.
- **PackageReference**: Used to reference a **NuGet package**. This is useful for adding external libraries or tools to your project.

## Adding a test project and referencing the (projet) under test
To add a test project to your solution and reference the project under test, follow these steps:
1. Create a new test project:
   ```bash
   dotnet new xunit -n MyProject.Tests
   ```
2. Add the test project to your solution:
   ```bash
   dotnet sln add MyProject.Tests/MyProject.Tests.csproj
   ```
3. Reference the project under test in your test project:
   ```bash
   cd YourProject.Tests
   dotnet add reference ../path/to/your/project/YourProject.csproj
   ```
