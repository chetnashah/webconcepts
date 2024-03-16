For libraries, releasing is only possible when `package.json` is present, i.e a library is publishable.

## Add following to nx.json to control what to release

add in `nx.json`:

```json
  "release": {
    "projects": ["libs/*", "packages/*"]
  },
```

## For independent versioning use

```json
  "release": {
    "projects": ["libs/*", "packages/*"],
    "projectsRelationship": "independent"
  },
```

## Managing git

**By default, Nx Release will stage all changes it makes with git.**

This includes updating package.json files, creating changelog files, and updating the `package-lock.json` file.

After staging the changes, Nx Release will commit the changes and create a git tag for the release.

## Managing sub-commands

1. `version` - just bump version in `package.json` - based on conventional commits or be explicit. stages the changes.
2. `changelog` - generate changelog since last git tag or speicifed git ref. Stages the changes.
3. `publish` - actually publish release to package registry etc.

```
  nx release version [specifier]  Create a version and release for one or more applications and libraries [aliases: v]

  nx release changelog [version]  Generate a changelog for one or more projects, and optionally push to Github  [aliases: c]

  nx release publish              Publish a versioned project to a registry                               [aliases: p]
```
