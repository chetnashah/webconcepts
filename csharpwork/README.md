
## Use Visual studio as recommended ide

## Online decompiler

https://sharplab.io/

## Create new console app

```bash
dotnet new console -n MyApp
cd MyApp
dotnet run
```

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

## List solution projects 

Use `dotnet sln <slnName> list` to list the projects in a solution.
```bash
jayshah@192 CSharpRepoViz % dotnet sln CSharpRepoViz.sln list                   
Project(s)
----------
CSharpRepoViz.Tests/CSharpRepoViz.Tests.csproj
CSharpRepoVizRoot/CSharpRepoVizRoot.csproj
```

## List project packages and references

### List Project package dependencies
Use `dotnet list <project> package` to list the packages referenced in a project.
```bash
jayshah@192 CSharpRepoVizRoot % dotnet list CSharpRepoVizRoot.csproj package
Project 'CSharpRepoVizRoot' has the following package references
   [net8.0]: 
   Top-level Package      Requested   Resolved
   > Newtonsoft.Json      13.0.3      13.0.3  
```

### List Project references
Use `dotnet list <project> reference` to list the project references.
```bash
jayshah@192 CSharpRepoViz.Tests % dotnet list CSharpRepoViz.Tests.csproj reference   
Project reference(s)
--------------------
..\CSharpRepoVizRoot\CSharpRepoVizRoot.csproj
```

