

## net/http 

For the dynamic aspect, the `http.Request` contains all information about the request and it’s parameters. 
You can read GET parameters with `r.URL.Query().Get("token")` or POST parameters (fields from an HTML form) with `r.FormValue("email")`.

## Static file serving

Use `http.FileServer`.



