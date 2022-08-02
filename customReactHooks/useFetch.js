/**
 * Interface design aspects:
 * 
 * inputs: url that is directly passable to fetch() i.e. string or URL object
 * 
 * outputs: A object with three keys:
 * {
 *    responseJSON: json response from fetch, null if not yet arrived,
 *    isLoading: true/false,
 *    error: error/null
 * }
 * 
 * Example use:
 * 
 * const { responseJSON, isLoading, error } = useFetch(url);
 * 
 */

/**
 * Behavior aspects:
 * 
 * does this hook cause app to re-render without explicit multiple invocations?
 * 
 * Does this hook store some storage/state internally that it exposes?
 * Yes
 * 
 * should the invocation of fetch be sync or async on using the hook?
 * Synchronous, but after render in an effect
 * For complicated cases, this can be configurable
 * 
 * Dependencies: only url, so does not refetch if called again with same url
 * 
 * state should be cleared when URL changes, since effect only runs when URL changes,
 * reset state at the start of effect run.
 * 
 */


/**
 * Edge cases: 
 * 1. should wrap fetching in useeffect otherwise infinite fetching
 * 
 * 2. should return correct isLoading after changing url
 * 
 * 3. race condition when url changes quickly: ?
 */

 import {useState} from 'react';
 function useFetch(url) {
   // Write your code here.
    const [state, setState] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   let isMounted = false;
    useEffect(() => {
     console.log('fetching!');
     isMounted = true;
      
      setLoading(true);
      setState(null);
      setError(null);
      fetch(url)
       .then((resp) => resp.json())
       .then((json) => {
         if(isMounted) {
           setState(json);
           setLoading(false);
           setError(null);
         }
       })
       .catch((err) => {
         console.log(err);
         if(isMounted) {
           setState(null);
           setLoading(false);
           setError(err);
         }
       });
      // effect cleanup
      return () => {
        isMounted = false;
      };
   }, [url]);
 
  
    return {
      responseJSON: state,
      isLoading: isLoading,
      error: error,
    };
 
 }
 
 // Do not edit the line below.
 exports.useFetch = useFetch;
 