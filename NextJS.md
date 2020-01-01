
### Setup

`next` is dependency.
Webpack hmr is built into framework.
Server rendererd by default.

Auto creates a `.next` directory at the project level : contains app bundles and scaffolding.

Route level Page UI goes inside a `pages` directory.
Reusable UI components should go inside a `components` directory (conventionally), you can name it anything you like. 

The only specially named directory is the `pages` directory.


Filenames in `pages` become the routes.

### next cli

Has its own commands like
1. `next` - an alias for dev
2. `next build` - build the bundle
3. `next start` - start next app for testing

### Deployment

If one uses `now`, then nothing needs to be done for deployment
`now` will take care of building and deploying given above scripts are
added in package.json.

### getInitialProps and SSR

This page has defined `getInitialProps` to do data fetching.
Next.js will execute `getInitialProps`
It will wait for the result of `getInitialProps`
When the results comes back Next.js will render the page.
Next.js wil do this for every request that comes in.

```js
import fetch from 'isomorphic-unfetch'

function HomePage({ stars }) {
  return <div>Next stars: {stars}</div>
}

// you can kind of think of this as a middleware that should run before rendering
HomePage.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default HomePage
```

### `next/link`

Use it as `Link` imported from `next/link`.

In contrast with react router's `Link`, 
the attribute used is `href` instead of `to`.

```js
import Link from 'next/link';

export default () => (
    <div>
        <Link href="/about">About</Link>
    </div>
);
```
You may or may not put an anchor tag (but without href), only for styling purposes.
e.g. 
```js
    <Link href="/about"><a>About</a></Link>
```

### Head (`next/head`)

built-in component for appending elements to the `head` tag of the page.

```js
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

`title` and `meta` elements need to be contained as direct children of the Head element, or wrapped into maximum one level of `<React.Fragment>`, otherwise the meta tags won't be correctly picked up on client-side navigations.