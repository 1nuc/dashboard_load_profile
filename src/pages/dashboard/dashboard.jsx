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
import { generateReport } from '../../utils/pdfexport'

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
  const ExportPDF= async()=>{
    await generateReport(`nrel-dashboard-${building}`);
  };

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
        startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} dateTimeRange={dateTimeRange} exportPDF={ExportPDF}/>
      <div className= "dashboard" id={`nrel-dashboard-${building}`}>

          <div className="desc1"> 
            <h2>Distribution of All Devices Consumption Grouped By Different Time Scales </h2>
           <p>
            This line chart shows the energy consumption trends of all monitored devices over time.
            Use the time-scale selector in the navigation bar to switch between hourly, daily, or
            monthly aggregations. Adjust the date range to zoom into a specific period of interest.
          </p>

        </div>
          <LinearPlot data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>

          <div className="desc2">
            <h2> Devices Distribution KPIs</h2>
            <p>
            The key performance indicators below summarise the total and average energy consumption
            for each device within the selected date range. The pie chart on the right illustrates
            each device's share of the overall consumption, helping identify the highest contributors
            at a glance.
            </p>
          </div>
          < KPI data={Data} startDate={startDate} endDate={endDate}/>
          < PieChart data={Data} startDate={startDate} endDate={endDate}/>

          <div className="desc3">
            <h2> Summary Total Devices Consumption</h2>
            <p>
              This chart aggregates the cumulative energy usage of all devices 
            across the chosen time granularity. It provides a high-level overview of overall building
              load and helps detect periods of unusually high or low consumption.
            </p>

        </div>
          <SumChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} col="AC"/>

          <div className="desc4">
            <h2> Consumption Comparison Between Devices </h2>
            <p>
              The horizontal bar chart ranks devices by their total energy consumption over the selected
              period. This makes it easy to compare performance side-by-side and pinpoint which devices
              are consuming disproportionately more energy relative to others.
            </p>

        </div>
          <HorBarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate}/>


          <div className="desc5"> 
           <h2> Consumption Distribution of Each Device</h2> 
           <p>
              Select a specific device from the cards below to drill down into its individual consumption
              profile. The bar chart displays the distribution of usage across the selected time scale,
              while the area chart reveals cumulative trends and highlights peak-demand intervals for
              that device.
            </p>
          </div>
          <Cards data={Data} device={device} setDevice={setDevice}/> 
          <BarChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} device={device}/>
          <AreaChart data= {Data} temporal={temporal} startDate={startDate} endDate={endDate} device={device}/>
      </div>
    </div>
  )
}
