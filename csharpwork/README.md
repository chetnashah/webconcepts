
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