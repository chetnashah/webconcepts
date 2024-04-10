## What is a stale query?

Query instances via `useQuery` or `useInfiniteQuery` by default consider cached data as stale.

## When are stale queries refetched?

Stale queries are refetched automatically in the background when:

1. New instances of the query mount
2. The window is refocused
3. The network is reconnected.
4. The query is optionally configured with a refetch interval.
5. React Query will trigger a refetch whenever the query key changes

To change this functionality, you can use options like `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect` and `refetchInterval`.

