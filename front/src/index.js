import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom';
import './index.css';

import LoginPage from "./pages/loginPage"
import Homepage from "./pages/homepage"
import Marketplace from "./pages/marketplace"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
      <Route path="/marketplace" element={<Marketplace/>}/>
    </Routes>
    </BrowserRouter>
);
