import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function LinearPlot({data}){
  const linearRef=useRef();
  useEffect(()=>{
    console.log(data);
    if (!data || data.length===0) return;
    const Lineplot=Plot.plot({
      height: 200,
      width: 1200,
      marks: [
        Plot.lineY(data,{
          x: "timestamp",
          y: "AC",
          interval: "day",
          stroke: "red",
        })
      ],
      y: {grid: true},
    });

    linearRef.current.append(Lineplot);
    return ()=> Lineplot.remove();
  },[data]);

  return (
    <div className="line-card" ref={linearRef}/>
  );
}
