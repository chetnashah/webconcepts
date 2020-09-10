
Name of cli is `kubectl`

1 node is 1 pc/vm

A pod can have one or more containers

A kubernetes "service" is a named abstraction for communication channel for a given program/service vis an easy to remember address/url.

A deployment: monitors set of pods, makes sure they are running and restarts if they crash

### config file

YAML based

### running kubectl commands with minikube

All `kubectl` arguments are put after `--` like below.

```sh
minikube kubectl -- get pods -A
```

### get minikube ip

```sh
minikube ip
```

#### Get pods (same as above)

#### Get services

```sh
minikube kubectl -- get services
```

### apply config file

```sh
minikube kubectl -- apply - f /path/to/file.yaml
```

### rollout and restart a deployment

```sh
minikube kubectl -- rollout restart deployment depl-name
```

### Get a reachable address for a node-port service
```sh
minikube service posts-srv --url
```

### Get logs of a specific pod

```sh
minikube kubectl -- logs pod-name
```

### Using dashboard

Use `minikube dashboard` which is very helpful in debugging stuff.

