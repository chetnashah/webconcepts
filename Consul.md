
* **Consul Agent** - Every node that provides services to Consul runs a Consul agent. Running an agent is not required for discovering other services or getting/setting key/value data. The agent is responsible for health checking the services on the node as well as the node itself.

Consul agent can be run either in server or in client mode.
Agent: Any Consul process is an agent. It can run in one of two modes - server and client.

### Making dir for configuration

config files: `mkdir -p /etc/consul.d/server/`
location where consul can put data: `mkdir -p /var/consul`

### Consul client

1. registers services
2. runs health checks
3. forwards queries to consul servers.

### Consul Server

The Consul servers are where data is stored and replicated. The servers themselves elect a leader. While Consul can function with one server, 3 to 5 is recommended to avoid failure scenarios leading to data loss. A cluster of Consul servers is recommended for each datacenter.

### Listing members of the cluster

`consul members`

### Starting consul agent with a specified config dir

`consul agent -config-dir=/etc/consul.d/server`



### Ports

`8400`: consul info
`8500`: DNS Server
`8600`: HTTP Server

### Service registration

Can be done via servie definition or via HTTP API.

#### Defining service

```
echo '{"service": {"name": "web", "tags": ["rails"], "port": 80}}' \
    > /etc/consul.d/server/web.json
```
#### Querying service

```
curl http://localhost:8500/v1/catalog/service/web

[{"Node":"Armons-MacBook-Air","Address":"172.20.20.11","ServiceID":"web", \
    "ServiceName":"web","ServiceTags":["rails"],"ServicePort":80}]
```

### Service discovery

Components of your infrastructure that need to discover other services or nodes can query any of the Consul servers or any of the Consul agents. The agents forward queries to the servers automatically.

