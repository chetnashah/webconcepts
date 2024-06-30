https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/FrameworkAnatomy.html

## Creating a standalone framework (Swift)

Xcode > New project > Framework > Swift > NameSomethingKit

Generates an `NameSomethingKit.xcodeproj` along with `NameSomethingKit` folder

## What is a framework?

**Think of it as a module with encapsulated implementation, having a name scope**.

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

## How to use frameworks?

Certainly! I'll provide detailed steps for integrating each type of framework in an iOS project:

1. System Frameworks:
   - In Xcode, select your target
   - Go to "Build Phases" tab
   - Expand "Link Binary With Libraries"
   - Click "+" and select the system framework
   - In code, import the framework (e.g., `import UIKit`)

2. Static Frameworks:
   - Drag the .framework file into your Xcode project
   - In "Add files" dialog, ensure "Copy items if needed" is checked
   - Select appropriate targets
   - Go to "Build Phases" > "Link Binary With Libraries"
   - Add the framework if it's not already there
   - In code, import the framework

3. Dynamic Frameworks:
   - Follow steps for static frameworks
   - Additionally, go to "General" tab of your target
   - In "Frameworks, Libraries, and Embedded Content", add the framework
   - Ensure it's set to "Embed & Sign"

4. Embedded Frameworks:
   - If you're creating the framework:
     - File > New > Target > Framework
     - Add necessary code and public headers
   - To use:
     - Drag the framework project into your main project
     - In main target's "General" tab, add framework to "Frameworks, Libraries, and Embedded Content"
     - Set to "Embed & Sign"

5. CocoaPods:
   - Install CocoaPods if not already installed: `sudo gem install cocoapods`
   - In project directory, run `pod init`
   - Edit Podfile to add desired pods
   - Run `pod install`
   - Use the .xcworkspace file from now on
   - Import frameworks in code as needed

6. Carthage:
   - Install Carthage: `brew install carthage`
   - Create a Cartfile in your project directory
   - Add framework dependencies to Cartfile
   - Run `carthage update --platform iOS`
   - Drag built frameworks from Carthage/Build/iOS into "Frameworks, Libraries, and Embedded Content"
   - Add a run script phase to strip unnecessary architectures

7. Swift Package Manager:
   - In Xcode, go to File > Swift Packages > Add Package Dependency
   - Enter the package repository URL
   - Choose version or branch
   - Select the target where you want to add the package
   - Import the module in your code

8. Manually added source code:
   - Drag the framework's source files into your project
   - Ensure "Copy items if needed" is checked
   - Select appropriate targets
   - Organize files in groups as needed
   - Use the code directly in your project

9. XCFrameworks:
   - Drag the .xcframework file into your project
   - In "Add files" dialog, ensure "Copy items if needed" is checked
   - Go to target's "General" tab
   - Add to "Frameworks, Libraries, and Embedded Content"
   - Set to "Embed & Sign"

10. Binary frameworks:
    - Usually provided as .framework files
    - Follow the same steps as for static or dynamic frameworks
    - Ensure you have the correct version for your app's architecture (arm64, x86_64, etc.)

General tips:
- Always check the framework's documentation for specific integration instructions
- Ensure framework compatibility with your project's minimum deployment target
- For manual integrations, be mindful of potential conflicts with other dependencies
- Keep frameworks updated, especially for security-related updates

Would you like more information on any specific integration method or best practices for managing frameworks in iOS projects?