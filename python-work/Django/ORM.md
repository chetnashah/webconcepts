

## Models have built in ORM functionality

## when foreign key is set, both models have access to each other

## querying

https://docs.djangoproject.com/en/4.2/topics/db/queries/

 In SQL terms, a `QuerySet` equates to a `SELECT` statement, and a `filter` is a limiting clause such as `WHERE` or `LIMIT`.

### How do I get access to a model's queryset?

You get a `QuerySet` by using your model’s `Manager`. 
Each model has at least one `Manager`, and it’s called `objects` by default.

`Manager` is only accessible from model class, not model instances.
```py
# Access objects via model class
>>> Blog.objects
<django.db.models.manager.Manager object at ...>
>>> b = Blog(name="Foo", tagline="Bar")
>>> b.objects
Traceback:
    ...
AttributeError: "Manager isn't accessible via Blog instances."

>>> all_entries = Entry.objects.all()
```

`Managers` are accessible only via model classes, rather than from model instances, to enforce a separation between “table-level” operations and “record-level” operations.

### Filtering objects

https://docs.djangoproject.com/en/4.2/topics/db/queries/#retrieving-specific-objects-with-filters


* The result of refining a `QuerySet` is itself a `QuerySet`, so it’s possible to chain refinements together

e.g 
```py
>>> Entry.objects.filter(headline__startswith="What").exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(pub_date__gte=datetime.date(2005, 1, 30))
```

### Filtered querysets are unique

Each time you refine a `QuerySet`, you get a brand-new `QuerySet` that is in no way bound to the previous `QuerySet`. Each refinement creates a separate and distinct `QuerySet` that can be stored, used and reused.

### How are Queryset evaluated? Lazily

QuerySets are lazy – **the act of creating a QuerySet doesn’t involve any database activity.** You can stack filters together all day long, and Django won’t actually run the query until the QuerySet is evaluated

More details: https://docs.djangoproject.com/en/4.2/ref/models/querysets/#when-querysets-are-evaluated

```py
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q) # db activity happens here on evaluation here
```

### How do I get object directly instead of QuerySet? Use `.get` on Manager

If you know there is only one object that matches your query, you can use the `get()` method on a `Manager` which returns the object directly:

```py
>>> one_entry = Entry.objects.get(pk=1)
```

`Note` - An exception is thrown if 0 or more than 1 elements are returned