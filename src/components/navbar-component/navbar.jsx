import { Link } from 'react-router-dom'
import { useState } from 'react';
import './navbar.css'

export default function Navbar({temporal, setTemporal}){
  const [active, setActive] =useState(true);
  const [visible, setVisible] =useState(false);
  const sidebar_elements = [
    { id: 1, panel: "home" },
    { id: 2, panel: "dashboard" },
    { id: 3, panel: "report" },
    { id: 4, panel: "metrics" },
  ];

  return(
    <nav className="nav" onMouseLeave={()=> setVisible(false)}> 
      <div className="Header"> <h2> Load Profile Decomposition Dashboard </h2>
          <ul>
              {sidebar_elements.map((item) =>( 
              <li key={item.id}>
                <Link to ={`/${item.panel}`}>
                   {item.panel}
                </Link>
              </li> 
        ))}
          </ul>
      </div>
      <div className="dropdown" onMouseEnter={()=> setVisible(true)}> 
        <label>
          <textarea className="dropdown_feild" value={`Group By${temporal? ` :${temporal}` :""}`}
            placeholder="OrderBy" onClick={()=> setTemporal(null)} readOnly>
          </textarea>
        </label>
            {visible &&(
            <ul>
                <li onClick={()=> setTemporal("year")}> Year </li>
                <li onClick={()=> setTemporal("quarter")}> Quarter </li>
                <li onClick={()=> setTemporal("month")}> Month </li>
                <li onClick={()=> setTemporal("week")}> Week </li>
                <li onClick={()=> setTemporal("day")}> Day </li>
                <li onClick={()=> setTemporal("hour")}> Hour </li>
             </ul> 
              )}
      </div>
    </nav>
  )
}
