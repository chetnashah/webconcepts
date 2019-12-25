
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

