

## Stored properties

## Default property value (using a function or a closure)

[Docs](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization/#Setting-a-Default-Property-Value-with-a-Closure-or-Function)

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
        return someValue
    }() // executing closure immediately
}
```

an actual example:
```swift
class ViewController: UIViewController {
    // shutter button
    private let shutterButton: UIButton = {
        let button = UIButton(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
        button.layer.cornerRadius = 1000
        button.layer.borderWidth = 3
        button.layer.borderColor = UIColor.white.cgColor
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
```

**Note** - this closure cannot access other properties of the instance, since rest of instance is not initialized yet. Also, one cannot use implicit `self` or call any instance's methods.

Another use case is board init:
```swift
struct Chessboard {
    // immediate initialization via closure execution
    let boardColors: [Bool] = {
        var temporaryBoard: [Bool] = []
        var isBlack = false
        for i in 1...8 {
            for j in 1...8 {
                temporaryBoard.append(isBlack)
                isBlack = !isBlack
            }
            isBlack = !isBlack
        }
        return temporaryBoard
    }()
    func squareIsBlackAt(row: Int, column: Int) -> Bool {
        return boardColors[(row * 8) + column]
    }
}
```


## Weak vars must always be optional/nullable

Since they are weak references, they can point to `nil` whenever the object referred is de-allocated, hence they must be `var` and `optional`. Similarly `weak let` is not possible. 

**Note**  - this is also a reason why `weak self` is referred like `self?.prop` in closures commonly.

```swift
class Pet {
    let name: String
    
    weak var owner: Owner? // must always be optional for weak references
    
    weak var belt: Belt // compiler ERROR!, must be optional

    init(name: String) { self.name = name }
    
    deinit {
        print("Pet deallocated")
    }
}
```