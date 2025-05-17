
using System.Threading.Tasks;

class TaskExamples
{
    public async Task runTaskExamples()
    {
        Console.WriteLine("--------------Running Task Examples...-------------");
        await taskExampleAwaitDelayedTask();
    }

    async Task taskExampleAwaitDelayedTask()
    {
        Task t = Task.Delay(1000);
        await t;
        Console.WriteLine("Task completed after 1 second delay.");
    }
}