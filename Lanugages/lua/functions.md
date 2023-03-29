
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

**Note (No parentheses case)** - if there is a single argument to a function, and it is either string or dict/table, then parentheses are not needed!

e.g.
```lua
-- single argument to setup is a dictionary so no parentheses needed
require('lualine').setup {
   options = { theme  = 'nord' }
}
```

If a function is called without passing in enough arguments, the nil value is assigned to the remaining parameters.

```lua
function printAge(age)
  print("You are " .. age .. " years old")
end

printAge() -- Prints: You are nil years old
```

## lambdas/anonymous functions

`function` keyword returns a first-class value assignable to variables, similar to javascript

```lua
adder = function(x)
    return function(y)
        return x + y
    end
end
add5 = adder(5)
add5(1) == 6        -- true
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