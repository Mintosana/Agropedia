import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom';
import './index.css';

import LoginPage from "./components/login/loginPage"
import Homepage from "./components/homepage"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);
