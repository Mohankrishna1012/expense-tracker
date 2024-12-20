import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Entry } from '../App';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
  entries: Entry[];
}

const Chart: React.FC<ChartProps> = ({ entries }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const incomeByMonth = months.map((month) =>
    entries.filter((entry) => entry.month === month && entry.type === 'income').reduce((sum, e) => sum + e.amount, 0)
  );

  const expensesByMonth = months.map((month) =>
    entries.filter((entry) => entry.month === month && entry.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
  );

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeByMonth,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: expensesByMonth,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Monthly Trends' },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default Chart;
