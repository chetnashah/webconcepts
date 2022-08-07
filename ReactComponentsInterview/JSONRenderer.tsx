import * as React from 'react';
import './style.css';

import pokedex from './pokedex';

export default function App() {
  return (
    <div>
      <JSValue value={pokedex} indentLevel={2} />
    </div>
  );
}

function JSValue({ value, indentLevel }) {
  if (typeof value === 'object') {
    return <JSONObject objRef={value} indentLevel={indentLevel} />;
  } else {
    return <JSONPrimitive value={value} indentLevel={indentLevel} />;
  }
}

function JSONObject({ objRef, indentLevel }) {
  const [isCollapsed, setCollapsed] = React.useState(false);
  if (objRef !== null && typeof objRef === 'object') {
    const keys = Object.keys(objRef);
    return (
      <React.Fragment>
        <span style={{ padding: 8 }}>
          <button onClick={() => setCollapsed((state) => !state)}>
            {isCollapsed ? '+' : '-'}
          </button>
          {isCollapsed ? (
            <span style={{ paddingLeft: indentLevel }}>
              {(Array.isArray(objRef) ? '[ ' : '{ ') +
                keys.length +
                ' keys ' +
                (Array.isArray(objRef) ? ' ] ' : ' }')}
            </span>
          ) : (
            <React.Fragment>
              <span>{Array.isArray(objRef) ? '[' : '{'}</span>
              {keys.map((key) => {
                return (
                  <div style={{ paddingLeft: indentLevel * 8 }}>
                    <span>{key}:</span>
                    <span>
                      <JSValue
                        value={objRef[key]}
                        indentLevel={indentLevel + 1}
                      />
                    </span>
                  </div>
                );
              })}
              <span>{Array.isArray(objRef) ? ']' : '}'}</span>
            </React.Fragment>
          )}
        </span>
      </React.Fragment>
    );
  }
  return <div>null</div>;
}

function JSONPrimitive({ value, indentLevel }) {
  return <span>{' '.repeat(indentLevel) + JSON.stringify(value)}</span>;
}
