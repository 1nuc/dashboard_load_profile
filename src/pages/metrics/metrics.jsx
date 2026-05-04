import { getMetrics } from '../../services/getMetrics';
import { useState, useEffect, useContext } from 'react';
import './metrics.css';
import { adminContext } from '../../components/AdminContext/adminContext';

export const Metrics=()=>{
  const {isAdmin, setIsAdmin}=useContext(adminContext);
  const [metricsreq, setMetricsReq]=useState([]);
  useEffect(()=>{
    async function fetchMetrics(){
      await getMetrics({setMetricsReq});
    }
    fetchMetrics();
  }, []);
  if (!metricsreq || metricsreq.length=== 0){
    return;
  }
  //defining the metrics variable
  const evalMetrics=JSON.parse(metricsreq.eval_metrics);
  // defining the variable needed to hold the columns
  const metrics_cols=Object.keys(evalMetrics[0]);

  //defining the crossvalidation variable
  const crossValid=JSON.parse(metricsreq.cross_val_metrics);
  // defining the variable needed to hold the columns
  const crossValid_cols=Object.keys(crossValid[0]);

  return (
    <div className="metrics-page">
      <div className="metrics">
        <table>
          <thead>
            <tr>
              {metrics_cols.map((val) => (
                  <th key={val}> {val} </th>
                ))}
            </tr>
          </thead>
          <tbody>
              {evalMetrics.map((val, key) => (
              <tr key={key}>
                  <td> {val.MSE} </td>
                  <td> {val.R2_score} </td>
                  <td> {val.MAE} </td>
                  <td> {val.RMSE} </td>
              </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isAdmin && <div className="cross-validation">
        <table>
          <thead>
            <tr>
              {crossValid_cols.map((val) => (
                  <th key={val}> {val} </th>
                ))}
            </tr>
          </thead>
          <tbody>
              {crossValid.map((val, key) => (
              <tr key={key}>
                  <td> {val['LSTM Model']} </td>
                  <td> {val['BI Lstm Model']} </td>
                  <td> {val['Stacked Lstm Model']} </td>
                  <td> {val['Stacked BiLstm Model']} </td>
                  <td> {val[' Sequence To Sequence Model']} </td>
                  <td> {val[' Metrics']} </td>
                  <td> {val['iteration']} </td>
              </tr>
                ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
}
