/**
 * Use case: track changes to window size (an external effect)
 * and trigger re-render using that external effect
 * 
 */

/**
 * Interface design aspects:
 * 
 * inputs: nothing needed since it relies on external hardware event/effect 
 * of resize
 * 
 * outputs: an object with width and height
 *  { width: number, height: number }
 * 
 */


/**
 * Behavior aspects:
 * 
 * Does this hook cause a re-render wihtout intervention? Yes, 
 * relies on hardware event of resize
 * 
 * Does this hook hold internal storage/state? Yes, 
 * width and height that it might receive
 */

/**
 * cleanup aspects:
 * any listeners registered during mount,
 *  should be removed on unmount.
 * 
 * useEffect might be needed for this
 */

 import React from 'react';
 import { useEffect, useState } from 'react';
 
 export default function useWindowSize() {
   // Write your code here.
   const [state, setState] = useState({
     width: window.innerWidth,
     height: window.innerHeight,
   });
   const callbackFn = function () {
     const innerWidth = window.innerWidth;
     const innerHeight = window.innerHeight;
     setState({ width: innerWidth, height: innerHeight });
   };
   // event listener has to be setup once on mount
   useEffect(() => {
     window.addEventListener('resize', callbackFn);
     return () => {
       window.removeEventListener('resize', callbackFn);
     };
   }, []);
   return { width: state.width, height: state.height };
 } 