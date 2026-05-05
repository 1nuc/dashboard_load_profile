import { useState, useContext, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './report.css';
import { adminContext } from '../../components/AdminContext/adminContext';
import { AreaChart } from '../../components/plots-component/areachart'
import html2pdf from 'html2pdf.js'
import { useReactToPrint } from 'react-to-print'

export const Report=()=>{
  // define the ref to be used to download this report as pdf
  const reportRef = useRef();

  const exportPDF = () => {
    const element = reportRef.current;
    const height = element.scrollHeight /3.8;
    const width = element.scrollWidth / 7;

    const opt = {
      filename: `report-${building}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale:3 , useCORS: true, scrollY: 0, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: [width, height], orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };
  const {isAdmin, setIsAdmin}=useContext(adminContext);
  const State=useLocation();
  const flatten_data= State.state?.flatten_data;
  const navigate=useNavigate();
  const temporal= State.state?.temporal;
  const devData= State.state?.devData;
  const building= State.state?.building;

  if (!flatten_data || flatten_data.length===0) return;

  // Extract the data
  const filtered_data=useMemo(()=>{
    return Object.entries(flatten_data.reduce((group, item)=>{
    // if the device has been repeated then sum the value
    // if not then take the value for the first time represented as item.value
    // logic is similar to word count
    group[item.device]= (group[item.device] || 0) + item.value;
    return group
    },{})).map(([device, value]) => ({device, value})
      ).sort((a, b) => b.value- a.value).slice(0,10).map(d=> ({...d, value: d.value.toFixed(3)}));
  }, [flatten_data]);

  const dateTimeRange=flatten_data?.map(d=> d.timestamp);
  const startDate = new Date(dateTimeRange.reduce((a, b) => Math.min(a, b)));
  const endDate = new Date(dateTimeRange.reduce((a, b) => Math.max(a, b)));

  const total=filtered_data.slice(0,1)[0].value;
  const col=filtered_data.slice(0,2)[1].value;
  return (
    <div className="contents">
      <button className="back" onClick={()=> navigate('/Home')}>Home</button>
      <button onClick={exportPDF}>Download PDF</button>
      <div className="report" ref={reportRef}>
        <h2 className="header-report">Load Profile Decomposition Report </h2>
        <div className="text">   This report provides a breakdown of energy consumption across monitored devices for the selected period. 
  Use it to identify high-consumption devices and optimize load distribution.
      </div>
        <div className="table-devices">
          <h2 className="header-report"> Top 10 Devices consuming energy</h2>
          <div className="text">  The table below ranks the top 10 devices by total energy consumed during the reporting period. 
  Values are aggregated across all recorded intervals.
        </div>
          <table>
            <thead>
              <tr>
                  <th> device</th>
                  <th> value</th>
              </tr>
            </thead>
            <tbody>
                {filtered_data.map((val, key) => (
                <tr key={key}>
                  <td> {val.device} </td>
                  <td> {val.value} </td>
                </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="details">
          <ul>
            <li>User</li>
            <li>{isAdmin? "Utility": "Customer"}</li>
            <li>State</li><li> Florida </li>
            <li>Building</li> <li>{building} </li>
            <li>Temporal Unit</li> <li> {temporal? temporal: "Not Set"} </li>
            <li>Start Date</li><li> {startDate.toLocaleString()}</li>
            <li>End Date</li><li> {endDate.toLocaleString()}</li>
            <li> Total Consumption</li> <li>{total} </li>
          </ul>
        </div>

          <h2 className="header-report"> Distribution of The Total Energy Consumption</h2>
          <div className="text">
            Total energy consumption aggregated by {temporal || "month"} for building {building} from {startDate.toISOString().slice(0,10)} to {endDate.toISOString().slice(0,10)}.
            If the plot is empty maybe you should specify the temporal unit
          </div>
        <AreaChart data= {devData} temporal={temporal} device="Total" width="500"/>

          <h2 className="header-report"> Distribution of the Most Consuming Device</h2>
          <div className="text"> The  {col} unit's energy usage trend aggregated by {temporal || "month"}. 
  Peaks may indicate inefficient usage patterns or high-demand periods. if the plot is empty maybe you need to go back to the dashboard and specify the temporal unit</div>
        <AreaChart data= {devData} temporal={temporal} device={col} width="500"/>
      </div>
    </div>
  );
}
