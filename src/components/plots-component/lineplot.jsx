import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function LinearPlot({data, temporal}){
  const linearRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const Lineplot=Plot.plot({
      height: 200,
      width: 1200,
      color: {legend: true},
      marks: [
        Plot.lineY(data,{
          x: "timestamp",
          y: "value",
          interval:temporal || "year",
          stroke: "device",
        }),
      ],
      y: {grid: true},
    });

    linearRef.current.append(Lineplot);
    return ()=> Lineplot.remove();
  },[data, temporal]);

  return (
    <div className="line-card" ref={linearRef}/>
  );
}
