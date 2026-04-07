import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'

export function LinearPlot({data}){
  const linearRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0 || !data.timestamp) return;
    const formatted_data=data.timestamp?.map((t, i)=>({
      timestamp: new Date(t),
      heating: data.heating?.[i],
    }));
    console.log(formatted_data);
    const Lineplot=Plot.plot({
      height: 200,
      width: 1200,
      marks: [
        Plot.lineY(formatted_data,{
          x: "timestamp",
          y: "heating",
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
