

## What will this print?

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function A({ children }) {
  console.log('A')
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  return children
}

function B() {
  console.log('B')
  return <C/>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  console.log('App')
  return (
    <div>
      <A><B/></A>
      <D/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

Ans:
```
"App"
"A"
"B"
"C"
"D"
"A"
```

B and C are not called again, because same React element referece as previous render i.e. children is returned from A.

see here: https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#standard-render-behavior:~:text=if%20a%20React%20component%20returns%20the%20exact%20same%20element%20reference%20in%20its%20render%20output


##

```jsx

import React, { useState, memo, createContext, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const MyContext = createContext(0);

function B() {
  const count = useContext(MyContext)
  console.log('B')
  return null
}

const A = memo(() => {
  console.log('A')
  return <B/>
})

function C() {
  console.log('C')
  return null
}
function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return <MyContext.Provider value={state}>
    <A/>
    <C/>
  </MyContext.Provider>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

```

After `setState`, `A` function will not get called again because of `memo`,
`B` will get called again because of being context consumer (even if it is a child of `A`).


## what logs get printed

```js
// This is a React Quiz from BFE.dev 

import React, { useState, createContext, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const MyContext = createContext(0);

function B({children}) {
  const count = useContext(MyContext)
  console.log('B')
  return children
}

const A = ({children}) => {
  const [state, setState] = useState(0)
  console.log('A')
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  return <MyContext.Provider value={state}>
    {children}
  </MyContext.Provider>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}
function App() {
  console.log('App')
  return <A><B><C/></B><D/></A>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```
Ans:
```js
"App"
"A"
"B"
"C"
"D"
"A"
"B"
```

First render:
"App","A","B","C","D" -> as per usual order
re-render triggers: "A"
A should render children, but element reference is same, so no children re-render
A changes provider value: 
    B is a context consumer -> "B" logs
    C is child of B, but B return direct child referece, so no render of C.


## 

```jsx
import React, { memo, useState} from 'react'
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/dom'

function _A({ onClick }) {
  console.log('A')
  return <button onClick={onClick} data-testid="button">click me</button>
}

const A = memo(_A)

function App() {
  console.log('App')
  const [state, setState] = useState(0)
  return <div>
    {state}
    <A onClick={() => {setState(state => state + 1)}}/>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

// click the button
;(async function() {
  const button = await screen.findByTestId('button')
  fireEvent.click(button)
})()
```

First render:"App","A"
After click: "App" re-renders because that is where the state changes, "A" will re-rendered even after memo, because callback function prop is a new function passed everytime.

##

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [state, setState] = useState(0)
  console.log(state)

  useEffect(() => {
    setState(state => state + 1)
  }, [])

  useEffect(() => {
    console.log(state)
    setTimeout(() => {
      console.log(state)
    }, 100)
  }, [])

  return null
}

ReactDOM.render(<App/>, document.getElementById('root'))
```
Ans:
```
0
0
1
0
```

First render prints state:0
enqueue of effect1 and effect2
effect1 runs -> enqueues an update to increase state to 1.
effect 2 runs -> 
    1. prints log from currnt state closure = 0;
    2. schedules via setTimeout a log which holds value from current closure = 0, in 100 ms
enqueud setState runs with value of 1 -> prints 1 log
Finally setTimeout scheduled effect runs and prints 0 from closure of that previous render.

##

```jsx
import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const ref = useRef(null)
  const [state, setState] = useState(1)

  useEffect(() => {
    setState(2)
  }, [])

  console.log(ref.current?.textContent)

  return <div>
    <div ref={state === 1 ? ref : null}>1</div>
    <div ref={state === 2 ? ref : null}>2</div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```
```
undefined
"1"
```
// Initially ref is empty -> undefined
// ref attaches to first div which has value to 1
// on schedule state update, second render, it prints value from existing ref which has 1

##

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  const increment = () => {
    setTimeout(() => {
      setState(state + 1)
    }, 0)
  }
  console.log(state)
  return <div>
    <button onClick={increment}>click me</button>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

// click the button twice
userEvent.click(screen.getByText('click me'))
userEvent.click(screen.getByText('click me'))
```
```
0
1
1
```
Initially state is 0.
Then we enqueue two setState calls in macrotask queue via setTimeout,
first one triggers a render with prev value 0 from closure,
the other one also triggers a render with prev value 0 from closure 
so both renders log 1

##

```js

import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function _B() {
  console.log('B')
  return null
}

const B = memo(_B)

function _A({ children }) {
  console.log('A')
  return children
}

const A = memo(_A)

function App() {
  const [count, setCount] = useState(0)
  return <div>
    <button onClick={
      () => setCount(count => count + 1)
    }>
      click me
    </button>
    <A><B/></A>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

userEvent.click(screen.getByText('click me'))
```
Ans:

```
A
B
A
```

First A and B get printed because of the initial mount.
Second time, on click rerender, new reactelement is created for B, which gets passed into 
a as a new/fresh children prop, so A's memo is busted and A will re-render to print "A".
This new re-render of A, asks `<B />` to be rendered, but there is no props expected by B,
and B is memo'ed so no second log for B.


##

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  const onClick = () => {
    console.log('handler')
    setState(state => state + 1)
    console.log('handler ' + state)
  }
  console.log('render ' + state)
  return <div>
    <button onClick={onClick}>click me</button>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))
// click the button
userEvent.click(screen.getByText('click me'))
```
Ans:
```
"render 0"
"handler"
"handler 0"
"render 1"
```

First "render 0" gets printed.
Then click handler runs
1. prints "handler"
2. state update is enqueued to run before next render
3. prints "handler 0" because 0 is the current state from closure
4. updated render now has state 1 so -> "render 1" gets printed

