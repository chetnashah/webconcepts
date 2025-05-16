
class EventsExamples
{
    public delegate void VibrationEventHandler(object sender, EventArgs e);

    // has methods like .Invoke and can accept delegate instances
    public event VibrationEventHandler VibrationEvent;

    public void RunExamples()
    {
        Console.WriteLine("--------------Running Events Examples...-------------");
        VibrationEventHandler vibrationEventHandler = (s, e) => Console.WriteLine("Vibration event received by a handler!");
        registerVibrationEventHandler(vibrationEventHandler);
        TriggerVibrationEventStyle1();
        TriggerVibrationEventStyle2();
    }

    public void registerVibrationEventHandler(VibrationEventHandler handler)
    {
        // Register the event handler (of delegate type) on the event
        VibrationEvent += handler;
        Console.WriteLine("Vibration event handler registered. " + VibrationEvent);
    }

    // Trigger happens using .Invoke(eventData) method
    public void TriggerVibrationEventStyle1()
    {
        // Check if there are any subscribers to the event
        if (VibrationEvent != null)
        {
            // Trigger the event
            VibrationEvent.Invoke(this, EventArgs.Empty);
        }
    }

    public void TriggerVibrationEventStyle2()
    {
        // Check if there are any subscribers to the event
        if (VibrationEvent != null)
        {
            // Trigger the event
            VibrationEvent(this, EventArgs.Empty);
        }
    }
}