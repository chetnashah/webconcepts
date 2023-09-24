
## Public attributes

exposed and mutable (becomes public). Generally discouraged exposing internal state!

* Can be stored or computed attribute

## Accessor and Mutator methods (Getter and setters)

Guards access to internal storage of attribute

e.g.
```py
class Label:
    ## All attributes are public and directly accessible
    __init__(self, text, font):
        self.text = text
        self.font = font
```

## Wrapping attributes with properties

Proeperties are specialised attributes with additional behaviors.

### property(fset, fget, fdel, doc) to manage attributes

1. `fset` = manage setting of attribute, alternative for `obj.attr = val`
2. `fget` = manage getting of attribute, alternative for `obj.attr`
3. `fdel` = manage deleting of attribute, alternative for `del obj.attr`
4. `doc` = manage documentation of attribute, alternative for `help(obj.attr)`

### Create property with `property(...)` 

```py
class Circle:
    def __init__(self, radius):
        self._radius = radius

    def _get_radius(self):
        print("getting radius")
        return self._radius

    def _set_radius(self, value):
        print("setting radius to ", value)
        self._radius = value

    def _del_radius(self):
        del self._radius

    # public api, create a property
    # a high level attribute that manage a instance attribute
    radius = property(
        fset=_set_radius,
        fget=_get_radius,
        fdel=_del_radius,
        doc="The radius property"
    )

# define instance
circle = Circle(213)
# use property
print(circle.radius)  # getting radius 213
circle.radius = 111  # setting radius to 111
print(circle.radius)  # getting radius 111

print(Circle.radius.fget)
print(Circle.radius.fset)
```

## Using `property` as a decorator

**Decorators** - functions that take in a function and return a decorated version of it.

**Default property can only define getter, define `@propname.setter` with a function to add setter to that property**

```py
class Circle:
    def __init__(self, radius):
        self._radius: radius
    
    @property
    def radius(self):
        """The radius property"""
        print("get radius")
        return self._radius

    # add setter to radius property
    @radius.setter
    def radius(self, value): # same name as property
        self._radius = value
```
