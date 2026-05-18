import { useState, useRef, useEffect, createContext } from 'react';
import viteLogo from './assets/eng.svg';
import { Routes,useNavigate, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';
import { UtilityView } from './pages/utility/utility'
import { HomePanel } from './pages/Home/home'
import { Report } from './pages/report/Report'
import { Metrics } from './pages/metrics/metrics'
import { adminContext } from './components/AdminContext/adminContext'
import { checkServer } from './services/checkServer'
function App() {
  const [isAdmin, setIsAdmin]=useState(false);
  const [status, setStatus]=useState(false);
  const [render, setRender]=useState(false);
  const [data, setData]=useState([]);
  const [building, setBuilding]=useState("");
  useEffect(()=>{
    async function checkServerStatus(){
      await checkServer({setStatus});
    }
    checkServerStatus();
  }, []);

  useEffect(() => {
    if (status) {
      setRender(true);
      const timer = setTimeout(() => setRender(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
      <adminContext.Provider value={{isAdmin, setIsAdmin}}>
      {render && (
          <h2 className="okay-text">
            Server Connection is Successful
          </h2>
        )}
      {!status &&(
          <div className="loading-spinner">
          <h2 className="warning-text">
            Server is offline, ensure the server is online and refresh the page
          </h2>
          </div>
      )}
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element={ <Dashboard data={data} setData={setData} currentBuilding={building} setCurrentBuilding={setBuilding}/>}/>
              <Route path='/utilityView' element={ <UtilityView/>}/>
              <Route path='/' element={ <HomePanel/>}/>
              <Route path='/Home' element={ <HomePanel/>}/>
              <Route path='/metrics' element={ <Metrics/>}/>
              <Route path='/Report' element={ <Report/>}/>
          </Routes>
      </BrowserRouter>
      </adminContext.Provider>
  )
}

export default App
