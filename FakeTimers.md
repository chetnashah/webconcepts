

## Fake timers

check https://github.com/sinonjs/fake-timers

## Clock interface


### var clock = FakeTimers.install();

Monkeypatches all the timer callbacks like setTimout/setInterval etc. to be controlled by library.


### clock.setTimeout/clearTimeout
`let id = clock.setTimeout(cb, timeout)` - schedules callback to be fired once timeout millis have ticked by

`clock.clearTimeout(id)`


### clock.setInterval/clearInterval


### clock.requestAnimationFrame(cb)/clock.cancelAnimationFrame(id)

### clock.requestIdleCallback(cb[, timeout])/clock.cancelIdleCallback(id)

Queued the callback to be fired during idle periods to perform bg and low priority work on main event loop.

### clock.nextTick(cb)

Available only in NodeJs, mimics `process.nextTick`

### clock.tick(time)/ await clock.tickAsync(time)

Advance the clock, firing callbacks if necessary.

### clock.reset()

remove all timers and ticks without firing them.

### clock.runAll()

This runs all pending timers until there are none remaining. If new timers are added while it is executing they will be run as well.

### clock.runMicroTasks()

This runs all pending microtasks scheduled with nextTick but none of the timers and is mostly useful for libraries using FakeTimers underneath and for running nextTick items without any timers.

### clock.uninstall()

Restores the original methods of the native timers or the methods on the object that was passed to FakeTimers.withGlobal.

