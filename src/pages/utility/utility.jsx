import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './utility.css'
export function UtilityView (){
  const location=useLocation();
  const buildings=location.state?.buildings;
  const [searched, setSearched]=useState([]);
  const [searchValue, setSearchValue]=useState("");

  useEffect(()=>{

    setSearched(buildings.slice(0,10));
  },[])
  
  const searchForBuilding=(value)=>{
    setSearched(buildings.filter(bldg => bldg.includes(value)));
    setSearchValue(value);
  }

  return(
    <div className="buildings-panel">
      <div className="search-bldg">
      <h1> Select a building</h1>
      <p> click a building to view its dashboard</p>
            <label>
                 <textarea className="bldg-search" value={searchValue} onChange={(e)=> searchForBuilding(e.target.value)} 
        placeholder='Search building ID, ex. 171237'/>
            </label>
      </div>
      {
        <ul className="building-view">
          {searched.map((bldg, index) => (
            <li key= {index} className="bldg-view"> {bldg} </li>
          ))
          }
        </ul>
      }
    </div>
  )
}
