For example, in a blog application, you might have the following views:

* Blog homepage – displays the latest few entries.
* Entry “detail” page – permalink page for a single entry.
* Year-based archive page – displays all months with entries in the given year.
* Month-based archive page – displays all days with entries in the given month.
* Day-based archive page – displays all entries in the given day.
* Comment action – handles posting comments to a given entry

**Django will choose a view by examining the URL that’s requested (to be precise, the part of the URL after the domain name).**


## URLConfs and URL Dispatching

To get from a URL to a view, Django uses what are known as `URLconfs`. **A URLconf maps URL patterns to views.**

URLs tend to find the way to views, and models tend to serve the needs of views.

## URLDispatcher/router

## PAth param matching with regex

Now let’s add a few more views to polls/views.py. These views are slightly different, because they take an argument:

polls/views.py¶
```
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```
Wire these new views into the polls.urls module by adding the following path() calls:
```py
polls/urls.py¶
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```
Take a look in your browser, at “/polls/34/”. It’ll run the detail() method and display whatever ID you provide in the URL. Try “/polls/34/results/” and “/polls/34/vote/” too – these will display the placeholder results and voting pages.

When somebody requests a page from your website – say, “/polls/34/”, Django will load the mysite.urls Python module because it’s pointed to by the ROOT_URLCONF setting. It finds the variable named urlpatterns and traverses the patterns in order. After finding the match at 'polls/', it strips off the matching text ("polls/") and sends the remaining text – "34/" – to the ‘polls.urls’ URLconf for further processing. There it matches '<int:question_id>/', resulting in a call to the detail() view like so:
```
detail(request=<HttpRequest object>, question_id=34)
```
The `question_id=34` part comes from `<int:question_id>`. **Using angle brackets “captures” part of the URL and sends it as a keyword argument to the view function.** The question_id part of the string defines the name that will be used to identify the matched pattern, and the int part is a converter that determines what patterns should match this part of the URL path. The colon (:) separates the converter and pattern name.


## Templates

Using the template system in Python is a three-step process:

1. You configure an `Engine`.
2. You compile template code into a `Template`.
3. You render the template with a `Context` object.

### Template backend/engine

`BACKEND` is a dotted Python path to a template engine class implementing Django’s template backend API. 
The built-in backends are `django.template.backends.django.DjangoTemplates` and `django.template.backends.jinja2.Jinja2`.

### Variables
A variable outputs a value from the context, which is a dict-like object mapping keys to values.

Variables are surrounded by `{{` and `}}` like this:
```
My first name is {{ first_name }}. My last name is {{ last_name }}.
```
With a context of `{'first_name': 'John', 'last_name': 'Doe'}`, this template renders to:
```
My first name is John. My last name is Doe.
```


## LOading and rendering django templates using django template loader

Template loaders are responsible for 
1. locating templates, 
2. loading them, and 
3. returning Template objects.


```py
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html') ## load template
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request)) # render template given context
```

### Template.render(context, request)

`Template.render(context=None, request=None)¶`
Renders this template with a given context.

If `context` is provided, it must be a `dict`. If it isn’t provided, the engine will render the template with an empty context.

If `request` is provided, it must be an `HttpRequest`. Then the engine must make it, as well as the CSRF token, available in the template. How this is achieved is up to each backend.



### Understanding `{% url 'modulename' %}` in templates

https://docs.djangoproject.com/en/4.1/intro/tutorial03/#removing-hardcoded-urls-in-templates

### Namespacing url names

https://docs.djangoproject.com/en/4.1/intro/tutorial03/#namespacing-url-names

