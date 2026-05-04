import { useState, useRef, useEffect } from 'react';
import viteLogo from './assets/eng.svg';
import { Routes,useNavigate, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';
import { UtilityView } from './pages/utility/utility'
import { HomePanel } from './pages/Home/home'
import { Metrics } from './pages/metrics/metrics'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element={ <Dashboard/>}/>
              <Route path='/utilityView' element={ <UtilityView/>}/>
              <Route path='/' element={ <HomePanel/>}/>
              <Route path='/Home' element={ <HomePanel/>}/>
              <Route path='/metrics' element={ <Metrics/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
