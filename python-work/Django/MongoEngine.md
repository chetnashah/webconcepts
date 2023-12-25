

## Sample todo app with mongoengine

### Model

```py
import mongoengine as me

class TodoItem(me.Document):
    text = me.StringField(required=True, max_length=200)
    completed = me.BooleanField(required=False, default=False)
```

### View

```py
from rest_framework_mongoengine import viewsets as drfme_viewsets
from .models import TodoItem
from .serializers import TodoSerializer

class TodoListCreateViewSet(drfme_viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoSerializer
```

### URLConf



```py
from django.urls import path, include
from .views import TodoListCreateViewSet
from rest_framework.routers import DefaultRouter

# attach with prefix todos
defaultRoouter = DefaultRouter()
defaultRoouter.register('todos', TodoListCreateViewSet, 'todos')

urlpatterns = [
    path('', include(defaultRoouter.urls), name='todo-list-create'),
]
```

### Serializer

```py
from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import TodoItem


class TodoSerializer(DocumentSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
```