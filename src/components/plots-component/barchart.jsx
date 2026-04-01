import { Bar } from "react-chartjs-2";
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
