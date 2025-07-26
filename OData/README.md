
## Structured types

## Complex types

1. key-less (i.e. no key or id)
2. can contain properties of primitive types, other complex types, or collections of primitive or complex types.
3. Commonly used to define the structure of data that is not an entity, such as a configuration object or a response payload or function arguments.

## Entity types ($TYPE)

Type definition of entity i.e. attributes names and attribute types. e.g. `class Customer { name: string; age: number; }` or `class Person { "@id": string; name: string; age?: number; }`. **Entity types are named structured types with a key**. 

Entity types may derive by single inheritance from other entity types. e.g. `class Employee extends Person { salary: number; }`.

### Key of Entity type

The key of an entity type is formed from a subset of the primitive properties (e.g. CustomerId, OrderId, LineId, etc.) of the entity type.

## Entity

Entity is an instance of entity type.
e.g. `const customer: Customer = { name: 'John', age: 30 };` or `const person: Person = { "@id": "123", name: "Alice", age: 25 };`.

## Entity set (i.e. Table/collection)

Entity sets are named collections of entities (e.g. Customers is an entity set containing Customer entities). An entity's key uniquely identifies the entity within an entity set.

## Operations

Operations allow the execution of custom logic on parts of a data model.   

### Function operations (no side effects)

Functions are operations that do not have side effects and may support further composition, for example, with additional filter operations, functions or an action.

### Action operations (with side effects)

Actions are operations that allow side effects, such as data modification, and cannot be further composed in order to avoid non-deterministic behavior. Actions and functions are either bound to a type, enabling them to be called as members of an instance of that type, or unbound, in which case they are called as static operations.

## Parameter aliases

Parameter aliases can be used in place of literal values in entity keys, function parameters, or within a $filter or $orderby expression. Parameters aliases are names beginning with an at sign (`@`).

Actual parameter values are specified as query options in the query part of the request URL. The query option name is the name of the parameter alias, and the query option value is the value to be used for the specified parameter alias.

Example 45: returns all employees whose Region property matches the string parameter value "WA"
```
http://host/service.svc/Employees?$filter=Region eq @p1&@p1='WA'
```
Parameter aliases allow the same value to be used multiple times in a request and may be used to reference primitive values, complex, or collection values.

If a parameter alias is not given a value in the Query part of the request URL, the value MUST be assumed to be null. A parameter alias can be used in multiple places within a request URL but its value MUST NOT be specified more than once.

