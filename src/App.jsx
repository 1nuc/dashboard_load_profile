import { useState, useRef, useEffect } from 'react';
import viteLogo from './assets/vite.svg';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element={ <Dashboard/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
