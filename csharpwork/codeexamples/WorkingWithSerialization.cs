using System.Xml.Serialization;

namespace codeexamples;

public class WorkingWithSerialization
{
    public void runSerializationExample()
    {
        Console.WriteLine("-----Running XMLSerialization Example-----");
        List<Person> people = new List<Person>();
        people.Add(new Person(1000) { FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1980, 1, 1) });
        people.Add(new Person(2000) { FirstName = "Jane", LastName = "Smith", DateOfBirth = new DateTime(1990, 2, 2) });
        people.Add(new Person(3000) { FirstName = "Alice", LastName = "Johnson", DateOfBirth = new DateTime(2000, 3, 3) });
        
        Console.WriteLine("------Saving XMLSerialization Example------");
        Console.WriteLine($"Serializing type {people.GetType()}");
        XmlSerializer xs = new XmlSerializer(people.GetType());
        xs.Serialize(Console.Out, people);
        // saves in current directory
        using (FileStream writer = File.Create("people.xml"))
        {
            xs.Serialize(writer, people);
        }
        Console.WriteLine("\n------End of XMLSerialization Example------");
        
    }
}