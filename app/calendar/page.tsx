'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, User, Filter, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { calendarService, CalendarEvent } from '@/lib/calendarService';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EVENT_TYPES = [
  { value: 'all', label: 'All Events', color: '#6b7280' },
  { value: 'holiday', label: 'Holidays', color: '#ef4444' },
  { value: 'exam', label: 'Exams', color: '#f59e0b' },
  { value: 'deadline', label: 'Deadlines', color: '#dc2626' },
  { value: 'workshop', label: 'Workshops', color: '#8b5cf6' },
  { value: 'seminar', label: 'Seminars', color: '#3b82f6' },
  { value: 'event', label: 'Events', color: '#10b981' },
];

export default function AcademicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [view, setView] = useState<'month' | 'list'>('month');
  const [isMobile, setIsMobile] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(e => e.type === filterType));
    }
  }, [filterType, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await calendarService.getCalendarData(currentYear, currentMonth);
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDay = (day: number) => {
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split('T')[0];
      const eventEndDate = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventDate;
      return dateStr >= eventDate && dateStr <= eventEndDate;
    });
  };

  const isSaturday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 6;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleMonthChange = (month: number) => {
    setCurrentDate(new Date(currentYear, month));
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentMonth));
  };

  // Generate year options (current year ± 5 years)
  const getYearOptions = () => {
    const currentYearNow = new Date().getFullYear();
    const years = [];
    for (let i = currentYearNow - 5; i <= currentYearNow + 5; i++) {
      years.push(i);
    }
    return years;
  };

  const formatTime = (time?: string) => {
    if (!time) return '';
    return time;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return filteredEvents
      .filter(e => new Date(e.startDate) >= today)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Academic Calendar
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with important dates, events, and holidays
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-4 mb-6"
        >
          <div className="flex flex-col gap-4">
            {/* Month/Year Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Previous Month Button */}
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 text-black rounded-lg transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Month Selector */}
              <select
                value={currentMonth}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-semibold text-sm md:text-base cursor-pointer"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year Selector */}
              <select
                value={currentYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-semibold text-sm md:text-base cursor-pointer"
              >
                {getYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Next Month Button */}
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Today Button */}
              <button
                onClick={goToToday}
                className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base font-semibold"
              >
                Today
              </button>
            </div>

            {/* View Toggle & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  List
                </button>
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                {EVENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-3 md:p-4 mb-6"
        >
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {EVENT_TYPES.filter(t => t.value !== 'all').map(type => (
              <div key={type.value} className="flex items-center gap-1 md:gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: type.color }}></div>
                <span className="text-xs md:text-sm text-gray-700">{type.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {view === 'month' ? (
          /* Calendar View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-gradient-to-r from-blue-600 to-purple-600">
              {DAYS.map(day => (
                <div key={day} className="p-2 md:p-4 text-center font-semibold text-white text-xs md:text-base">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {getDaysInMonth().map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isSat = day ? isSaturday(day) : false;
                const today = day ? isToday(day) : false;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`min-h-[60px] md:min-h-[120px] border border-gray-200 p-1 md:p-2 ${
                      !day ? 'bg-gray-50' : isSat ? 'bg-red-50' : 'bg-white hover:bg-blue-50'
                    } ${today ? 'ring-1 md:ring-2 ring-blue-500' : ''} transition-all cursor-pointer`}
                    onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                  >
                    {day && (
                      <>
                        <div className={`text-right font-bold mb-0.5 md:mb-1 text-xs md:text-base ${
                          today ? 'text-blue-600' : isSat ? 'text-red-600' : 'text-gray-700'
                        }`}>
                          {day}
                          {today && <span className="ml-1 text-[8px] md:text-xs">(Today)</span>}
                        </div>
                        <div className="space-y-0.5 md:space-y-1">
                          {dayEvents.slice(0, isMobile ? 1 : 3).map(event => (
                            <div
                              key={event.$id}
                              className="text-[8px] md:text-xs p-0.5 md:p-1 rounded truncate text-white font-medium"
                              style={{ backgroundColor: event.color || '#3b82f6' }}
                              title={event.title}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-blue-600 font-semibold">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
            {getUpcomingEvents().map((event, index) => (
              <motion.div
                key={event.$id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: event.color || '#3b82f6' }}
                  >
                    <div className="text-center">
                      <div className="text-2xl">{new Date(event.startDate).getDate()}</div>
                      <div className="text-xs">{MONTHS[new Date(event.startDate).getMonth()].slice(0, 3)}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize"
                        style={{ backgroundColor: event.color || '#3b82f6' }}>
                        {event.type}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-gray-600 mb-2">{event.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {!event.isAllDay && event.startTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      )}
                      {event.organizer && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {event.organizer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setSelectedEvent(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: selectedEvent.color || '#3b82f6' }}
                  >
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize inline-block mt-1"
                      style={{ backgroundColor: selectedEvent.color || '#3b82f6' }}>
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>
              </div>

              {selectedEvent.description && (
                <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="font-semibold">Date: </span>
                    {formatDate(selectedEvent.startDate)}
                    {selectedEvent.endDate && ` - ${formatDate(selectedEvent.endDate)}`}
                  </div>
                </div>

                {!selectedEvent.isAllDay && selectedEvent.startTime && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-semibold">Time: </span>
                      {formatTime(selectedEvent.startTime)}
                      {selectedEvent.endTime && ` - ${formatTime(selectedEvent.endTime)}`}
                    </div>
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-semibold">Location: </span>
                      {selectedEvent.location}
                    </div>
                  </div>
                )}

                {selectedEvent.organizer && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-semibold">Organizer: </span>
                      {selectedEvent.organizer}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
