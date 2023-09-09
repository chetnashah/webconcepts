

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