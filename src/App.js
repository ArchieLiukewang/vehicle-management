// App.js
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, NavLink} from 'react-router-dom';
import Login from './auth-context/Login';
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
import PrivateRoute from "./auth-context/PrivateRoute";
import {AuthProvider} from "./auth-context/AuthContext";
import RentalRateChart from "./chart-manage/RentalRateChart";
import RentalPeriodChart from "./chart-manage/RentalPeriodChart";
import VehicleStatusChart from "./chart-manage/VehicleStatusChart";




const App = () => {
 
  const isLoginPage = window.location.pathname === '/login' || !sessionStorage.getItem("isLoggedIn");
  const [isNavVisible, setNavVisibility] =  useState(() => true);
  

  const toggleNavVisibility = () => {
    setNavVisibility((prevIsNavVisible) => !prevIsNavVisible);
  };

  return (
      <Router>
        {/*<AuthProvider*/}
        <AuthProvider>
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
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/login" element={<Login toggleNav={toggleNavVisibility} />} />
              <Route path="/home" element={ <PrivateRoute/>} >
                   <Route  path='/home' element={<Home/>}/>
              </Route>

              <Route path="/vehicle-management" element={ <PrivateRoute/>} >
                <Route  path='/vehicle-management' element={<VehicleManagement/>}/>
              </Route>

              <Route path="/rental-management" element={ <PrivateRoute/>} >
                <Route  path='/rental-management' element={<RentalManage/>}/>
              </Route>

              <Route path="/customer-management" element={ <PrivateRoute/>} >
                <Route  path='/customer-management' element={<CustomerManage/>}/>
              </Route>
              <Route path="/driver-management" element={ <PrivateRoute/>} >
                <Route  path='/driver-management' element={<DriverManage/>}/>
              </Route>
              <Route path="/user-management" element={ <PrivateRoute/>} >
                <Route  path='/user-management' element={<UserManage/>}/>
              </Route>

              <Route path="/chart-management/rate-chart" element={ <PrivateRoute/>} >
                <Route  path='/chart-management/rate-chart' element={<RentalRateChart/>}/>
              </Route>
              <Route path="/chart-management/period-chart" element={ <PrivateRoute/>} >
                <Route  path='/chart-management/period-chart' element={<RentalPeriodChart/>}/>
              </Route>
              <Route path="/chart-management/status-chart" element={ <PrivateRoute/>} >
                <Route  path='/chart-management/status-chart' element={<VehicleStatusChart/>}/>
              </Route>

              <Route path="/chart-management" element={ <PrivateRoute/>} >
                <Route  path='/chart-management' element={<ChartManage/>}/>
              </Route>


            </Routes>
          </Container>
        </Container>
          </AuthProvider>
      </Router>
  );
};

const Home = () => {
  return <h2>Home Page</h2>;
};

export default App;
