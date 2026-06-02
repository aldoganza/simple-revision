import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Warehouse from './components/Warehouse';
import Transaction from './components/Transaction';
import Reports from './components/Reports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/products" 
          element={
            isAuthenticated ? 
            <Product user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/warehouses" 
          element={
            isAuthenticated ? 
            <Warehouse user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/transactions" 
          element={
            isAuthenticated ? 
            <Transaction user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/reports" 
          element={
            isAuthenticated ? 
            <Reports user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
