import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Portfolios = () => {
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock portfolio data
        const mockPortfolios = [
          {
            id: 1,
            name: 'Conservative Portfolio',
            description: 'Lower risk markets with high probability outcomes',
            totalValue: 2345.67,
            pnl: 189.42,
            pnlPercentage: 8.35,
            positions: 6,
            createdAt: '2023-07-15',
            strategies: ['Market Making', 'Volume Arbitrage']
          },
          {
            id: 2,
            name: 'Aggressive Growth',
            description: 'Higher risk markets with potential for greater returns',
            totalValue: 1876.32,
            pnl: -123.45,
            pnlPercentage: -6.18,
            positions: 4,
            createdAt: '2023-08-22',
            strategies: ['News Sentiment', 'Correlation Trading']
          },
          {
            id: 3,
            name: 'Political Events',
            description: 'Markets focused on political outcomes and elections',
            totalValue: 3567.89,
            pnl: 456.78,
            pnlPercentage: 14.67,
            positions: 5,
            createdAt: '2023-06-10',
            strategies: ['News Sentiment']
          },
          {
            id: 4,
            name: 'Crypto Markets',
            description: 'Markets related to cryptocurrency price movements',
            totalValue: 1254.36,
            pnl: 67.89,
            pnlPercentage: 5.72,
            positions: 3,
            createdAt: '2023-09-05',
            strategies: ['Volume Arbitrage']
          }
        ];
        
        setPortfolios(mockPortfolios);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Sort portfolios
  const sortedPortfolios = [...portfolios].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'value') {
      comparison = a.totalValue - b.totalValue;
    } else if (sortField === 'pnl') {
      comparison = a.pnl - b.pnl;
    } else if (sortField === 'pnlPercentage') {
      comparison = a.pnlPercentage - b.pnlPercentage;
    } else if (sortField === 'positions') {
      comparison = a.positions - b.positions;
    } else if (sortField === 'createdAt') {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Portfolios</h1>
        <div className="mt-2 md:mt-0">
          <Link 
            to="/portfolios/create" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Portfolio
          </Link>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Name</span>
                    {sortField === 'name' && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center">
                    <span>Value</span>
                    {sortField === 'value' && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort('pnl')}
                >
                  <div className="flex items-center">
                    <span>PnL</span>
                    {sortField === 'pnl' && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort('positions')}
                >
                  <div className="flex items-center">
                    <span>Positions</span>
                    {sortField === 'positions' && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    <span>Created</span>
                    {sortField === 'createdAt' && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {sortedPortfolios.map((portfolio) => (
                <tr key={portfolio.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <Link to={`/portfolios/${portfolio.id}`} className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {portfolio.name}
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">
                        {portfolio.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">${portfolio.totalValue.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${portfolio.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${portfolio.pnl.toFixed(2)} ({portfolio.pnlPercentage >= 0 ? '+' : ''}{portfolio.pnlPercentage.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{portfolio.positions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(portfolio.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link to={`/portfolios/${portfolio.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        View
                      </Link>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <Link to={`/portfolios/${portfolio.id}/edit`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total Portfolios</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{portfolios.length}</p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total Value</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            ${portfolios.reduce((sum, p) => sum + p.totalValue, 0).toFixed(2)}
          </p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total PnL</p>
          <p className={`mt-1 text-3xl font-semibold ${
            portfolios.reduce((sum, p) => sum + p.pnl, 0) >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            ${portfolios.reduce((sum, p) => sum + p.pnl, 0).toFixed(2)}
          </p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total Positions</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {portfolios.reduce((sum, p) => sum + p.positions, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolios; 