


A proxy is a server, used by the client, to indirectly access other servers. To the server serving the contents, it will view the proxy server as the client, and be oblivious to the original client.

A reverse proxy is the other way around. The application server (our Express application) responds to the client through our nginx web server, but the client has no idea this was done. In the client's view, the response came directly from the web server. Hence the name - reverse proxy.

## Docker

### Dockerfile

A plain text source that contains the instructions to build something.
Usually starts with FROM etc.

### Docker Image

A compiled version of Dockerfile(still just a file only), 
usually has an id and a name also.

A docker image is a filesystem snapshot after build with start/run instrunctions.

Docker image is made using:
``` sh
docker build dirWithDockerFile
// outputs id of image
```

One can list all the images using `docker images`.

### Docker Container

A running instance of a Docker Image is a Docker Container. Usually the abstraction is a process.

``` sh
docker run dockerImageIdOrName
```

find running containers with
``` sh
docker ps
```