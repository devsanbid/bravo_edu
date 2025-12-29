"use client"

import { useEffect, useState } from 'react';

// Disable caching for this page
export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import { BookOpen, Mail, Phone, Globe, GraduationCap, Calendar, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { consultationService, Consultation } from '@/lib/consultationService';
import { useAuth } from '@/contexts/AuthContext';

function BookingsDashboardContent() {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'completed'>('all');

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      setLoading(true);
      const data = await consultationService.getAllConsultations();
      setConsultations(data);
      setError(null);
    } catch (err) {
      console.error('Error loading consultations:', err);
      setError('Failed to load consultations');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'pending' | 'contacted' | 'completed') => {
    try {
      await consultationService.updateStatus(id, status);
      setConsultations(prev =>
        prev.map(c => c.$id === id ? { ...c, status } : c)
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const deleteConsultation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) return;

    try {
      await consultationService.deleteConsultation(id);
      setConsultations(prev => prev.filter(c => c.$id !== id));
    } catch (err) {
      console.error('Error deleting consultation:', err);
      alert('Failed to delete consultation');
    }
  };

  const filteredConsultations = consultations.filter(c =>
    filter === 'all' ? true : c.status === filter
  );

  const stats = {
    total: consultations.length,
    pending: consultations.filter(c => c.status === 'pending').length,
    contacted: consultations.filter(c => c.status === 'contacted').length,
    completed: consultations.filter(c => c.status === 'completed').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'contacted': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'contacted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consultation Bookings</h1>
                <p className="text-sm text-gray-500">Manage student consultation requests</p>
              </div>
            </div>
            <button
              onClick={loadConsultations}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer"
            onClick={() => setFilter('all')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer"
            onClick={() => setFilter('pending')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer"
            onClick={() => setFilter('contacted')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer"
            onClick={() => setFilter('completed')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>
        </div>

        {/* Filter Badge */}
        {filter !== 'all' && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtered by:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(filter)}`}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </span>
            <button
              onClick={() => setFilter('all')}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Consultations List */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {filteredConsultations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">No consultations found</p>
            </div>
          ) : (
            filteredConsultations.map((consultation) => (
              <motion.div
                key={consultation.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          {consultation.name}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(consultation.status)}`}>
                            {getStatusIcon(consultation.status)}
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(consultation.submittedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href={`mailto:${consultation.email}`} className="hover:underline">
                          {consultation.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href={`tel:${consultation.phone}`} className="hover:underline">
                          {consultation.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-4 h-4 text-purple-600" />
                        {consultation.destination}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <GraduationCap className="w-4 h-4 text-orange-600" />
                        {consultation.education}
                      </div>
                    </div>

                    {consultation.message && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{consultation.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <select
                      value={consultation.status}
                      onChange={(e) => updateStatus(consultation.$id, e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => deleteConsultation(consultation.$id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <BookingsDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
