import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    < BrowserRouter>
      <nav>
        < Link to ="/" > Home </Link> | {" "}
        < Link to ="/about" > About </Link> | {" "}
        < Link to ="/contact" > Contact </Link> 
      </nav>
    < /BrowserRouter>
    </>
  )
}

export default App
