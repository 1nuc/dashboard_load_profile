import { MultiType } from "react-chartjs-2";
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
