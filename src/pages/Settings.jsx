import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      tradeConfirmation: true,
      marketUpdates: false,
      priceAlerts: true
    },
    defaultCurrency: 'USD',
    riskLevel: 'medium',
    apiKey: 'sk_live_51Ht78iJK6KjJN9oXrFj4JBzL',
    tradingDefaults: {
      slippage: 0.5
    }
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleNotificationChange = (notificationType, checked) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notificationType]: checked
      }
    }));
  };

  const handleCurrencyChange = (e) => {
    setSettings(prev => ({ ...prev, defaultCurrency: e.target.value }));
  };

  const handleRiskLevelChange = (riskLevel) => {
    setSettings(prev => ({ ...prev, riskLevel }));
  };

  const handleSlippageChange = (e) => {
    const slippage = parseFloat(e.target.value);
    if (!isNaN(slippage) && slippage >= 0 && slippage <= 5) {
      setSettings(prev => ({
        ...prev,
        tradingDefaults: {
          ...prev.tradingDefaults,
          slippage
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would save settings to the backend
      console.log('Settings saved:', settings);
      
      setSuccessMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {successMessage && (
          <div className="p-4 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-200">
            {successMessage}
          </div>
        )}
        
        {/* Theme */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h2>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer text-center ${
                settings.theme === 'light' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              <div className="h-12 w-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Light</h3>
            </div>
            
            <div 
              className={`p-4 border rounded-lg cursor-pointer text-center ${
                settings.theme === 'dark' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              <div className="h-12 w-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Dark</h3>
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications about your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.notifications.email}
                  onChange={(e) => handleNotificationChange('email', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.notifications.push}
                  onChange={(e) => handleNotificationChange('push', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Trade Confirmations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications when transactions are executed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.notifications.tradeConfirmation}
                  onChange={(e) => handleNotificationChange('tradeConfirmation', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Investment Updates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications about stock price movements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.notifications.marketUpdates}
                  onChange={(e) => handleNotificationChange('marketUpdates', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Investment Settings */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={settings.defaultCurrency}
                onChange={handleCurrencyChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Level
              </label>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map((riskLevel) => (
                  <button
                    key={riskLevel}
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      settings.riskLevel === riskLevel
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => handleRiskLevelChange(riskLevel)}
                  >
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="slippage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Transaction Fee (%)
              </label>
              <input
                type="number"
                id="slippage"
                min="0"
                max="5"
                step="0.1"
                value={settings.tradingDefaults.slippage}
                onChange={handleSlippageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* API Settings */}
        <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">API Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                API Key
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="apiKey"
                  disabled
                  value={settings.apiKey}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Copy
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Use this API key to authenticate with the brokerage API.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Regenerate API Key
              </button>
            </div>
          </div>
        </div>
        
        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 