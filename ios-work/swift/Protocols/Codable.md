
## Commonly used for serialization/deserialization i.e encoding/decoding

Here's a detailed explanation of the Codable protocol in Swift with examples:

**The Codable protocol is a combination of two protocols - Encodable and Decodable. It's used to convert Swift objects to and from external representations like JSON or Property Lists.**

Let's go through examples:

1. Basic Codable Implementation:

```swift
struct Person: Codable {
    let name: String
    let age: Int
    let email: String
}

// Encoding
let person = Person(name: "John Doe", age: 30, email: "john@example.com")

do {
    let encoder = JSONEncoder()
    let jsonData = try encoder.encode(person)
    let jsonString = String(data: jsonData, encoding: .utf8)!
    print(jsonString)
} catch {
    print("Encoding error: \(error)")
}

// Decoding
let jsonString = """
{
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com"
}
"""

do {
    let decoder = JSONDecoder()
    let jsonData = jsonString.data(using: .utf8)!
    let decodedPerson = try decoder.decode(Person.self, from: jsonData)
    print(decodedPerson)
} catch {
    print("Decoding error: \(error)")
}
```

2. Nested Objects:

```swift
struct Address: Codable {
    let street: String
    let city: String
    let country: String
}

struct Employee: Codable {
    let name: String
    let address: Address
    let departments: [String]
}

// Usage
let address = Address(street: "123 Main St", city: "New York", country: "USA")
let employee = Employee(name: "Jane Smith", address: address, departments: ["Engineering", "Design"])
```

3. Custom Keys using CodingKeys:

```swift
struct User: Codable {
    let firstName: String
    let lastName: String
    let emailAddress: String
    
    enum CodingKeys: String, CodingKey {
        case firstName = "first_name"
        case lastName = "last_name"
        case emailAddress = "email"
    }
}
```

4. Optional Properties:

```swift
struct Product: Codable {
    let id: Int
    let name: String
    let description: String?
    let price: Double
    let tags: [String]?
}
```

5. Date Handling:

```swift
struct Event: Codable {
    let title: String
    let date: Date
    
    init(title: String, date: Date) {
        self.title = title
        self.date = date
    }
}

// Custom date encoding/decoding
let encoder = JSONEncoder()
encoder.dateEncodingStrategy = .iso8601

let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
```

6. Custom Encoding/Decoding:

```swift
struct Temperature: Codable {
    let celsius: Double
    
    init(celsius: Double) {
        self.celsius = celsius
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        celsius = try container.decode(Double.self)
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(celsius)
    }
}
```

Common Use Cases:

1. API Integration:
```swift
struct APIResponse: Codable {
    let status: String
    let data: [Product]
    let message: String?
}

func fetchProducts() {
    let url = URL(string: "https://api.example.com/products")!
    
    URLSession.shared.dataTask(with: url) { data, response, error in
        guard let data = data else { return }
        
        do {
            let decoder = JSONDecoder()
            let response = try decoder.decode(APIResponse.self, from: data)
            // Handle response
        } catch {
            print("Decoding error: \(error)")
        }
    }.resume()
}
```

2. Data Persistence:
```swift
struct Settings: Codable {
    let theme: String
    let notifications: Bool
    let language: String
}

class SettingsManager {
    static func saveSettings(_ settings: Settings) {
        do {
            let encoder = JSONEncoder()
            let data = try encoder.encode(settings)
            UserDefaults.standard.set(data, forKey: "userSettings")
        } catch {
            print("Error saving settings: \(error)")
        }
    }
    
    static func loadSettings() -> Settings? {
        guard let data = UserDefaults.standard.data(forKey: "userSettings") else {
            return nil
        }
        
        do {
            let decoder = JSONDecoder()
            return try decoder.decode(Settings.self, from: data)
        } catch {
            print("Error loading settings: \(error)")
            return nil
        }
    }
}
```

3. File Operations:
```swift
struct Document: Codable {
    let title: String
    let content: String
    let lastModified: Date
}

class DocumentManager {
    static func saveDocument(_ document: Document, filename: String) {
        let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let fileURL = documentsDirectory.appendingPathComponent(filename)
        
        do {
            let encoder = JSONEncoder()
            encoder.dateEncodingStrategy = .iso8601
            let data = try encoder.encode(document)
            try data.write(to: fileURL)
        } catch {
            print("Error saving document: \(error)")
        }
    }
}
```

