import { LinearPlot } from '../../components/plots-component/lineplot'
import { AreaPlot } from '../../components/plots-component/areachart'
import { PiePlot } from '../../components/plots-component/piechart'
import { BarPlot} from '../../components/plots-component/barchart'
import { DougnutPlot } from '../../components/plots-component/doughnut'
import Navbar from '../../components/navbar-component/navbar'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import{ GetPredictions } from '../../services/getPredictions'


export const Dashboard=()=>{
  // use the global location to render the buildilng ID
  const [data, setData]=useState([]);
  const globalState=useLocation();
  const building= globalState.state?.building;
  const [isLoading, setIsLoading]=useState(false);
  const [temporal, setTemporal]=useState(null);

  console.log(building);
  useEffect(()=>{
    async function fetchData(){
      await GetPredictions({setData, building, setIsLoading});
    }
    fetchData();
  },[building]);
  console.log(data);
  // convert the datetime 
  let Data=data?.map(d =>({...d, timestamp: new Date(d["timestamp"])}));
  return (
    <>
      {
        isLoading &&(
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )

      }
      <Navbar temporal={temporal} setTemporal={setTemporal}/>
      <div className= "dashboard">
          <AreaPlot/>
          <PiePlot/>
          <BarPlot/>
          <DougnutPlot/>
          <LinearPlot data= {Data} temporal={temporal}/>
          {/* <MultiTypePlot/> */}
      </div>
    </>
  )
}
