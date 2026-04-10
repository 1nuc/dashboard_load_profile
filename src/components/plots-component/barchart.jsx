import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function BarChart({data, temporal, startDate, endDate, col}){
  const barRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const BarPlot=Plot.plot({
      title:`${col} Device Usage`,
      height: 200,
      width: 1800,
      color: {legend: true},
      x: {type: "utc"},
      marks: [
        Plot.rectY(filtered_data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: col,
          interval:temporal || "month",
          fill: '#3127F5',
        })),
        Plot.ruleY([0])
      ],
      y: {grid: true},
    });

    barRef.current.append(BarPlot);
    return ()=> BarPlot.remove();
  },[data, temporal, startDate, endDate]);

  return (
    <div className="line-card" ref={barRef}/>
  );
}
