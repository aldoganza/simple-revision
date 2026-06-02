import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Warehouse = ({ user, onLogout }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    warehouseCode: '',
    warehouseName: '',
    warehouseLocation: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('http://localhost:5000/api/warehouses', formData);
      setMessage({ type: 'success', text: 'Warehouse added successfully!' });
      setFormData({
        warehouseCode: '',
        warehouseName: '',
        warehouseLocation: ''
      });
      setShowForm(false);
      fetchWarehouses();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to add warehouse' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Warehouses</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : 'Add Warehouse'}
          </button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-400' : 'bg-red-100 text-red-800 border border-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Warehouse</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Warehouse Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseCode"
                    value={formData.warehouseCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Warehouse Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseName"
                    value={formData.warehouseName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Warehouse Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseLocation"
                    value={formData.warehouseLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:bg-blue-300"
                >
                  {loading ? 'Adding...' : 'Add Warehouse'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.length > 0 ? (
            warehouses.map((warehouse) => (
              <div key={warehouse.warehouseCode} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {warehouse.warehouseCode}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{warehouse.warehouseName}</h3>
                <p className="text-gray-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {warehouse.warehouseLocation}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No warehouses found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
