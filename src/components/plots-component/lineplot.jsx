import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function LinearPlot({data, temporal, startDate, endDate}){
  const linearRef=useRef();
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
    const Lineplot=Plot.plot({
      height: 200,
      width: 1200,
      color: {legend: true},
      marks: [
        Plot.lineY(filtered_data,{
          x: "timestamp",
          y: "value",
          interval:temporal || null,
          stroke: "device",
        }),
      ],
      y: {grid: true},
    });

    linearRef.current.append(Lineplot);
    return ()=> Lineplot.remove();
  },[data, temporal, startDate, endDate]);

  return (
    <div className="line-card" ref={linearRef}/>
  );
}
