import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MarketDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [market, setMarket] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would fetch data for the specific market ID
        const mockMarket = {
          id: parseInt(id),
          name: 'Will Trump win the 2024 election?',
          description: 'Market resolves to YES if Donald Trump wins the 2024 US Presidential Election.',
          category: 'Politics',
          volume24h: 256340,
          liquidity: 785920,
          expiresAt: '2024-11-05',
          outcomes: [
            { name: 'Yes', price: 0.47, volume: 125640, liquidity: 392960 },
            { name: 'No', price: 0.53, volume: 130700, liquidity: 392960 }
          ],
          priceHistory: [
            { date: '2023-08-01', yes: 0.42, no: 0.58 },
            { date: '2023-08-15', yes: 0.45, no: 0.55 },
            { date: '2023-09-01', yes: 0.43, no: 0.57 },
            { date: '2023-09-15', yes: 0.46, no: 0.54 },
            { date: '2023-10-01', yes: 0.47, no: 0.53 }
          ],
          yourPositions: [
            { outcome: 'Yes', shares: 500, avgPrice: 0.44, currentPrice: 0.47 }
          ]
        };
        
        setMarket(mockMarket);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market:', error);
        setLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Market not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The market you're looking for doesn't exist or has been removed.</p>
        <Link to="/markets" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Back to markets
        </Link>
      </div>
    );
  }

  // Calculate P/L for positions
  const calculatePositionPnl = (position) => {
    return position.shares * (position.currentPrice - position.avgPrice);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{market.name}</h1>
          <div className="mt-1 flex items-center">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-800 dark:text-blue-100">
              {market.category}
            </span>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
              Expires: {new Date(market.expiresAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Trade
          </button>
        </div>
      </div>
      
      {/* Market Overview */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Market Overview</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{market.description}</p>
        
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">24h Volume</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${market.volume24h.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Liquidity</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${market.liquidity.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">YES Price</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${market.outcomes[0].price.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">NO Price</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${market.outcomes[1].price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Outcome Prices */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Outcome Prices</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {market.outcomes.map((outcome, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{outcome.name}</h3>
                <span className="text-xl font-bold text-gray-900 dark:text-white">${outcome.price.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Volume:</span>
                  <span className="text-gray-900 dark:text-white">${outcome.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Liquidity:</span>
                  <span className="text-gray-900 dark:text-white">${outcome.liquidity.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Buy {outcome.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Your Positions */}
      {market.yourPositions.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Positions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Outcome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Shares
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Avg Price
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
                {market.yourPositions.map((position, index) => {
                  const pnl = calculatePositionPnl(position);
                  const pnlPercentage = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {position.outcome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {position.shares}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${position.avgPrice.toFixed(2)}
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
      )}
    </div>
  );
};

export default MarketDetail; 