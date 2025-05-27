
using System.Text; // to use Encoding class
namespace codeexamples;

public class WorkingWithEncodings
{
    public void runEncodingExample()
    {
        Console.WriteLine("Encodings");
        Console.WriteLine("[1] ASCII");
        Console.WriteLine("[2] UTF-7");
        Console.WriteLine("[3] UTF-8");
        Console.WriteLine("[4] UTF-16");
        Console.WriteLine("[5] UTF-32");
        Console.WriteLine("[any other key] Default Encoding");
        
        Console.Write("Press a key to select an encoding: ");
        ConsoleKey number = Console.ReadKey(intercept: true).Key;
        
        Console.WriteLine(); Console.WriteLine();
        Encoding encoder = number switch
        {
            ConsoleKey.D1 or ConsoleKey.NumPad1 => Encoding.ASCII,
            ConsoleKey.D2 or ConsoleKey.NumPad2 => Encoding.UTF7,
            ConsoleKey.D3 or ConsoleKey.NumPad3 => Encoding.UTF8,
            ConsoleKey.D4 or ConsoleKey.NumPad4 => Encoding.Unicode,
            ConsoleKey.D5 or ConsoleKey.NumPad5 => Encoding.UTF32,
            _ => Encoding.Default
        };

        string message = "CafÉ $4.39";
        Console.WriteLine($"Text to encode: {message} Character count by Length: {message.Length}");
        // For String -> Bytes, use GetBytes method
        // For Bytes -> String, use GetString method
        byte[] encoded = encoder.GetBytes(message);
        
        Console.WriteLine("{0} used {1:N0} bytes to encode the text.", encoder.GetType().Name, encoded.Length);
        
        // enumerate the bytes
        Console.WriteLine("BYTE | HEX | CHAR");
        foreach (byte b in encoded)
        {
            Console.WriteLine($"{b,4}, {b, 3:X}, {(char)b, 4}");
        }
        
        string decoded = encoder.GetString(encoded);
        Console.WriteLine("Decoded text: {0}", decoded);
    }
}