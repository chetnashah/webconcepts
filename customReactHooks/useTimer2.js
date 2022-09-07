import { useState, useRef, useEffect, useCallback } from "react";

/**
 * @param {number} totalDuration
 * @returns {object} { isRunning: boolean, start: function, stop: function, seconds: number }
 *
 * This hook could be extended to have options like
 * autoStart, pause functionality, onUpdate, and much more
 */
const useTimer = (totalDuration) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(totalDuration);
  const timerRef = useRef(null);

  // function to start the timer
  const start = useCallback(() => {
    /**
     * start the timer
     * decrement seconds every 1s
     * update the isRunning --> true
     */
    // capturing interval id for future reference
    timerRef.current = setInterval(() => {
      // 5 --> 4 --> 3 --> ..
      setSeconds((state) => state - 1);
    }, 1000);
    setIsRunning(true);
  }, [setSeconds, setIsRunning]);

  // function to top the timer
  const stop = useCallback(() => {
    // clearing interval
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSeconds(totalDuration);
  }, [setIsRunning, setSeconds, totalDuration]);

  useEffect(() => {
    // to handle condition when timer reaches 0
    if (seconds < 1) {
      stop();
    }
  }, [seconds, stop]);

  useEffect(() => {
    // clear interval when component unmount happens
    return () => timerRef && clearInterval(timerRef.current);
  }, []);

  return {
    isRunning,
    start,
    stop,
    seconds,
  };
};

export default useTimer;
