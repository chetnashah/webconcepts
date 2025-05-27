The **`typeof` operator** in C# is used to obtain the `System.Type` object for a type. This `System.Type` object provides metadata about the type itself, such as its name, assembly, properties, methods, and more. It's a compile-time operator, meaning the type you're querying must be known at compile time.

---
## How it Works

The basic syntax is:

```csharp
System.Type typeInfo = typeof(TypeName);
```

Where `TypeName` is the name of the type (e.g., `int`, `string`, `List<int>`, or a custom class or struct).

---
## Practical Examples

Here are some common scenarios where `typeof` is useful:

### 1. Getting Basic Type Information 📝

You can use `typeof` to get the `Type` object for built-in types, custom classes, structs, enums, or interfaces.

```csharp
using System;

public class MyClass
{
    public string Name { get; set; }
}

public class Example
{
    public static void Main(string[] args)
    {
        Type intType = typeof(int);
        Type stringType = typeof(string);
        Type myClassType = typeof(MyClass);
        Type listType = typeof(List<double>); // For generic types

        Console.WriteLine($"Type of int: {intType.FullName}");
        Console.WriteLine($"Type of string: {stringType.FullName}");
        Console.WriteLine($"Type of MyClass: {myClassType.FullName}");
        Console.WriteLine($"Is MyClass a class? {myClassType.IsClass}");
        Console.WriteLine($"Type of List<double>: {listType.FullName}");
        Console.WriteLine($"Is List<double> generic? {listType.IsGenericType}");
    }
}
```

**Output:**

```
Type of int: System.Int32
Type of string: System.String
Type of MyClass: MyClass
Is MyClass a class? True
Type of List<double>: System.Collections.Generic.List`1[[System.Double, System.Private.CoreLib, Version=..., Culture=neutral, PublicKeyToken=...]]
Is List<double> generic? True
```

**Use Case:** This is foundational for reflection, type comparison, and dynamic type handling.

---
### 2. Reflection: Creating Instances Dynamically 🛠️

`typeof` is often used with reflection to create instances of types whose names might not be known until runtime (though `typeof` itself requires a compile-time type). You can pass the `Type` object to `Activator.CreateInstance`.

```csharp
using System;

public class Greeter
{
    public void SayHello()
    {
        Console.WriteLine("Hello from Greeter!");
    }
}

public class Example
{
    public static void Main(string[] args)
    {
        Type greeterType = typeof(Greeter);

        // Create an instance of Greeter
        object greeterInstance = Activator.CreateInstance(greeterType);

        // To call methods, you might need to cast or use further reflection
        if (greeterInstance is Greeter myGreeter)
        {
            myGreeter.SayHello();
        }

        // Or using reflection to invoke a method (more complex)
        var methodInfo = greeterType.GetMethod("SayHello");
        methodInfo?.Invoke(greeterInstance, null);
    }
}
```

**Output:**

```
Hello from Greeter!
Hello from Greeter!
```

**Use Case:** Useful in plugin architectures, dependency injection frameworks, or when working with types discovered at runtime.

---
### 3. Type Checking and Comparison ✅

You can compare `Type` objects to check if two variables are of the same type, or if an object's type matches a specific type.

```csharp
using System;

public class Animal {}
public class Dog : Animal {}

public class Example
{
    public static void Main(string[] args)
    {
        Dog myDog = new Dog();
        Animal myAnimal = new Animal();

        Type dogType = typeof(Dog);
        Type animalType = typeof(Animal);

        Console.WriteLine($"Is myDog an Animal? {myDog is Animal}"); // true (instance check)
        Console.WriteLine($"Is myDog's exact type Animal? {myDog.GetType() == animalType}"); // false
        Console.WriteLine($"Is myDog's exact type Dog? {myDog.GetType() == dogType}");   // true

        // Using typeof for direct type comparison
        Console.WriteLine($"typeof(Dog) == typeof(Animal): {typeof(Dog) == typeof(Animal)}"); // false
        Console.WriteLine($"typeof(Dog) == dogType: {typeof(Dog) == dogType}");             // true
    }
}
```

**Output:**

```
Is myDog an Animal? True
Is myDog's exact type Animal? False
Is myDog's exact type Dog? True
typeof(Dog) == typeof(Animal): False
typeof(Dog) == dogType: True
```

**Use Case:** Ensuring type safety, implementing type-specific logic. Note the difference between `is` (checks inheritance hierarchy) and `GetType() == typeof(...)` (checks exact type).

---
### 4. Working with Generics 🧬

`typeof` can be used to get the `Type` object for generic type definitions or constructed generic types.

```csharp
using System;
using System.Collections.Generic;

public class Example
{
    public static void ProcessList<T>(List<T> list)
    {
        Type listElementType = typeof(T);
        Console.WriteLine($"The list contains elements of type: {listElementType.Name}");

        if (typeof(T) == typeof(string))
        {
            Console.WriteLine("This is a list of strings!");
        }
        else if (typeof(T) == typeof(int))
        {
            Console.WriteLine("This is a list of integers!");
        }
    }

    public static void Main(string[] args)
    {
        List<string> stringList = new List<string> { "a", "b" };
        List<int> intList = new List<int> { 1, 2 };
        List<double> doubleList = new List<double> { 1.0, 2.0 };

        ProcessList(stringList);
        ProcessList(intList);
        ProcessList(doubleList);

        // Getting type of an unbound generic
        Type genericListType = typeof(List<>);
        Console.WriteLine($"Unbound generic List type: {genericListType.FullName}"); // System.Collections.Generic.List`1
    }
}
```

**Output:**

```
The list contains elements of type: String
This is a list of strings!
The list contains elements of type: Int32
This is a list of integers!
The list contains elements of type: Double
Unbound generic List type: System.Collections.Generic.List`1
```

**Use Case:** Creating generic utility methods that behave differently based on the type argument, or for analyzing generic type structures.

---
### 5. Attribute Reflection 🏷️

You can use `typeof` to get attributes applied to a type.

```csharp
using System;

[AttributeUsage(AttributeTargets.Class)]
public class MyCustomAttribute : Attribute
{
    public string Description { get; }
    public MyCustomAttribute(string description)
    {
        Description = description;
    }
}

[MyCustom("This is a sample class.")]
public class AttributedClass
{
}

public class Example
{
    public static void Main(string[] args)
    {
        Type attributedClassType = typeof(AttributedClass);
        object[] attributes = attributedClassType.GetCustomAttributes(false);

        foreach (var attr in attributes)
        {
            if (attr is MyCustomAttribute customAttr)
            {
                Console.WriteLine($"Found MyCustomAttribute: {customAttr.Description}");
            }
        }

        // You can also check for a specific attribute type directly
        var specificAttribute = (MyCustomAttribute)Attribute.GetCustomAttribute(attributedClassType, typeof(MyCustomAttribute));
        if (specificAttribute != null)
        {
            Console.WriteLine($"Specific attribute description: {specificAttribute.Description}");
        }
    }
}
```

**Output:**

```
Found MyCustomAttribute: This is a sample class.
Specific attribute description: This is a sample class.
```

**Use Case:** Framework development, AOP (Aspect-Oriented Programming), serialization, validation, etc., where metadata (attributes) drives behavior.

---
## Key Differences: `typeof` vs `GetType()` vs `is`

* **`typeof(TypeName)`**:
    * Operator.
    * Works with a **type name** known at compile time.
    * Returns the `System.Type` object for that specific type.
* **`object.GetType()`**:
    * Method.
    * Works with an **instance** of an object at runtime.
    * Returns the `System.Type` object representing the **exact runtime type** of the instance.
* **`expression is TypeName`**:
    * Operator.
    * Checks if an expression's result (an object instance) can be converted to `TypeName` (i.e., if it is of that type or a derived type, or implements an interface).
    * Returns a `bool`.

In essence, `typeof` is your go-to when you need to refer to a type itself as an object, particularly for reflection and type metadata tasks, and when the type is known when you're writing the code.