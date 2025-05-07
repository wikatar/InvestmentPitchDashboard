import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PortfolioCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    initialCapital: 1000,
    strategyAllocations: []
  });
  const [errors, setErrors] = useState({});

  // Fetch available strategies
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in a real app, this would be fetched from the API
        const mockStrategies = [
          { id: 1, name: 'Market Making' },
          { id: 2, name: 'Volume Arbitrage' },
          { id: 3, name: 'News Sentiment' },
          { id: 4, name: 'Correlation Trading' }
        ];
        
        setStrategies(mockStrategies);
        
        // Initialize strategy allocations with 0%
        setFormData(prev => ({
          ...prev,
          strategyAllocations: mockStrategies.map(strategy => ({
            id: strategy.id,
            name: strategy.name,
            allocation: 0
          }))
        }));
      } catch (error) {
        console.error('Error fetching strategies:', error);
      }
    };

    fetchStrategies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    
    // Clear error for this field when user changes value
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAllocationChange = (id, value) => {
    const allocation = parseInt(value, 10);
    
    setFormData(prev => ({
      ...prev,
      strategyAllocations: prev.strategyAllocations.map(strategy => 
        strategy.id === id ? { ...strategy, allocation } : strategy
      )
    }));
    
    if (errors.strategyAllocations) {
      setErrors(prev => ({ ...prev, strategyAllocations: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Portfolio name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (isNaN(formData.initialCapital) || formData.initialCapital <= 0) {
      newErrors.initialCapital = 'Initial capital must be a positive number';
    }
    
    // Check if strategy allocations sum to 100%
    const allocationSum = formData.strategyAllocations.reduce((sum, strategy) => sum + strategy.allocation, 0);
    if (allocationSum !== 100) {
      newErrors.strategyAllocations = 'Strategy allocations must sum to 100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create the portfolio
      console.log('Portfolio data submitted:', formData);
      
      // Redirect to portfolios page on success
      navigate('/portfolios');
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setErrors({ submit: 'Failed to create portfolio. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate remaining allocation
  const remainingAllocation = 100 - formData.strategyAllocations.reduce((sum, strategy) => sum + strategy.allocation, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Portfolio</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
            {errors.submit}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Portfolio Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Portfolio Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
            
            {/* Initial Capital */}
            <div>
              <label htmlFor="initialCapital" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Capital ($)
              </label>
              <input
                type="number"
                id="initialCapital"
                name="initialCapital"
                min="0"
                step="100"
                value={formData.initialCapital}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.initialCapital ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.initialCapital && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.initialCapital}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Strategy Allocations */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Strategy Allocations</h2>
            <div className={`text-sm font-medium ${remainingAllocation === 0 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
              Remaining: {remainingAllocation}%
            </div>
          </div>
          
          {errors.strategyAllocations && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
              {errors.strategyAllocations}
            </div>
          )}
          
          <div className="space-y-4">
            {formData.strategyAllocations.map((strategy) => (
              <div key={strategy.id} className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{strategy.name}</h3>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={strategy.allocation}
                      onChange={(e) => handleAllocationChange(strategy.id, e.target.value)}
                      className="w-40 mr-4"
                    />
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={strategy.allocation}
                        onChange={(e) => handleAllocationChange(strategy.id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <span className="ml-1 text-gray-700 dark:text-gray-300">%</span>
                    </div>
                  </div>
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
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <Link
            to="/portfolios"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioCreate; 