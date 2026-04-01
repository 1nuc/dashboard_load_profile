import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto'
import { Data } from "../dataset/dataset";
export const DougnutPlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="doughnut-card">
      <Doughnut options={options} data={Data}/>
    </div>
  )

}
