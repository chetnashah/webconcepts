import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

let callIndex = -1;
const stateValues = []; // closure array that holds values

function myUseState(initialValue) {
  ++callIndex;
  if (!stateValues[callIndex]) {
    stateValues[callIndex] = initialValue;
  }
  // new storage introduced that will be captured by setValue holding call number according to its order in render
  const currentCallIdx = Number(callIndex); // closure capture for setValue
  const value = stateValues[currentCallIdx] || initialValue;

  const setValue = (newValue) => {
    stateValues[currentCallIdx] = newValue;// captured call number for this particular useState according to linear order in render, 
    
    renderApp();// we need this to trigger a re-render
  };
  return [value, setValue];
}

const App = () => {
  const [countA, setCountA] = myUseState(1);
  const [countB, setCountB] = myUseState(2);
  console.log('render App , countA = ', countA);
  console.log('renderApp,, countB = ', countB);

  console.log('render sees statevalues: ' + stateValues);

  return (
    <div>
      <div>
        <h1>countA: {countA}</h1>
        <button
          onClick={() => {
            setCountA(countA + 1);
          }}
        >
          Inc
        </button>
        <button
          onClick={() => {
            setCountA(countA - 1);
          }}
        >
          Dec
        </button>
      </div>

      <div>
        <h1>countB: {countB}</h1>
        <button
          onClick={() => {
            setCountB(countB + 1);
          }}
        >
          Inc
        </button>
        <button
          onClick={() => {
            setCountB(countB - 1);
          }}
        >
          Dec
        </button>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

function renderApp() {
  callIndex = -1;

  root.render(<App />);
}

renderApp();
