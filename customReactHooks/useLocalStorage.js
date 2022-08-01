/**
 * output should be stored value, and its modifier ie.
 * [value, setValue]
 * 
 * Input: 
 * input should be key ? Yes
 * input should be initial value? yes
 * 
 * API:
 * Is the public api similar to useState? Yes, 
 * also internally use useState, because it has similar get/set semantics
 * 
 * stored value overrides initialvalue, 
 * 
 * initialValue can be a state updater function: 
 * check it and apply it on stored state
 * 
 * When do we persist data to localstorage?
 * 
 * Should we use useeffect to update localstorage? Yes
 * What should the dependencies be in useEffect? value, since on value update, 
 * we must run the sideeffect of saving in local storage
 * 
 * Two storages: in-memory via useSTate, and ondisk via localstorage.
 * How are they synchronized?
 */

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localstorage.getItem(key));
    if(savedValue) {
        return savedValue;
    }
    // this part is optional for parity with setState api
    if(typeof initialValue === "function") {
        return initialValue();
    }
    return initialValue;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage(key,initialValue) {
    const [value, setValue]  = useState(() => {// useState with initializer fn syntax
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
      saveToLocalStorage(key, value);
    
      return () => {
        // cleanup code
      }
    }, [value]);

    return [value, setValue];
}