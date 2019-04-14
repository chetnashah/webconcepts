
Docker images are compiled version of a filesystem.

Docker containers are live/process version of a docker image.


Use docker inspect to get more info on a container
```sh
docker inspect container-id
```

Use `docker logs` to get logs for given container
```sh
docker logs container-id
```

### Exposing port

If a service needs to be accessible by a process not running in a container, then port needs to be exposed via the Host.

Once exposed, it is possible to access process as if it were running on the host OS itself.

Running containers with ports exposed via `-p`
: `docker run -d --name redisExposed -p <host-port>:<container-port> redis`

i.e.
```sh
docker run -d --name redisExposed -p 6379:6379 redis:latest
```

After exposing ports, `docker ps` will show the exposing using `->` e.g.

![alt text](img/redisportsexposed.PNG "Logo Title Text 1")


**NOTE**
By default, the port on the host is mapped to 0.0.0.0, which means all IP addresses. You can specify a particular IP address when you define the port mapping, for example, -p 127.0.0.1:6379:6379

### Running command in a docker container using `docker exec`

```
docker exec -it CONTAINER COMMAND
```


### Managing docker networks

The type of network a container uses, whether it is a bridge, an overlay, a macvlan network, or a custom network plugin, is transparent from within the container. From the container’s point of view, it has a network interface with an IP address, a gateway, a routing table, DNS services, and other networking details.


`docker -p` : `-p` stands for `--publish`, which publishes a rule to map docker host port to docker container port.
`docker -p 8080:80`

By default, the container is assigned an IP address for every Docker network it connects to. The IP address is assigned from the pool assigned to the network, so the Docker daemon effectively acts as a DHCP server for each container. Each network also has a default subnet mask and gateway.


Create network
```
docker network create abc-net
```

List networks

```
docker network ls
```