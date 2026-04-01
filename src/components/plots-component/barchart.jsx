import { Bar } from "react-chartjs-2";
import 'chart.js/auto'
import { Data } from "../dataset/dataset";

export const BarPlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="bar-card">
      <Bar options={options} data={Data}/>
    </div>
  )

}
