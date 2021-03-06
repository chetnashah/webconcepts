
### Checklist

Security considerations:

1. max size should be restricted.
2. file type/content type should be restricted.

Performance considerations:

1. remove file from disk to another persistent location like s3
2. communicate file urls in messages of HTTP, not entire files.
3. File uploads can break on a server with high load. So dedicated servers for upload or directly to S3.



### client side

Assuming `http://localhost:8001/postinfo` is path on the server,
that will handle the upload.

#### Using Html form
```html
    <form
    method="POST"
    ENCTYPE="multipart/form-data"
    action="http://localhost:8001/postinfo">
        Select a file
        <input name="avatar" type="file" />
        <button type="submit">Submit</button>
    </form>
```

#### using Curl

```sh
curl -F "avatar=@C:\Users\chet\Pictures\439373.jpg" http://localhost:8001/postinfo
```

### Server side upload handling

1. Declare a route that will handle the file upload.
2. It is typically a `POST` request, also with the input name.


#### with node.js `multer`

```js
var upload = multer({ dest: 'uploads/' })
var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});
```