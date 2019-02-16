Kong's Restful Admin interface helps
you manage
1. services
2. routes
3. consumers
4. more

Data sent through admin API is stored in db.(postgres/cassandra)

### Ports

`:8000` listens for standard HTTP traffic.
`:8001` to make Admin API requests/configuration.

### Services

`Service`: An API/microservice that kong manages.

Endpoint for creating service `/services/`:

Here we specify a url, so we are proxying requests to mockbin:
```
curl -i -X POST --url http://localhost:8001/services/ -d 'name=example-service' -d 'url=http://mockbin.org'
```

### Routes

`Route`: Specify how and if requests are sent to their services after they reach kong.
A single service can have many routes.

Listing all routes:
`GET /routes`

Listing routes associated to specific service:
`GET /services/my-service/routes`


Create route by doing a `POST` on `/services/example-service/routes/`

Below says: create a route for `example-service`, and forward to it, if host header matches `example.com`.
```sh
curl -i -X POST --url http://localhost:8001/services/example-service/routes -d 'hosts[]=example.com'
```


Check everything works with
```sh
curl -i -X GET \
  --url http://localhost:8000/ \
  --header 'Host: example.com'
```

### Plugins

Extend Kong through plugins

Add plugins to a service by doing a `POST` on `/services/example-service/plugins/` with appropriate data.

Below is request needed to configure `key-auth` plugin:
```sh
curl -i -X POST \
  --url http://localhost:8001/services/example-service/plugins/ \
  --data 'name=key-auth'
```