import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [count, setCount] = useState(15)

  return (
    <>
      <h1>Hello this is a react app using Vite BY SHREY</h1>
      <h2>count value: {count}</h2>
      <button onClick={() => {
        console.log(count)
        setCount(count + 1)
      }}>
        count is {count}
      </button>
    </>
  )
}


export default App
