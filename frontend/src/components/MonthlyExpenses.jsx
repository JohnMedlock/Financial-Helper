import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './Dashboard.css';

const MonthlyExpenses = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const url = `http://localhost:3000/api/users/charts/get?email=${email}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const container = await response.json();

        if (
          container &&
          container.accountBalanceOverTime
        ) {
          let points = container.accountBalanceOverTime;
          points.sort((a, b) => new Date(a.date) - new Date(b.date));

          const labels = [];
          const inflows = [];
          const outflows = [];
          for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const dateObj = new Date(curr.date);
            const label = dateObj.toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            });
            labels.push(label);

            const delta = curr.balance - prev.balance;
            if (delta > 0) {
              inflows.push(delta);
              outflows.push(0);
            } else {
              inflows.push(0);
              outflows.push(-delta);
            }
          }
          setChartData({ labels, inflows, outflows });
        }
      } catch (error) {
        console.error('Error fetching monthly expenses data:', error);
      }
    };

    if (email) {
      fetchChartData();
    }
  }, [email]);

  useEffect(() => {
    if (!chartData) return;
    const ctx = chartRef.current.getContext('2d');
    const monthlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Inflow',
            data: chartData.inflows,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // greenish
          },
          {
            label: 'Outflow',
            data: chartData.outflows,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // reddish
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
          },
          y: {
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Inflow & Outflow',
          },
        },
      },
    });

    return () => {
      monthlyChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="expenses-chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MonthlyExpenses;
