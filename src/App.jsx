import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Chart from 'chart.js/auto'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar'

async function chart(){

  const data=[
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  let ctx= document.getElementById("firstchart");
  const chart=new Chart(ctx,{
    type: 'line',
    data:{
      labels: data.map(d=> d.year),
      datasets: [{
        label: "count by year",
        data: data.map(d=> d.count)
      }]
    } 

    }
  )
}

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    chart()
  }, [])
  return (
    <div className= "App">
      <BrowserRouter>
        <Sidebar/> 
      </BrowserRouter>
      <nav>
        <canvas id="firstchart" /> 
      </nav>
    </div>
  )
}

export default App
