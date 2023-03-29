

## Printing/IO

`echo` - `echo 'Hello, World!'`

`echomsg` - if you want to save it in history

## Variables 

Declare variables with `let`.

**Undefine using `unlet`**

```
" Number is integer
let number = 42     " Defines Number
let number += 1     " 43
echomsg number      " print 43

unlet number        " Undefines number
echo number         " error
```

### Namespaces of variables

`g:` - Global.

`l:` - Local to a function.

`s:` - Local to a script file.

`a:` - Function argument (only inside a function).

`v:` - Global, predefined by Vim.

`b:` - Local to the current buffer.

`w:` - Local to the current window.

`t:` - Local to the current tab page.

Ovrride/shadow order = local function > Local script > Global.

```vimscript
let g:number = 42       " global
let s:number = 67       " script scope

function s:foo(number)  " function : script scope

    echo g:number . ' is global.'
    echo a:number . ' is argument.'

    let l:number = 23

    echo l:number . ' is local.'

endfunction

call s:foo(s:number)
    " 42 is global.
    " 67 is argument.
    " 23 is local.
```

## List literals

```vim
let list = []
let list = ['one', 'two', 'three', 'four']

echo list[0]             " 'one'
echo list[-1]            " 'four'
echo list[9]             " error

echo get(list, 0)        " 'one'
echo get(list, -1)       " 'four'
echo get(list, 9, 'ten') " 'ten'

let size = len(s:list)   " size is 4
```

### Lists support destructuring

```vim
let list = [1, 2, 3]

let [var1, var2, var3] = list

echo var1   " 1
echo var2   " 2
echo var3   " 3
```

### List functions

```vim
" length
echo len([1, 2, 3])     " 3

" check empty
echo empty([1, 2, 3])   " 0
echo empty([])          " 1

" remove
let list = [1, 2, 3]
call remove(list, 1)                " [1, 3]
let removed_item = remove(list, 0)  " removed_item is 1, list is [3]

" filter
let list = [1, 2, 3]
call filter(list, {idx, val -> val > 1})    " use lambda
echo list   " [2, 3]

" map
let list = [1, 2, 3]
call map(list, {idx, val -> val * 10})
echo list   " [10, 20, 30]

" sort, reverse, uniq, max, min
call sort(list)
call reverse(list)
call uniq(list)
let max = max(list)
let min = min(list)

" count, index
let list = [1, 2, 3, 4, 5, 5]
echo count(list, 5)             " 2
echo index(list, 2)             " 1

" split, join
let list = split('1 2 3', '\s') " ['1', '2', '3']
let str = join(list, '-')       " '1-2-3'
```

## Flow control

### if (has endif)

```vim
if 1
    echo 'true'
endif

if 0
    echo 'impossibe'
endif

let name = 'foo'

if name == 'test'
    echo 'test name'
elseif name == 'foo'    " else if (x), elseif (o)
    echo name
endif
```

### for (has endfor)

```vim
for item in [1, 2, 3]
    if item < 2
        continue
    else
        break
    endif
endfor

let sum = 0
while sum < 100
    let sum += 1
    call do_something()
endwhile
```

## Functions

Scope of functions: script level or global
```vim
function Foo(value)     " global function
    echo a:value
endfunction

function s:foo(value)   " script private function
    echo a:value
endfunction
```

### Functions on objects with `dict` keyword

```vim
let obj = { 'msg': 'hello' }

function obj.getMsg() dict
    return self.msg
endfunction

let msg = obj.getMsg()
echo msg    " 'hello'
```

### Get references to functions using `funcref` or `function(fnName)`
```vim
function GetMsg() dict
    return self.msg
endfunction

let obj1 = { 'msg': 'hello', 'getMsg': funcref('GetMsg') } // syntax funcref('fnName')
let obj2 = { 'msg': 'hi', 'getMsg': function('GetMsg') } // syntax function('fnName')

echo obj1.getMsg()  " 'hello'
echo obj2.getMsg()  " 'hi'
```

## Dictionary/object declaration

```vim
let obj = { 'name': 'John', 'number': 24 }
let obj['like'] = ['vim', 'game', 'orange']
let obj['address'] = 'Seoul, Korea'
let obj.test = 1
```

Iteration on dicts/objects

```vim
for key in keys(mydict)
   echo key . ': ' . mydict[key]
endfor

for v in values(mydict)
   echo "value: " . v
endfor

for [key, value] in items(mydict)
   echo key . ': ' . value
endfor
```

Othr utility functions:
```vim
echo has_key(dict, 'foo')
echo empty(dict)
```