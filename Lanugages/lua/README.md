
## Variables

Local variables are declared with `local`
e.g.
```lua
local a = 1
```

## Functions

`Note` - no brackets, but `end` at the end of the block.
```lua
function max(num1, num2)
   if (num1 > num2) then
      result = num1;
   else
      result = num2;
   end
   return result; 
end
```

## Module

Module is like a library that can be loaded using require and has a single global name containing a table.

**Module name and its file name should be the same**

Defining `mymath` module:
```lua
-- mymath.lua
local mymath =  {}

function mymath.add(a,b)
   print(a+b)
end

function mymath.sub(a,b)
   print(a-b)
end

function mymath.mul(a,b)
   print(a*b)
end

function mymath.div(a,b)
   print(a/b)
end

return mymath	
```

Using the module via `require`:
```lua
-- main.lua
mymathmodule = require("mymath")
mymathmodule.add(10,20)
mymathmodule.sub(30,20)
mymathmodule.mul(10,20)
mymathmodule.div(30,20)
```

## Data types

1	
nil

Used to differentiate the value from having some data or no(nil) data.

2	
boolean

Includes true and false as values. Generally used for condition checking.

3	
number

Represents real(double precision floating point) numbers.

4	
string

Represents array of characters.

5	
function

Represents a method that is written in C or Lua.

6	
userdata

Represents arbitrary C data.

7	
thread

Represents independent threads of execution and it is used to implement coroutines.

8	
table

Represent ordinary arrays, symbol tables, sets, records, graphs, trees, etc., and implements associative arrays. It can hold any value (except nil).

## use `type` function to get type

```lua
print(type("What is my type"))   --> string
t = 10

print(type(5.8*t))               --> number
print(type(true))                --> boolean
print(type(print))               --> function
print(type(nil))                 --> nil
print(type(type(ABC)))           --> string
```