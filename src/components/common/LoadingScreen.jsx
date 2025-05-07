import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Loading...</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait while we prepare your dashboard</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 