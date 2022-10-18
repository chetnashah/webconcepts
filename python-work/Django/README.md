
## Core classes

Django apps are “pluggable”: You can use an app in multiple projects, and you can distribute apps, because they don’t have to be tied to a given Django installation.

## How to play around with DJango APIs

Open shell using following:
```
python manage.py shell
```

Then try things like following:
```sh
>>> from polls.models import Choice, Question  # Import the model classes we just wrote.

# No questions are in the system yet.
>>> Question.objects.all()
<QuerySet []>

# Create a new Question.
# Support for time zones is enabled in the default settings file, so
# Django expects a datetime with tzinfo for pub_date. Use timezone.now()
# instead of datetime.datetime.now() and it will do the right thing.
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())

# Save the object into the database. You have to call save() explicitly.
>>> q.save()

# Now it has an ID.
>>> q.id
1

# Access model field values via Python attributes.
>>> q.question_text
```

### HTTPResponse

Part of `django.http` module.
https://docs.djangoproject.com/en/4.1/ref/request-response/

## URL Management

To design URLs for an app, you create a Python module informally called a `URLconf` (URL configuration). This module is pure Python code and is a **mapping between URL path expressions to Python functions (your views)**.

https://docs.djangoproject.com/en/4.1/topics/http/urls/#url-dispatcher

### HOw django processes a request

When a user requests a page from your Django-powered site, this is the algorithm the system follows to determine which Python code to execute:

1. Django determines the root `URLconf` module to use. Ordinarily, this is the value of the `ROOT_URLCONF` setting, but if the incoming HttpRequest object has a urlconf attribute (set by middleware), its value will be used in place of the `ROOT_URLCONF` setting.
2. Django loads that Python module and looks for the variable **urlpatterns**. This should be a sequence of `django.urls.path()` and/or `django.urls.re_path()` instances.
3. Django runs through each URL pattern, in order, and stops at the first one that matches the requested URL, matching against path_info.
4. Once one of the URL patterns matches, Django imports and calls the given view, which is a Python function (or a class-based view). The view gets passed the following arguments:
   1. An instance of `HttpRequest`.
   2. If the matched URL pattern contained no named groups, then the matches from the regular expression are provided as positional arguments.
   3. The keyword arguments are made up of any named parts matched by the path expression that are provided, overridden by any arguments specified in the optional kwargs argument to django.urls.path() or django.urls.re_path().
5. If no URL pattern matches, or if an exception is raised during any point in this process, Django invokes an appropriate error-handling view. See Error handling below.


## URL ROuting with `urls.path`

Use `path(route, view, kwargs=None, name=None)` which return URLResolver.

like following:
```py
from django.urls import include, path

urlpatterns = [
    path('index/', views.index, name='main-view'),
    path('bio/<username>/', views.bio, name='bio'),
    path('articles/<slug:title>/', views.article, name='article-detail'),
    path('articles/<slug:title>/<int:section>/', views.section, name='article-section'),
    path('blog/', include('blog.urls')),
    ...
]
```

### usage of include

The `include()` function allows referencing other URLconfs. Whenever Django encounters `include()`, it chops off whatever part of the URL matched up to that point and sends the remaining string to the included URLconf for further processing.



## Models

model code gives Django a lot of information. With it, Django is able to:

* Create a database schema (CREATE TABLE statements) for this app.
* Create a Python database-access API for accessing Question and Choice objects

```py
from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

`ModelName.objects` returns a Model Manager, which has methods like `.all()` etc which return a `QuerySet`.

### Saving model with `ModelName.save()`

### QuerySet

### Migrations

migrations are entirely derived from your models file, and are essentially a history that Django can roll through to update your database schema to match your current models.

Migrating a particular app `polls` (Nothing will happen unless you install the app in apps.py):
```
python manage.py makemigrations polls
```
As a result of this command, migration logic/files are auto generated in `appname/migrations/xyz_001.py`.

By running **makemigrations**, you’re telling Django that you’ve made some changes to your models (in this case, you’ve made new ones) and that you’d like the changes to be stored as a migration.

Migrations are how Django stores changes to your models (and thus your database schema) - they’re files on disk. You can read the migration for your new model if you like; it’s the file polls/migrations/0001_initial.py. Don’t worry, you’re not expected to read them every time Django makes one, but they’re designed to be human-editable in case you want to manually tweak how Django changes things.

### 3 step guide to model migration changes

the three-step guide to making model changes:

1. Change your models (in `models.py`).
2. Run `python manage.py makemigrations` to create migrations for those changes.
3. Run `python manage.py migrate` to apply those changes to the database.



