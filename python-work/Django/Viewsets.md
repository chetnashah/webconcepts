
First thing first, `APIView` or `ViewSet` aren't tied to models while ModelViewSet, GenericAPIView, ListAPIView (and co) are.

A `viewset` can replace  multiple related views.


## Understanding `APIView` and `ViewSet`

### APIView: 
This provides methods handler for http verbs: 
1. `get`, `post`, `put`, `patch`, and `delete`.


### ViewSet (action based views):

THe big take away is that Viewset translates methods into actions callbacks.

This is an abstraction over APIView, which provides actions as methods:
1. `list`: read only, returns multiple resources (http verb: get). Returns a list of dicts.
2. `retrieve`: read only, single resource (http verb: get, but will expect an id in the url). Returns a single dict.
3. `create`: creates a new resource (http verb: post)
4. `update/partial_update`: edits a resource (http verbs: put/patch)
5. `destroy`: removes a resource (http verb: delete)

Because of the conventions established with the actions, **the ViewSet has also the ability to be mapped into a router**, which is really helpful.


## ViewSets are based on `APIView`

## ViewSets vs GenericAPIView

