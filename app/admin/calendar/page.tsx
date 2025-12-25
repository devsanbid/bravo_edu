'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, ChevronLeft, ChevronRight, Star, CheckCircle2 } from 'lucide-react';
import { calendarService, CalendarEvent } from '@/lib/calendarService';
import AdminLayout from '@/components/AdminLayout';

const EVENT_TYPES = ['event', 'holiday', 'exam', 'deadline', 'workshop', 'seminar'];
const EVENT_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#10b981' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Orange', value: '#f97316' },
];

const TYPE_COLOR_MAP: Record<string, string> = {
  event: '#3b82f6',
  holiday: '#ef4444',
  exam: '#f59e0b',
  deadline: '#8b5cf6',
  workshop: '#10b981',
  seminar: '#ec4899',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function AdminCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'create'>('calendar');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'event' as CalendarEvent['type'],
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    organizer: '',
    color: TYPE_COLOR_MAP['event'],
    isAllDay: false,
    isRecurring: false,
    recurringPattern: '',
    active: true,
  });

  useEffect(() => {
    loadEvents();
  }, [currentDate]);

  const loadEvents = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const data = await calendarService.getMonthEvents(year, month);
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty slots for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: 0,
        isCurrentMonth: false,
        fullDate: null
      });
    }
    
    // Current month days only
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
      return date >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
             date <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
    });
  };

  const changeMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const changeYear = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1));
  };

  const selectMonth = (monthName: string) => {
    const monthIndex = MONTHS.indexOf(monthName);
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setSelectedMonthIndex(monthIndex);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const getTotalEvents = () => events.filter(e => e.active).length;
  const getCompletedEvents = () => {
    const now = new Date();
    return events.filter(e => new Date(e.endDate || e.startDate) < now).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await calendarService.updateEvent(editingId, formData);
      } else {
        await calendarService.createEvent(formData);
      }
      setShowModal(false);
      resetForm();
      loadEvents();
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingId(event.$id);
    setFormData({
      title: event.title,
      description: event.description || '',
      type: event.type,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate ? event.endDate.split('T')[0] : '',
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      location: event.location || '',
      organizer: event.organizer || '',
      color: event.color || '#3b82f6',
      isAllDay: event.isAllDay,
      isRecurring: event.isRecurring,
      recurringPattern: event.recurringPattern || '',
      active: event.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await calendarService.deleteEvent(id);
      setDeleteConfirm(null);
      loadEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'event',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      organizer: '',
      color: TYPE_COLOR_MAP['event'],
      isAllDay: false,
      isRecurring: false,
      recurringPattern: '',
      active: true,
    });
    setEditingId(null);
  };

  const handleDateDoubleClick = (date: Date) => {
    resetForm();
    const dateStr = date.toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      startDate: dateStr,
      endDate: dateStr,
    }));
    setActiveTab('create');
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Tabs */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Academic Calendar</h1>
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'calendar'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'events'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'create'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Create Event
              </button>
            </div>
          </div>

          {/* Calendar View Tab */}
          {activeTab === 'calendar' && (
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="w-56 bg-white/80 backdrop-blur-sm rounded-xl p-5 space-y-4 h-fit">
                <h2 className="text-xl font-bold text-gray-800">Navigator</h2>
                
                {/* Year Selector */}
                <div className="flex items-center justify-between">
                  <button onClick={() => changeYear(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold text-gray-700">{currentDate.getFullYear()}</span>
                  <button onClick={() => changeYear(1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Month List */}
                <div className="space-y-1 max-h-9/10 overflow-y-auto">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => selectMonth(month)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedMonthIndex === index
                          ? 'bg-indigo-100 text-indigo-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-indigo-600">{getTotalEvents()}</span> events this month
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-green-600">{getCompletedEvents()}</span> completed
                  </p>
                </div>
              </div>

              {/* Main Calendar */}
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => changeMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    {DAYS.map(day => (
                      <div key={day} className="text-center text-xs font-semibold text-indigo-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      if (!day.isCurrentMonth || !day.fullDate) {
                        return <div key={index} className="aspect-square"></div>;
                      }
                      
                      const dayEvents = getEventsForDate(day.fullDate);
                      const isCurrentDay = isToday(day.fullDate);
                      
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleDateClick(day.fullDate)}
                          onDoubleClick={() => handleDateDoubleClick(day.fullDate)}
                          className={`
                            relative aspect-square rounded-lg cursor-pointer transition-all
                            ${isCurrentDay ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100'}
                          `}
                          title="Double-click to create event"
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                            <span className={`text-sm font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>
                              {day.date}
                            </span>
                            
                            {/* Event Indicators */}
                            {dayEvents.length > 0 && (
                              <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                                {dayEvents.slice(0, 3).map((event, i) => (
                                  <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: event.color }}
                                    title={event.title}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Selected Date Events */}
                  {getEventsForDate(selectedDate).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </h4>
                      <div className="space-y-2">
                        {getEventsForDate(selectedDate).map(event => (
                          <div
                            key={event.$id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            style={{ borderLeft: `3px solid ${event.color}` }}
                          >
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-800 text-sm">{event.title}</h5>
                              <p className="text-xs text-gray-600">
                                {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                                {event.location && ` • ${event.location}`}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  handleEdit(event);
                                  setActiveTab('create');
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(event.$id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">All Events</h3>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Event
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.$id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: event.color }}
                            />
                            <div>
                              <div className="font-medium text-black text-sm">{event.title}</div>
                              {event.description && (
                                <div className="text-xs text-gray-600 truncate max-w-xs">
                                  {event.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold capitalize"
                            style={{
                              backgroundColor: event.color + '20',
                              color: event.color
                            }}>
                            {event.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {formatDate(event.startDate)}
                          {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {event.isAllDay ? (
                            <span className="text-gray-500">All Day</span>
                          ) : (
                            <>
                              {event.startTime}
                              {event.endTime && ` - ${event.endTime}`}
                            </>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {event.location || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                handleEdit(event);
                                setActiveTab('create');
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(event.$id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Showing {events.length} events
              </div>
            </div>
          )}

          {/* Create Event Tab */}
          {activeTab === 'create' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Mid-Term Examination"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Event details..."
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type * (Color will be set automatically)
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => {
                      const newType = e.target.value as CalendarEvent['type'];
                      setFormData({ 
                        ...formData, 
                        type: newType,
                        color: TYPE_COLOR_MAP[newType] || '#3b82f6'
                      });
                    }}
                    className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: formData.color }}
                    />
                    <span className="text-sm text-gray-600">
                      Auto-selected color for {formData.type}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* All Day Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAllDay"
                    checked={formData.isAllDay}
                    onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isAllDay" className="text-sm font-medium text-gray-700">
                    All Day Event
                  </label>
                </div>

                {/* Times (if not all day) */}
                {!formData.isAllDay && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Location and Organizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Main Hall"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Organizer
                    </label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      className="w-full px-4  text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Student Affairs"
                    />
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Active (Show on calendar)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    {editingId ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab('calendar');
                    }}
                    className="px-6 text-black py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Event</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
