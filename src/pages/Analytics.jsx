import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [performanceData, setPerformanceData] = useState([]);
  const [strategyPerformance, setStrategyPerformance] = useState([]);
  const [categoryAllocation, setCategoryAllocation] = useState([]);
  const [metricsData, setMetricsData] = useState({
    totalPnl: 0,
    winRate: 0,
    averageWin: 0,
    averageLoss: 0,
    maxDrawdown: 0,
    sharpeRatio: 0
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - would be replaced with real API calls
        
        // Performance data (daily/weekly/monthly PnL)
        const mockDailyPerformance = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return {
            date: date.toISOString().split('T')[0],
            pnl: Math.random() * 200 - 80, // Random values between -80 and 120
            cumulative: 0 // Will be calculated below
          };
        });
        
        // Calculate cumulative PnL
        let cumulativePnl = 0;
        mockDailyPerformance.forEach(day => {
          cumulativePnl += day.pnl;
          day.cumulative = cumulativePnl;
        });
        
        // Strategy performance
        const mockStrategyPerformance = [
          { name: 'Market Making', pnl: 450.75, roi: 14.2 },
          { name: 'News Sentiment', pnl: 215.32, roi: 8.7 },
          { name: 'Volume Arbitrage', pnl: -87.45, roi: -3.5 },
          { name: 'Correlation Trading', pnl: 134.89, roi: 5.2 }
        ];
        
        // Category allocation
        const mockCategoryAllocation = [
          { name: 'Politics', value: 32 },
          { name: 'Crypto', value: 25 },
          { name: 'Economics', value: 18 },
          { name: 'Sports', value: 15 },
          { name: 'Entertainment', value: 10 }
        ];
        
        // Performance metrics
        const mockMetricsData = {
          totalPnl: 713.51,
          winRate: 67.8,
          averageWin: 58.24,
          averageLoss: 32.15,
          maxDrawdown: 12.4,
          sharpeRatio: 1.85
        };
        
        setPerformanceData(mockDailyPerformance);
        setStrategyPerformance(mockStrategyPerformance);
        setCategoryAllocation(mockCategoryAllocation);
        setMetricsData(mockMetricsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setLoading(true);
    // In a real app, this would trigger a new API call with the selected time range
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Trading Analytics</h1>
        <div className="mt-2 md:mt-0">
          <div className="inline-flex shadow-sm rounded-md">
            <button
              type="button"
              onClick={() => handleTimeRangeChange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                timeRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => handleTimeRangeChange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => handleTimeRangeChange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                timeRange === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total PnL</p>
          <p className={`mt-1 text-2xl font-semibold ${metricsData.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${metricsData.totalPnl.toFixed(2)}
          </p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Win Rate</p>
          <p className="mt-1 text-2xl font-semibold text-blue-600">{metricsData.winRate}%</p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Avg Win</p>
          <p className="mt-1 text-2xl font-semibold text-green-600">${metricsData.averageWin.toFixed(2)}</p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Avg Loss</p>
          <p className="mt-1 text-2xl font-semibold text-red-600">${metricsData.averageLoss.toFixed(2)}</p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Max Drawdown</p>
          <p className="mt-1 text-2xl font-semibold text-red-600">{metricsData.maxDrawdown}%</p>
        </div>
        
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Sharpe Ratio</p>
          <p className="mt-1 text-2xl font-semibold text-blue-600">{metricsData.sharpeRatio}</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Performance Over Time</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="pnl" 
                name="Daily PnL" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulative" 
                name="Cumulative PnL" 
                stroke="#82ca9d" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Strategy Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Strategy Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={strategyPerformance}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pnl" name="PnL" fill="#8884d8" />
                <Bar dataKey="roi" name="ROI (%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Market Category Allocation */}
        <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Market Category Allocation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Export Analytics Button */}
      <div className="flex justify-end">
        <button 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Export Analytics
        </button>
      </div>
    </div>
  );
};

export default Analytics; 