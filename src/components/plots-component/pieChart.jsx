import { Pie } from "react-chartjs-2";
import 'chart.js/auto'
import { useRef, useEffect } from 'react'
import { Data } from "../dataset/dataset";

export function PieChart({data, startDate, endDate}){
  if (!data || data.length===0) return;
  const filtered_data= (!startDate || !endDate)? data :
   flatten_data.filter(d => (d.timestamp>= new Date(startDate) && d.timestamp <= new Date(endDate)));

  const columns=data[0]? 
  Object.keys(data[0]).filter(col => col!=="timestamp"): [];

  const pie_data=columns.map((col) => filtered_data.reduce(
    (acc, item) => acc + Number(item[col] || 0),0));
  const dataset={
    labels: columns,
    datasets:[
      {
        data: pie_data,
      },
    ],
  } 
  const options= {
    maintainAspectRatio: false,
    responsive: true,
    plugins:{
      legend:false,
    }
  }
  return ( 
    <div className="pie-card">
      <Pie options={options} data={dataset}/>
    </div>
  )

}
