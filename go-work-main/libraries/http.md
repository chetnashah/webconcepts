

## net/http 

For the dynamic aspect, the `http.Request` contains all information about the request and it’s parameters. 
You can read GET parameters with `r.URL.Query().Get("token")` or POST parameters (fields from an HTML form) with `r.FormValue("email")`.

## Static file serving

Use `http.FileServer`.

## How to return JSON data in http responses?

```go
func getMovies(w http.ResponseWriter, r *http.Request) {
	// how to return json response?
	moviesJsonData, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(moviesJsonData)
}
```

