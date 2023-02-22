
**This library is not a test runner or framework, only utils to run with JSDOM/browser for simpler querying**

The @testing-library family of packages helps you test UI components in a user-centric way.

You may want to avoid testing following implementation details:

1. Internal state of a component
2. Internal methods of a component
3. Lifecycle methods of a component
4. Child components


## 

**the utilities this library provides facilitate querying the DOM in the same way the user would.** Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would), and more. 

It also exposes a recommended way to find elements by a data-testid as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

## fireEvent

Testing Library's built-in `fireEvent` is a lightweight wrapper around the browser's low-level dispatchEvent API, which allows developers to trigger any event on any element.

## user-event package

`user-event` is a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

https://ph-fritsche.github.io/blog/post/why-userevent

