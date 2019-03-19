
Without the `cache-control` header set, no other caching headers will yeild
any results.

The `cache-control` header is most important header as it effectively
`switches on caching in the browser`.
Without `cache-control`, browser will re-request file on each subsequent request.


### CAching with cloudfront

**Cloudfront edge cache is a seperate cache from that of the browser cache.**

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html

If something was served from cloudfront cache you would see `hit from cloudfront` in `X-cache` header. or else we would see `miss from cloudfront`.

Typically the time for which a resource is cached in CF is specified by `Default TTL` in cloudfront settings.

