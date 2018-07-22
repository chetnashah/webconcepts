

### Tooling

1. make new app with `ng new app-name`.
2. serve app with `ng serve --open`.

Generate a component using cli
```sh
ng generate component heroes
```

### angular.json

Configuration for Angular CLI. In this file you can set several defaults and also configure what files are included when your project is built. Check out the official documentation if you want to know more.


### NgModules

 It can contain components, service providers, and other code files whose scope is defined by the containing NgModule. It can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

 Every Angular app has at least one NgModule class, the root module, which is conventionally named `AppModule` and resides in a file named `app.module.ts`. You launch your app by bootstrapping the root NgModule.

While a small application might have only one NgModule, most apps have many more feature modules. The root NgModule for an app is so named because it can include child NgModules in a hierarchy of any depth.

NgModules provide a compilation context for their components. A root NgModule always has a root component that is created during bootstrap, but any NgModule can include any number of additional components, which can be loaded through the router or created through the template. The components that belong to an NgModule share a compilation context

### Components

Components are the fundamental building blocks of Angular applications. They display data on the screen, listen for user input, and take action based on that input.

A component controls a patch of screen called a view. For example, individual components define and control each of the following views from the Tutorial:

The app root with the navigation links.
The list of heroes.
The hero editor.

You define a component's view with its companion template. A template is a form of HTML that tells Angular how to render the component.

Views are typically arranged hierarchically, allowing you to modify or show and hide entire UI sections or pages as a unit. The template immediately associated with a component defines that component's host view. The component can also define a view hierarchy, which contains embedded views, hosted by other components.

A template looks like regular HTML, except that it also contains Angular template syntax, which alters the HTML based on your app's logic and the state of app and DOM data. Your template can use data binding to coordinate the app and DOM data, pipes to transform data before it is displayed, and directives to apply app logic to what gets displayed.

Angular supports two-way data binding, a mechanism for coordinating parts of a template with parts of a component. Add binding markup to the template HTML to tell Angular how to connect both sides.

Angular templates are dynamic. When Angular renders them, it transforms the DOM according to the instructions given by directives. A directive is a class with a @Directive decorator.

A component is technically a directive - but components are so distinctive and central to Angular applications that Angular defines the @Component decorator, which extends the @Directive decorator with template-oriented features.

#### lifecycle hooks

https://angular.io/guide/lifecycle-hooks

### Services

Service is a broad category encompassing any value, function, or feature that an app needs. A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well. 

