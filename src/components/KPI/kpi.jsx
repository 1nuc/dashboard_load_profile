import { useEffect } from 'react';
import './kpi.css'
export function KPI({data, startDate, endDate}){
    if (data.length===0 || !data) return;
    const columns=data[0]? 
    Object.keys(data[0]).filter(col => col!=="timestamp"): "";
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    return (
      <div className="kpi">
        <ul>
          {columns.map((col) => (
            <li key={col} className={`${col}-kpi`}>
              <div className="kpi-label">{col} </div>
              <div className="kpi-value">
                {filtered_data.reduce(
                (acc, item) => acc + Number(item[col] || 0),0).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
}
