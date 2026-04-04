import { LinePlot } from '../../components/plots-component/lineplot'
import { AreaPlot } from '../../components/plots-component/areachart'
import { PiePlot } from '../../components/plots-component/piechart'
import { BarPlot} from '../../components/plots-component/barchart'
import { DougnutPlot } from '../../components/plots-component/doughnut'
import Sidebar from '../../components/sidebar-component/sidebar'
// import { MultiTypePlot } from './components/plots-component/multitypeChart'

export const Dashboard=()=>{

  return (
    <>
          <Sidebar/>
      <div className= "dashboard">
          <LinePlot/>
          <AreaPlot/>
          <PiePlot/>
          <BarPlot/>
          <DougnutPlot/>
          {/* <MultiTypePlot/> */}
      </div>
    </>
  )
}
