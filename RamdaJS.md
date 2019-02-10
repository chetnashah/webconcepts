
Comparable to Lodash

http://randycoulman.com/blog/categories/thinking-in-ramda/

Promotes FP.

* Methods are iteratee first (for point free style)
* Ramda methods are auto curried.

Refactoring to use point free style:
```js
// easy to spot with single argument and single operation
var f = x => square(x); // point form
// f when called with an x returns square of x
var g = square;         // point free form
// g when called with an x returns square of x
```

Refactoring to use compose:
```js
// easy to spot with functions inside functions
var j = square(addOne(a));
// make them have similar order comma seperated in compose
var k = compose(square, addOne)(a);
```

```js
var R = require('ramda');

// find returns first item that matches predicate
var isEven = x => x % 2 === 0;
console.log('find: ', R.find(isEven, [1,2,3,4,5]));

// filter, filters the condition based on predicate
console.log('filter: ', R.filter(isEven, [1,2,3,4,5]));

/**
 * complement: a higher order fn that returns the opposite value of the passed in function
 */

var isOdd = R.complement(isEven);
console.log('complement: ', R.filter(isOdd, [1,2,3,4,5,6]));

/**
 * Either, both: These are higher order fn that take two fns and return value based when either/both fns return true respectively
 */
var isDivisibleBy3 = x => x % 3 === 0
var isDivisibleBy5 = x => x % 5 === 0

console.log('15 div by both 3 & 5 = ', R.both(isDivisibleBy3, isDivisibleBy5)(15));

console.log('10 div by either 3 or 5 = ', R.either(isDivisibleBy3, isDivisibleBy5)(10));

console.log('6 div by either 3 or 5 = ', R.either(isDivisibleBy3, isDivisibleBy5)(6));

/**
 * pipe and compose:
 * pipe: a higher order fn that takes a comma seperated bunch of fns and pipes them together.
 * 
 * compose: same as pipe but order of fns is reverse, comma seperated fns, but the last one is applied first
 */
var multiply = (x, y) => x * y;
var square = x => x * x;
var addOne = x => x + 1;

// operate expects two args because of multiply
// and multiply has to be placed first bcoz of arity
//  operate = (x * y) | y + 1 | z * z
var operate = R.pipe(multiply, addOne, square);

// compose = square(addOne(multiply(x,y))) = square.addOne.multiply (x,y)
var op2 = R.compose(square, addOne, multiply);

console.log('pipe and compose similar: ', operate(2, 3) === op2(2, 3));

/**
 * partial and partialRight:
 * helps call original functions when all arguments 
 * are received
 * NOTE: arguments passed must be in an array
 */


/**
 * curry: In Ramda, a curried function can be called with only a subset of its arguments, and it will return a new function that accepts the remaining arguments. If you call a curried function with all of its arguments, it will call just call the function.
 * 
 */
const threeArgAdder = R.curry((a, b, c) => {
  return a + b + c;
});
console.log(threeArgAdder(1, 2, 3)); // 6
console.log(threeArgAdder(1)(2)(3)); // 6

/**
 * placeholder __, can only used with curried fn
 * 
 */
const threeArgsConcat = R.curry((a, b, c) => {
  return a + b + c;
});
 
const middleArgumentLater = threeArgsConcat('vala', R.__, 'valc')(' <<vb>> ');

console.log(middleArgumentLater);// vala <<vb>> valc

// using everything together
const publishedInYear = R.curry((year, book) => book.year === year)
 
const titlesForYear = R.curry((year, books) =>
  R.pipe(
    R.filter(publishedInYear(year)),
    R.map(book => book.title)
  )(books)
);

```