
Common use cases involve holding network or file data.

## NSData (Data in swift)

A static byte buffer that bridges to Data; use NSData when you need reference semantics or other Foundation-specific behavior.

NSData and its mutable subclass NSMutableData provide data objects, or object-oriented wrappers for byte buffers. 

`NSData` is toll-free bridged with its Core Foundation counterpart, `CFData`.

## Data

The `Data` value type allows simple byte buffers to take on the behavior of Foundation objects. You can create empty or pre-populated buffers from a variety of sources and later add or remove bytes. You can filter and sort the content, or compare against other buffers. You can manipulate subranges of bytes and iterate over some or all of them