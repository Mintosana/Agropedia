import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom';
import './index.css';

import LoginPage from "./pages/loginPage";
import Homepage from "./pages/homepage";
import Marketplace from "./pages/marketplace";
import ShopItemDetails from "./pages/shopItemDetails";
import Profile from "./pages/profile";
import AddSale from './pages/addSale';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
      <Route path="/marketplace" element={<Marketplace/>}/>
      <Route path ="/profile" element={<Profile/>}></Route>
      <Route path ="/addSale" element={<AddSale/>}></Route>
      <Route path="/marketplace/:id" element={<ShopItemDetails/>}/>
    </Routes>
    </BrowserRouter>
);
