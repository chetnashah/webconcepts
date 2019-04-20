
Without the `cache-control` header set, no other caching headers will yeild
any results.

The `cache-control` header is most important header as it effectively
`switches on caching in the browser`.
Without `cache-control`, browser will re-request file on each subsequent request.

### What to use for `index.html`

The `index.html` should be marked with `no-cache`, which means that the browser always revalidates the document on each request and fetches the latest version if the contents change. Also, within the HTML markup, you embed fingerprints in the URLs for CSS and JavaScript assets: if the contents of those files change, then the HTML of the page changes as well and a new copy of the HTML response is downloaded.

Even if your index has proper cache-control header i.e. `no-cache`, it will not reflect in the browser, unless you invalidate your CDN.



### Etag Header

This value is usually md5 checksum of the file. On S3, for a file uploaded in one shot, etag value is same as md5sum, where as etag of a multipart uploaded file is differently calculated.

### Browser hard refresh

Usually done with `Ctrl` + `F5`. 
Hard refresh clears the cache and browser sends a `no-cache` directive in Request side `Cache-control` header.

### `Cache-Control` vs `Expires`

`Cache-Control` was introduced in HTTP/1.1 and offers more options than `Expires`. They can be used to accomplish the same thing but the data value for `Expires` is an `HTTP date` whereas `Cache-Control max-age` lets you specify a relative amount of time so you could specify "X hours after the page was requested".

**Note**:When both `Cache-Control` and `Expires` are present, `Cache-Control` takes precedence.

If you are using a CDN (Cloud Delivery Network) I recommend to use Cache-Control with a max-age time in seconds. For example Cache-Control: max-age=604800. This prevents request-peaks to your origin-server: With "Expires Wed, 30 Oct 20xx 04:37:07 GMT" all browsers will request you at the same time.


### CAching with cloudfront

**Cloudfront edge cache is a seperate cache from that of the browser cache.**

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html

If something was served from cloudfront cache you would see `hit from cloudfront` in `X-cache` header. or else we would see `miss from cloudfront`.

Typically the time for which a resource is cached in CF is specified by `Default TTL` in cloudfront settings.

