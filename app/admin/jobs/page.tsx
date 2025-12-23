'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { jobService, Job, JobApplication } from '@/lib/jobService';
import { Plus, Edit2, Trash2, Eye, Download, Calendar, Briefcase, X, Users, CheckCircle, Clock, FileText, XCircle, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminJobsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminJobsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function AdminJobsContent() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  // Job form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    branch: 'Putalisadak',
    type: 'full-time',
    requirements: '',
    deadline: '',
    isActive: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab, selectedJobId]);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const fetchedJobs = await jobService.getAllJobs();
      setJobs(fetchedJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      alert('Failed to load jobs');
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      const fetchedApps = selectedJobId 
        ? await jobService.getApplicationsByJob(selectedJobId)
        : await jobService.getAllApplications();
      setApplications(fetchedApps);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      alert('Failed to load applications');
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.requirements || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const jobData = {
        ...formData,
        type: formData.type as 'full-time' | 'part-time' | 'contract'
      };
      
      if (editingJob) {
        await jobService.updateJob(editingJob.$id, jobData);
        alert('Job updated successfully');
      } else {
        await jobService.createJob(jobData);
        alert('Job created successfully');
      }
      
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Failed to save job:', error);
      alert('Failed to save job');
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      branch: job.branch,
      type: job.type,
      requirements: job.requirements,
      deadline: job.deadline.split('T')[0],
      isActive: job.isActive
    });
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      await jobService.deleteJob(jobId);
      alert('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      branch: 'Putalisadak',
      type: 'full-time',
      requirements: '',
      deadline: '',
      isActive: true
    });
    setEditingJob(null);
    setShowJobForm(false);
  };

  const handleUpdateApplicationStatus = async (appId: string, status: string) => {
    try {
      await jobService.updateApplicationStatus(appId, status as 'pending' | 'reviewed' | 'shortlisted' | 'rejected');
      fetchApplications();
    } catch (error) {
      console.error('Failed to update application status:', error);
      alert('Failed to update status');
    }
  };

  const handleDeleteApplication = async (appId: string, cvFileId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await jobService.deleteApplication(appId, cvFileId);
      alert('Application deleted successfully');
      fetchApplications();
    } catch (error) {
      console.error('Failed to delete application:', error);
      alert('Failed to delete application');
    }
  };

  const handleDownloadCV = (cvFileId: string, applicantName: string) => {
    try {
      const downloadUrl = jobService.getFileDownloadUrl(cvFileId);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `CV_${applicantName.replace(/\s+/g, '_')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download CV:', error);
      alert('Failed to download CV');
    }
  };

  const filteredApplications = applications.filter(app => 
    statusFilter === 'all' ? true : app.status === statusFilter
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Jobs Management</h1>
          <p className="text-sm md:text-base text-gray-600">Manage job postings and view applications</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 md:mb-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Briefcase className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
            Applications
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'jobs' ? (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Job Postings Section */}
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {showJobForm ? (editingJob ? 'Edit Job' : 'Create New Job') : 'Job Postings'}
                  </h2>
                  <button
                    onClick={() => {
                      if (showJobForm) {
                        resetForm();
                      } else {
                        setShowJobForm(true);
                      }
                    }}
                    className={`w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                      showJobForm
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {showJobForm ? (
                      <>
                        <X className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Plus className="inline-block mr-2 w-4 h-4 md:w-5 md:h-5" />
                        Create Job
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {showJobForm ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSubmitJob}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="e.g., Student Counselor"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Branch
                          </label>
                          <select
                            value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          >
                            <option value="Putalisadak">Putalisadak</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Type
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="Describe the job role and responsibilities..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Requirements *
                        </label>
                        <textarea
                          required
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="List the requirements and qualifications..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Application Deadline *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>

                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.isActive}
                              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm font-semibold text-gray-700">
                              Active (Accepting Applications)
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                          {editingJob ? 'Update Job' : 'Create Job'}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {loadingJobs ? (
                        <div className="text-center py-12">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                          <p className="mt-4 text-gray-600">Loading jobs...</p>
                        </div>
                      ) : jobs.length === 0 ? (
                        <div className="text-center py-12">
                          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600">No job postings yet. Create your first job!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {jobs.map((job) => (
                            <motion.div
                              key={job.$id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                              onClick={() => {
                                setSelectedJobId(job.$id);
                                setActiveTab('applications');
                              }}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                    <span
                                      className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                        job.isActive
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-red-100 text-red-700'
                                      }`}
                                    >
                                      {job.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center">
                                      <Briefcase className="w-4 h-4 mr-1" />
                                      {job.branch}
                                    </span>
                                    <span className="flex items-center">
                                      <FileText className="w-4 h-4 mr-1" />
                                      {job.type}
                                    </span>
                                    <span className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      Posted: {new Date(job.$createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 line-clamp-2">{job.description}</p>
                                </div>
                                <div className="flex space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditJob(job);
                                    }}
                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                                    title="Edit job"
                                  >
                                    <Edit2 className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteJob(job.$id);
                                    }}
                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                                    title="Delete job"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Applications Section */}
              <div className="space-y-6">
                {/* Filter by Job */}
                {jobs.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Filter by Job
                    </label>
                    <select
                      value={selectedJobId || 'all'}
                      onChange={(e) => {
                        setSelectedJobId(e.target.value === 'all' ? null : e.target.value);
                      }}
                      className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    >
                      <option value="all">All Jobs</option>
                      {jobs.map((job) => (
                        <option key={job.$id} value={job.$id}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                    <Users className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold">{stats.total}</p>
                    <p className="text-sm opacity-90">Total</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
                    <Clock className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold">{stats.pending}</p>
                    <p className="text-sm opacity-90">Pending</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold">{stats.reviewed}</p>
                    <p className="text-sm opacity-90">Reviewed</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                    <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold">{stats.shortlisted}</p>
                    <p className="text-sm opacity-90">Shortlisted</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
                    <XCircle className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold">{stats.rejected}</p>
                    <p className="text-sm opacity-90">Rejected</p>
                  </div>
                </div>

                {/* Status Filter Buttons */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'pending', 'reviewed', 'shortlisted', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                          statusFilter === status
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applications List */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
                  
                  {loadingApplications ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                  ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No applications found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <motion.div
                          key={app.$id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                              {/* Applicant Information */}
                              <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{app.applicantName}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                      <Mail className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Email</p>
                                      <p className="font-medium">{app.applicantEmail}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                      <Phone className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500">Phone</p>
                                      <p className="font-medium">{app.applicantPhone}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Job and Date Info */}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                <p className="flex items-center font-semibold text-blue-600">
                                  <Briefcase className="w-4 h-4 mr-1" />
                                  {app.jobTitle}
                                </p>
                                <p className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                </p>
                              </div>

                              {/* Cover Letter Toggle */}
                              <button
                                onClick={() => setExpandedApp(expandedApp === app.$id ? null : app.$id)}
                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {expandedApp === app.$id ? 'Hide' : 'Show'} Cover Letter
                              </button>

                              <AnimatePresence>
                                {expandedApp === app.$id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{app.coverLetter}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <div className="flex flex-col space-y-2 min-w-[200px]">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateApplicationStatus(app.$id, e.target.value)}
                                className={`px-3 py-2 rounded-lg font-semibold text-sm border-2 focus:ring-2 focus:ring-blue-500 ${
                                  app.status === 'pending'
                                    ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                                    : app.status === 'reviewed'
                                    ? 'bg-purple-50 border-purple-300 text-purple-700'
                                    : app.status === 'shortlisted'
                                    ? 'bg-green-50 border-green-300 text-green-700'
                                    : 'bg-red-50 border-red-300 text-red-700'
                                }`}
                              >
                                <option value="pending" className="text-gray-900 bg-white">Pending</option>
                                <option value="reviewed" className="text-gray-900 bg-white">Reviewed</option>
                                <option value="shortlisted" className="text-gray-900 bg-white">Shortlisted</option>
                                <option value="rejected" className="text-gray-900 bg-white">Rejected</option>
                              </select>

                              <button
                                onClick={() => handleDownloadCV(app.cvFileId, app.applicantName)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download CV
                              </button>

                              <button
                                onClick={() => handleDeleteApplication(app.$id, app.cvFileId)}
                                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
