import { Link } from 'react-router-dom'
import { useState } from 'react';
import './navbar.css'

export default function Navbar({temporal}){
  const [active, setActive] =useState(true);
  const [visible, setVisible] =useState(false);
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
          <textarea className="dropdown_feild" value= {temporal} placeholder="OrderBy" onFocus={()=> setVisible(x=>!x)}>
          </textarea>
            {visible &&(
            <ul>
                <li> year </li>
                <li> quarter</li>
                <li> month</li>
                <li> week</li>
                <li> day</li>
                <li> hour</li>
                <li> minute</li>
             </ul> 
              )}
        </label>
      </div>
    </nav>
  )
}
