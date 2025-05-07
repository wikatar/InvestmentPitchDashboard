import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StrategyPerformance = () => {
  // Mock data for strategies
  const strategies = [
    {
      id: 1,
      name: 'Market Momentum',
      pnl: 1245.67,
      pnlPercent: 12.45,
      pnlChange: 4.5,
      color: 'rgba(59, 130, 246, 0.8)', // blue
      data: [100, 120, 140, 135, 160, 175, 165, 190, 210, 225]
    },
    {
      id: 2,
      name: 'Value Arbitrage',
      pnl: 876.32,
      pnlPercent: 8.76,
      pnlChange: -2.1,
      color: 'rgba(16, 185, 129, 0.8)', // green
      data: [120, 115, 130, 140, 135, 155, 170, 165, 180, 190]
    },
    {
      id: 3,
      name: 'Event-Driven',
      pnl: 432.18,
      pnlPercent: 4.32,
      pnlChange: 1.8,
      color: 'rgba(249, 115, 22, 0.8)', // orange
      data: [80, 100, 95, 110, 115, 100, 120, 135, 140, 145]
    },
  ];

  // Labels for the last 10 days
  const dates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Chart data
  const chartData = {
    labels: dates,
    datasets: strategies.map(strategy => ({
      label: strategy.name,
      data: strategy.data,
      borderColor: strategy.color,
      backgroundColor: strategy.color.replace('0.8', '0.1'),
      tension: 0.4,
      fill: false,
      pointBackgroundColor: strategy.color,
      pointRadius: 3,
      pointHoverRadius: 5,
    })),
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
        borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        titleColor: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#111827',
        bodyColor: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#374151',
        padding: 10,
        boxPadding: 5,
      },
    },
    scales: {
      x: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        }
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {strategies.map(strategy => (
          <div 
            key={strategy.id} 
            className="p-4 bg-white rounded-lg shadow dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{strategy.name}</h3>
              <span 
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  strategy.pnlChange >= 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {strategy.pnlChange >= 0 ? '+' : ''}{strategy.pnlChange}%
              </span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              ${strategy.pnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {strategy.pnlPercent}% return
            </p>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StrategyPerformance; 