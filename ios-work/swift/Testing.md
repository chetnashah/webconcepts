

The framework to be used is [XCTest](https://developer.apple.com/documentation/xctest)

## Tests form a target/bundle of its own

To add tests go `File > New > Target > Tests`.

## Make your class extend XCTestCase

`XCTestCase` - The primary class for defining test cases, test methods, and performance tests.

Usually you should name it like `FeatureNameTests` - since it represents a collection of test methods under the feature.

## LInking with source code 

test code needs access to source code, in order to test it.
This can be achieved by adding `@testable import ModuleName`, e.g. `@testable import LearnIosSDK`.

### Defining test method in test class

A test method is an instance method on an XCTestCase subclass, with 
1. no parameters, 
2. no return value, and 
3. a name that begins with the lowercase word `test`, e.g. `func testUppercase() { ... }` 
   
Test methods are automatically detected by the XCTest framework in Xcode.

here is an example:
```swift
class MyPeronTests : XCTestCase {
    func testName() {
        let p = Person("Joe")
        XCAssertEqual(p.name, "Joe")
    }
}
```


## Setup and teardown with `setUp()` and `tearDown()` overrides on XCTestCase

Parameters used in multiple test methods can be defined as properties in your test case class. You can use the `setUp()` method to set up the initial state for each test method and the `tearDown()` method to clean up. There are multiple setups and tear-down variants for you to pick.


## Full example
`Person` is a class declared in app module.
We see below a unit test for it.
```swift
import XCTest
@testable import LearniOSSDK

final class LearniOSSDKTests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        var p = Person(name: "joi")
        XCTAssertEqual(p.name, "joe")
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        // Any test you write for XCTest can be annotated as throws and async.
        // Mark your test throws to produce an unexpected failure when your test encounters an uncaught error.
        // Mark your test async to allow awaiting for asynchronous code to complete. Check the results with assertions afterwards.
    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        measure {
            // Put the code you want to measure the time of here.
        }
    }

}
```