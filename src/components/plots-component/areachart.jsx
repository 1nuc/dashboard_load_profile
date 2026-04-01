import { PolarArea } from "react-chartjs-2";
import 'chart.js/auto';
import { Data } from "../dataset/dataset";
export const AreaPlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="area-card">
      <PolarArea options={options} data={Data}/>
    </div>
  )

}
