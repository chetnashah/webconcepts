## Managing parts of server state on the client

So it seems that we have always been treating this server state like any other client state. Except that when it comes to server state (think: A list of articles that you fetch, the details of a User you want to display, ...), your app does not own it. We have only borrowed it to display the most recent version of it on the screen for the user. It is the server who owns the data.

## embraces the stale-while-revalidate caching strategy.

## Can do retries for you


## What is server state?

1. source of truth for the state is server.
2. The client has a copy of the server state, potentially stale/out of date.
3. We synchronize the state from the server in an async fashion.
4. We will most likely show a subset/snapshot of the server state that the user cares about.


## as a state manager

### limited updates

We want updates please, but not too many.

If too many updates weren't a problem, we'd all just stick our state in React Context. But it is a real problem, and a lot of libraries try to solve this in various ways, some more magically than others. 

**Redux and zustand** - two popular state management solutions - both offer a selector based api:
Selector make sure that our components are only subscribed to parts of the state they are interested in. If other parts of the store update, those components don't care. And the principle is that we can call those hooks anywhere in our App to get access to that state, because the libraries make it globally available.

## status and fetchStatus - Why two?

```ts
export type QueryStatus = 'pending' | 'error' | 'success'
export type FetchStatus = 'fetching' | 'paused' | 'idle'
```

Why two different states?
Background refetches and stale-while-revalidate logic make all combinations for status and fetchStatus possible. For example:

1. a query in success status will usually be in idle fetchStatus, but it could also be in fetching if a background refetch is happening.
1. a query that mounts and has no data will usually be in pending status and fetching fetchStatus, but it could also be paused if there is no network connection.
So keep in mind that a query can be in pending state without actually fetching data. As a rule of thumb:

The **status** gives information about **the data: Do we have any or not?**
The **fetchStatus** gives information about the **queryFn: Is it running or not?**
