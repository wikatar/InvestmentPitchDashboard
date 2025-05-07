import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock account data
        const mockAccounts = [
          {
            id: 1,
            name: 'Main Trading Account',
            address: '0x1234...5678',
            network: 'Polygon',
            balance: 3245.67,
            tokens: [
              { symbol: 'USDC', balance: 3245.67 },
              { symbol: 'MATIC', balance: 125.34 }
            ],
            lastActivity: '2023-09-28T14:32:21Z',
            isActive: true
          },
          {
            id: 2,
            name: 'Long-term Holdings',
            address: '0xabcd...ef12',
            network: 'Ethereum',
            balance: 1876.42,
            tokens: [
              { symbol: 'ETH', balance: 0.58 },
              { symbol: 'USDT', balance: 1252.15 }
            ],
            lastActivity: '2023-09-15T09:17:43Z',
            isActive: true
          },
          {
            id: 3,
            name: 'Experimental Account',
            address: '0x7890...1234',
            network: 'Polygon',
            balance: 587.91,
            tokens: [
              { symbol: 'USDC', balance: 587.91 },
              { symbol: 'MATIC', balance: 42.56 }
            ],
            lastActivity: '2023-09-22T17:05:11Z',
            isActive: false
          }
        ];
        
        setAccounts(mockAccounts);
        setTotalBalance(mockAccounts.reduce((sum, account) => sum + account.balance, 0));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      }
    };

    fetchAccounts();
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Accounts</h1>
        <div className="mt-2 md:mt-0 flex items-center space-x-4">
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Connect New Account
          </button>
          <button 
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Data
          </button>
        </div>
      </div>
      
      {/* Total Balance Card */}
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Total Balance</h2>
        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Across {accounts.length} connected accounts
        </p>
      </div>
      
      {/* Accounts List */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg dark:bg-gray-800">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {accounts.map((account) => (
            <li key={account.id}>
              <Link to={`/accounts/${account.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <p className="text-lg font-medium text-blue-600 truncate dark:text-blue-400">
                          {account.name}
                        </p>
                        {account.isActive ? (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            Active
                          </span>
                        ) : (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {account.address} • {account.network}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Last activity: {new Date(account.lastActivity).toLocaleDateString()} {new Date(account.lastActivity).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Tokens */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {account.tokens.map((token, index) => (
                      <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{token.symbol}:</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-400">{token.balance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Note about account integration */}
      <div className="p-4 text-sm bg-blue-50 border border-blue-200 rounded-md text-blue-700 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200">
        <p>
          <strong>Note:</strong> Account data is fetched through secure APIs. Make sure your account is connected to view accurate balances and transactions.
        </p>
      </div>
    </div>
  );
};

export default Accounts; 