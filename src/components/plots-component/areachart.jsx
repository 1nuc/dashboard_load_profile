import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'
import * as htl from "htl";

export function AreaChart({data, temporal, device, width}){
  const areaRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const AreaPlot=Plot.plot({
      title:`${device} Usage`,
      height: 300,
      width: width? +width: 700,
      marginRight: 80,
      marginLeft: 80,
      color: {legend: true},
      x: {type: "utc"},
      marks: [
        () => htl.svg`<defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="20%" stop-color="steelblue" stop-opacity="0.5" />
            <stop offset="100%" stop-color="brown" stop-opacity="0" />
          </linearGradient>
        </defs>`,
        Plot.areaY(data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "Total",
          interval:temporal || "month",
          fill: "url(#gradient)",
        })),
        Plot.lineY(data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "Total",
          interval:temporal || "month",
          stroke: "steelblue",
        })),
        Plot.ruleY([0])
      ],
      y: {grid: true},
    });

    areaRef.current.innerHTML = "";
    areaRef.current.append(AreaPlot);
    return ()=> AreaPlot.remove();
  },[data, temporal,device]);

  return (
    <div className="area-card" ref={areaRef}/>
  );
}
