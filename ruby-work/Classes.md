
## Use 

```rb
class Person
    attr_accessor :name, :age
    # initialize is constructor method
    def initialize(name, age)
        @name = name # instance attributes via @
        @age = age
    end

    # Accessors are like getters and setters/properties in other languages
    # Accessor setter
    def zodiagsign(value)
        @zodiacsign = value
    end

    # Accessor getter
    def zodiacsign
        @zodiacsign # implicit return of instance attribute
    end
end
```


## Create instance using `New` method on class object

```rb
p = Person.new("John", 10)
p.zodiacsign = "Leo"
puts p.zodiacsign
```

## Constructor method is called `initialize`

Whenever Ruby creates a new object, it looks for a method named initialize and executes it

```rb
class ApiConnector
  # constructor method
  def initialize(title, description, url)
    @title = title
    @description = description
    @url = url
  end
end
```