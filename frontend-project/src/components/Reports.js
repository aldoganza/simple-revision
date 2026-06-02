import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Reports = ({ user, onLogout }) => {
  const [reportType, setReportType] = useState('daily');
  const [dailyReport, setDailyReport] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Date filters
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weekStart, setWeekStart] = useState('');
  const [weekEnd, setWeekEnd] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Set default week range
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    setWeekStart(weekAgo.toISOString().split('T')[0]);
    setWeekEnd(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (reportType === 'daily') {
      fetchDailyReport();
    } else if (reportType === 'weekly') {
      if (weekStart && weekEnd) {
        fetchWeeklyReport();
      }
    } else if (reportType === 'monthly') {
      fetchMonthlyReport();
    }
  }, [reportType, selectedDate, weekStart, weekEnd, selectedMonth, selectedYear]);

  const fetchDailyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/daily?date=${selectedDate}`);
      setDailyReport(response.data);
    } catch (error) {
      console.error('Error fetching daily report:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/weekly?startDate=${weekStart}&endDate=${weekEnd}`);
      setWeeklyReport(response.data);
    } catch (error) {
      console.error('Error fetching weekly report:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/monthly?month=${selectedMonth}&year=${selectedYear}`);
      setMonthlyReport(response.data);
    } catch (error) {
      console.error('Error fetching monthly report:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDailyReport = () => {
    if (!dailyReport) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Report - {new Date(selectedDate).toLocaleDateString()}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Available Stock</p>
              <p className="text-3xl font-bold text-blue-600">{dailyReport.availableStock}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Stock IN</p>
              <p className="text-3xl font-bold text-green-600">{dailyReport.stockIn}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Stock OUT</p>
              <p className="text-3xl font-bold text-red-600">{dailyReport.stockOut}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600">Total Transactions: <span className="font-semibold">{dailyReport.transactionCount}</span></p>
          </div>
        </div>
      </div>
    );
  };

  const renderWeeklyReport = () => {
    if (!weeklyReport) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Weekly Report - {new Date(weekStart).toLocaleDateString()} to {new Date(weekEnd).toLocaleDateString()}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Current Available Stock</p>
              <p className="text-3xl font-bold text-blue-600">{weeklyReport.availableStock}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Stock IN</p>
              <p className="text-3xl font-bold text-green-600">
                {weeklyReport.dailyData.reduce((sum, day) => sum + day.stockIn, 0)}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Stock OUT</p>
              <p className="text-3xl font-bold text-red-600">
                {weeklyReport.dailyData.reduce((sum, day) => sum + day.stockOut, 0)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-bold text-gray-800 mb-3">Daily Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock IN</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock OUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {weeklyReport.dailyData.map((day) => (
                    <tr key={day.date}>
                      <td className="px-4 py-2 text-sm text-gray-900">{new Date(day.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm text-green-600 font-semibold">{day.stockIn}</td>
                      <td className="px-4 py-2 text-sm text-red-600 font-semibold">{day.stockOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyReport = () => {
    if (!monthlyReport) return null;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Monthly Report - {monthNames[selectedMonth - 1]} {selectedYear}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Available Stock</p>
              <p className="text-3xl font-bold text-blue-600">{monthlyReport.availableStock}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Stock IN</p>
              <p className="text-3xl font-bold text-green-600">{monthlyReport.stockIn}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Stock OUT</p>
              <p className="text-3xl font-bold text-red-600">{monthlyReport.stockOut}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600">Total Transactions: <span className="font-semibold">{monthlyReport.transactionCount}</span></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Stock Reports</h2>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily Report</option>
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
              </select>
            </div>

            {reportType === 'daily' && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {reportType === 'weekly' && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Start Date</label>
                  <input
                    type="date"
                    value={weekStart}
                    onChange={(e) => setWeekStart(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">End Date</label>
                  <input
                    type="date"
                    value={weekEnd}
                    onChange={(e) => setWeekEnd(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {reportType === 'monthly' && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Year</label>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="2020"
                    max="2030"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Loading report...</div>
          </div>
        ) : (
          <>
            {reportType === 'daily' && renderDailyReport()}
            {reportType === 'weekly' && renderWeeklyReport()}
            {reportType === 'monthly' && renderMonthlyReport()}
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;
