import { useEffect, useRef } from "react";
/**
 * Get a previous "different" value
 * If the value is same (based on Object.is), then usePrevious does not update its ref.
 *
 * combines ref + effect to update ref to remember previous value
 * @param {*} value
 * @returns
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    // save value in box in next tick
    ref.current = value;
  }, [value]);
  return ref.current;
}
