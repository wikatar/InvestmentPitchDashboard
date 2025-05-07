import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Strategies = () => {
  const [loading, setLoading] = useState(true);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    // Mock data fetching
    const fetchStrategies = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockStrategies = [
          {
            id: 1,
            name: 'Volume Arbitrage',
            description: 'Exploits volume discrepancies between markets',
            status: 'active',
            pnl: 452.37,
            roi: 12.5,
            positions: 4,
            createdAt: '2023-08-15'
          },
          {
            id: 2,
            name: 'News Sentiment',
            description: 'Analyzes news sentiment to predict market movements',
            status: 'active',
            pnl: 189.42,
            roi: 5.2,
            positions: 2,
            createdAt: '2023-09-02'
          },
          {
            id: 3,
            name: 'Correlation Trading',
            description: 'Trades based on correlations between related markets',
            status: 'paused',
            pnl: 78.15,
            roi: 2.1,
            positions: 1,
            createdAt: '2023-09-10'
          },
          {
            id: 4,
            name: 'Market Making',
            description: 'Provides liquidity through bid-ask spread',
            status: 'active',
            pnl: 624.91,
            roi: 18.7,
            positions: 5,
            createdAt: '2023-07-22'
          }
        ];
        
        setStrategies(mockStrategies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching strategies:', error);
        setLoading(false);
      }
    };

    fetchStrategies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Trading Strategies</h1>
        <Link 
          to="/strategies/create" 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Strategy
        </Link>
      </div>
      
      {/* Filters - Can be expanded later */}
      <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              id="status-filter"
              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="stopped">Stopped</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
            <select
              id="sort-by"
              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="pnl">PnL</option>
              <option value="roi">ROI</option>
              <option value="positions">Positions</option>
              <option value="created">Date Created</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Strategies List */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md dark:bg-gray-800">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {strategies.map((strategy) => (
            <li key={strategy.id}>
              <Link to={`/strategies/${strategy.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 truncate">{strategy.name}</p>
                      <div className="ml-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          strategy.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                          strategy.status === 'paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 
                          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}>
                          {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center ml-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className={`font-medium ${strategy.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ${strategy.pnl.toFixed(2)}
                      </span>
                      <span className="ml-2">ROI: {strategy.roi}%</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {strategy.description}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                      <p>
                        {strategy.positions} active positions
                      </p>
                      <p className="ml-6">
                        Created on {new Date(strategy.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Strategies; 