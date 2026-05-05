import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './report.css';
import { adminContext } from '../../components/AdminContext/adminContext';
import { AreaChart } from '../../components/plots-component/areachart'

export const Report=()=>{
  const {isAdmin, setIsAdmin}=useContext(adminContext);
  const State=useLocation();
  const flatten_data= State.state?.flatten_data;
  const temporal= State.state?.temporal;
  const devData= State.state?.devData;
  const building= State.state?.building;
  const startDate= State.state?.startDate;
  const endDate= State.state?.endDate;
  if (!flatten_data || flatten_data.length=== 0){
    return;
  }
  // Extract the data
  const filtered_data=useMemo(()=>{
    if (!flatten_data || flatten_data.length===0) return;
    return Object.entries(flatten_data.reduce((group, item)=>{
    // if the device has been repeated then sum the value
    // if not then take the value for the first time represented as item.value
    // logic is similar to word count
    group[item.device]= (group[item.device] || 0) + item.value;
    return group
    },{})).map(([device, value]) => ({device, value})
      ).sort((a, b) => b.value- a.value).slice(0,10).map(d=> ({...d, value: d.value.toFixed(3)}));
  }, [flatten_data]);

  return (

      <div className="report">
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
            <li>Temporal Unit</li> <li> {temporal? temporal: "not Set"} </li>
            <li>Start Date</li><li> {startDate}</li>
            <li>End Date</li><li> {endDate}</li>
            <li> Total Consumption</li> <li> </li>
          </ul>
        </div>

          <h2 className="header-report"> Distribution of the Most Consuming Device</h2>
          <div className="text"> The chart below shows the AC unit's energy usage trend aggregated by {temporal || "month"}. 
  Peaks may indicate inefficient usage patterns or high-demand periods.</div>
        <AreaChart data= {devData} temporal={temporal} device="AC" width="500"/>
      </div>
  );
}
