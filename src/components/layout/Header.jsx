import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Bars3Icon, 
  BellIcon, 
  MoonIcon, 
  SunIcon,
  HomeIcon, 
  RectangleGroupIcon, 
  WalletIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  BriefcaseIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Strategies', href: '/strategies', icon: RectangleGroupIcon },
  { name: 'Portfolios', href: '/portfolios', icon: BriefcaseIcon },
  { name: 'Accounts', href: '/accounts', icon: WalletIcon },
  { name: 'Investments', href: '/markets', icon: BanknotesIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // In a real app, this would toggle a class on the document or use a context
    setDarkMode(!darkMode);
    
    // Toggle dark mode class on document
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  return (
    <header className="sticky top-0 z-10 flex flex-col bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Top header section */}
      <div className="flex items-center h-16 px-4 md:px-6">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="w-6 h-6" aria-hidden="true" />
        </button>
        
        <div className="flex items-center flex-shrink-0 ml-4 md:ml-0">
          <h1 className="text-xl font-bold text-primary-600">Investment Dashboard</h1>
        </div>
        
        <div className="flex justify-between flex-1 ml-4">
          <div className="flex flex-1">
            {/* Search field could go here if needed */}
          </div>
          
          <div className="flex items-center ml-4 space-x-4 md:ml-6">
            {/* Dark mode toggle */}
            <button
              type="button"
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              onClick={toggleDarkMode}
            >
              <span className="sr-only">Toggle dark mode</span>
              {darkMode ? (
                <SunIcon className="w-6 h-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
            
            {/* Notification bell */}
            <button
              type="button"
              className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center max-w-xs p-1 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-100 dark:bg-gray-600' : ''
                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle sign out functionality
                        }}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      
      {/* Navigation bar */}
      <div className="hidden px-4 py-2 bg-gray-50 md:block dark:bg-gray-700">
        <nav className="flex space-x-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                }`
              }
            >
              <item.icon
                className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 