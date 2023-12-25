
`Router` essentially helps us map our http methods to actions on a viewset.

## Using ViewSet without a Router

When using a viewset without a router, you must explicitly instantiate the viewset in your URL conf, along with mapping from http methods to actions on the viewset.
e.g. `YourModelViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})`

```py
# urls.py
from django.urls import path
from .views import YourModelViewSet

your_model_list = YourModelViewSet.as_view({'get': 'list', 'post': 'create'})
your_model_detail = YourModelViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

urlpatterns = [
    path('your-model/', your_model_list, name='your-model-list'),
    path('your-model/<int:pk>/', your_model_detail, name='your-model-detail'),
]
```


## Using ViewSEt with Router

```py
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import YourModelViewSet

router = DefaultRouter()
router.register(r'your-model', YourModelViewSet, basename='your-model')

urlpatterns = [
    path('api/', include(router.urls)),
]
```