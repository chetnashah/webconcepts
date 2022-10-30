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