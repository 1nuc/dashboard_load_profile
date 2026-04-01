import { MultiType } from "react-chartjs-2";
import 'chart.js/auto'
import { Data } from "../dataset/dataset";

export const MultiTypePlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="multitype-card">
      <MultiType options={options} data={Data}/>
    </div>
  )

}
