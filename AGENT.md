# AGENT.md - WebConcepts Repository Guide

## Repository Overview
This is a personal notes repository containing programming concepts, examples, and references across web development technologies, programming languages, and frameworks. It's primarily a knowledge base and reference collection.

## Build/Test Commands
- **C# Projects**: `dotnet build`, `dotnet test`, `dotnet run` (in project directories)
- **Go Examples**: `go run <filename>.go`, `go test ./...` (in go-work-main/)
- **JavaScript**: No unified build system - individual examples can be run with `node <filename>.js`
- **Single Test**: `dotnet test --filter "TestMethod"` for C#, `go test -run TestName` for Go

## Architecture & Structure
- **Language-specific directories**: `/go-work-main/`, `/csharpwork/`, `/js-work/`, `/react/`, `/nodejs/`
- **Technology topics**: Individual `.md` files for frameworks/concepts (e.g., `React.md`, `TypeScript.md`)
- **Code examples**: Located in subdirectories like `examples/`, `testing/`, `projects/`
- **Solution file**: `webconcepts.sln` for C# projects in Visual Studio

## Code Style Guidelines
- **Formatting**: Format on save enabled (Prettier for JS, autopep8 for Python)
- **Go**: Standard `gofmt` formatting, package-based organization
- **C#**: Namespace-based organization, PascalCase for public members
- **JavaScript**: Use Prettier formatting, modern ES6+ syntax in examples
- **Naming**: Follow language conventions - camelCase for JS, PascalCase for C#, snake_case for file names
- **Documentation**: Extensive markdown documentation with code examples and explanations

## Notes
- This is primarily a learning/reference repository, not a production codebase
- Examples are standalone and educational in nature
- Use language-specific tooling for each subdirectory when working on code
