import React from 'react';
import { Link } from 'react-router-dom';

// Create custom icons
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
  </svg>
);

const RecentInvestments = () => {
  // Mock data for investments
  const investments = [
    {
      id: 1,
      name: 'Apple Inc. (AAPL)',
      category: 'Technology',
      volume: 1250000,
      price: 187.48,
      trend: 'up',
      change: 1.5,
      lastTraded: '3 mins ago'
    },
    {
      id: 2,
      name: 'Tesla Inc. (TSLA)',
      category: 'Automotive',
      volume: 850000,
      price: 214.71,
      trend: 'down',
      change: -1.8,
      lastTraded: '12 mins ago'
    },
    {
      id: 3,
      name: 'JPMorgan Chase & Co. (JPM)',
      category: 'Finance',
      volume: 2100000,
      price: 198.63,
      trend: 'up',
      change: 0.8,
      lastTraded: '5 mins ago'
    },
    {
      id: 4,
      name: 'Bitcoin ETF (BITO)',
      category: 'Cryptocurrency',
      volume: 1750000,
      price: 37.82,
      trend: 'up',
      change: 3.2,
      lastTraded: '1 min ago'
    },
    {
      id: 5,
      name: 'Microsoft Corp. (MSFT)',
      category: 'Technology',
      volume: 980000,
      price: 425.26,
      trend: 'down',
      change: -0.5,
      lastTraded: '8 mins ago'
    }
  ];

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th 
                      scope="col" 
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
                    >
                      Security
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Category
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Volume
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Price
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Change
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Last Traded
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {investments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white sm:pl-6">
                        <Link 
                          to={`/investments/${investment.id}`} 
                          className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {investment.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {investment.category}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        ${investment.volume.toLocaleString()}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-gray-300">
                        ${investment.price.toFixed(2)}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap">
                        <div 
                          className={`flex items-center ${
                            investment.trend === 'up' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {investment.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          <span className="ml-1">
                            {investment.change > 0 ? '+' : ''}{investment.change}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {investment.lastTraded}
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

export default RecentInvestments; 