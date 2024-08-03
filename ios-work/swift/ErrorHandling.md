
## use `do { try someThingThatCanBreak() } catch {}` insted of try/catch
We do **try functionCallThatThrows()** inside a `do{...} catch {}` block.

```swift
if let filename = Bundle.main.path(forResource: "input", ofType: "txt") {
    do {
        let str = try String(contentsOfFile: filename)
        print(str)
    } catch { // We are not catching a specific error type or enum, but you can
        print("The file could not be loaded")
        print(error) // error variable is automatically available here
    }
}
```

## Use enums that extend error protocol

Throw those enums and catch using those enums, as error types are usually (exclusive sum types).

Swift uses enumerations to define error types. **You can define your own error types by conforming to the Error protocol.**

Here's a basic example of defining an error type:

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}
```
You can then use these error types in functions that can throw errors:

```swift

Copy
func printDocument() throws {
    // Simulate an error condition
    throw PrinterError.outOfPaper
}
```

Handling Errors
You can handle errors using do-catch blocks or the `try?` and `try!` keywords.

```swift
do {
    try printDocument()
    print("Document printed successfully")
} catch PrinterError.outOfPaper {
    print("The printer is out of paper.")
} catch PrinterError.noToner {
    print("The printer is out of toner.")
} catch PrinterError.onFire {
    print("The printer is on fire!")
} catch {
    print("An unknown error occurred: \(error)")
}
```
You can also use `try?` to convert the result to an `optional`, or `try!` to assert that the function will not throw an error:

```swift
let success = try? printDocument()
if success == nil {
    print("There was an error printing the document.")
}
// This will crash if printDocument() throws an error
try! printDocument()
```

By using enums for errors, Swift provides a clear and type-safe way to represent and handle different error conditions in your code.

## "throws" keyword on functions that can throw

In Swift, the `throws` keyword is used to indicate that a function, method, or closure can throw an error. When a function is marked with `throws`, it means that it may fail and throw an error, which the caller must handle.

Here’s how you can use the `throws` keyword:

### Defining a Throwing Function

To define a function that can throw an error, you add the `throws` keyword before the return type of the function.

```swift
enum NetworkError: Error {
    case badURL
    case noData
    case timeout
}

func fetchData(from url: String) throws -> Data {
    // Simulate some error conditions
    guard !url.isEmpty else {
        throw NetworkError.badURL
    }

    // Simulate network request
    if Bool.random() {
        throw NetworkError.noData
    }

    // Simulate successful data fetch
    return Data()
}
```

### Calling a Throwing Function

When you call a function that can throw an error, you must handle the potential error using a `do-catch` block, or you can propagate the error using `try` within another throwing function.

#### Using `do-catch`

```swift
do {
    let data = try fetchData(from: "http://example.com")
    print("Data fetched successfully")
} catch NetworkError.badURL {
    print("Invalid URL")
} catch NetworkError.noData {
    print("No data received")
} catch NetworkError.timeout {
    print("Request timed out")
} catch {
    print("An unknown error occurred: \(error)")
}
```

#### Using `try?`

The `try?` keyword can be used to convert the result of a throwing function into an optional. If the function throws an error, the result will be `nil`.

```swift
if let data = try? fetchData(from: "http://example.com") {
    print("Data fetched successfully")
} else {
    print("Failed to fetch data")
}
```

#### Using `try!`

The `try!` keyword can be used to assert that the function will not throw an error. If the function does throw an error, the program will crash.

```swift
let data = try! fetchData(from: "http://example.com")
print("Data fetched successfully")
```

### Propagating Errors

**If you want to call a throwing function within another function and propagate any errors, you can use the `try` keyword without handling the error. The enclosing function must also be marked with `throws`.**

```swift
func processData(from url: String) throws {
    let data = try fetchData(from: url)
    // Process the data
    print("Data processed successfully")
}

do {
    try processData(from: "http://example.com")
} catch {
    print("Failed to process data: \(error)")
}
```

By using the `throws` keyword and the various ways to handle errors, Swift provides a robust and expressive way to manage error conditions in your code.