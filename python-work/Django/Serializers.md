
## Serializer convert from complex types like (queryset/model) to Python types like Dict etc which can be converted to JSON.

Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

The conversion from JSONstring to dict/JSONObject is called parsing.
The conversion from dict/JSONObject to JSONString is called rendering. 