
https://github.com/typescript-cheatsheets/react

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