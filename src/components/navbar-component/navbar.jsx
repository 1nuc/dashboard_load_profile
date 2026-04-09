import { Link } from 'react-router-dom'
import { useState } from 'react';
import './navbar.css'

export default function Navbar(props){
  const [active, setActive] =useState(true);
  const [visible, setVisible] =useState(false);
  const sidebar_elements = [
    { id: 1, panel: "home" },
    { id: 2, panel: "dashboard" },
    { id: 3, panel: "report" },
    { id: 4, panel: "metrics" },
  ];
// I will filter the data after I click apply good
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
      <div className="time-selectors">
        <div className="time-range"> 
          <span> Start Date</span>
          <input type="datetime-local" className="start-date" value={props.startDate} onChange={(e)=>props.setStartDate(e.target.value)} /> 
            <span> &gt; </span>
          <span> End Date</span>
          <input type="datetime-local" className="end-date" value={props.endDate} onChange={(e)=>props.setEndDate(e.target.value)}/>
          
          <button className="apply"> apply </button>
        </div>
        <div className="dropdown" onMouseEnter={()=> setVisible(true)}> 
          <label>
            <textarea className="dropdown_feild" value={`Group By${props.temporal? ` :${props.temporal}` :""}`}
              placeholder="OrderBy" onClick={()=> props.setTemporal(null)} readOnly>
            </textarea>
          </label>
              {visible &&(
              <ul>
                  <li onClick={()=> props.setTemporal("year")}> Year </li>
                  <li onClick={()=> props.setTemporal("quarter")}> Quarter </li>
                  <li onClick={()=> props.setTemporal("month")}> Month </li>
                  <li onClick={()=> props.setTemporal("week")}> Week </li>
                  <li onClick={()=> props.setTemporal("day")}> Day </li>
                  <li onClick={()=> props.setTemporal("hour")}> Hour </li>
               </ul> 
                )}
        </div>
      </div>
    </nav>
  )
}
