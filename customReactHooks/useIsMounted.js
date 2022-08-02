const mounted = useRef(false);// state living outside of render

useEffect(() => {
    // mounted when effect runs
    mounted.current = true;

    // unmounted after cleanup
    return () => { 
        mounted.current = false; 
    };
}, []);
