import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function SumChart({data, temporal, startDate, endDate}){
  const sumRef=useRef();
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
    const SumPlot=Plot.plot({
      title:`Electricity Devices Consumption ${temporal? `Grouped By ${temporal}` : ""}`,
      height: 300,
      width: 1800,
      color: {legend: true},
      marks: [
        Plot.barX(filtered_data, Plot.groupY({x: "sum"},
          {x: 'value',
          y: "device",
          sort: {y: "-x"},
          fill: "device",
        })),
        Plot.ruleX([0])
      ],
      y: {grid: true, label: null},
    });


    sumRef.current.innerHTML = "";
    sumRef.current.append(SumPlot);
    return ()=> SumPlot.remove();
  },[data, temporal, startDate, endDate]);

  return (
    <div className="sum-card" ref={sumRef}/>
  );
}
