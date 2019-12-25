
NOw.sh is a service for use/deploying websites.
https://zeit.co/guides/migrate-to-zeit-now

Usually `next.js` is used together with `Zeit NOW`.
Former is code origanization and techniques, latter is for build/deployment.

With `now` you can:
1. Static websites and static generators (React, Vue, Angular, etc)
2. Code that renders HTML on the server-side
3. API endpoints that query databases or web APIs and return dynamic data

Expects a `now.json` in your repo (optional though e.g. in a nextjs project).


If your project contains a `package.json` file with a `build` script, and `no now.json` configuration, it is expected to `output its static files into a directory named public`, at the root of the project, when the build script is executed.
```js
{
  "scripts": {
    "build": "[my-framework] build --output public"
  }
}
```

If your project contains a `package.json` file, `no api directory`, and `no now.json` configuration, it is expected to `provide a build script that performs a static build of your frontend and outputs it to a public directory` at the root of your project.
```js
{
  "scripts": {
    "build": "[my-framework] build --output public"
  }
}
```

### Optimized frameworks for NOW
```
Next.js
npm init next-app my-next-project
Create React App
npx create-react-app my-cra-project
Vue.js
npx @vue/cli create my-vue-project
Gatsby
npx gatsby-cli new my-gatsby-project
Ember.js
npx ember-cli new my-ember-project
Svelte
npx degit sveltejs/template my-svelte-project
Preact
npx preact-cli create default my-preact-project
Angular
npx @angular/cli new my-angular-project
Polymer
npx polymer-cli init polymer-3-starter-kit
Gridsome
npx @gridsome/cli create my-gridsome-project
UmiJS
npm init umi my-umi-project
Docusaurus
npx docusaurus-init
Saber
npm init site my-saber-project
11ty/Eleventy
npx degit 11ty/eleventy-base-blog my-11ty-project
Hexo
npx hexo-cli init my-hexo-project
```

### Logging into CLI

Use `now login`.
To see the currently logged in user, use `now whoamai`.


### Creating the project

Use
```sh
# this has nothing to do with Now actually
# only creates a plain next proj
npm init next-app my-next-project
```

Behind the scenes `npm init next-app my-next-project` is 
converted into `npx create-next-app my-next-project`

### Building project

```js
// this is package.json
"scripts": {
    "build":"next build"
}
```

### Now secrets

To define an environment variable, you should use Now Secrets. By using Now Secrets, the data will be encrypted and stored securely, no longer directly accessible by anyone, and only exposed to deployments as environment variables
```sh
now secrets add <secret-name> <secret-value>
```

### Providing Environment variables

```js
// this is now.json
{
    "build": {
        "env" :{
            "VARIABLE_NAME": "@secret-name"
        }
    }
}
```

### Deploying the project

Just run `now`.

### Source code integrations

Use with `Github`, `GitLab`, `Bitbucket` projects.

#### Github integration

The easiest way to use a Git integration is to think of your master branch as production. Every time a pull request is made to the master branch, Now will create a unique deployment, allowing you to view the changes in a preview environment before merging.


### ServerLess functions with Now

To create a Serverless Function, create a file in an `api` directory from your project root with the appropriate language extension.
Although if using `next.js` it should be placed in `/pages/api` directory instead.


