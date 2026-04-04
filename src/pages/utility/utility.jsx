import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function UtilityView (){
  const location=useLocation();
  const buildings=location.state?.buildings;

  return(
    <div className="buildings-panel">
      {
        <ul className="builing-view">
          {buildings.map(bldg => {
            <li className="bldg-view"> bldh </li>
          })
          }
        </ul>
      }
    </div>
  )
}
