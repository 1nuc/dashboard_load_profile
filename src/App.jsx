import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Chart from 'chart.js/auto'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar'
import { LinePlot } from './components/lineplot'
import { AreaPlot } from './components/areachart'
import { PiePlot } from './components/piechart'
import { BarPlot} from './components/barchart'

function App() {
  return (
      <BrowserRouter>
          <Sidebar/> 
        <div className= "App">
            <LinePlot/>
            <AreaPlot/>
            <PiePlot/>
            <BarPlot/>
        </div>
      </BrowserRouter>
  )
}

export default App
