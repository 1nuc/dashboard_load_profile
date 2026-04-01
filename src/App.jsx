import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/sidebar-component/sidebar'
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';

function App() {
  return (
      <BrowserRouter>
          <Sidebar/> 
          <Routes>
              <Route path='/dashboard' element={ <Dashboard/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
