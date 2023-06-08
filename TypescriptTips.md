https://www.totaltypescript.com/tips

## Create union type (of single key-value) from object keys-values


### Core idea (Getting value type union set from a given object type)

**key union set used as index on object type, distributes to value type union set on an object!**

So indexing with a key-union-set distributes, returning value-type-union-set.

```ts
type TT = {'a': number, 'c': string }
// getting 'a' | 'c' is easy using keyof TT
type TA = TT['a' | 'c'] // TA = string | number
// or in other words, key union set used as index, distributes to value type union set on an object!
type TA = TT[keyof TT] // TA = string | number
```

i.e. you can get `key union set` using `keyof TT`,

similarly you can get `value type union set` using `TT[keyof TT]`

### Example

Given type:
```ts
export const fruitCount = {
  apple: 1,
  pear: 4,
  banana: 26,
}
```
we want:
```ts
type SingleFruitCount =
  | {
      apple: number
    }
  | {
      banana: number
    }
  | {
      pear: number
    }

const singleFruitCount: SingleFruitCount = {
  banana: 12,
}
```

We will first go from 
```ts
{apple: number, pear: number, banana: number}
```
to 
```ts
{
    apple: {
        apple: number
    },
    pear: {
        pear: number
    },
    banana: {
        banana: number
    }
}
```
and now we can use the `value type union set trick` to get
```ts
{
    {
        apple: number
    }
 |
    {
        pear: number
    }
  |
    {
        banana: number
    }
}
```
Full solution:
```ts
type KeyValuesToUnionOfKeyValues<T> = {
    [K in keyof T]: {
        [K2 in K]: T[K]
    }
}[keyof T]
```


## Add extra key in each object of a union of object types

e.g.
Given:
```ts
export type Entity =
  | {
      type: "user"
    }
  | {
      type: "post"
    }
  | {
      type: "comment"
    }
```
add `id` in each object type.
i.e. achieve following:
```ts
export type WithId<Entity> =
  | {
      type: "user",
      id: number
    }
  | {
      type: "post",
      id: number
    }
  | {
      type: "comment",
      id: number
    }

```

Can be done using following:
```ts
type WithId<T> = T extends { type: unknown } ? { type: T['type'], id: number} : never 
```


## Idea: indexing an (union of object types which share same key) with the shared key, distributes over union  and returns union of value side types

```ts
// union of objects but they all share a key
type A = { a: number} | { a: string } | { a: boolean }

// indexing into common key distributes over the union
type Aidx = A['a']

// Aidx = number | string | boolean
```

## Nominal types in typescript

https://michalzalecki.com/nominal-typing-in-typescript/

A feature requested from TS: https://github.com/Microsoft/TypeScript/issues/202

By default typescript is structurally typed, 
so two types with similar structure are treated same and can be used interchangably (**And they ignore the type name**), 
even though we explicitly specify the type we need.

Here is an example with simple types:
```ts
type OrderId = number;

type CustomerId = number;

function getOrderId(oid: OrderId) {
    return oid;
}

function getCustomerId(cid: CustomerId) {
    return cid;
}

let o: OrderId = 11;

getCustomerId(o); // no error
```

Here is an example with object types/interfaces:
```ts

interface Eur {
    cnt: number;
    sym: string;
}

interface Dollar {
    cnt: number;
    sym: string;
}

let e: Eur = {
    cnt: 2,
    sym: "E"
}

let d: Dollar = {
    cnt: 1,
    sym: "D"
}

function addCurrency<C extends Eur>(c1: C, c2:C) {
    return {
        cnt: c1.cnt + c2.cnt,
        sym: c1.sym
    }
}

console.log(addCurrency(e, d)); // no error, but should have!!
```

### Supporting Nominal keys using symbol

```ts
const nominalSymbol: unique symbol = Symbol(); // This is a small overhead in the JS output

type Nominal<T extends string, U> = U & { [nominalSymbol]: T };
```

Examples with use of `Nominal` type:
```ts
// example with objects
type User =  Nominal<'User', { name: string }>;
type Product = Nominal<'Product', { name: string }>;

const user = { name: 'username' } as User;
const product = { name: 'product' } as Product;

function forceTsTypeError(u: User):void {}

forceTsTypeError(user);
forceTsTypeError(product);
// --------------^^^^^^^ Type '"Product"' is not assignable to type '"User"'.

// example with primitives

type ID = Nominal<'ID', string>;
type Name = Nominal<'Name', string>;

const id = 'id string' as ID;
const name = 'jondoe' as Name;


function forceTsTypeError2(id: ID):void {}

forceTsTypeError2(id);
forceTsTypeError2(name);
// ---------------^^^^ Type '"Name"' is not assignable to type '"ID"'.

```

