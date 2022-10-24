

## Built-in model User


`from django.contrib.auth.models import User`

https://docs.djangoproject.com/en/4.1/topics/db/queries/


## Model Managers

https://docs.djangoproject.com/en/4.1/topics/db/managers/

**A Manager is the interface through which database query operations are provided to Django models.** At least one Manager exists for every model in a Django application.

Once you’ve created your data models, Django automatically gives you a database-abstraction API that lets you create, retrieve, update and delete objects.

**By default, Django adds a Manager with the name objects to every Django model class**.
e.g.
```py
class Poll(models.Model):
    question = models.CharField(max_length=100)

Poll.objects # Poll model's manager
```

### Custom model managers

Two reasons to customize a Model Manager:
1. add extra `Manager` methods
2. Modify initial `queryset` the Manager returns


You can use a custom Manager in a particular model by extending the base `Manager` class and instantiating your custom Manager in your model.

e.g.
```py
class PollManager(models.Manager):
    def with_counts(self):
        return self.annotate(
            num_responses=Coalesce(models.Count("response"), 0)
        )
```
or
```py
# First, define the Manager subclass.
class DahlBookManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(author='Roald Dahl')

# Then hook it into the Book model explicitly.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)

    objects = models.Manager() # The default manager.
    dahl_objects = DahlBookManager() # The Dahl-specific manager.
```

