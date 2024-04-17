import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom';
import './index.css';

import LoginPage from "./pages/loginPage"
import Homepage from "./pages/homepage"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
);
