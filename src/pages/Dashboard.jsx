import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StrategyPerformance from '../components/dashboard/StrategyPerformance';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import AccountBalance from '../components/dashboard/AccountBalance';
import RecentMarkets from '../components/dashboard/RecentMarkets';

const Dashboard = () => {
  // State for dashboard data
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPnl: 0,
    dailyPnl: 0,
    activeStrategies: 0,
    activePositions: 0,
    accountBalance: 0
  });

  // Mock data loading
  useEffect(() => {
    // This would be replaced with actual API calls
    const loadDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalPnl: 1245.32,
          dailyPnl: 78.54,
          activeStrategies: 4,
          activePositions: 12,
          accountBalance: 5432.10
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            New Strategy
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total PnL</p>
          <p className={`mt-1 text-3xl font-semibold ${stats.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${stats.totalPnl.toFixed(2)}
          </p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Daily PnL</p>
          <p className={`mt-1 text-3xl font-semibold ${stats.dailyPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${stats.dailyPnl.toFixed(2)}
          </p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Active Strategies</p>
          <p className="mt-1 text-3xl font-semibold text-blue-600">{stats.activeStrategies}</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Active Positions</p>
          <p className="mt-1 text-3xl font-semibold text-blue-600">{stats.activePositions}</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Account Balance</p>
          <p className="mt-1 text-3xl font-semibold text-gray-700 dark:text-gray-300">${stats.accountBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Main dashboard sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Strategy Performance */}
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Strategy Performance</h2>
            <Link to="/strategies" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <StrategyPerformance />
        </div>

        {/* Portfolio Summary */}
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Portfolio Summary</h2>
            <Link to="/portfolios" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <PortfolioSummary />
        </div>
      </div>

      {/* Markets Section */}
      <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Markets</h2>
          <Link to="/markets" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <RecentMarkets />
      </div>

      {/* Account Balances */}
      <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Balances</h2>
          <Link to="/accounts" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <AccountBalance />
      </div>
    </div>
  );
};

export default Dashboard; 