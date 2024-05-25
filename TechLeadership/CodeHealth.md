## What percentage of critical flows are covered by test cases?

Any new change can potentially break the system in absence of tests.
This indicates the rate at which incidents can occur.

## What percentage of codebase is strongly typed?

In dynamic languages like JS/python, small things like object property access can also cause a crash. With strong types, very simple tests do not need to be written.
Moreover refactors can be really simple and consistent.

## Are the dependencies up to date?

If dependencies are not up to date, it can suddenly be a problem, and one would have
to give time to upgrade dependencies and testing it.

## Is the code releasable? How frequently is it released?

An overall metric of code health is release frequency. If we have good confidence over our code and tests, we can release it frequently.

## Do you have CI before you merge to important branches

CI should run before code is merged to important branches.

### CI flakiness

### CI time taken
