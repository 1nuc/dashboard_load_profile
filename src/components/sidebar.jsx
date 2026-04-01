import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './sidebar.css'

export default function Sidebar(){
  const [active, setActive] =useState(true);

  return(
    <nav className= {`side ${active? "active": "" }`}>
          <button onClick={() => setActive(!active)}> 📎 </button>
          <ul>
              <li><Link to ="/"> Home</Link></li> 
              <li><Link to ="/dashboard"> Dashboard</Link></li> 
              <li><Link to ="/report"> report</Link></li>
          </ul>
    </nav>
  )
}
