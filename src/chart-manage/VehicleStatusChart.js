import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const VehicleStatusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API or source
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles'); // Adjust the API endpoint
        const groupedData = groupDataByCondition(response.data);
        setData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupDataByCondition = (vehicleData) => {
    // Group data by vehicle_condition and count the number of records
    const groupedData = vehicleData.reduce((result, item) => {
      const condition = item.vehicle_condition;

      if (!result[condition]) {
        result[condition] = {
          condition,
          count: 1,
        };
      } else {
        result[condition].count += 1;
      }

      return result;
    }, {});

    // Convert grouped data object to array
    return Object.values(groupedData);
  };

  return (
    <div>
      <h2>Vechicle Condition Chart</h2>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="condition" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default VehicleStatusChart;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// const ChartComponent = () => {
//     const [chartData, setChartData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/rentals/all');
//                 setChartData(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const data = {
//         labels: chartData.map(item =>new Date(item.rental_start_date)),
//         datasets: [
//             {
//                 label: 'Amount Received',
//                 data: chartData.map(item => item.amountReceived),
//                 fill: false,
//                 borderColor: 'rgba(75,192,192,1)',
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             x: [{ type: 'time', time: { unit: 'day' } }],
//             y: [{ type: 'linear', position: 'left' }],
//         },
//     };

//     return <Line data={data}  />;
// };

// export default ChartComponent;
