

## No need of useMemo

https://blog.logrocket.com/rethinking-hooks-memoization/

1. **Same reference and inexpensive operations** - if "create" function is inexpensive, and returns a primitive value, then useMemo is not needed, it will automatically prevent re-renders.
2. **Memoizing default state for any number of reasons** - basically `useState` itself stores its state in closures, so it does not need caching of startState provided by useMemo.
3. **Using `useMemo` for referential equalities** - e.g. `useMemo(() => [1, 2, 3], [])` would create array once and hold on to that reference/identity across multiple renders. `useRef` is a much better use case.


## When should you suppress hooks linting?

```js
function Example ({ impressionTracker, propA, propB, propC }) {
  useEffect(() => {
    // 👇Track initial impression
    impressionTracker(propA, propB, propC)
  }, [])

  return <BeautifulComponent propA={propA} propB={propB} propC={propC} />                 
}
```

you don’t care whether the props change or not. You’re only interested in invoking the track function with whatever the initial props are. That’s how impression tracking works. 

You only call the impression track function when the component mounts. The difference here is you need to call the function with some initial props.




