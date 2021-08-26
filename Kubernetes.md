
Name of cli is `kubectl`

1 node is 1 pc/vm

A pod can have one or more containers

A kubernetes "service" is a named abstraction for communication channel for a given program/service vis an easy to remember address/url.

A deployment: monitors set of pods, makes sure they are running and restarts if they crash

### Kubernetes objects

Almost every Kubernetes object includes two nested object fields that govern the object's configuration: the object `spec` and the object `status`. For objects that have a spec, you have to set this when you create the object, providing a description of the characteristics you want the resource to have: its desired state.

1. `apiVersion` - Which version of the Kubernetes API you're using to create this object
2. `kind` - What kind of object you want to create
3. `metadata` - Data that helps uniquely identify the object, including a name string, UID, and optional namespace
4. `spec` - What state you desire for the object

### Kubernetes Job

A `Job` creates one or more Pods and ensures that a specified number of them successfully terminate. As pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the task (ie, Job) is complete. Deleting a Job will clean up the Pods it created.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
```

### Kubernetes Deployment

As with all other Kubernetes configs, a Deployment needs `.apiVersion`, `.kind`, and `.metadata` fields.
A Deployment also needs a `.spec` section.
The `.spec.template` and `.spec.selector` are the only required field of the `.spec`.
The `.spec.template` is a Pod template. It has exactly the same schema as a Pod , except it is nested and does not have an apiVersion or kind.

`.spec.selector` is a required field that specifies a label selector for the Pods targeted by this Deployment.

`.spec.selector` must match `.spec.template.metadata.labels`, or it will be rejected by the API.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: comments-depl
spec:
  replicas: 1
  selector: # selecting pod from template using matching labels
    matchLabels:
      app: comments
  template: # pod template below
    metadata:
      labels:
        app: comments
    spec:
      containers:
        - name: comments
          image: stephengrider/comments
```

### Pod templates

PodTemplates are specifications for creating `Pods`, and are included in workload resources such as `Deployments`, `Jobs`, and `DaemonSets`.
e.g.
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: hello
spec:
  template:
    # This is the pod template
    spec:
      containers:
      - name: hello
        image: busybox
        command: ['sh', '-c', 'echo "Hello, Kubernetes!" && sleep 3600']
      restartPolicy: OnFailure
    # The pod template ends here
```
For a deployment
```yaml

```

### labels and selectors

Labels are the mechanism you use to organize Kubernetes objects. A label is a key-value pair with certain restrictions concerning length and allowed values but without any pre-defined meaning. So you’re free to choose labels as you see fit, for example, to express environments such as ‘this pod is running in production’ or ownership, like ‘department X owns that pod’.
Labels can be attached to objects at creation time and subsequently added and modified at any time.
Labels enable users to map their own organizational structures onto system objects in a loosely coupled fashion, without requiring clients to store these mappings.
```sh

# add label to the pod named labelex
$ kubectl label pods labelex owner=michael

$ kubectl get pods --show-labels
NAME        READY     STATUS    RESTARTS   AGE    LABELS
labelex     1/1       Running   0          16m    env=development,owner=michael

# selectors for filtering objects
$ kubectl get pods --selector owner=michael
NAME      READY     STATUS    RESTARTS   AGE
labelex   1/1       Running   0          27m
```

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

### Load balancer service

This service reaches out to cloud provider e.g. `AWS/GCP/Azure` and provisions a 
load balancer in the cloud-provider to route traffic to ingress controller pod within
the cluster

#### INgress controller

Traffic routing pod in the kubernetes cluster. routes incoming public traffic
to different clusterIP services

#### Ingress-nginx

Creates a loadbalancer service and