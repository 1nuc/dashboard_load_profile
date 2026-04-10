import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function HorBarChart({data, temporal, startDate, endDate}){
  const horRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const flatten_data=data.flatMap(d => [
      {"timestamp": d.timestamp, "value": d.AC, "device": "AC"},
      {"timestamp": d.timestamp, "value": d.heating, "device": "heating"},
      {"timestamp": d.timestamp, "value": d.television, "device": "television"},
      {"timestamp": d.timestamp, "value": d.dishwasher, "device": "dishwasher"},
      {"timestamp": d.timestamp, "value": d.ceiling_fan, "device": "ceiling_fan"},
      {"timestamp": d.timestamp, "value": d.refrigerator, "device": "refrigerator"},
      {"timestamp": d.timestamp, "value": d.clothes_washer, "device": "clothes_washer"},
    ]);
    const filtered_data= (!startDate || !endDate)? flatten_data :
     flatten_data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const HorBarPlot=Plot.plot({
      title:`Electricity Devices Consumption ${temporal? `Grouped By ${temporal}` : ""}`,
      height: 300,
      width: 1800,
      color: {legend: true},
      x: {type: "utc"},
      marks: [
        Plot.rectY(filtered_data,Plot.binX({y: "sum"},
          {x: 'timestamp',
          y: "value",
          interval: temporal || 'month',
          fy: "device",
          sort: {y: "x"},
          fill: 'device',
        })),
        Plot.ruleY([0])
      ],
      y: {grid: true},
    });


    horRef.current.innerHTML = "";
    horRef.current.append(HorBarPlot);
    return ()=> HorBarPlot.remove();
  },[data, temporal, startDate, endDate]);

  return (
    <div className="hor-bar-card" ref={horRef}/>
  );
}
