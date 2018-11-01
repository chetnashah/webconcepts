

* describe - group together similar tests.
* it - a single test.
* expect - make assertion.

both describe and it, take first argument - the name/description, and second argument is the function telling it the stuff to do.
describe can be nested, for logical groups inside groups.

Expect statements look like following:
expect(thingToBeTested).matcher(expectedValue)


One of the libraries to make assertions on the dom is chai-jquery, i.e it provides matchers for jquery objects which can be used to make assertions on dom.

### Javascript testing

Karma is only for testing browser-based code. So when using karma,
either make sure all the dependencies are captured in one bundle (e.g. by webpack), or put all the dependencies as script tags in html. In short,
Karma will not understand "require".

Jest is good at testing node code.

A spy is terminology for a mock function that can do some recording about
how many times it was called, with what args etc.

