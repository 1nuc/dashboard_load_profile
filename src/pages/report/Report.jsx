import { useState, useContext } from 'react';
import './Report.css';
import { adminContext } from '../../components/AdminContext/adminContext';

export const Report=()=>{
  const {isAdmin, setIsAdmin}=useContext(adminContext);
  const State=useLocation();
  const flattend_data= globalState.state?.flatten_data;
  if (!flatten_data || flatten_data.length=== 0){
    return;
  }

  // return (
      // <div className="cross-validation">
      //   <table>
      //     <thead>
      //       <tr>
      //         {crossValid_cols.map((val) => (
      //             <th key={val}> {val} </th>
      //           ))}
      //       </tr>
      //     </thead>
      //     <tbody>
      //         {crossValid.map((val, key) => (
      //         <tr key={key}>
      //             <td> {val['LSTM Model']} </td>
      //             <td> {val['BI Lstm Model']} </td>
      //             <td> {val['Stacked Lstm Model']} </td>
      //             <td> {val['Stacked BiLstm Model']} </td>
      //             <td> {val[' Sequence To Sequence Model']} </td>
      //             <td> {val[' Metrics']} </td>
      //             <td> {val['iteration']} </td>
      //         </tr>
      //           ))}
      //     </tbody>
      //   </table>
      // </div>
  // );
}
