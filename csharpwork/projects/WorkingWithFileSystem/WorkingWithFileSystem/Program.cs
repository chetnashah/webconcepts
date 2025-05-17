using Spectre.Console;
using WorkingWithFileSystem;

public static class Program
{
    public static void Main(string[] args)
    {
        AnsiConsole.Markup("[underline red]Hello[/] World!\n");
        DemoResources resources = new DemoResources();
        resources.doWork();
    }
}
