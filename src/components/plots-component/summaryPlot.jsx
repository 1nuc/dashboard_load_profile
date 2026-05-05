import * as Plot from '@observablehq/plot';
import { useRef, useEffect, useMemo } from 'react'

export function SumChart({flatten_data, temporal}){
  const sumRef=useRef();
  useEffect(()=>{
    if(!flatten_data) return;
    const SumPlot=Plot.plot({
      height: 400,
      width: 1400,
      marginLeft:180,
      color: {legend: true},
      style:{
        fontSize: '11px',
        background: 'transparent',
        color: '#19194f',
      },
      marginLeft: 120,
      marks: [
        Plot.barX(flatten_data, Plot.groupY({x: "sum"},
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
  },[flatten_data, temporal]);

  return (
    <div className="sum-card" ref={sumRef}/>
  );
}
