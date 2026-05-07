'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all contacts
  const fetchContacts = async () => {
    setIsLoading(true);
    const res = await fetch('/api/contact');
    const result = await res.json();
    setData(result.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle Delete
  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    await fetch(`/api/contact/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });
    fetchContacts();
  };

  // Handle Save Update
  const handleUpdate = async () => {
    await fetch(`/api/contact/${editing._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchContacts();
  };

  // Filter data based on search
  const filteredData = data.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalContacts = data.length;
  const recentContacts = data.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-amber-300">
                Admin Dashboard
              </h1>
              <p className="text-emerald-200 text-sm md:text-base mt-1">
                Manage your wellness inquiries
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-emerald-900 px-6 py-2 md:px-8 md:py-3 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold">Total Contacts</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">{totalContacts}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold">Active Inquiries</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">{data.filter(d => d.status !== 'archived').length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold">This Month</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">{data.filter(d => {
                  const date = new Date(d.createdAt);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold">Response Rate</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">98%</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Search and Filter Bar */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, email, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchContacts()}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-all text-sm font-semibold"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-emerald-50 to-amber-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-emerald-900">Name</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-emerald-900">Email</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-emerald-900">Subject</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-emerald-900">Message</th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-emerald-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <AnimatePresence>
                      {filteredData.map((item, index) =>
                        editing?._id === item._id ? (
                          <motion.tr
                            key={item._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-amber-50"
                          >
                            <td className="py-3 px-6">
                              <input
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                                value={editing.name}
                                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <input
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                                value={editing.email}
                                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <input
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                                value={editing.subject}
                                onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <textarea
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                                rows={2}
                                value={editing.message}
                                onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={handleUpdate}
                                  className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-600 transition-all text-sm font-medium"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditing(null)}
                                  className="bg-gray-400 text-white px-4 py-1.5 rounded-lg hover:bg-gray-500 transition-all text-sm font-medium"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ) : (
                          <motion.tr
                            key={item._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-emerald-50 transition-colors group"
                          >
                            <td className="py-4 px-6 text-gray-800 font-medium">{item.name}</td>
                            <td className="py-4 px-6 text-gray-600">{item.email}</td>
                            <td className="py-4 px-6">
                              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                                {item.subject}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-600 max-w-md truncate">{item.message}</td>
                            <td className="py-4 px-6">
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() => setEditing(item)}
                                  className="text-emerald-600 hover:text-emerald-800 transition-all transform hover:scale-110"
                                  title="Edit"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="text-red-500 hover:text-red-700 transition-all transform hover:scale-110"
                                  title="Delete"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        )
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-4 space-y-4">
                <AnimatePresence>
                  {filteredData.map((item, index) =>
                    editing?._id === item._id ? (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-amber-50 rounded-2xl p-4 space-y-3"
                      >
                        <div>
                          <label className="text-xs font-semibold text-emerald-700">Name</label>
                          <input
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:border-emerald-500"
                            value={editing.name}
                            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-emerald-700">Email</label>
                          <input
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:border-emerald-500"
                            value={editing.email}
                            onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-emerald-700">Subject</label>
                          <input
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:border-emerald-500"
                            value={editing.subject}
                            onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-emerald-700">Message</label>
                          <textarea
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-1 focus:outline-none focus:border-emerald-500"
                            rows={3}
                            value={editing.message}
                            onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleUpdate}
                            className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-emerald-900 text-lg">{item.name}</h3>
                            <p className="text-gray-600 text-sm">{item.email}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditing(item)}
                              className="text-emerald-600 hover:text-emerald-800 p-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                            {item.subject}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-2">{item.message}</p>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
                
                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No contacts found</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Footer Stats */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-amber-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
              <p className="text-emerald-700">
                Showing {filteredData.length} of {totalContacts} contacts
              </p>
              <p className="text-emerald-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}