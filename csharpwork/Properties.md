
Properties enable a class to expose a public way of getting and setting values, while hiding implementation or verification code.

* Properties can be read-write (they have both a get and a set accessor), read-only (they have a get accessor but no set accessor), or write-only (they have a set accessor, but no get accessor). Write-only properties are rare.

## Use cases

Properties have many uses:

1. They can **validate data** before allowing a change.
2. They can **transparently expose data** on a class where that data is retrieved from some other source, such as a database.
3. They can **take an action when data is changed**, such as raising an event, or changing the value of other fields.


## Prefer automatically implemented properties (instead of fields)

```csharp
public class Person
{
    public string? FirstName { get; set; }

    // Omitted for brevity.
}
```

## Interfaces are allowed to have properties

```csharp
public interface ISampleInterface
{
    // Property declaration:
    string Name
    {
        get; // Note: this is not automatically implemented since we are an interface
        set; // Note: this is not automatically implemented since we are an interface
    }
}
```

## Implementing Properties in C# classes
The syntax in your selection defines a C# property with a getter:

```csharp
public int NumberOfMessagesLogged
{
    get { return cnt; }
}
```

- This is property syntax, specific to C# properties (not fields or methods).
- The `get` accessor returns the value of the private field `cnt`.
- Properties can be used to implement interface properties. If an interface declares a property, the implementing class must provide a property with the same signature.

For example, if your interface has:

```csharp
public interface IMessageWriter
{
    int NumberOfMessagesLogged { get; }
}
```

Then your class must implement it as shown. This is the standard way to implement interface properties in C#.

## Backing storage variables (i.e fields) are needed for setters

The incoming value of the setter is named `value`. The setter can be used to validate the incoming value before assigning it to a backing field. (which is usually a private field e.g. `_month` here).

```csharp
public class Date
{
    private int _month = 7;  // Backing store

    public int Month
    {
        get => _month;
        set
        {
            // Validate the incoming value being set
            if ((value > 0) && (value < 13))
            {
                _month = value; // _month is the backing storage variable
            }
        }
    }
}
```

## Making immutable properties for client code
You can make an immutable property in the following ways:

1. Declare only the get accessor, which makes the property immutable everywhere except in the type's constructor.
2. Declare an init accessor instead of a set accessor, which makes the property settable only in the constructor or by using an object initializer.
3. Declare the set accessor to be private. The property is settable within the type, but it's immutable to consumers.

## Expression-bodied properties

```csharp
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    // Expression-bodied read-only property returning the full name
    public string FullName => $"{FirstName} {LastName}";
}
```