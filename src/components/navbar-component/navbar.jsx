import { Link } from 'react-router-dom'
import { useState } from 'react';
import './navbar.css'

export default function Navbar(){
  const [active, setActive] =useState(true);
  const sidebar_elements = [
    { id: 1, panel: "home" },
    { id: 2, panel: "dashboard" },
    { id: 3, panel: "report" },
    { id: 4, panel: "metrics" },
  ];

  return(
    <nav className="nav"> 
      <div className="Header"> <h2> Load Profile Decomposition Dashboard </h2> </div>
          <ul>
              {sidebar_elements.map((item) =>( 
              <li key={item.id}>
                <Link to ={`/${item.panel}`}>
                   {item.panel}
                </Link>
              </li> 
        ))}
          </ul>

      <div className="dropdown"> 
        <label>
          Order By
          <select> 
            <option value="hour">hour </option>
            <option value="day">day </option>
            <option value="week">week </option>
            <option value="month">month </option>
            <option value="year">year </option>
          </select>
        </label>
      </div>
    </nav>
  )
}
