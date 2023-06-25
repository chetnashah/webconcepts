### File I/O



### Http networking

Library is `net/http`.

Routing setup is done via :
```go
http.HandleFunc("/path/to/be/matched/", handlerFunction)
```

Server is started with `http.ListenAndServe(":8080", nil)`

#### Http handler signature

```go
func handlerFunction(w http.ResponseWriter, r *http.Request){
    // read something from request r
    // write something to response w
}
```

#### Error handling with `http.Error`

`http.Error` takes three arguments: Response `w`, Error description `string`, status
code via `http.StatusInternalServerError`
```go
func saveHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/save/"):]
    body := r.FormValue("body")
    p := &Page{Title: title, Body: []byte(body)}
    err := p.save()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    http.Redirect(w, r, "/view/"+title, http.StatusFound)
}
```