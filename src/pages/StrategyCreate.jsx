import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StrategyCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minVolume: 1000000,
    minLiquidity: 100000,
    maxSpread: 0.15,
    targetROI: 0.08
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    
    // Clear error for this field when user changes value
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Strategy name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (isNaN(formData.minVolume) || formData.minVolume <= 0) {
      newErrors.minVolume = 'Minimum volume must be a positive number';
    }
    
    if (isNaN(formData.minLiquidity) || formData.minLiquidity <= 0) {
      newErrors.minLiquidity = 'Minimum liquidity must be a positive number';
    }
    
    if (isNaN(formData.maxSpread) || formData.maxSpread <= 0 || formData.maxSpread >= 1) {
      newErrors.maxSpread = 'Max spread must be a number between 0 and 1';
    }
    
    if (isNaN(formData.targetROI) || formData.targetROI <= 0) {
      newErrors.targetROI = 'Target ROI must be a positive number';
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
      
      // In a real app, this would be an API call to create the strategy
      console.log('Strategy data submitted:', formData);
      
      // Redirect to strategies page on success
      navigate('/strategies');
    } catch (error) {
      console.error('Error creating strategy:', error);
      setErrors({ submit: 'Failed to create strategy. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Strategy</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
            {errors.submit}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Strategy Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Strategy Name
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
        
        {/* Strategy Parameters */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Strategy Parameters</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Min Volume */}
            <div>
              <label htmlFor="minVolume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Volume ($)
              </label>
              <input
                type="number"
                id="minVolume"
                name="minVolume"
                min="0"
                step="1000"
                value={formData.minVolume}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.minVolume ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.minVolume && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minVolume}</p>
              )}
            </div>
            
            {/* Min Liquidity */}
            <div>
              <label htmlFor="minLiquidity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Liquidity ($)
              </label>
              <input
                type="number"
                id="minLiquidity"
                name="minLiquidity"
                min="0"
                step="1000"
                value={formData.minLiquidity}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.minLiquidity ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.minLiquidity && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minLiquidity}</p>
              )}
            </div>
            
            {/* Max Spread */}
            <div>
              <label htmlFor="maxSpread" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Spread (0-1)
              </label>
              <input
                type="number"
                id="maxSpread"
                name="maxSpread"
                min="0"
                max="1"
                step="0.01"
                value={formData.maxSpread}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.maxSpread ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.maxSpread && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxSpread}</p>
              )}
            </div>
            
            {/* Target ROI */}
            <div>
              <label htmlFor="targetROI" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target ROI
              </label>
              <input
                type="number"
                id="targetROI"
                name="targetROI"
                min="0"
                step="0.01"
                value={formData.targetROI}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.targetROI ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.targetROI && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.targetROI}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <Link
            to="/strategies"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Strategy'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StrategyCreate; 