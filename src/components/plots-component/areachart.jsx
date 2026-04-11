import * as Plot from '@observablehq/plot';
import { useRef, useEffect } from 'react'
import * as htl from "htl";

export function AreaChart({data, temporal, startDate, endDate, device}){
  const areaRef=useRef();
  useEffect(()=>{
    if (!data || data.length===0) return;
    const filtered_data= (!startDate || !endDate)? data :
     data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));
    const AreaPlot=Plot.plot({
      title:`${device} Usage`,
      height: 300,
      width: 700,
      marginRight: 80,
      marginLeft: 80,
      color: {legend: true},
      style:{
        fontSize: '13px',
        background: 'transparent',
      },
      x: {type: "utc"},
      marks: [
        () => htl.svg`<defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="20%" stop-color="steelblue" stop-opacity="0.5" />
            <stop offset="100%" stop-color="brown" stop-opacity="0" />
          </linearGradient>
        </defs>`,
        Plot.areaY(filtered_data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "AC",
          interval:temporal || "month",
          fill: "url(#gradient)",
        })),
        Plot.lineY(filtered_data,
          Plot.binX(
            {y: "sum"}, {
          x: "timestamp",
          y: device || "AC",
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
  },[data, temporal, startDate, endDate, device]);

  return (
    <div className="area-card" ref={areaRef}/>
  );
}
