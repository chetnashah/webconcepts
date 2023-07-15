
Go to library for http crud stuff

`gorilla/mux` is a powerful URL router and dispatcher.

## Core data structs

### Router

We create this using `router := mux.newRouter()`

Implements `Handler` interface, so it can be passed to `http.ListenAndServe(":8000", router)`

**Holds registry of routes and handlers**

### Route (to register routes with handlers and methods)

We specify the route regex and corresponding handler via `router.handleFunc` 
e.g. 
```go
router := mux.NewRouter()
router.HandleFunc("/movies", getMovies).Methods("GET")
```




