import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">StockHub SMS</h1>
            <div className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded hover:bg-blue-700 transition ${isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
              <Link
                to="/products"
                className={`px-4 py-2 rounded hover:bg-blue-700 transition ${isActive('/products')}`}
              >
                Products
              </Link>
              <Link
                to="/warehouses"
                className={`px-4 py-2 rounded hover:bg-blue-700 transition ${isActive('/warehouses')}`}
              >
                Warehouses
              </Link>
              <Link
                to="/transactions"
                className={`px-4 py-2 rounded hover:bg-blue-700 transition ${isActive('/transactions')}`}
              >
                Transactions
              </Link>
              <Link
                to="/reports"
                className={`px-4 py-2 rounded hover:bg-blue-700 transition ${isActive('/reports')}`}
              >
                Reports
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user?.username}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
