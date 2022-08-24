https://www.youtube.com/watch?v=WhCXiEwdU1A

https://postcss.org/

It does **not** define a custom syntax and semantics like `sass` or `less` which have their own compiler/transpiler, so postcss is not actually a language, but a buildtool with plugins, you can thing of sass, less as language plugins that can be used in postcss.

It is a **build tool** to preprocess/postprocess CSS.

Config file is `postcss.config.js`.

Use cases: 
1. css minification - https://cssnano.co/
2. removing unused css - https://purgecss.com/getting-started.html
3. autoprefixer e.g. `::placeholder` -> `::-moz-placeholder,::placeholder`
4. CSS Linting

Converts Css files to AST (abstract syntax tree), that can be manipulated by Javascript (known as PostCSS plugins).

This is a buildtool to process CSS to be build-friendly.

https://github.com/postcss/postcss/blob/main/docs/architecture.md


Relationship with Next.js - https://nextjs.org/docs/advanced-features/customizing-postcss-config

