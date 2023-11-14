
The core kernel API is `task_threads`.

## Getting thread list

https://github.com/getsentry/sentry-cocoa/blob/main/Sources/SentryCrash/Recording/Tools/SentryCrashMachineContext.c#L61

## Core struct holding machine context during crash

```c
#include <mach/mach_types.h>
#include <stdbool.h>
#include <sys/ucontext.h>

#ifdef __arm64__
#    define STRUCT_MCONTEXT_L _STRUCT_MCONTEXT64
#else
#    define STRUCT_MCONTEXT_L _STRUCT_MCONTEXT
#endif

typedef struct SentryCrashMachineContext {
    thread_t thisThread;
    thread_t allThreads[100];
    int threadCount;
    bool isCrashedContext;
    bool isCurrentThread;
    bool isStackOverflow;
    bool isSignalContext;
    STRUCT_MCONTEXT_L machineContext;
} SentryCrashMachineContext;
```