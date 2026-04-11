import { useState, useEffect,useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { LinearPlot } from '../../components/plots-component/lineplot'
import { BarChart } from '../../components/plots-component/barchart'
import Navbar from '../../components/navbar-component/navbar'
import{ GetPredictions } from '../../services/getPredictions'
import { HorBarChart } from '../../components/plots-component/PerformanceComparison'
import { SumChart } from '../../components/plots-component/summaryPlot'
import { PieChart } from '../../components/plots-component/pieChart'
import { AreaChart } from '../../components/plots-component/areachart'
import { KPI } from '../../components/KPI/kpi'
import { Cards } from '../../components/KPI/cards'

export const Dashboard=()=>{
  // use the global location to render the buildilng ID
  const [data, setData]=useState([]);
  const globalState=useLocation();
  const building= globalState.state?.building;
  const [isLoading, setIsLoading]=useState(false);
  const [temporal, setTemporal]=useState(null);
  const [startDate, setStartDate]=useState("");
  const [endDate, setEndDate]=useState("");
  const [device, setDevice]=useState("");

  useEffect(()=>{
    async function fetchData(){
      await GetPredictions({setData, building, setIsLoading});
    }
    fetchData();
  },[building]);
  // convert the datetime 
  const Data=useMemo(()=>{

  return data?.map(d =>({...d, timestamp: new Date(d["timestamp"])}));
  }, [data]);
  const dateTimeRange=Data.map(d=> d.timestamp);

  //extracting the columns of the data
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

          <div className="desc1"> 
            <h2>Distribution of All Devices Consumption Grouped By Different Time Scales </h2>
          </div>
          <LinearPlot data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>

          <div className="desc2">
            <h2> Devices Distribution KPIs</h2>
          </div>
          < KPI data={Data} startDate={startDate} endDate={endDate}/>
          < PieChart data={Data} startDate={startDate} endDate={endDate}/>

          <div className="desc3">
            <h2> Summary Total Devices Consumption</h2>
          </div>
          <SumChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} col="AC"/>

          <div className="desc4">
            <h2> Consumption Comparison Between Devices </h2>
          </div>
          <HorBarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>


          <div className="desc5"> 
           <h2> Consumption Distribution of Each Device</h2> 
            <p> Chose a device from the list below to view its consumption distribution</p>
          </div>
          <Cards data={Data} device={device} setDevice={setDevice}/> 
          <BarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} device={device}/>
          <AreaChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} device={device}/>
      </div>
    </div>
  )
}
