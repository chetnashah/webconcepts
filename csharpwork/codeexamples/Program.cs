
// this is a type declaration, not a variable or method declaration
public class Program
{
    public static void Main(string[] args)
    {
        DelegatesExamples delegatesExamples = new DelegatesExamples();
        delegatesExamples.runExamples();

        EventsExamples eventsExamples = new EventsExamples();
        eventsExamples.RunExamples();

        TaskExamples taskExamples = new TaskExamples();
        taskExamples.runTaskExamples().Wait();
    }
}
