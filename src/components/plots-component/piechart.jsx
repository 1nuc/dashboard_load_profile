import { Pie } from "react-chartjs-2";
import 'chart.js/auto'
import { Data } from "../dataset/dataset";

export const PiePlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="line-card">
      <Pie options={options} data={Data}/>
    </div>
  )

}
