
### Bootstrapping app

Usually done in `main.ts`.
Use `NestFactory` to create your application instance.

```ts
// main.ts
var app = await NestFactory.create(rootModuleRef);
await app.listen(3000);
```

### Modules

Module is specified as a part of nest factory.
Create a module by annotating a class with `@Module`.
The module annotation can have
1. `imports` (modules): the list of imported modules that export the providers which are required in this module

2. `exports` (providers): the subset of `providers` that are provided by this module and should be available in the other modules

2. `controllers`: the set of controllers which have to be created

3. `Providers`: the providers that will be instantiated by the Nest injector and may be shared at least across this module.

### Providers

A Provider is a simple class annotated with `@Injectable`.

### Controllers

Controllers job is to take a request and return a response.
Created via `@Controller`

`Controller`, `Req`, `Get` etc. are available from `@nestjs/common`.

**Routing by controller prefix**
One can specify `prefix` in controller decorator, thus providing routing ifnormation.
```ts
@Controller('hello')
class HelloController {
    // nest will map all GET /hello to getHello()
    @Get()
    getHello(@Req() req){
        return 'Hola';
    }
}
```

Response being sent:
When we return a JavaScript object or array, it'll be automatically serialized to JSON. When we return a string however, Nest will send just a string without attempting to serialize it. 

The default status code returned is `200`.

Access `req` object by specifying as a arg parameter with `@Req` annotation in `@Get` annotated method. (see getHello method above)

**Routing by method prefix**
Even HTTP method annotations like `@Get` can specify their own routing matching.
e.g. `@Get('dude')` being used above would only be matched if `http:localhost:3000/hello/dude` is the route.

Accessing useful objects in Controller handlers e.g. `@Query()` is used to get query params e.g.
```ts
  @Get('dude')
  getHello(@Query() query): string {
    console.log('got query param: ', query);
    return 'I am done here';
  }
```

1. `@Request()`: `req` in express.
2. `@Response()`: `res` in express.
3. `@Next()`: `next` in express.
4. `@Session`: `req.session` in express.
5. `@Param(param?: string)`: `req.params/req.params[param]`.
6. `@Body(param?: string)`: `req.body / req.body[param]`.
7. `@Query(param?: string)`: `req.query / req.query[param]`.
8. `@Headers(param?: string)`: `req.headers / req.headers[param]`.

Add `@HttpCode` for custom status codes for return
e.g.
```ts
@Post()
@HttpCode(204) // response status code
@Header('Cache-Control', 'none') // response header
create(){
    return 'created something`;
}
```

### Route path params 

Mixes use of method with params
e.g. `@Get(':id')` with `dosomething(@Params() params)` and access it as `params.id`.
```ts
  @Get(':id')
  returnId(@Param('id') id) {
    console.log(id);
    return `params.id is ${id}`;
  }
```

### Async and RX

As we know async functions return promises,
Then Nest will wait on promises and return that result.

In case of Observable returned from a controller method, Nest will automatically subscribe to it and return the first value observed in subscription.

### Throwing errors for http requests

Throw expected errors using `HttpException`.
```js
    throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
```

You can create custom exceptions that extend 
`HTTPException`.
```js
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```