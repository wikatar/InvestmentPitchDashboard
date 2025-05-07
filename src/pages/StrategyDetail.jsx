import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const StrategyDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    const fetchStrategy = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would fetch data for the specific strategy ID
        const mockStrategy = {
          id: parseInt(id),
          name: 'Volume Arbitrage',
          description: 'A strategy that exploits volume discrepancies between markets to generate profit.',
          status: 'active',
          createdAt: '2023-08-15',
          pnl: 452.37,
          roi: 12.5,
          positions: [
            { id: 1, market: 'Will Trump win the 2024 election?', position: 'No', amount: 250, currentPrice: 0.52, entryPrice: 0.47 },
            { id: 2, market: 'Will Ethereum price exceed $4000 by Oct 31?', position: 'Yes', amount: 175, currentPrice: 0.32, entryPrice: 0.28 },
            { id: 3, market: 'Will inflation exceed 3% in Q4 2023?', position: 'Yes', amount: 300, currentPrice: 0.71, entryPrice: 0.65 }
          ],
          parameters: {
            minVolume: 1000000,
            minLiquidity: 100000,
            maxSpread: 0.15,
            targetROI: 0.08
          },
          performance: [
            { date: '2023-07-15', pnl: 25.42 },
            { date: '2023-07-22', pnl: 42.17 },
            { date: '2023-07-29', pnl: -12.32 },
            { date: '2023-08-05', pnl: 89.45 },
            { date: '2023-08-12', pnl: 54.23 }
          ]
        };
        
        setStrategy(mockStrategy);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching strategy:', error);
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Strategy not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The strategy you're looking for doesn't exist or has been removed.</p>
        <Link to="/strategies" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Back to strategies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{strategy.name}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Created on {new Date(strategy.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            to={`/strategies/${id}/edit`}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Strategy
          </Link>
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {strategy.status === 'active' ? 'Pause Strategy' : 'Activate Strategy'}
          </button>
        </div>
      </div>
      
      {/* Strategy Overview */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Strategy Overview</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{strategy.description}</p>
        
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Status</h3>
            <div className="mt-1 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                strategy.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                strategy.status === 'paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 
                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}>
                {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total PnL</h3>
            <p className={`mt-1 text-lg font-semibold ${strategy.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${strategy.pnl.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">ROI</h3>
            <p className={`mt-1 text-lg font-semibold ${strategy.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {strategy.roi}%
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Positions</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {strategy.positions.length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Strategy Parameters */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Strategy Parameters</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(strategy.parameters).map(([key, value]) => (
            <div key={key}>
              <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {typeof value === 'number' ? value.toString() : value}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Positions */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Active Positions</h2>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {strategy.positions.map((position) => {
                const pnl = position.amount * (position.currentPrice - position.entryPrice);
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
                      ${pnl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StrategyDetail; 