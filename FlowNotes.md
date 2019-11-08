
Javascript has 5 primitive types:

| JS type      | Flow type |
|--------------|-----------|
| null         |  null     |
| undefined    |  void     |
| number       |  number   |
| string       |  string   |
| boolean      |  boolean  |


### typeof works in type expressions as well as in value expressions

When used in JS, i.e. in value expressions, `typeof` behaves as
typical js `typeof` behaves i.e. returning one of the 6 primitive types
```js
let k = typeof 2;
k == "number"
let j = typeof { a: 1};
j == "object"
let u = typeof (() => {})
u == "function"
```

But when used in type expressions, it supplies the inferred type of the value under consideration.

```js
let obj1 = { foo: 1, bar: true, baz: 'three'};
let obj2: typeof obj1 = { foo: 22, bar: false, baz: 'one'};
```

When using `typeof` with a class you need to remember that classes are nominally
typed so two classes with same shape are not considered same.
```js
class MyClass {
    method(){}
}
class YourClass{
    method(){}
}

// below line of code throws error
// let test1: typeof MyClass = YourClass;
```

### Function subtyping in Flow

If `P <: Q` and `T <: U`, then `Q -> T <: P -> U`.
It is allowed to have more general inputs and more specific outputs for a function to be a subtype of existing function. 

### Classes cannot have optional properties

e.g.
```js
class AB {
    y ?: string; // unexpected error
}
```

Object types allow optional properties
e.g.
```js
type k = {
    y ?: string;
}
```

### Maybe types
Mabye types: They can be a given type or null or void indicated by ```?type``` e.g. ```?string```

```
let k : ?number = 3;
k = null; //type checks
k = undefined; //type checks

i.e. ?number = number | null | void
```

### Optional function parameters

Although syntax feels similar to above, it has vastly different meaning, the parameter is optional
```
function acceptsOptionalString(name?: string){

}

acceptsOptionalString(undefined); //typechecks
acceptsOptionalString(); //typechecks
acceptsOptionalString("haha"); //typechecks
acceptsOptionalString(null); //type error!!
```


### Mixed types
mixed allows you to take a value with any type
but one must type check it before using it

### Any types
If we want to opt out of using type checker, we
should use any.
* Do not confuse any with mixed.



### Nominal and structural typing!