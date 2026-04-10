import { useEffect } from 'react';

export function KPI({data, startDate, endDate}){
    if (data.length===0 || !data) return;
    const columns=data[0]? 
    Object.keys(data[0]).filter(col => col!=="timestamp"): "";
    console.log(columns);
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    return (
      <div className="kpi">
        <ul>
          {columns.map((col) => (
            <li key={col} className={`${col}-kpi`}> {
              filtered_data.reduce((acc, item) => acc + item[col],0)}
            </li>
          ))}
        </ul>
      </div>
    )
}
