import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function BarChart({data, temporal, device}){
  const barRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const BarPlot=Plot.plot({
      title:`${device} Usage`,
      height: 300,
      width: 700,
      marginRight: 80,
      marginLeft: 80,
      marginBottom: 80,
      color: {legend: true},
      style:{
        fontSize: '13px',
        background: 'transparent',
      },
      marks: [
        Plot.rectY(data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "Total Consumption",
          interval:temporal || "month",
          fill: '#6827F5',
        })),
        Plot.ruleY([0])
      ],
      y: {
        grid: true,
      },
    });

    barRef.current.innerHTML = "";
    barRef.current.append(BarPlot);
    return ()=> BarPlot.remove();
  },[data, temporal, device]);

  return (
    <div className="bar-card" ref={barRef}/>
  );
}
