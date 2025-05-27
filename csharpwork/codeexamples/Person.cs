namespace codeexamples;

public class Person
{
    public Person(decimal initialSalary)
    {
        Salary = initialSalary;
    }

    public Person()
    {
        
    }
    protected decimal Salary { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public HashSet<Person>? Children { get; set; }
}