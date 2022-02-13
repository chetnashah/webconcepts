
Typically considered as `Function as a service`.
Vendor handles underlying resource provisioning and allocation.

Usually `event based` function invocation.

### State restrictions

Local (Machine/instance-bound) state i.e. data that you store in variables in memory or local disk,
There is no guarantee that such state is persisted across multiple invocations.
Hence FaaS functions are often considered stateless.
In essence,
Any state of Faas function that needs to be persistent, has to be externalized outside of FaaS instance (e.g. in DB/redis/S3)
FaaS functions should typically pure transformations of input to output.


### Execution duration

Typically limited to how long each invocation can run.
About `5 mins`.

### Cold starts

`warm start` - Reusing instance of a lambda function and its host container from previous event.
`cold start` - Creating new container instance, starting the function host process.

`Cold start latency` depends upon:
1. language runtime
2. no. of libraries
3. amount of user code
4. config of lambda function environment

More on cold starts: https://blog.symphonia.io/posts/2017-11-14_learning-lambda-part-8

### FaaS and API Gateways

When an API gateway receives a request, it finds the routing configuration matching the request, and, in the case of a FaaS-backed route, will call the relevant FaaS function with a representation of the original request. 

Typically the API gateway will allow mapping from HTTP request parameters to a more concise input for the FaaS function, or will allow the entire HTTP request to be passed through, typically as a JSON object. 

The FaaS function will execute its logic and return a result to the API gateway, which in turn will transform this result into an HTTP response that it passes back to the original caller.

API gateways may also perform authentication, input validation, response code mapping, and more

