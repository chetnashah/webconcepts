

use `r.ParseMultipartForm` and `r.FormFile` to get the file from the request.

`FormFile` is a method on `request` which returns a file descriptor struct, file metadata struct(Handler) and error - https://pkg.go.dev/net/http#Request.FormFile

On the `html` side:
```html
    <form method="post" action="/form" enctype="multipart/form-data">
        <label>Name</label>
        <input type="text" name="name" placeholder="Enter your name">
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email"> 
        <label>file</label>
        <input type="file" name="myfile">
        <input type="submit" value="submit">
    </form>
```

On the server side:
```go
func formHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	fmt.Fprintf(w, "Found form contents = %v\n", r.Form)

	fileInForm, handler, err2 := r.FormFile("myfile")
	if err2 != nil {
		fmt.Fprintf(w, "FormFile() err: %v", err2)
		return
	}
	fmt.Fprintf(w, "Handler.Filename = %v\n", handler.Filename)
	fmt.Fprintf(w, "Handler.Header = %v\n", handler.Header)
	fmt.Fprintf(w, "Handler.Size = %v\n", handler.Size)
	defer fileInForm.Close()
}
```

Saving to a file:
```go
func formHandler(w http.ResponseWriter, r *http.Request) {
    // code above...
    // save it to dis by using os.Create + io.copy
	fileToSave, err3 := os.Create("somefilehere")
	if err3 != nil {
		fmt.Fprintf(w, "Create() err: %v", err3)
		return
	}

	_, err4 := io.Copy(fileToSave, fileInForm)
	if err4 != nil {
		fmt.Fprintf(w, "Copy() err: %v", err4)
		return
	}
	defer fileToSave.Close()
	defer fileInForm.Close()
}
```