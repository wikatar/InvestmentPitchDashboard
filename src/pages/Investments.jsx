import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Investments = () => {
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockInvestments = [
          {
            id: 1,
            name: 'Apple Inc. (AAPL)',
            category: 'Technology',
            volume: 3587421.52,
            liquidity: 425632.18,
            expiry: 'N/A',
            hasPosition: true,
            outcomes: [
              { name: 'Current Price', price: 187.48 },
              { name: 'Change', price: 1.52 }
            ]
          },
          {
            id: 2,
            name: 'S&P 500 Index (SPX)',
            category: 'Index',
            volume: 1289745.35,
            liquidity: 235421.93,
            expiry: 'N/A',
            hasPosition: false,
            outcomes: [
              { name: 'Current Price', price: 5078.32 },
              { name: 'Change', price: 12.68 }
            ]
          },
          {
            id: 3,
            name: 'Tesla Inc. (TSLA)',
            category: 'Automotive',
            volume: 864521.47,
            liquidity: 124587.62,
            expiry: 'N/A',
            hasPosition: true,
            outcomes: [
              { name: 'Current Price', price: 214.71 },
              { name: 'Change', price: -3.29 }
            ]
          },
          {
            id: 4,
            name: 'Bitcoin (BTC-USD)',
            category: 'Cryptocurrency',
            volume: 452178.92,
            liquidity: 87452.36,
            expiry: 'N/A',
            hasPosition: false,
            outcomes: [
              { name: 'Current Price', price: 67242.62 },
              { name: 'Change', price: 851.38 }
            ]
          },
          {
            id: 5,
            name: 'NVIDIA Corporation (NVDA)',
            category: 'Technology',
            volume: 723654.15,
            liquidity: 156842.28,
            expiry: 'N/A',
            hasPosition: false,
            outcomes: [
              { name: 'Current Price', price: 108.43 },
              { name: 'Change', price: 1.57 }
            ]
          }
        ];
        
        setInvestments(mockInvestments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching investments:', error);
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  // Filter investments based on category and search query
  const filteredInvestments = investments.filter(investment => {
    const matchesCategory = filter === 'all' || investment.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Investments</h1>
      
      {/* Filters */}
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              id="category-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="index">Index</option>
              <option value="automotive">Automotive</option>
              <option value="cryptocurrency">Cryptocurrency</option>
              <option value="finance">Finance</option>
              <option value="energy">Energy</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search Investments</label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticker or company name..."
              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
      
      {/* Investments List */}
      {filteredInvestments.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No investments found matching your filters.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow rounded-lg dark:bg-gray-800">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredInvestments.map((investment) => (
              <li key={investment.id}>
                <Link to={`/investments/${investment.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{investment.name}</p>
                          {investment.hasPosition && (
                            <span className="inline-flex items-center px-2.5 py-0.5 ml-2 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-800 dark:text-green-100">
                              In Portfolio
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            {investment.category}
                          </span>
                          {investment.expiry !== 'N/A' && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              Expires: {new Date(investment.expiry).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Volume</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${investment.volume.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Market Cap</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${investment.liquidity.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {investment.outcomes.map((outcome, index) => (
                        <div key={index} className={`flex justify-between p-2 rounded ${
                          outcome.name === 'Change' && outcome.price < 0 
                            ? 'bg-red-50 dark:bg-red-900/20' 
                            : outcome.name === 'Change' && outcome.price > 0
                              ? 'bg-green-50 dark:bg-green-900/20'
                              : 'bg-gray-50 dark:bg-gray-700'
                        }`}>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{outcome.name}</span>
                          <span className={`text-sm font-semibold ${
                            outcome.name === 'Change' && outcome.price < 0
                              ? 'text-red-600 dark:text-red-400'
                              : outcome.name === 'Change' && outcome.price > 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-900 dark:text-white'
                          }`}>
                            {outcome.name === 'Change' && outcome.price > 0 ? '+' : ''}
                            {outcome.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Investments; 