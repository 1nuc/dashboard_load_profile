import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= "App">
      <BrowserRouter>
        <Sidebar/> 
      </BrowserRouter>
    </div>
  )
}

export default App
