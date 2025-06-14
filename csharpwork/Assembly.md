
## What is an Assembly in C#?
assembly is where a type is stored in the filesystem. Assemblies are a mechanism for deploying code. For example, the System.Data.dll assembly contains types to manage data.

## Can be a .dll or .exe
Assemblies can be compiled into a single file as a DLL (class library) or an EXE (console app).

## Assembly distribution
Library Assemblies are usually distributed as NuGet packages, which are files that are downloadable from public online feeds and can contain multiple assemblies and other resources.

## Assembly and Namespaces

There is not always a one-to-one mapping between assemblies and namespaces. A single assembly can contain many namespaces, and a namespace can be defined in many assemblies. However, it is common to have a namespace that matches the assembly name.