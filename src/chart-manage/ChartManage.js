// Component3.js
import React from 'react';
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import RentalPeriodChart from './RentalPeriodChart';
import RentalRateChart from './RentalRateChart';
import VehicleStatusChart from './VehicleStatusChart';

const ChartManage = () => {
  return (
    <div>
      <h2>Chart Management</h2>
  
      <nav>
        <ul>
          <li>
            <Link to="rate-chart">Rate Chart</Link>
          </li>
          <li>
            <Link to="period-chart">Period Chart</Link>
          </li>
          <li>
            <Link to="status-chart">Status Chart</Link>
          </li>
        </ul>
      </nav>

      {/* Render Subcomponents based on the route */}
  
      <Outlet />
    </div>
  );
};

const TagRoutes = () => {
  return (
    <Routes>
      <Route path="rate-chart"  element={<RentalRateChart />} />
      <Route path="period-chart"  element={<RentalPeriodChart />} />
      <Route path="status-chart"  element={<VehicleStatusChart />} />
    </Routes>
  );
};

export  {ChartManage,TagRoutes};
