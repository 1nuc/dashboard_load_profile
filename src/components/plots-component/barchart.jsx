import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function BarChart({data, temporal, startDate, endDate, device}){
  const barRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    console.log(device)
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const BarPlot=Plot.plot({
      title:`${device} Usage`,
      height: 200,
      width: 800,
      marginRight: 80,
      color: {legend: true},
      x: {type: "utc"},
      marks: [
        Plot.rectY(filtered_data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "AC",
          interval:temporal || "month",
          fill: '#3127F5',
        })),
        Plot.ruleY([0])
      ],
      y: {grid: true},
    });

    barRef.current.append(BarPlot);
    return ()=> BarPlot.remove();
  },[data, temporal, startDate, endDate, device]);

  return (
    <div className="bar-card" ref={barRef}/>
  );
}
