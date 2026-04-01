import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './sidebar.css'

export default function Sidebar(){
  const [active, setActive] =useState(true);
  const sidebar_elements = [
    { id: 1, label: "🏠", panel: "home" },
    { id: 2, label: "🗾", panel: "dashboard" },
    { id: 3, label: "📃", panel: "report" },
    { id: 4, label: "🛠️", panel: "metrics" },
  ];

  return(
    <nav className= {`side ${active? "active": "" }`}>
          <button onClick={() => setActive(!active)}> ≣</button>
          <ul>
              {sidebar_elements.map((item) =>( 
              <li key={item.id}>
                <Link to ={`/${item.panel}`}>
                   {item.label}
                   {active && <span>{item.panel}</span>}
                </Link>
              </li> 
        ))}
          </ul>
    </nav>
  )
}
