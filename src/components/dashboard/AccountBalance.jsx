import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AccountBalance = () => {
  // Mock account data
  const accounts = [
    {
      id: 1,
      name: 'Main Investment Account',
      balance: 15420.65,
      number: 'ACCT-8372',
      assets: [
        { name: 'Stocks', balance: 10250.45, color: 'rgba(39, 174, 96, 0.8)' },
        { name: 'ETFs', balance: 3210.20, color: 'rgba(142, 68, 173, 0.8)' },
        { name: 'Bonds', balance: 1960.00, color: 'rgba(41, 128, 185, 0.8)' },
      ]
    },
    {
      id: 2,
      name: 'Trading Account',
      balance: 8750.32,
      number: 'ACCT-9451',
      assets: [
        { name: 'Stocks', balance: 5500.32, color: 'rgba(39, 174, 96, 0.8)' },
        { name: 'ETFs', balance: 2250.00, color: 'rgba(142, 68, 173, 0.8)' },
        { name: 'Options', balance: 1000.00, color: 'rgba(41, 128, 185, 0.8)' },
      ]
    }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: 'Deposit',
      amount: 1000,
      asset: 'USD',
      time: '2023-05-20 14:30',
      status: 'Completed',
      account: 'ACCT-8372'
    },
    {
      id: 2,
      type: 'Trade',
      amount: 250,
      asset: 'AAPL',
      time: '2023-05-19 10:15',
      status: 'Completed',
      account: 'ACCT-9451'
    },
    {
      id: 3,
      type: 'Withdrawal',
      amount: 500,
      asset: 'USD',
      time: '2023-05-18 16:45',
      status: 'Completed',
      account: 'ACCT-8372'
    },
    {
      id: 4,
      type: 'Deposit',
      amount: 750,
      asset: 'USD',
      time: '2023-05-17 09:22',
      status: 'Completed',
      account: 'ACCT-9451'
    }
  ];

  // Data for the account composition chart
  const chartData = {
    labels: ['Main Investment Account', 'Trading Account'],
    datasets: [
      {
        label: 'Stocks',
        data: [accounts[0].assets[0].balance, accounts[1].assets[0].balance],
        backgroundColor: 'rgba(39, 174, 96, 0.8)',
        borderColor: 'rgba(39, 174, 96, 1)',
        borderWidth: 1,
      },
      {
        label: 'ETFs',
        data: [accounts[0].assets[1].balance, accounts[1].assets[1].balance],
        backgroundColor: 'rgba(142, 68, 173, 0.8)',
        borderColor: 'rgba(142, 68, 173, 1)',
        borderWidth: 1,
      },
      {
        label: accounts[0].assets[2].name,
        data: [accounts[0].assets[2].balance, 0],
        backgroundColor: 'rgba(41, 128, 185, 0.8)',
        borderColor: 'rgba(41, 128, 185, 1)',
        borderWidth: 1,
      },
      {
        label: accounts[1].assets[2].name,
        data: [0, accounts[1].assets[2].balance],
        backgroundColor: 'rgba(230, 126, 34, 0.8)',
        borderColor: 'rgba(230, 126, 34, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
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
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        }
      },
      y: {
        stacked: true,
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        }
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="p-4 bg-white rounded-lg shadow dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {account.name}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {account.number}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="space-y-2">
              {account.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 rounded-full" 
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {asset.name}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${asset.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Account Composition
          </h3>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Recent Transactions
          </h3>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-3 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === 'Deposit' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : transaction.type === 'Withdrawal'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {transaction.asset === 'USD' ? '$' : ''}{transaction.amount.toLocaleString()} {transaction.asset === 'USD' ? '' : transaction.asset}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {transaction.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {transaction.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance; 