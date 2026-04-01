import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Chart from 'chart.js/auto'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar-component/sidebar'
import { LinePlot } from './components/plots-component/lineplot'
import { AreaPlot } from './components/plots-component/areachart'
import { PiePlot } from './components/plots-component/piechart'
import { BarPlot} from './components/plots-component/barchart'
import { DougnutPlot } from './components/plots-component/doughnut'
// import { MultiTypePlot } from './components/plots-component/multitypeChart'

function App() {
  return (
      <BrowserRouter>
          <Sidebar/> 
        <div className= "App">
            <LinePlot/>
            <AreaPlot/>
            <PiePlot/>
            <BarPlot/>
            <DougnutPlot/>
            {/* <MultiTypePlot/> */}
        </div>
      </BrowserRouter>
  )
}

export default App
