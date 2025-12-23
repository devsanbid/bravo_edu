'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobService, Job } from '@/lib/jobService';
import { Briefcase, MapPin, Clock, Calendar, FileText, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const branches = ['Putalisadak'];

export default function JobsPage() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [selectedBranch]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getActiveJobs(selectedBranch);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !selectedJob) return;

    setSubmitting(true);
    try {
      await jobService.applyForJob(
        {
          jobId: selectedJob.$id,
          jobTitle: selectedJob.title,
          ...formData,
        },
        cvFile
      );
      setSuccess(true);
      setTimeout(() => {
        setShowApplicationForm(false);
        setSuccess(false);
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      coverLetter: '',
    });
    setCvFile(null);
    setSelectedJob(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setCvFile(file);
      } else {
        alert('Please upload a PDF file');
        e.target.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Explore exciting career opportunities and be part of our mission to help students achieve their dreams
          </p>
        </div>
      </section>

      {/* Branch Selector */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Select Branch:</h2>
            <div className="flex gap-2">
              {branches.map((branch) => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedBranch === branch
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No active job openings at {selectedBranch}</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for new opportunities</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <motion.div
                  key={job.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.branch}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Show brief description or full details based on expanded state */}
                          {expandedJobId === job.$id ? (
                            <>
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Description:</h4>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  Requirements:
                                </h4>
                                <p className="text-gray-700 text-sm whitespace-pre-line">{job.requirements}</p>
                              </div>

                              <button
                                onClick={() => setExpandedJobId(null)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-4"
                              >
                                Show Less
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">{job.description}</p>
                              <button
                                onClick={() => setExpandedJobId(job.$id)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-4"
                              >
                                More Details →
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApply(job)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => !submitting && setShowApplicationForm(false)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {success ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">
                      Thank you for applying. We&apos;ll review your application and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-6 border-b">
                      <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedJob.title}</h2>
                      <button
                        onClick={() => !submitting && setShowApplicationForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                        disabled={submitting}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmitApplication} className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.applicantName}
                          onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.applicantEmail}
                          onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.applicantPhone}
                          onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="+977 98xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
                        <textarea
                          required
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="Why are you interested in this position?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV (PDF) *</label>
                        <div className="flex items-center gap-4">
                          <label className="flex-1 cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                              {cvFile ? (
                                <div className="flex items-center justify-center gap-2 text-blue-600">
                                  <FileText className="w-5 h-5" />
                                  <span className="font-medium">{cvFile.name}</span>
                                </div>
                              ) : (
                                <div>
                                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Click to upload CV (PDF only)</p>
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              accept=".pdf"
                              required
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          {cvFile && (
                            <button
                              type="button"
                              onClick={() => setCvFile(null)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={submitting || !cvFile}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          disabled={submitting}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
