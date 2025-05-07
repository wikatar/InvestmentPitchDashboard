import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const InvestmentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [investment, setInvestment] = useState(null);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would fetch data for the specific investment ID
        const mockInvestment = {
          id: parseInt(id),
          name: 'Apple Inc. (AAPL)',
          description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
          category: 'Technology',
          volume24h: 256340,
          marketCap: 2785920000000,
          dividend: '0.96',
          outcomes: [
            { name: 'Current Price', price: 187.48, volume: 12564000, change: 1.52 },
            { name: '52wk High', price: 198.23, date: '2023-12-14' }
          ],
          priceHistory: [
            { date: '2023-08-01', price: 182.42, volume: 9850000 },
            { date: '2023-08-15', price: 185.45, volume: 10250000 },
            { date: '2023-09-01', price: 183.43, volume: 9650000 },
            { date: '2023-09-15', price: 186.46, volume: 11240000 },
            { date: '2023-10-01', price: 187.47, volume: 10870000 }
          ],
          yourPositions: [
            { shares: 10, avgPrice: 175.44, currentPrice: 187.48 }
          ]
        };
        
        setInvestment(mockInvestment);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching investment data:', error);
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!investment) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The investment you're looking for doesn't exist or has been removed.</p>
        <Link to="/investments" className="mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          Back to investments
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{investment.name}</h1>
          <div className="mt-1 flex items-center">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-800 dark:text-blue-100">
              {investment.category}
            </span>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
              Dividend: ${investment.dividend}/share
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
      
      {/* Investment Overview */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Investment Overview</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{investment.description}</p>
        
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">24h Volume</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${investment.volume24h.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Market Cap</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${investment.marketCap.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Current Price</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${investment.outcomes[0].price.toFixed(2)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">52 Week High</h3>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              ${investment.outcomes[1].price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Stock Details */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Stock Details</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Current Price</h3>
              <span className="text-xl font-bold text-gray-900 dark:text-white">${investment.outcomes[0].price.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Volume:</span>
                <span className="text-gray-900 dark:text-white">{investment.outcomes[0].volume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Change:</span>
                <span className={investment.outcomes[0].change > 0 ? "text-green-600" : "text-red-600"}>
                  ${investment.outcomes[0].change.toFixed(2)} ({(investment.outcomes[0].change / (investment.outcomes[0].price - investment.outcomes[0].change) * 100).toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Buy Shares
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">52 Week High</h3>
              <span className="text-xl font-bold text-gray-900 dark:text-white">${investment.outcomes[1].price.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                <span className="text-gray-900 dark:text-white">{new Date(investment.outcomes[1].date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Distance from High:</span>
                <span className="text-red-600">
                  -${(investment.outcomes[1].price - investment.outcomes[0].price).toFixed(2)} ({((investment.outcomes[0].price - investment.outcomes[1].price) / investment.outcomes[1].price * 100).toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Sell Shares
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Your Positions */}
      {investment.yourPositions.length > 0 && (
        <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Positions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Asset
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
                {investment.yourPositions.map((position, index) => {
                  const pnl = calculatePositionPnl(position);
                  const pnlPercentage = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {investment.name}
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
                          Sell
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

export default InvestmentDetail; 