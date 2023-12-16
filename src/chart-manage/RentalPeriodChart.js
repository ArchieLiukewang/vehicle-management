import React, { useEffect, useState } from 'react';
import { Line,LineChart,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const RentalPeriodChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API or source
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rentals/all'); // Adjust the API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Rental Period Chart</h2>
      <LineChart width={600} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rental_period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line  dataKey="rental_period" fill="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RentalPeriodChart;






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
