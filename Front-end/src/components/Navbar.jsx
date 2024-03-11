import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const isLoggedIn = localStorage.getItem('token');

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

   const handleSignout = () => {
    // Clear token from local storage
    localStorage.removeItem('id');
     localStorage.removeItem('token');
      localStorage.removeItem('username');
       localStorage.removeItem('email');
   
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Your code for mobile menu toggle button */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
                <Link to="/articles" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Articles</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <>
                {/* Your code for notifications button */}
                <div className="relative ml-3">
                  <div>
                    <button type="button" onClick={toggleProfileDropdown} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    </button>
                  </div>
                  {/* Your dropdown menu for logged-in users */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Dashboard</Link>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                      <button onClick={handleSignout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Render login button if not logged in
              <a href="/login" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Login</a>
            )}
          </div>
        </div>
      </div>
      {/* Your code for mobile menu */}
    </nav>
  );
}

export default Navbar;
