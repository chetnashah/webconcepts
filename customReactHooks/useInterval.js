/**
 * Use cases:
 * After mount, regularly call callbackFn every delayMs.
 */

/**
 * Interface design aspects:
 *
 * inputs:
 * 1. callbackfn
 * 2. optional delay in millis
 *
 * outputs: No output needed
 *
 */

/**
 * Behavior aspects:
 *
 * causes re-render? No, only calls callback every delay ms
 *
 * Has internal state/storage?
 *
 *
 * Cleanup: on unmount, cancel the interval
 *
 * If delay/duration changes, interval should reset,
 * not executing the function until new delay completes
 *
 * If delay is set to null/undefined, cancel interval
 *
 * If callback fn changes, interval should be updated to call most reset
 * version of the function, not reset the interval
 */

function useInterval(callback, delay) {
  // Write your code here.
  let timerId = null;
  let innerCbRef = useRef();
  // we put callback in ref, because we want constant identity across renders
  innerCbRef.current = callback;
  useEffect(() => {
    clearInterval(timerId);
    if (delay) {
      timerId = setInterval(() => innerCbRef.current(), delay);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [delay]);
}

// Do not edit the line below.
exports.useInterval = useInterval;
