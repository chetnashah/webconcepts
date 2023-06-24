
https://www.youtube.com/watch?v=QCSz0j8tGmI

https://www.youtube.com/watch?v=Aty6rJIvpfU


## What is a module?

**A module is a file containing Python definitions (of functions, classes) and statements. The file name is the module name with the suffix .py appended.** 

Module in python is just namespacing file contents based on file name

Within a module, the module’s name (as a string) is available as the value of the global variable  `__name__`


## import statement

We always import modules and packages.

```py
# import the module as its own namespace
import helpers 
helpers.display('something')

# import all module objects in current namespace
from helpers import *
display('something') # object from module directly populated in current namespace

# import specific objects in current namespace
from helpers import display
display('something')
```

## What is a package? why do we need it?

As the number of modules grows, it becomes difficult to keep track of them all if they are dumped into one location.

In the same way that modules help avoid collisions between global variable names, packages help avoid collisions between module names.

**Creating a package is quite straightforward, since it makes use of the operating system’s inherent hierarchical file structure**

### How do I know if my import is a package or a module?

For a package, The imported object will have a `__path__` property which has location of package source.
e.g.
```py
# collections is a package, socket is a module
import collections, socket

# a package has a defined attribute named __path__
print(collections.__path__)
# ['/opt/homebrew/Cellar/python@3.11/3.11.4/Frameworks/Python.framework/Versions/3.11/lib/python3.11/collections']

# file for a package will be __init__.py
>>> print(collections.__file__)
# /opt/homebrew/Cellar/python@3.11/3.11.4/Frameworks/Python.framework/Versions/3.11/lib/python3.11/collections/__init__.py

# spec attribute is also defined for package
>>> print(collections.__spec__)
# ModuleSpec(name='collections', loader=<_frozen_importlib_external.SourceFileLoader object at 0x10058e290>, origin='/opt/homebrew/Cellar/python@3.11/3.11.4/Frameworks/Python.framework/Versions/3.11/lib/python3.11/collections/__init__.py', submodule_search_locations=['/opt/homebrew/Cellar/python@3.11/3.11.4/Frameworks/Python.framework/Versions/3.11/lib/python3.11/collections'])
```

## Role of `__init__.py` in packages

They help expose the folder package of modules, as a single module to the outside world (i.e. consumer of package).
`__init__.py` will treat the directory it is in as a loadable module.



### Use it for convinience exports

It can gather necessary modules in the directory and re-export them for convinience of the consumers of the package.
For convenience: the other users will not need to know your functions' exact location in your package hierarchy (documentation).
```sh
your_package/
  __init__.py
  file1.py
  file2.py
    ...
  fileN.py
```
```py
# in __init__.py
# re importing for convinience of consumers
from .file1 import *
from .file2 import *
...
from .fileN import *
```
```py
# in file1.py
def add():
    pass
```
then others can call `add()` by
```py
# top level package exports are more convinient
from your_package import add
```
without knowing file1's inside functions, like
```py
# painful to remember full module path inside the package.
from your_package.file1 import add
```