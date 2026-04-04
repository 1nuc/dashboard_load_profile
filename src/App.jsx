import { useState, useRef, useEffect } from 'react';
import viteLogo from './assets/vite.svg';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';
import { UtilityView } from './pages/utility/utility'
import { HomePanel } from './pages/Home/home'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element={ <Dashboard/>}/>
              <Route path='/utilityView' element={ <UtilityView/>}/>
              <Route path='/' element={ <HomePanel/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
