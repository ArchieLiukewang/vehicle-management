// PrivateRoute.js
import React from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute =() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");


    return isLoggedIn ? <Outlet/>: <Navigate to="/login" />;
};

export default PrivateRoute;
