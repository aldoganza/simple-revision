import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Transaction = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productCode: '',
    warehouseCode: '',
    transactionDate: '',
    quantityMoved: '',
    transactionType: 'IN'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  const resetForm = () => {
    setFormData({
      productCode: '',
      warehouseCode: '',
      transactionDate: '',
      quantityMoved: '',
      transactionType: 'IN'
    });
    setShowForm(false);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/transactions/${currentId}`, formData);
        setMessage({ type: 'success', text: 'Transaction updated successfully!' });
      } else {
        await axios.post('http://localhost:5000/api/transactions', formData);
        setMessage({ type: 'success', text: 'Transaction added successfully!' });
      }
      resetForm();
      fetchTransactions();
      fetchProducts(); // Refresh to get updated stock quantities
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || `Failed to ${editMode ? 'update' : 'add'} transaction` 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    setEditMode(true);
    setCurrentId(transaction.transactionId);
    setFormData({
      productCode: transaction.productCode,
      warehouseCode: transaction.warehouseCode,
      transactionDate: new Date(transaction.transactionDate).toISOString().split('T')[0],
      quantityMoved: transaction.quantityMoved,
      transactionType: transaction.transactionType
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
        setMessage({ type: 'success', text: 'Transaction deleted successfully!' });
        fetchTransactions();
        fetchProducts(); // Refresh to get updated stock quantities
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.error || 'Failed to delete transaction' 
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Stock Transactions</h2>
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : 'Add Transaction'}
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
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editMode ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="productCode"
                    value={formData.productCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.productCode} value={product.productCode}>
                        {product.productName} ({product.productCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Warehouse <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="warehouseCode"
                    value={formData.warehouseCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.warehouseCode} value={warehouse.warehouseCode}>
                        {warehouse.warehouseName} ({warehouse.warehouseCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Transaction Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="transactionDate"
                    value={formData.transactionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Quantity Moved <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantityMoved"
                    value={formData.quantityMoved}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Transaction Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="IN">Stock IN</option>
                    <option value="OUT">Stock OUT</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:bg-blue-300"
                >
                  {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Transaction' : 'Add Transaction')}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.transactionId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.transactionId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.productName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{transaction.warehouseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.quantityMoved}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          transaction.transactionType === 'IN' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.transactionType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="text-blue-600 hover:text-blue-800 mr-3 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.transactionId)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
