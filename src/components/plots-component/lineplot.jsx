import { Line } from "react-chartjs-2";
import 'chart.js/auto';

export const LinePlot = (props)=>{
  const options= {
    maintainAspectRatio: false,
  }
  return ( 
    <div className="line-card">
      <Line options={options} data={props.Data}/>
    </div>
  )

}
