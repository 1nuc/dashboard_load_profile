import { LinearPlot } from '../../components/plots-component/lineplot'
import { PiePlot } from '../../components/plots-component/piechart'
import { BarChart } from '../../components/plots-component/barchart'
import { DougnutPlot } from '../../components/plots-component/doughnut'
import Navbar from '../../components/navbar-component/navbar'
import { useState, useEffect,useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import{ GetPredictions } from '../../services/getPredictions'
import { HorBarChart } from '../../components/plots-component/HorizontalBarChart'
export const Dashboard=()=>{
  // use the global location to render the buildilng ID
  const [data, setData]=useState([]);
  const globalState=useLocation();
  const building= globalState.state?.building;
  const [isLoading, setIsLoading]=useState(false);
  const [temporal, setTemporal]=useState(null);
  const [startDate, setStartDate]=useState("");
  const [endDate, setEndDate]=useState("");

  useEffect(()=>{
    async function fetchData(){
      await GetPredictions({setData, building, setIsLoading});
    }
    fetchData();
  },[building]);
  // convert the datetime 
  let Data=data?.map(d =>({...d, timestamp: new Date(d["timestamp"])}));
  const dateTimeRange=Data.map(d=> d.timestamp);
  return (
    <div>
      {
        isLoading &&(
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )

      }
      <Navbar temporal={temporal} setTemporal={setTemporal} 
        startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateTimeRange={dateTimeRange}/>
      <div className= "dashboard">
          <LinearPlot data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>
          <HorBarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>
          <BarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} col="AC"/>
          <PiePlot/>
          <DougnutPlot/>
          {/* <MultiTypePlot/> */}
      </div>
    </div>
  )
}
