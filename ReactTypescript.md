
https://github.com/typescript-cheatsheets/react

###

* `JSX.element` - return value of `React.createElement`, i.e of object like shape.
* `React.ReactNode` - all possible return value of a component, can be `null`, `false` etc along with `JSX.element` type.

Usually the inferred return type from your components will be-> You can check them
on hovering, will be `JSX.element | null`.


### Working with children prop, what is the type of children prop?

Use `ReactNode` type for children prop
e.g.
```tsx
function HeadingWithContent({ children }: {
    children: ReactNode
}) {
    return <h1>{children}</hi>
}
```

Another common pattern in React is to have children as a function, in which case 
`children: (valuetypes) => ReactNode` would be the correct type for children prop


### REact component with few props optional

use `name ?: type`

```tsx
// style prop is optional
function Heading({ title, style }: { title: string; style?: any }) {
  return <h1 style={{ ...style }}>{title}</h1>;
}

// usage site
export default function App() {
  return (
    <div className="App">
      <Heading title="adfaf" style={{ color: "red" }}></Heading>
      <Heading title="hey"></Heading>
    </div>
  );
}
```

### Difference between ReactNode and ReactElement

A `ReactElement` is an object with `type` and `props`.
```ts
 type Key = string | number

 interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}
```

A `ReactNode` is a `ReactElement`, or a `ReactFragment`, or a `string`, or a `null`, or `undefined`, or `boolean`, or an array of `ReactNodes`, in essence more general than a `ReactElement`.

```ts
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

### nullable state or context type

Specify explicity type in function/hook call as explicit type parameters.

```tsx
const Context = React.createContext<null | { name: string }>(null);
const Context2 = React.createContext<null | { name: string }>({ name: "hey" });
```

```tsx
const [count, setCount] = useState<null | number>(null);
```


### Using subobject type of a given object type
https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
I have something like:
```ts
interface Person {
  name: string,
  address: { // need to access the type of this suboject in a type expression
    street: string,
    pincode: string
  }
}
```
and how do I use `Person.address` in a type expression?
e.g. 
```tsx
const [address, setAddress] = useState<null | Person.address>(null);
```
Answer:
```tsx
const [address, setAddress] = useState<null | Person["address"]>(null);
```


## `Ref<T>` is a higher order type which accepts a type parameter which represents type for its `.current` property

```ts
interface RefObject<T> {
    readonly current: T | null;
}
// Bivariance hack for consistent unsoundness with RefObject
type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
type Ref<T> = RefCallback<T> | RefObject<T> | null;

// create ref object with types
function createRef<T>(): RefObject<T>;
```


## Functional components

`FC` is exactly same as `FunctionComponent`

```tsx
type FC<P = {}> = FunctionComponent<P>;

// note how a function object TS signatrue is written
interface FunctionComponent<P = {}>{
  (props: PropsWithChildre<P>, context ?: any): ReactElement<any, any> | null;
  propTypes ?: WeakValidationMap<P>;
  contextTypes ?: ValidationMap<P>;
  defaultProps ?: Partial<P>;
  displayName ?: string;
}
```

## Class components

```tsx
interface ComponentClass<P={}, S=ComponentState> extends StaticLifecycle<P,S> {
  new (props:P, context?: any): Component<P,S>;
  propTypes ?: WeakValidationMap<P>;
  contextType ?: Context<any>;
  childContextTypes ?: ValidationMap<any>;
  defaultProps ?: Partial<P>;
  displayName ?: string;
}
```

The full class type `Component`:

```tsx
class Component<P,S> {
  static contextType: Context<any>;
  constructor(props: P);
  setState<K extends keyof S>(...): void;
  render(): ReactNode;
  state: readonly S;
  props: ReadOnly<P> & ReadOnly<{ children ?: ReactNode }>;
  // string refs
  refs: {
    [key: string]: ReactInstance
  }
}
```

## `ComponentType` is common abstraction over class components as well as functional components

```tsx
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>; 
```

example:
```tsx
import * as React from 'react';

// functional component
function Box(){
    return <div>Box</div>
}

// class component
class BoxC extends React.Component { 
    render() {
        return <div>CBox</div>;
    }
}

let B: React.ComponentType<any> = Box;
B = BoxC;
```

## Having components with one prop dependent on other 

https://www.youtube.com/watch?v=vXh4PFwZFGI
https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#props-pass-one-only-if-the-other-is-passed

https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#props-must-pass-both

https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#props-one-or-the-other-but-not-both

Use cases can be:
1. only one of two props is allowed on a component
2. a second prop is allowed only if first prop is included, e.g. `<Panel collapsable collapsed>` - here `collapsed` should not be added without `collapsable`.

## React Element types

### JSX.Element

```tsx
// functional component
function Box(){
    return <div>Box</div>
}

let t: JSX.Element = Box();
```

`JSX.Element` is `ReactElement`, whose props and type have type `any`, so they are more or less the same

### ReactElement

An object with following properties:
1. `type`
2. `props`
3. `key`

```tsx
 interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string |JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}
```

### ReactNode

A react node is something renderable like `null`, `false` or `ReactElement` or `string`.

```tsx
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```


## PAtterns

### Function-as-child render prop pattern

function-as-a-child render prop:
```ts
import { ReactNode } from "react";

interface Props {
  children: (foo: string) => ReactNode;
}

```


### Extracting prop types of a Component, using `ComponentProps<typeof Comp>`

Sometimes you want proptypes of a component, but it isn't exported.

Use `React.ComponentProps<typeof Comp>`
```tsx
// a Modal component defined elsewhere
const defaultProps: React.ComponentProps<typeof Modal> = {
  title: "Hello World",
  visible: true,
  onClick: jest.fn(),
};
```


## Generic props

https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#generic-components

`type parameter T` is decided by the type of the prop values that are passed. and Props are parametrized on that type `T`

e.g.
```tsx
import { ReactNode, useState } from "react";

// note parametrized props
interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

// note parametrized props, state and component.
function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}
```

## Funtional HOC

```tsx
// means T has more properies on topof theme props
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (props: Omit<T, keyof WithThemeProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = useTheme();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
```