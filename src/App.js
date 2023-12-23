// App.js
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, NavLink} from 'react-router-dom';
import Login from './Login';
import VehicleManagement from './vehicle-info-manage/VehicleManagement';
import RentalManage from './vehicle-rental-manage/RentalManage';
import DriverManage from './driver-manage/DriverManage';
import UserManage from './user-info-manage/UserManage';
import CustomerManage from './customer-manage/CustomerManage';
import UserRegister from './user-info-manage/UserRegister';
import { ChartManage } from './chart-manage/ChartManage';
import { TagRoutes } from './chart-manage/ChartManage';
import {Container, Menu} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';




const App = () => {
 
  const isLoginPage = window.location.pathname === '/login';
  const [isNavVisible, setNavVisibility] =  useState(() => true);
  

  const toggleNavVisibility = () => {
    setNavVisibility((prevIsNavVisible) => !prevIsNavVisible);
  };

  return (
      <Router>
        <Container style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          {/* Navigation Section */}
          {!isLoginPage && (
              <Menu pointing secondary style={{ flex: '0 0 15%', background: '#f0f0f0' }}>
                <Menu.Item as={NavLink} to="/home" activeClassName="active">
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} to="/vehicle-management" activeClassName="active">
                  Vehicle Management
                </Menu.Item>
                <Menu.Item as={NavLink} to="/rental-management" activeClassName="active">
                  Rental Management
                </Menu.Item>
                <Menu.Item as={NavLink} to="/customer-management" activeClassName="active">
                  Customer Management
                </Menu.Item>
                <Menu.Item as={NavLink} to="/driver-management" activeClassName="active">
                  Driver Management
                </Menu.Item>
                <Menu.Item as={NavLink} to="/user-management" activeClassName="active">
                  User Management
                </Menu.Item>
                <Menu.Item as={NavLink} to="/chart-management" activeClassName="active">
                  Chart Management
                </Menu.Item>
              </Menu>
          )}

          <Container fluid style={{ flex: '1', padding: '10px' }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login toggleNav={toggleNavVisibility} />} />
              <Route path="/vehicle-management" element={<VehicleManagement />} />
              <Route path="/rental-management" element={<RentalManage />} />
              <Route path="/customer-management" element={<CustomerManage />} />
              <Route path="/driver-management" element={<DriverManage />} />
              <Route path="/user-management" element={<UserManage />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/chart-management/*" element={<TagRoutes />} />
              <Route path="/chart-management" element={<ChartManage />} />
            </Routes>
          </Container>
        </Container>
      </Router>
  );
};

const Home = () => {
  return <h2>Home Page</h2>;
};

export default App;
