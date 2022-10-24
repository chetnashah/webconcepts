

## 'str' object has no attribute 'makefile'

You're returning a `http.client.HTTPResponse`.

You need to return a `django.http.HttpResponse`.

