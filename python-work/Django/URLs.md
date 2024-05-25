##

To design URLs for an app, you create a Python module informally called a URLconf (URL configuration). **This module is pure Python code and is a mapping between URL path expressions to Python functions (your views).**

## Trailing slashes

By default, `APPEND_SLASH` is `True`. If `APPEND_SLASH` is set to `FALSE`, and you
type a different url from the declared pattern, you will get a `404`.

### Common practices with trailing slashes

In Django, trailing slashes have significance when it comes to URL patterns and the handling of URLs. Here are some key points to understand about trailing slashes in Django:

1. Default Behavior: By default, Django's URL routing treats URLs with and without trailing slashes as different. For example, `/example/` and `/example` are considered separate URLs. Django's URL dispatcher matches URLs based on the defined patterns and handles them accordingly.

2. URL Patterns: When defining URL patterns in Django's `urls.py` file, you can choose whether to include a trailing slash or not. Both options are valid and depend on your preference and the semantics of your application.

   For example, if you define a URL pattern without a trailing slash:

   ```python
   urlpatterns = [
       path('example', views.example_view),
   ]
   ```

   This pattern will match requests to `/example` but not requests to `/example/`. If you want both URLs to be recognized, you can define the pattern with a trailing slash:

   ```python
   urlpatterns = [
       path('example/', views.example_view),
   ]
   ```

   Alternatively, you can use a regular expression pattern to make the trailing slash optional:

   ```python
   urlpatterns = [
       re_path(r'^example/?$', views.example_view),
   ]
   ```

3. Redirects: Django provides a `APPEND_SLASH` setting that controls the automatic redirection of URLs without trailing slashes to their corresponding URLs with trailing slashes. By default, this setting is `True`, meaning Django will redirect requests without a trailing slash to the version with a trailing slash.

   For example, if you have a URL pattern defined as `path('example/', views.example_view)`, and a user accesses `/example`, Django will automatically redirect the request to `/example/` with a trailing slash.

   You can customize this behavior by setting `APPEND_SLASH` to `False` in your Django project's settings file (`settings.py`) if you prefer to handle trailing slash redirection differently or disable it altogether.

   ```python
   APPEND_SLASH = False
   ```

4. Common Approach: A common approach is to define URL patterns without trailing slashes and let Django handle the redirection by enabling `APPEND_SLASH`. This can help maintain consistency and avoid potential duplicate content issues due to multiple URLs pointing to the same resource.

   For example:

   ```python
   urlpatterns = [
       path('example', views.example_view),
       # ...
   ]
   ```

   This will match `/example` and redirect it to `/example/`. Your view logic can be written to handle the request with or without the trailing slash, depending on your application's requirements.

Remember to consider your specific application's needs and adhere to consistent URL patterns throughout your project.
