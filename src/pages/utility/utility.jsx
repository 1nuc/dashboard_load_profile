import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './utility.css'
export function UtilityView (){
  const location=useLocation();
  const buildings=location.state?.buildings;
  const [searched, useSearched]=useState([]);
  return(
    <div className="buildings-panel">
      <div className="search-bldg">
      <h1> Select a building</h1>
      <p> click a building to view its dashboard</p>
            <label>
                 <textarea className="bldg-search" value={searched} onChange={()=> setSearched()} 
        placeholder='Search building ID, ex. 171237'/>
            </label>
      </div>
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
