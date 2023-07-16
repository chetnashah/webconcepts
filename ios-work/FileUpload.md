
## Understanding boundary in multi-part form request

First, there’s the `Content-Type` header. It contains information about the type of data you’re sending (`multipart/form-data;`) and a `boundary`. 

This boundary should always have a unique, somewhat random value. In the example above I used a UUID. 

Since multipart forms are not always sent to the server all at once but rather in chunks, the server needs some way to know when a certain part of the form you’re sending it ends or begins. This is what the boundary value is used for. This must be communicated in the headers since that’s the first thing the receiving server will be able to read.

We send two dashes (--) followed by the predefined boundary string (Boundary-3A42CBDB-01A2-4DDE-A9EE-425A344ABA13) to inform the server that it’s about to read a new chunk of content. 

## Part structure

```
BOUNDARY
CONTENT TYPE
-- BLANK LINE --
VALUE
```

## File upload involves multi-part form data request

https://www.donnywals.com/uploading-images-and-forms-to-a-server-using-urlsession/

```
Content-Type: multipart/form-data; boundary=3A42CBDB-01A2-4DDE-A9EE-425A344ABA13

--Boundary-3A42CBDB-01A2-4DDE-A9EE-425A344ABA13
Content-Disposition: form-data; name="family_name"

Wals
--Boundary-3A42CBDB-01A2-4DDE-A9EE-425A344ABA13
Content-Disposition: form-data; name="name"

Donny
--Boundary-3A42CBDB-01A2-4DDE-A9EE-425A344ABA13
Content-Disposition: form-data; name="file"; filename="somefilename.jpg"
Content-Type: image/png

-a long string of image data-
--Boundary-3A42CBDB-01A2-4DDE-A9EE-425A344ABA13—
```

