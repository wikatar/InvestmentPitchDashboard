import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Markets = () => {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockMarkets = [
          {
            id: 1,
            name: 'Will Trump win the 2024 election?',
            category: 'Politics',
            volume: 3587421.52,
            liquidity: 425632.18,
            expiry: '2024-11-05',
            hasPosition: true,
            outcomes: [
              { name: 'Yes', price: 0.48 },
              { name: 'No', price: 0.52 }
            ]
          },
          {
            id: 2,
            name: 'Will Ethereum price exceed $4000 by Oct 31?',
            category: 'Crypto',
            volume: 1289745.35,
            liquidity: 235421.93,
            expiry: '2023-10-31',
            hasPosition: false,
            outcomes: [
              { name: 'Yes', price: 0.32 },
              { name: 'No', price: 0.68 }
            ]
          },
          {
            id: 3,
            name: 'Will inflation exceed 3% in Q4 2023?',
            category: 'Economics',
            volume: 864521.47,
            liquidity: 124587.62,
            expiry: '2023-12-31',
            hasPosition: true,
            outcomes: [
              { name: 'Yes', price: 0.71 },
              { name: 'No', price: 0.29 }
            ]
          },
          {
            id: 4,
            name: 'Will Taylor Swift announce a new album in 2023?',
            category: 'Entertainment',
            volume: 452178.92,
            liquidity: 87452.36,
            expiry: '2023-12-31',
            hasPosition: false,
            outcomes: [
              { name: 'Yes', price: 0.62 },
              { name: 'No', price: 0.38 }
            ]
          },
          {
            id: 5,
            name: 'Will SpaceX launch Starship to orbit in 2023?',
            category: 'Science',
            volume: 723654.15,
            liquidity: 156842.28,
            expiry: '2023-12-31',
            hasPosition: false,
            outcomes: [
              { name: 'Yes', price: 0.43 },
              { name: 'No', price: 0.57 }
            ]
          }
        ];
        
        setMarkets(mockMarkets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  // Filter markets based on category and search query
  const filteredMarkets = markets.filter(market => {
    const matchesCategory = filter === 'all' || market.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase());
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
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Markets</h1>
      
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
              <option value="politics">Politics</option>
              <option value="crypto">Crypto</option>
              <option value="economics">Economics</option>
              <option value="entertainment">Entertainment</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search Markets</label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by market name..."
              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
      
      {/* Markets List */}
      {filteredMarkets.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No markets found matching your filters.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow rounded-lg dark:bg-gray-800">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMarkets.map((market) => (
              <li key={market.id}>
                <Link to={`/markets/${market.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{market.name}</p>
                          {market.hasPosition && (
                            <span className="inline-flex items-center px-2.5 py-0.5 ml-2 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-800 dark:text-green-100">
                              Position
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            {market.category}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            Expires: {new Date(market.expiry).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Volume</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${market.volume.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Liquidity</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${market.liquidity.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {market.outcomes.map((outcome, index) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-50 rounded dark:bg-gray-700">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{outcome.name}</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">${outcome.price.toFixed(2)}</span>
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

export default Markets; 