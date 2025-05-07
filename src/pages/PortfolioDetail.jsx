import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PortfolioDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would fetch data for the specific portfolio ID
        const mockPortfolio = {
          id: parseInt(id),
          name: 'Conservative Portfolio',
          description: 'Lower risk markets with high probability outcomes',
          totalValue: 2345.67,
          pnl: 189.42,
          pnlPercentage: 8.35,
          createdAt: '2023-07-15',
          positions: [
            { id: 1, market: 'Will Trump win the 2024 election?', position: 'No', amount: 500, currentPrice: 0.52, entryPrice: 0.47 },
            { id: 2, market: 'Will Ethereum price exceed $4000 by Oct 31?', position: 'Yes', amount: 350, currentPrice: 0.32, entryPrice: 0.28 },
            { id: 3, market: 'Will inflation exceed 3% in Q4 2023?', position: 'Yes', amount: 600, currentPrice: 0.71, entryPrice: 0.65 },
            { id: 4, market: 'Will SpaceX launch Starship to orbit in 2023?', position: 'No', amount: 450, currentPrice: 0.57, entryPrice: 0.52 },
            { id: 5, market: 'Will Taylor Swift announce a new album in 2023?', position: 'Yes', amount: 300, currentPrice: 0.62, entryPrice: 0.58 }
          ],
          strategies: [
            { id: 1, name: 'Market Making', allocation: 40 },
            { id: 2, name: 'Volume Arbitrage', allocation: 60 }
          ],
          historicalPerformance: [
            { date: '2023-06-15', value: 2000.00 },
            { date: '2023-06-30', value: 2050.25 },
            { date: '2023-07-15', value: 2120.78 },
            { date: '2023-07-30', value: 2090.45 },
            { date: '2023-08-15', value: 2175.32 },
            { date: '2023-08-30', value: 2245.89 },
            { date: '2023-09-15', value: 2345.67 }
          ]
        };
        
        setPortfolio(mockPortfolio);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The portfolio you're looking for doesn't exist or has been removed.</p>
        <Link to="/portfolios" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Back to portfolios
        </Link>
      </div>
    );
  }

  // Calculate total PnL for positions
  const calculatePositionPnl = (position) => {
    return position.amount * (position.currentPrice - position.entryPrice);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{portfolio.name}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Created on {new Date(portfolio.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            to={`/portfolios/${id}/edit`}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Portfolio
          </Link>
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Portfolio Overview</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{portfolio.description}</p>
        
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total Value</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${portfolio.totalValue.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total PnL</h3>
            <p className={`mt-1 text-xl font-semibold ${portfolio.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${portfolio.pnl.toFixed(2)} ({portfolio.pnlPercentage >= 0 ? '+' : ''}{portfolio.pnlPercentage.toFixed(2)}%)
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Open Positions</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {portfolio.positions.length}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Strategies</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {portfolio.strategies.length}
            </p>
          </div>
        </div>
      </div>

      {/* Active Positions */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Positions</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Add Position
          </button>
        </div>
        
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Market
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Entry Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Current Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  P/L
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {portfolio.positions.map((position) => {
                const pnl = calculatePositionPnl(position);
                const pnlPercentage = ((position.currentPrice - position.entryPrice) / position.entryPrice) * 100;
                
                return (
                  <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                      {position.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {position.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${position.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${position.entryPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${position.currentPrice.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${pnl.toFixed(2)} ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy Allocation */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Strategy Allocation</h2>
        <div className="space-y-4">
          {portfolio.strategies.map((strategy) => (
            <div key={strategy.id} className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{strategy.name}</h3>
                <span className="text-gray-700 dark:text-gray-300">{strategy.allocation}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${strategy.allocation}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail; 