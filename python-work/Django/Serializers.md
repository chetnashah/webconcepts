
https://www.django-rest-framework.org/tutorial/1-serialization/

## Serializer convert from complex types like (queryset/model) to Python types like Dict etc which can be converted to JSON.

Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

* `Serialization`- converting from rich model object instance to dict/jsonobject.
* `Deserialization` - converting from dict/jsonobject to rich model object instance.

The conversion from JSONstring to dict/JSONObject is called `parsing`.
The conversion from dict/JSONObject to JSONString is called `rendering`. 

Serialization is the process of making a streamable representation of the rich data objects which we can transfer over the network. Deserialization is its reverse process.

### Plain Serializing example

Pass model instance as constructor to `CustomSerializer`, and use `.data` property on serializer to get serialized representation.

```py
class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

comment = Comment(email='leila@example.com', content='foo bar')

from rest_framework import serializers

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

# Create a serializer instance and pass in a model instance to serialize
serializer = CommentSerializer(comment)
serializer.data # dict
# {'email': 'leila@example.com', 'content': 'foo bar', 'created': '2016-01-27T15:17:10.375877'}
json = JSONRenderer().render(serializer.data) # string 
```

### Plain deserialization example

1. pass in dict as `data` named field in constructor.
2. inspect validity via `serializer.is_valid()` and get validated data using `serializer.validated_data`

```py
dataDict = JSONParser().parse(stream)
serializer = CommentSerializer(data=dataDict)
serializer.validated_data
# {'content': 'foo bar', 'email': 'leila@example.com', 'created': datetime.datetime(2012, 08, 22, 16, 20, 09, 822243)}
```

## Serializer vs ModelSerializer

`Serializer` class which gives you a powerful, generic way to control the output of your responses, as well as a `ModelSerializer` class which provides a useful shortcut for creating serializers that deal with model instances and querysets.

### Plain Serializer

When deserialization happens by calling below, plain validated data is available in `validated_data`, but not saved to database, saving to database only happens when we call `save()`, which internally call `create(validated_data)` or `update(validated_data)` as an opportunity to create rich model instance from `validated_data`.

```py
serializer = ExampleSerializer(data=dataDict) # Validated data available in `validated_data`
```

When passing data to a serializer instance, the unmodified data will be made available as `serializer.initial_data`.

Useful attributes on `Serializer`:
1. `data` - plain json/dict data (outgoing, i.e. validated)
2. `errors` - errors during serialization
3. `validated_data` - validated dict/data
4. `fields` - all fields of serialization

Useful methods on `Serializer`:
1. `save(**kwargs)` - internally calls `self.update(validated_data)` or `self.create(validated_data)` (if self.instance is null). Saves a rich model instance to the Database, and also return the model instance (with finally a primary key).
2. `is_valid()` - Perform all the validation on the serializer
3. `validate(attrs)` -  just return back attrs
4. `update(instance, validated_data)` - must be implimented by client/subtypes
5. `create(validated_data)` - must be implemented by client/subtypes
6. `get_value(dictionary)` - 
7. `run_validators(value)` - Test the given value against all the validators on the field
8. `get_attribute(instance)` - Given the *outgoing* object instance, return the primitive value
        that should be used for this field

The `create()` and `update()` methods define how fully fledged instances are created or modified when calling `serializer.save()`

An example:
```py
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        Snippet is our model
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```

Creation and updation of a serializer model instance example:
```
In [9]: poll_serializer = PollSerializer(instance=poll, data={"question": "Mojito, Caipirinha or margarita?", "created_by": 1})

In [10]: poll_serializer.is_valid() // check if valid
Out[10]: True

In [11]: poll_serializer.save() // commit to db, pk is generated
Out[11]: <Poll: Mojito, Caipirinha or margarita?>

In [12]: Poll.objects.get(pk=5).question // use pk to update model instance
Out[12]: 'Mojito, Caipirinha or margarita?'
```

### Plain serializer validation

When deserializing data, you always need to call `is_valid()` before attempting to access the **validated data**, or save an object instance. 

If any validation errors occur, the `.errors` property will contain a dictionary representing the resulting error messages. For example:
```py
# deserialization with data dict
serializer = CommentSerializer(data={'email': 'foobar', 'content': 'baz'})
serializer.is_valid()
# False
serializer.errors
# {'email': ['Enter a valid e-mail address.'], 'created': ['This field is required.']}
```


**OBject level validation** with custom `validate(self, data)` method:
To do any other validation that requires access to multiple fields, add a method called `.validate()` to your Serializer subclass.
**This method takes a single argument, which is a dictionary of field values**
```py
from rest_framework import serializers

class EventSerializer(serializers.Serializer):
    description = serializers.CharField(max_length=100)
    start = serializers.DateTimeField()
    finish = serializers.DateTimeField()

    def validate(self, data):
        """
        Check that start is before finish.
        """
        if data['start'] > data['finish']:
            raise serializers.ValidationError("finish must occur after start")
        return data
```

### ModelSerializer

A `ModelSerializer` is just a regular `Serializer`, except that:

* A set of default fields are automatically populated.
* A set of default validators are automatically populated.
* Default `.create()` and `.update()` implementations are provided.

For `modelSerializer`, you specify `model` and its `fields` in a `Meta` class.

The process of automatically determining a set of serializer fields
based on the model fields is reasonably complex, but you almost certainly
don't need to dig into the implementation.

If the `ModelSerializer` class *doesn't* generate the set of fields that
you need you should either declare the extra/differing fields explicitly on
the serializer class, or simply use a `Serializer` class.

## Serializers example

we extend our model serializer from `rest_framework.serializers.ModelSerializer`.

```py
from rest_framework import serializers

from .models import Poll, Choice, Vote


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    votes = VoteSerializer(many=True, required=False)

    class Meta:
        model = Choice
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Poll
        fields = '__all__'
```

