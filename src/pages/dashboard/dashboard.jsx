import { LinePlot } from '../../components/plots-component/lineplot'
import { AreaPlot } from '../../components/plots-component/areachart'
import { PiePlot } from '../../components/plots-component/piechart'
import { BarPlot} from '../../components/plots-component/barchart'
import { DougnutPlot } from '../../components/plots-component/doughnut'
import Sidebar from '../../components/sidebar-component/sidebar'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import{ GetPredictions } from '../../services/getPredictions'
export const Dashboard=()=>{
  // use the global location to render the buildilng ID
  const [data, setData]=useState([{}]);
  const globalState=useLocation();
  const building= globalState.state?.building;
  const [isLoading, setIsLoading]=useState(false);

  useEffect(()=>{
    async function fetchData(){
      await GetPredictions({setData, building, setIsLoading});
    }
    fetchData();
  },[building]);
  console.log(data);
  return (
    <>
      {
        isLoading &&(
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading..</p>
          </div>
        )

      }
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
