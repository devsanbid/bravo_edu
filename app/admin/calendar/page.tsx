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
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
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
    loadAllEvents();
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

  const loadAllEvents = async () => {
    try {
      const data = await calendarService.getAllEvents();
      setAllEvents(data);
    } catch (error) {
      console.error('Failed to load all events:', error);
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

  const getRangeEventInfo = (date: Date, event: any) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
    
    const dateStr = date.toDateString();
    const startStr = eventStart.toDateString();
    const endStr = eventEnd.toDateString();
    
    const isStart = dateStr === startStr;
    const isEnd = dateStr === endStr;
    const isMiddle = !isStart && !isEnd;
    const isRange = startStr !== endStr;
    
    // Check if it's at the end of a week (Saturday = 6)
    const isWeekEnd = date.getDay() === 6;
    // Check if it's at the start of a week (Sunday = 0)
    const isWeekStart = date.getDay() === 0;
    
    return { isStart, isEnd, isMiddle, isRange, isWeekEnd, isWeekStart };
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
    setCurrentDate(newDate);
    setSelectedMonthIndex(newDate.getMonth());
  };

  const changeYear = (direction: number) => {
    const newDate = new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setSelectedMonthIndex(newDate.getMonth());
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
      // Prepare the data - convert date strings to ISO format for Appwrite
      const eventData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        startTime: formData.startTime || undefined,
        endTime: formData.endTime || undefined,
        location: formData.location || undefined,
        organizer: formData.organizer || undefined,
        color: formData.color,
        isAllDay: formData.isAllDay,
        isRecurring: formData.isRecurring,
        recurringPattern: formData.recurringPattern || undefined,
        active: formData.active,
      };

      if (editingId) {
        await calendarService.updateEvent(editingId, eventData);
        alert('Event updated successfully!');
      } else {
        await calendarService.createEvent(eventData);
        alert('Event created successfully!');
      }
      setShowModal(false);
      resetForm();
      await loadEvents();
      await loadAllEvents();
      setActiveTab('calendar');
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
      loadAllEvents();
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
    const eventsOnDate = getEventsForDate(date);
    
    if (eventsOnDate.length > 0) {
      // If there are events on this date, edit the first one
      handleEdit(eventsOnDate[0]);
      setActiveTab('create');
    } else {
      // Otherwise create a new event with this date
      resetForm();
      // Format date in local timezone to avoid timezone shift
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      setFormData(prev => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr,
      }));
      setActiveTab('create');
    }
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto relative z-10">{/* Relative and z-10 to ensure content is above background */}
          {/* Header with Tabs */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 md:mb-4 text-center">Academic Calendar</h1>
            <div className="flex gap-1 sm:gap-2 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'calendar'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'create'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Create
              </button>
            </div>
          </div>

          {/* Calendar View Tab */}
          {activeTab === 'calendar' && (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Sidebar */}
              <div className="w-full lg:w-56 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 space-y-3 md:space-y-4 h-fit">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Navigator</h2>
                
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
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-1 max-h-9/10 overflow-y-auto">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => selectMonth(month)}
                      className={`w-full text-center lg:text-left px-2 md:px-3 py-1.5 text-xs md:text-sm rounded-lg transition-colors ${
                        selectedMonthIndex === index
                          ? 'bg-indigo-100 text-indigo-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="lg:hidden">{month.substring(0, 3)}</span>
                      <span className="hidden lg:inline">{month}</span>
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

                {/* Selected Date Events in Sidebar */}
                {getEventsForDate(selectedDate).length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {getEventsForDate(selectedDate).map(event => (
                        <div
                          key={event.$id}
                          className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs"
                          style={{ borderLeft: `3px solid ${event.color}` }}
                        >
                          <h5 className="font-semibold text-gray-800 mb-1">{event.title}</h5>
                          <p className="text-gray-600 text-xs">
                            {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                          </p>
                          <div className="flex gap-1 mt-2">
                            <button
                              onClick={() => {
                                handleEdit(event);
                                setActiveTab('create');
                              }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(event.$id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Calendar */}
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 md:p-6 relative overflow-hidden">
                  {/* Calendar background image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <img 
                      src="/calender.png" 
                      alt="" 
                      className="w-auto h-auto max-w-full max-h-full object-contain opacity-5"
                    />
                  </div>

                  <div className="relative z-10">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
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
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {DAYS.map(day => (
                      <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-indigo-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      if (!day.isCurrentMonth || !day.fullDate) {
                        return <div key={index} className="aspect-square"></div>;
                      }
                      
                      const dayEvents = getEventsForDate(day.fullDate);
                      const isCurrentDay = isToday(day.fullDate);
                      const isSelected = selectedDate.toDateString() === day.fullDate.toDateString();
                      const hasEvents = dayEvents.length > 0;
                      const eventColor = hasEvents ? dayEvents[0].color : null;
                      const hasDeadline = dayEvents.some(e => e.type === 'deadline');
                      const hasExam = dayEvents.some(e => e.type === 'exam');
                      
                      // Check if this day is part of a range event
                      const rangeEvent = dayEvents.find(e => {
                        const start = new Date(e.startDate);
                        const end = e.endDate ? new Date(e.endDate) : start;
                        return start.toDateString() !== end.toDateString();
                      });
                      const rangeInfo = rangeEvent ? getRangeEventInfo(day.fullDate, rangeEvent) : null;
                      
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDateClick(day.fullDate)}
                          onDoubleClick={() => handleDateDoubleClick(day.fullDate)}
                          className="relative aspect-square cursor-pointer transition-all touch-manipulation"
                          title={hasEvents ? `${dayEvents.length} event(s) - Double-click to edit` : "Double-click to create event"}
                        >
                          {/* Range Event Continuous Bar */}
                          {rangeEvent && rangeInfo && !isCurrentDay && (
                            <div 
                              className={`absolute inset-y-0 opacity-30 z-0 ${
                                rangeInfo.isStart && !rangeInfo.isWeekEnd ? 'left-0 right-[-0.25rem] rounded-l-lg' :
                                rangeInfo.isEnd && !rangeInfo.isWeekStart ? 'left-[-0.25rem] right-0 rounded-r-lg' :
                                rangeInfo.isMiddle && rangeInfo.isWeekEnd ? 'left-[-0.25rem] right-0 rounded-r-lg' :
                                rangeInfo.isMiddle && rangeInfo.isWeekStart ? 'left-0 right-[-0.25rem] rounded-l-lg' :
                                rangeInfo.isMiddle ? 'left-[-0.25rem] right-[-0.25rem]' :
                                'inset-0 rounded-lg'
                              }`}
                              style={{ backgroundColor: rangeEvent.color || '#3b82f6' }}
                            />
                          )}

                          {/* Background Circle for Single-Day Events */}
                          {hasEvents && !rangeEvent && !isCurrentDay && (
                            <div 
                              className="absolute inset-0 rounded-lg opacity-30 z-0"
                              style={{ backgroundColor: eventColor || '#3b82f6' }}
                            />
                          )}

                          {/* Deadline Badge - Top Right Corner */}
                          {hasDeadline && (
                            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg z-10 font-bold">
                              !
                            </div>
                          )}
                          
                          {/* Main Content */}
                          <div className={`
                            absolute inset-0 flex items-center justify-center rounded-lg
                            ${isCurrentDay ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg' : 
                              isSelected ? 'ring-2 ring-indigo-400' : 'hover:bg-gray-100'}
                          `}>
                            <div className="flex flex-col items-center">
                              <span className={`text-xs sm:text-sm font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>
                                {day.date}
                              </span>
                              
                              {/* Event Count Badge */}
                              {hasEvents && dayEvents.length > 1 && (
                                <span 
                                  className="text-[10px] sm:text-xs font-bold mt-0.5 px-1 sm:px-1.5 py-0.5 rounded-full"
                                  style={{ 
                                    backgroundColor: eventColor || '#3b82f6',
                                    color: 'white'
                                  }}
                                >
                                  {dayEvents.length}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Events Tab */}
          {activeTab === 'events' && (() => {
            const filteredEvents = filterMonth === 'all' 
              ? allEvents 
              : allEvents.filter(event => {
                  const eventDate = new Date(event.startDate);
                  const monthMatch = filterMonth === 'all' || eventDate.getMonth() === parseInt(filterMonth);
                  const yearMatch = eventDate.getFullYear() === parseInt(filterYear);
                  return monthMatch && yearMatch;
                });

            return (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">All Events</h3>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <select
                      value={filterMonth}
                      onChange={(e) => setFilterMonth(e.target.value)}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm w-full sm:w-auto text-black font-medium"
                    >
                      <option value="all">All Months</option>
                      {MONTHS.map((month, i) => (
                        <option key={i} value={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm w-full sm:w-auto text-black font-medium"
                    >
                      {Array.from({ length: 5 }, (_, i) => {
                        const year = new Date().getFullYear() - 1 + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Event</span>
                    </button>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
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
                      {filteredEvents.map((event) => (
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

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {filteredEvents.map((event) => (
                    <div key={event.$id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                          <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold capitalize flex-shrink-0 ml-2"
                          style={{ backgroundColor: event.color + '20', color: event.color }}>
                          {event.type}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                      )}
                      <div className="space-y-1 text-xs text-gray-700 mb-3">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Date:</span>
                          <span>{formatDate(event.startDate)}
                            {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Time:</span>
                          <span>
                            {event.isAllDay ? 'All Day' : `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''}`}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            handleEdit(event);
                            setActiveTab('create');
                          }}
                          className="flex-1 py-2 px-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(event.$id)}
                          className="flex-1 py-2 px-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs sm:text-sm text-gray-600">
                  Showing {filteredEvents.length} of {allEvents.length} events
                </div>
              </div>
            );
          })()}

          {/* Create Event Tab */}
          {activeTab === 'create' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
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
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="Event details..."
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
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
                    className="w-full px-3 sm:px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                      style={{ backgroundColor: formData.color }}
                    />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Auto-selected color for {formData.type}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 sm:px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
                  <label htmlFor="isAllDay" className="text-xs sm:text-sm font-medium text-gray-700">
                    All Day Event
                  </label>
                </div>

                {/* Times (if not all day) */}
                {!formData.isAllDay && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Location and Organizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 sm:px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="e.g., Main Hall"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      Organizer
                    </label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      className="w-full px-3 sm:px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
                  <label htmlFor="active" className="text-xs sm:text-sm font-medium text-gray-700">
                    Active (Show on calendar)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm sm:text-base"
                  >
                    {editingId ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab('calendar');
                    }}
                    className="px-6 text-black py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base"
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
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 mx-4"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Delete Event</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 bg-red-600 text-white py-2 sm:py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 border border-gray-300 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
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
