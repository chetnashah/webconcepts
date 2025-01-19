Scenario described is this

Machine A is slow and has a compiler
Machine B is fast, but has no compiler
Machine C is the target but it is slow, and has no compiler



You could build all the binaries for C on A, but it would take a long time because machine A is slow.

The author argues that it is worth taking a small amount of time to cross-compile on A a compiler for B. Then the fast machine B could be used to cross-compile all the necessary binaries for slow machine C, resulting in an overall time saving against compiling on A or C.

The final step, where a compiler is built on C for C, is simply to remove the dependency on machine B. Although it's slow, machine C can now compile the occasional program itself, directly.

