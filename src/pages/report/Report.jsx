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
    return [...flatten_data].sort((a, b) => b.value- a.value).slice(0,10);
  }, [flatten_data]);
  const cols=Object.keys(filtered_data[0]);
  const something=flatten_data.reduce((group, item)=>{
    group.device= (group.device || 0) + item.value;
    return group
  },{});
  console.log(something);
  return (
      <div className="report">
        <table>
          <thead>
            <tr>
              {cols.map((val) => (
                  <th key={val}> {val} </th>
                ))}
            </tr>
          </thead>
          <tbody>
              {filtered_data.map((val, key) => (
              <tr key={key}>
                <td> {val.timestamp.toLocaleDateString()} </td>
                <td> {val.value} </td>
                <td> {val.device} </td>
              </tr>
                ))}
          </tbody>
        </table>
      </div>
  );
}
