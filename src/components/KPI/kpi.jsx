import { useEffect } from 'react';

export function KPI({data, startDate, endDate}){
  useEffect(()=>{
    if (data.length===0 || !data) return;
    let columns=data[0]? Object.keys(Data[0]): "";
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    return (
      <div className="kpi">
        <ul>
          {columns.map((col, index) => ({
            <li key={index} className=`${col}-kpi`> {
              filtered_data.reduce((acc, item) => acc + item.col,0)}
            </li>
          }))}
        </ul>
      </div>
    )
  },[data, startDate, endDate])
}
