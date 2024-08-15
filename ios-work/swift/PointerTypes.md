
## Main Pointer Types

Pointers have the name - `Unsafe[Mutable/Raw/Buffer]Pointer<Pointee>`. The `Pointee` is the type of the value that the pointer points to. The `Unsafe` prefix indicates that the pointer is not memory safe. 

The `Mutable` prefix indicates that the pointer can be used to modify the value it points to. The `Raw` prefix indicates that the pointer is a raw pointer. The `Buffer` prefix indicates that the pointer is a buffer pointer.