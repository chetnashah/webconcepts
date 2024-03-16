## Libraries are something that would be consumed by an app

## Buildable vs publishable libs

https://nx.dev/concepts/more-concepts/buildable-and-publishable-libraries#buildable-libraries

### Publishable libraries (for consumption of library outside of the monorepo)

The intention is to also **distribute the library outside of the monorepo for consumption.**

You might use the `--publishable` option when generating a new Nx library if your intention is to distribute it outside the monorepo.

A library generated with `--publishable` generates a `package.json` which is used for publishing.

Generating a non-publishable library will not have a `package.json`.

### Buildable Libraries

These libraries are directly referenced from one of the monorepo’s applications and built together with them. There is no intention of consumption of this library outside of the monorepo, if the intention is consumption outside monorepo, look at Publishable libraries section above.
