
## One to One

## One to Many

A Manufacturer has many Cars

```py
from django.db import models


class Manufacturer(models.Model):
    # ...
    pass

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
```

## Many to Many

To define a many-to-many relationship, use `ManyToManyField`. You use it just like any other Field type: by including it as a class attribute of your model.

`Note`: It doesn’t matter which model has the ManyToManyField, but you should only put it in one of the models – not both.

```py
from django.db import models


class Topping(models.Model):
    # ...
    pass


# A Pizza has multiple Toppings and topping can be on multiple Pizzas
# field is kept here since it is most likely be edited here in a form
class Pizza(models.Model):
    # ...
    toppings = models.ManyToManyField(Topping)
```

### Extra fields on many-to-many

When you’re only dealing with many-to-many relationships such as mixing and matching pizzas and toppings, a standard ManyToManyField is all you need.
However, **sometimes you may need to associate data with the relationship between two models.**

```py
from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through="Membership")

    def __str__(self):
        return self.name


class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

