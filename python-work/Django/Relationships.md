
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

## ChatGPT's response

In Django, you can model relationships between different entities using the built-in model fields. There are several types of relationships, including:

1. **One-to-One Relationship:**
   - Use `OneToOneField` to create a one-to-one relationship between two models.
   - Example:

     ```python
     from django.db import models

     class Person(models.Model):
         name = models.CharField(max_length=100)

     class UserProfile(models.Model):
         person = models.OneToOneField(Person, on_delete=models.CASCADE)
         bio = models.TextField()
     ```

2. **One-to-Many Relationship:**
   - Use `ForeignKey` to create a one-to-many relationship. The many-side model gets a foreign key pointing to the one-side model.
   - By convention the, we do not keep the field where we would have to keep a list/array e.g. A has many B, like Author has many Books, we would have to save a list of Books, but instead **we prefer the other way around, i.e. Book has one Author, so we keep a foreign key in Book model pointing to Author model.**
   - Example:

     ```python
     from django.db import models

     class Author(models.Model):
         name = models.CharField(max_length=100)

     class Book(models.Model):
         title = models.CharField(max_length=200)
         author = models.ForeignKey(Author, on_delete=models.CASCADE)
     ```

3. **Many-to-Many Relationship:**
   - Use `ManyToManyField` to create a many-to-many relationship between two models.
   - Example:

     ```python
     from django.db import models

     class Student(models.Model):
         name = models.CharField(max_length=100)

     class Course(models.Model):
         title = models.CharField(max_length=200)
         students = models.ManyToManyField(Student)
     ```

4. **Self-Referential Relationship:**
   - You can create relationships where a model relates to itself. This is useful for hierarchical structures.
   - Example:

     ```python
     from django.db import models

     class Employee(models.Model):
         name = models.CharField(max_length=100)
         manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
     ```

5. **Through Model (for Many-to-Many with Extra Fields):**
   - When you need to store additional information about a many-to-many relationship, you can use a "through" model.
   - Example:

     ```python
     from django.db import models

     class Student(models.Model):
         name = models.CharField(max_length=100)

     class Course(models.Model):
         title = models.CharField(max_length=200)
         students = models.ManyToManyField(Student, through='Enrollment')

     class Enrollment(models.Model):
         student = models.ForeignKey(Student, on_delete=models.CASCADE)
         course = models.ForeignKey(Course, on_delete=models.CASCADE)
         grade = models.CharField(max_length=2)
     ```

These examples cover the basic types of relationships in Django. When defining relationships, consider using the `on_delete` parameter to specify the behavior when the referenced object is deleted (`models.CASCADE`, `models.PROTECT`, `models.SET_NULL`, etc.).

Remember to run `makemigrations` and `migrate` commands after defining or modifying models to apply the changes to the database schema.