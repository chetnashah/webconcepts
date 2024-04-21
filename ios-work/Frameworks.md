https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/FrameworkAnatomy.html

## Creating a standalone framework (Swift)

Xcode > New project > Framework > Swift > NameSomethingKit

Generates an `NameSomethingKit.xcodeproj` along with `NameSomethingKit` folder

## What is a framework?

**Think of it as a module with encapsulated implementation**.

A framework is a hierarchical directory that encapsulates shared resources, such as a dynamic shared library, nib files, image files, localized strings, header files, and reference documentation in a single package.

Executables will usually declare their dependency on a framework in "Build Phases" section with

1. Target Dependencies (to build framework target)
2. "Embed Frameworks" to embed existing frameworks

## Static frameworks vs static libaries

The main difference between a static framework and a static library is that a **static framework also includes resources, such as header files, images, and storyboards**, while a static library only contains compiled code.

A static framework provides a more organized and modular way to package and distribute code and resources together, while a static library provides a way to reuse compiled code.

## What is present in a framework?

1. Headers - Usually the umbrella header and other header form the public interface of the framework.
2. Static binary (name adequately) - Usually bundled with the framework for linking against main binary so the implementation code for header declarations is linked.
3. ModuleMap - specifies how the module is organized and exposed.
4. Resources - Contains `Info.plist` which is module metadata.

## What is umbrella framework?

A framework that contains many other sub-frameworks.
Apple recommends to not create umbrella frameworks - While it is possible to create umbrella frameworks using Xcode, doing so is unnecessary for most developers and is not recommended. Apple uses umbrella frameworks to mask some of the interdependencies between libraries in the operating system.
