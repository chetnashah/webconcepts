
## Basic syntax

```py
class Dog:
    # class attribute
    species = 'mammal'

    # constructor
    def __init__(self, name, age):
        # instance attributes
        self.name = name
        self.age = age

    # instance method
    def description(self):
        return f"{self.name} is {self.age} years old"
```

### Instantiation of Objects from classes

Usage of class, via class instantiation: **Note: No "new" keyword needed**
```py
d = Dog("Tommy", 10)
```


## Inheritance

```py
# inherit from class Dog
class JackRussellTerrier(Dog):
    def speak(self, sound="Arf"):
        return f"{self.name} says {sound}"

```

### Multiple Inheritance

```py
class BaseClass1:
  Base class1 body
class BaseClass:
  Base class2 body
class DerivedClass(BaseClass1,BaseClass2):
  Derived class body
```