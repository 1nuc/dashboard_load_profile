import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './utility.css'
export function UtilityView (){
  const location=useLocation();
  const buildings=location.state?.buildings;
  return(
    <div className="buildings-panel">
      {
        <ul className="building-view">
          {buildings.map((bldg, index) => (
            <li key= {index} className="bldg-view"> {bldg} </li>
          ))
          }
        </ul>
      }
    </div>
  )
}
