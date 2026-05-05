import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './report.css';
import { adminContext } from '../../components/AdminContext/adminContext';

export const Report=()=>{
  const {isAdmin, setIsAdmin}=useContext(adminContext);
  const State=useLocation();
  const flatten_data= State.state?.flatten_data;
  if (!flatten_data || flatten_data.length=== 0){
    return;
  }
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
  );
}
