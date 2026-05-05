import * as Plot from '@observablehq/plot';
import { useRef, useEffect, useMemo } from 'react'

export function LinearPlot({flatten_data, temporal}){
  const linearRef=useRef();
  useEffect(()=>{
    if(!flatten_data) return;
    const Lineplot=Plot.plot({
      height: 400,
      width: 1400,
      marginBottom:80,
      style:{
        fontSize: '13px',
        background: 'transparent',
        overflow: 'hidden',
        color: '#19194f',
      },
      color: {legend: true},
      marks: [
        Plot.lineY(flatten_data,{
          x: "timestamp",
          y: "value",
          interval:temporal || null,
          stroke: "device",
        }),
      ],
      y: {grid: true},
    });

    linearRef.current.innerHTML="";
    linearRef.current.append(Lineplot);
    return ()=> Lineplot.remove();
  },[flatten_data, temporal]);

  return (
    <div className="line-card" ref={linearRef}/>
  );
}
