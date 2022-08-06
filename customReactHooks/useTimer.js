/**
 * Use case : Countdown timer
 */

/**
 * Interface design aspects:
 *
 * Inputs: TOTAL_TIME to run the timer
 *
 * outputs: 4 state variables
 * 1. isRunning: boolean
 * 2. start: fn, must be called to start the timer
 * 3. stop: fn, must be called to stop the timer
 * 4. seconds: secs remaining
 */

/**
 * Behavior aspects:
 *
 * Can it cause re-render? yes, will give you new value of seconds on each re-render
 *
 * Has internal state/storage? Yes
 *
 * Hook arguments change semantics: restart the timer with new value of TOTAL_TIME
 */

/**
 * Initial implementation was simple using setInterval + setstateupdater function,
 * but it was hard to make the timer stop at 0
 */

import { useEffect, useState } from "react";

export default function useTimer(totalTime) {
  let [isRunning, setIsRunning] = useState(false);
  let [secsRemaining, setSecsRemaining] = useState(totalTime);

  let stopFn = () => {
    setIsRunning(false);
  };

  let startFn = () => {
    setIsRunning(true);
  };

  let resetFn = () => {
    clearInterval(timerId);
    setIsRunning(false);
    setSecsRemaining(totalTime);
  };

  if (isRunning && secsRemaining === 0) {
    setIsRunning(false);
  }

  let timerId = null;
  useEffect(() => {
    clearInterval(timerId);
    if (isRunning) {
      timerId = setInterval(() => {
        setSecsRemaining((oldVal) => oldVal - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [totalTime, isRunning]);

  return {
    isRunning,
    startFn,
    stopFn,
    resetFn,
    secsRemaining,
  };
}
