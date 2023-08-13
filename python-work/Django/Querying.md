

## Field lookups (WHERE clause)
The field specified in a lookup has to be the name of a model field. e.g. `pub_date__year` where `pub_date` is a field in the model.
Field lookups translate to conditions in WHERE clause, and they are used in following functions as keyword args:
1. `get()`
2. `filter()`
3. `exclude()`

### Syntax

`field_name__lookuptype=value`
E.g.
```python
Entry.objects.filter(pub_date__lte="2006-01-01")
```
which roughly translates to SQL:
```sql
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

### Usage with foreign keys

There’s one exception though, in case of a `ForeignKey` you can specify the field name suffixed with `_id`. In this case, the value parameter is expected to contain the raw value of the foreign model’s primary key. 

```python
Entry.objects.filter(blog_id=4)
```

### lookup types

As a convenience when no lookup type is provided (like in `Entry.objects.get(id=14)`) the lookup type is assumed to be `exact`.

1. `exact/iexact` - 
2. `contains/icontains` - case sensitive containment test. e.g. `Entry.objects.get(headline__contains="Lennon")` converts to `WHERE headline LIKE '%Lennon%'`
3. `in` - In a given iterable; often a list, tuple, or queryset. It’s not a common use case, but strings (being iterables) are accepted.
4. `gt/gte/lt/lte` - Greater than; Greater than or equal to, less than or equal to.
5. `startswith/istartswith/endsWith/iendswith` -
6. `range` - Inclusive range of values. Requires a list or tuple of two values. e.g. `Entry.objects.filter(pub_date__range=(start_date, end_date))`.
7. `date` - `Entry.objects.filter(pub_date__date__gt=datetime.date(2005, 1, 1))`
8. `isnull` - `Entry.objects.filter(pub_date__isnull=True)` converts to `WHERE pub_date IS NULL`
9. `regex` - `Entry.objects.get(headline__regex=r'^(An?|The) +')` converts to `WHERE headline REGEXP BINARY '^(An?|The) +'`


## Jumping relationships (JOIN clause)

## Methods that return new querysets

1. `filter()`
2. `exclude()`
3. `annotate()`
4. `order_by()`
5. `reverse()`
6. `distinct()`
7. `values()`
8. `values_list()`
9. `dates()`
10. `datetimes()`
11. `none()`
12. `all()`
13. `select_related()`
14. `prefetch_related()`
15. `extra()`
16. `defer()`
17. `only()`
18. `using()`
19. `select_for_update()`
20. `raw()`

## Methods that do not return querysets

**These methods do not use a cache (see Caching and QuerySets). Rather, they query the database each time they’re called.**

**Execution semantics** - Because these methods evaluate the QuerySet, they are blocking calls, and so their main (synchronous) versions cannot be called from asynchronous code. For this reason, each has a corresponding asynchronous version with an a prefix - for example, rather than `get(…)` you can `await aget(…)`.


1. `get()` - E.g. `Entry.objects.get(id=1)`
2. `create()` - A convenience method for creating an object and saving it all in one step. i.e. Model Constructor + .save in one step. e.g. `p = Person.objects.create(first_name="Bruce", last_name="Springsteen")` is equivalent to 
```python
p = Person(first_name="Bruce", last_name="Springsteen")
p.save(force_insert=True)
```
3. `get_or_create()` - A convenience method for looking up an object with the given kwargs (may be empty if your model has defaults for all fields), creating one if necessary.
4. `update_or_create()` - A convenience method for updating an object with the given kwargs, creating a new one if necessary.
5. `bulk_create()/bulk_update()` - This method inserts the provided list of objects into the database in an efficient manner (generally only 1 query, no matter how many objects there are), and returns created objects as a list, in the same order as provided:
```python
>>> objs = Entry.objects.bulk_create(
...     [
...         Entry(headline="This is a test"),
...         Entry(headline="This is only a test"),
...     ]
... )
```
6. `count()` - Returns an integer representing the number of objects in the database matching the QuerySet.



