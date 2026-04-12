import * as Plot from '@observablehq/plot';
import { useRef, useEffect, useMemo } from 'react'

export function SumChart({flatten_data, temporal, startDate, endDate}){
  const sumRef=useRef();
  useEffect(()=>{
    if(!flatten_data) return;
    const filtered_data= (!startDate || !endDate)? flatten_data :
     flatten_data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const SumPlot=Plot.plot({
      height: 400,
      width: 1400,
      marginLeft:180,
      color: {legend: true},
      style:{
        fontSize: '11px',
        background: 'transparent',
      },
      marginLeft: 120,
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
  },[flatten_data, temporal, startDate, endDate]);

  return (
    <div className="sum-card" ref={sumRef}/>
  );
}
