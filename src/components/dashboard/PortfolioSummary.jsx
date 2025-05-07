import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PortfolioSummary = () => {
  // Mock portfolio data
  const portfolioData = {
    totalValue: 25000,
    allocations: [
      { name: 'US Equities', value: 10000, percentage: 40, color: 'rgba(59, 130, 246, 0.8)' },
      { name: 'International Stocks', value: 7500, percentage: 30, color: 'rgba(16, 185, 129, 0.8)' },
      { name: 'Fixed Income', value: 5000, percentage: 20, color: 'rgba(249, 115, 22, 0.8)' },
      { name: 'Alternative Assets', value: 2500, percentage: 10, color: 'rgba(139, 92, 246, 0.8)' },
    ]
  };

  // Chart data
  const chartData = {
    labels: portfolioData.allocations.map(item => item.name),
    datasets: [
      {
        data: portfolioData.allocations.map(item => item.value),
        backgroundColor: portfolioData.allocations.map(item => item.color),
        borderColor: portfolioData.allocations.map(item => item.color.replace('0.8', '1')),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          },
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
        borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        titleColor: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#111827',
        bodyColor: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#374151',
        padding: 10,
        boxPadding: 5,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = (value / portfolioData.totalValue * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
  };

  return (
    <div>
      <div className="p-4 mb-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Portfolio Value</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          ${portfolioData.totalValue.toLocaleString()}
        </p>
      </div>

      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Asset Allocation</h3>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <div className="h-64">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {portfolioData.allocations.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary; 