import React, { useState, useRef, useCallback } from 'react';

const debounce = (fn, waitMs) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(args), waitMs);
  };
};

export default function ({ apiFn }) {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(null);
  const ctr = useRef(0);
  const makeApiCall = (currTxt) => {
    // fire some request
    ctr.current++;
    const apiCallCtr = ctr.current;
    apiFn(currTxt)
      .then((res) => {
        // check to see if latest , then only update state
        if (apiCallCtr == ctr.current) {
          setResults(res);
          setErr(null);
        }
      })
      .catch((error) => {
        if (apiCallCtr == ctr.current) {
          setErr(error.message);
        }
      });
  };

  const debouncedMakeApiCall = useCallback(debounce(makeApiCall, 350), []);

  const onChange = (ev) => {
    const currTxt = ev.target.value;
    setText(currTxt);
    debouncedMakeApiCall(currTxt);
  };

  const onItemClick = (ev) => {
    console.log('clicked: ', ev.target.textContent);
    setText(ev.target.textContent);
    setResults([]);
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      {results.map((r) => (
        <div key={r} onClick={onItemClick}>
          {r}
        </div>
      ))}
    </div>
  );
}
