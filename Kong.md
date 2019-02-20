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

Route entities define rules to match client requests. Each Route is associated with a Service, and a Service may have multiple Routes associated to it. Every request matching a given Route will be proxied to its associated Service.

`hosts`: A list of domain names that match this Route. 
`paths`: A list of paths that match this Route

Route object may contain service Id that it is a part of.

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


### Kong cluster

A Kong cluster allows you to scale the system horizontally by adding more machines to handle more incoming requests. They will all share the same configuration since they point to the same database. Kong nodes pointing to the same datastore will be part of the same Kong cluster.

Having a Kong cluster does not mean that your clients traffic will be load-balanced across your Kong nodes out of the box. **You still need a load-balancer in front of your Kong nodes to distribute your traffic. Instead, a Kong cluster means that those nodes will share the same configuration.**

