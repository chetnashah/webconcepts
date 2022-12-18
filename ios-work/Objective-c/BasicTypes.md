

simple use case:
```objc
// c like syntax
int myInt = 50;
```

## int

similar to C.
we have `char`, `short`, `int`, `long`, `long long`.

on 64 bit OS, long is now 64 bits i.e. 8 bytes.

## NSInteger

4 bytes on 32 bit OS, 8 bytes on 64 bit os.

Good to use with Apple APIs, confirm to apple standards.

## explicit data types for int

`int_8`, `int16_t`, `int32_t` and `int64_t`.
better for portability

