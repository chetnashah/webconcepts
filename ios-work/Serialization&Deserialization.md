## Data/NSData is byte array convinience class

Object oriented interface for blobs of bytes/memory. Think of it as bytebuffer.
Can be used to hold bytes from files/URL.




## Codable for buffer <-> type coding/decoding

As long as your type conforms to the Codable protocol, together with the new JSONDecoder, you will be able to decode the JSON data into your specified instances.

https://betterprogramming.pub/why-model-objects-shouldnt-implement-swift-s-decodable-or-encodable-protocols-1249cb44d4b3

### Decoding with JSONDecoder
e.g
```swift
struct Loan: Codable {
    var name: String
    var country: String
    var use: String
    var amount: Int
}

// Decoder given data and class
let decoder = JSONDecoder()

if let jsonData = json.data(using: .utf8) {
    do {
        let loan = try decoder.decode(Loan.self, from: jsonData)
        print(loan)
    } catch {
        print(error)
    }
}
```

### Encoding with JSONEncoder

```swift
do {
    let user = User(name: "John", age: 31)
    let encoder = JSONEncoder()
    let data = try encoder.encode(user)
} catch {
    print("Whoops, an error occured: \(error)")
}
```
