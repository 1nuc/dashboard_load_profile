import * as Plot from '@observablehq/plot';
import { useRef, useEffect,useMemo } from 'react'

export function HorBarChart({flatten_data, temporal, startDate, endDate}){
  const horRef=useRef();
  useEffect(()=>{
    if(!flatten_data) return;
    const filtered_data= (!startDate || !endDate)? flatten_data :
     flatten_data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const HorBarPlot=Plot.plot({
      height: 600,
      width: 1000,
      marginRight: 180,
      color: {legend: true},
      style:{
        fontSize: '13px',
        background: 'transparent',
        overflow: 'hidden',
        color: '#19194f',
      },
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
  },[flatten_data, temporal, startDate, endDate]);

  return (
    <div className="hor-bar-card" ref={horRef}/>
  );
}
