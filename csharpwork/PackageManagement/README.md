
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