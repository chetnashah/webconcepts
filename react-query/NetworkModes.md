TanStack Query provides three different network modes to distinguish how Queries and Mutations should behave if you have no network connection. This mode can be set for each Query / Mutation individually, or globally via the query / mutation defaults.

**Default network Mode is Online**

1. `Online` - Queries and Mutations will not fire unless you have network connection.
2. `Always` - TanStack Query will always fetch and ignore the online / offline state.
3. `Offline first` - This mode is the middle ground between the first two options, where TanStack Query will run the queryFn once, but then pause retries.