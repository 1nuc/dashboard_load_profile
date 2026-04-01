import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import { Data } from "../dataset/dataset";

export const LinePlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="line-card">
      <Line options={options} data={Data}/>
    </div>
  )

}
