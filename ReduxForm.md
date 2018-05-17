
Only handles data/state side of things, all things rendering are delegated to app logic. Also submission logic is delegated to app.

### setup

1. Introduce `formReducer` in the rootReducer.
2. Make a component with a html form that uses `Field` and wrap Component in `reduxForm`, along with giving it a name in config.
3. React to submit as you like.

### designing with redux-form

1. Identify different peices of form state.
2. Make one `Field` component per peice of state.
3. User changes a `Field` input.
4. Redux automatically handles changes.
5. User submits form.
6. We validate inputs and handle form submission. Use `handleSubmit`.

### validation

validation functions live outside of components,
Also the validation function is passed as a property to reduxform config.

A typical validation function looks like:
``` js
function validate(values) {
    const errors = {};

    // do validation on values, values represents values collected in form
    // property on values object are names of fields,
    if(!values.password) {
        errors.password = "You forgot to enter a password!";
    }

    // if errors is empty, the form is fine to submit
    return errors;
}
```
### Field states

1. pristine - first time, not interacted
2. touched - focused followed by blur atleast once on a field.
3. invalid - .