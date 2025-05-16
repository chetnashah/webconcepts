
class DelegatesExamples
{
    public delegate void MyDelegate(string message);

    internal void runExamples()
    {
        MyDelegate myDelegate = new MyDelegate(PrintMessage);
        myDelegate("Hello, World!");

        MyDelegate myLambdaDelegate = (message) => Console.WriteLine(message);
        myLambdaDelegate("Hello from Lambda!");

        MyDelegate myRefDelegate = PrintMessage;
        myRefDelegate("Hello from Reference!");


        MyDelegate allDelegates = myDelegate + myLambdaDelegate + myRefDelegate;
        // API comes from the System.Delegate class
        // The invocation list is a list of all the delegates that are currently
        // assigned to the delegate instance.
        Console.WriteLine("Number of delegates in allDelegates: " + allDelegates.GetInvocationList().Length);
        allDelegates("Hello from All Delegates!");

    }
    public void PrintMessage(string message)
    {
        Console.WriteLine(message);
    }
}