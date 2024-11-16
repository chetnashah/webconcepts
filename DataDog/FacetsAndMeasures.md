
## Facets and measured are created from tags and attributes in indexed logs

Facets are values that are qualitative and categorical i.e. enum like for e.g.
`@http.method:POST` and `@http.status:200` or `@orderid:1234`.

## Measures have values that are quantitative and continuous i.e. float like for e.g.
`@http.latency:0.5` and `@http.bytes:1024`.

You must convert tags and attributes to facets and measures in log explorer to use them to query logs in
1. Log analytics
2. Dashboards
3. Log monitors
