import { useEffect } from 'react';
import './kpi.css'
export function Cards({data, device, setDevice}){
    if (data.length===0 || !data) return;
    const columns=data[0]? 
    Object.keys(data[0]).filter(col => col!=="timestamp"): "";
    return (
      <div className="cards">
        <ul>
          {columns.map((col) => (
            <li key={col} className="dev-label"
              onClick={()=> setDevice(col)}> {col}
            </li>
          ))}
        </ul>
      </div>
    )
}
