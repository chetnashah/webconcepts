## What is a query?

A query is a declarative dependency on an asynchronous source of data that is tied to a **unique key**. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server (Because it takes data fetching function as one of the args).

```tsx
import { useQuery } from "react-query";

function App() {
  const info = useQuery("todos", fetchTodoList);
}
```

## What is the purpose of unique key?

The unique key you provide is used internally for **refetching**, **caching**, and **sharing your queries** throughout your application.
