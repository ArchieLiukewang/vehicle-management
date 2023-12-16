// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import VehicleManagement from './vehicle-info-manage/VehicleManagement';
import RentalManage from './vehicle-rental-manage/RentalManage';
import DriverManage from './driver-manage/DriverManage';
import UserManage from './user-info-manage/UserManage';
import CustomerManage from './customer-manage/CustomerManage';
import UserRegister from './user-info-manage/UserRegister';
import { ChartManage } from './chart-manage/ChartManage';
import { TagRoutes } from './chart-manage/ChartManage';



const App = () => {
 
  const isLoginPage = window.location.pathname === '/login';
  const [isNavVisible, setNavVisibility] =  useState(() => true);
  

  const toggleNavVisibility = () => {
    setNavVisibility((prevIsNavVisible) => !prevIsNavVisible);
  };


  return (
    <Router>
    
      <div style={{ display: 'flex' }}>
        {/* Navigation Section */}
        
        {
        !isLoginPage   &&
         (
        <nav style={{ width: '15%', padding: '5px', background: '#f0f0f0' }}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/vehicle-management">Vehicle Management</Link>
            </li>
            <li>
              <Link to="/rental-management">Rental Management</Link>
            </li>
            <li>
              <Link to="/customer-management">Customer Management</Link>
            </li>
            <li>
              <Link to="/driver-management">Driver Management</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
            <li>
              <Link to="/chart-management">Chart Management</Link>
            </li>
          </ul>
        </nav>
        )}
      
        <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login toggleNav={toggleNavVisibility}/>} />
            <Route path="/vehicle-management"  element={<VehicleManagement />} />
            <Route path="/rental-management"  element={<RentalManage />} />
            <Route path="/customer-management"  element={<CustomerManage />} />
            <Route path="/driver-management"  element={<DriverManage />} />
            <Route path="/user-management"  element={<UserManage />} />
            <Route path="/user-register"  element={<UserRegister />} />
            <Route path="/chart-management/*" element={<TagRoutes />} />
            <Route path="/chart-management"  element={<ChartManage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Home = () => {
  return <h2>Home Page</h2>;
};

export default App;
