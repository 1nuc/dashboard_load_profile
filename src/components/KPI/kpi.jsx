import { useEffect } from 'react';
import './kpi.css'
export function KPI({data}){
    if (data.length===0 || !data) return;
    const columns=data[0]? 
    Object.keys(data[0]).filter(col => col!=="timestamp"): "";
    return (
      <div className="kpi">
        <ul>
          {columns.map((col) => (
            <li key={col} className="kpi-card">
              <div className="kpi-label">{col} </div>
              <div className="kpi-value">
                {data.reduce(
                (acc, item) => acc + Number(item[col] || 0),0).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
}
