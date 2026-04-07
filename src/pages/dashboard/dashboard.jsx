import { LinePlot } from '../../components/plots-component/lineplot'
import { AreaPlot } from '../../components/plots-component/areachart'
import { PiePlot } from '../../components/plots-component/piechart'
import { BarPlot} from '../../components/plots-component/barchart'
import { DougnutPlot } from '../../components/plots-component/doughnut'
import Navbar from '../../components/navbar-component/navbar'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import{ GetPredictions } from '../../services/getPredictions'

const Linearplot= ({data}) => {
  const Data={
    labels:data.timestamp,
    datasets: [
      {
        label:"AC",
        data:data.AC,
        borderColor: "rgb(75, 192, 192)"
      },
    ],
  };
  return (
    <>
          <LinePlot Data={Data}/>
    </>
  )

}

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
          </div>
        )

      }
      <Navbar/>
      <div className= "dashboard">
          <AreaPlot/>
          <PiePlot/>
          <BarPlot/>
          <DougnutPlot/>
          <Linearplot data= {data}/>
          {/* <MultiTypePlot/> */}
      </div>
    </>
  )
}
