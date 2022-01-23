

### Dependency Injection

DOnt use `new` keyword, instead take all dependencies in constructor args. kind of similar to factory pattern

### Heavy use of interfaces

Interfaces as types.
even if single implementation, make interface (set of methods) as types and class implement types.

### DI container

DI containers will do all the instantiation of dependencies on your behalf.

The common API for a DI container is `resolve` and `register`.
Register - register interfaces and corresponding concrete classes you want to get instantiated

Typical practice is to make container at application scoped and a singleton, that is made at startup.

DI containers use reflectin typically to inspect dependencies of given clasees/interfaces.


### Autowiring

Autowiring means usually no config or registry/registration is needed.
It is usually done via reflection, i.e. the registry is built via reflection/inspection of the classes.

### Circular dependencies and DI
