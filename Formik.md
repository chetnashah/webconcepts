
Has good support for schema validation with yup (https://github.com/jquense/yup)

### Using formik

Formik can be used in one of three ways

1. `<Formik render>`
2. `<Formik component>`
3. `<Formik children>`

When rendering `input`, etc. it is necessary to add a `name` or `id` attribute,
so formik can keep track of it.

### How to use Formik

Wrap the following render prop function inside the Formik Tag
```jsx
({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
    <form>
        <input type="email" name="email" onChange={handleChange} value={values.email} />
    </form>
)
```

### Important props in Formik Component

1. `initialValues` : object with signature `any`.
2. `onSubmit` : method with signature `(values: any, { setSubmitting, resetForm }) => any`
3. `validationSchema`: can be used with `yup` library
4. `validate`: regular validation function

### Useful props available inside render-prop function

Whether we use `children`, `render` prop or `component` style, we deal 
with below props to get stuff done:

1. `values`: object that contains all values captured in form. The keys are the name of the fields used in the form.
2. `errors`: object that contains all errors captured in form. The keys are the name of the fields used in the form.
3. `touched`: object that contains all touched/untouched captured in form. The keys are the name of the fields used in the form.
4. `handleChange`: call this for any `onChange` you observe in form `input`s.
5. `handleBlur`: call this for any `onBlur` u observe in form `input`s.
6. `handleSubmit`: call this in `form`'s `onSubmit`. Basically do `<form onSubmit={handleSubmit}>` so formik is in control of form submission. The `onSubmit` prop of `Formik` component is now the controller of the submission flow
7. `isSubmitting`: To know the form is in submission state, can be reset by calling `setSubmitting(false)`, usually in `onSubmit` of Formik component, after our work is done.

### Components exposed

`Form`, `Field`, `ErrorMessage`
They use React context to hook into the parent `<Formik />` state/methods.

### Validation

Validation is left upto the user.

Validation function signature is:
`validate: (values: any, props: any) => errors: any` 

#### Form Level validation

Full access to props and `values` to validate dependent fields.

Form-level validation can be done with:
* `<Formik validate>` and `withFormik({ validate: ... })`
or
* `<Formik validationSchema>` and `withFormik({ validationSchema: ... })`

#### Field level validation

Formik supports field-level validation via the `<Field>`/`<FastField>` components' validate prop. This function can be synchronous or asynchronous (return a Promise). It will run after any onChange and onBlur by default. This behavior can be altered at the top level `<Formik/>` component using the `validateOnChange` and `validateOnBlur` props respectively. 

#### When does validation run?

You can control when Formik runs validation by changing the values of `<Formik validateOnChange>` and/or `<Formik validateOnBlur>` props depending on your needs. By default, Formik will run validation methods as follows:

After "change" events/methods (things that updatevalues)

`handleChange`
`setFieldValue`
`setValues`

After "blur" events/methods (things that update touched)

`handleBlur`
`setTouched`
`setFieldTouched`

Whenever submission is attempted

`handleSubmit`
`submitForm`

There are also imperative helper methods provided to you via Formik's render/injected props which you can use to imperatively call validation.

`validateForm`
`validateField`

### Form submission

Use `handlesubmit` provided,

It will execute:
1. Pre-submit: Touch all fields. `isSubmitting` is set to true. `submitCount` is incremented by 1.

2. Validation: 
    * `isValidating` is set to `true`.
    * Field and form level validations are run and results deeply merged.
    * Are there any errors?
        * Yes -> `isValidating` is set to `false`. `isSubmitting` is set to `false`.
        * No -> `isValidating` is set to `false`. Move to step 3. Submission 

3. Submission:
* Proceed with calling submission handler `onSubmit`.
* Programmer should call `setSubmitting(false)` to finish the cycle.

### Checking form is validating

1. `isValidating` is `true`, and `isSubmitting` is `true`.

### Checking if form submission handler is executing

* `isValidating` is `false`, and `isSubmitting` is `true`
