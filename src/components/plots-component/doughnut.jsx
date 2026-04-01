import { Doughnut } from "react-chartjs-2";
import { 
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from "chart.js";
import { Data } from '../dataset/dataset'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
