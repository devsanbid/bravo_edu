'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { calendarService, CalendarEvent } from '@/lib/calendarService';

const EVENT_TYPES = ['event', 'holiday', 'exam', 'deadline', 'workshop', 'seminar'];

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

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [activeTab, setActiveTab] = useState<'calendar' | 'events'>('calendar');

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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: 0,
        isCurrentMonth: false,
        fullDate: null
      });
    }
    
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
    
    const isWeekEnd = date.getDay() === 6;
    const isWeekStart = date.getDay() === 0;
    
    return { isStart, isEnd, isMiddle, isRange, isWeekEnd, isWeekStart };
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedMonthIndex(newDate.getMonth());
  };

  const changeYear = (direction: number) => {
    const newDate = new Date(currentDate.getFullYear() + direction, currentDate.getMonth());
    setCurrentDate(newDate);
  };

  const selectMonth = (monthName: string) => {
    const monthIndex = MONTHS.indexOf(monthName);
    const newDate = new Date(currentDate.getFullYear(), monthIndex);
    setCurrentDate(newDate);
    setSelectedMonthIndex(monthIndex);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTotalEvents = () => events.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 mt-20 relative z-10">{/* Relative and z-10 to ensure content is above background */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4 text-center mt-4">Academic Calendar</h1>
            
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
            </div>
          </div>

          {activeTab === 'calendar' && (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="w-full lg:w-56 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 space-y-3 md:space-y-4 h-fit">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Navigator</h2>
                
                <div className="flex items-center justify-between">
                  <button onClick={() => changeYear(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold text-gray-700">{currentDate.getFullYear()}</span>
                  <button onClick={() => changeYear(1)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

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

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-indigo-600">{getTotalEvents()}</span> events this month
                  </p>
                </div>

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
                          {event.location && (
                            <div className="flex items-center gap-1 mt-1 text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {DAYS.map(day => (
                      <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-indigo-600">
                        {day}
                      </div>
                    ))}
                  </div>

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
                          className="relative aspect-square cursor-pointer transition-all touch-manipulation"
                        >
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

                          {hasEvents && !rangeEvent && !isCurrentDay && (
                            <div 
                              className="absolute inset-0 rounded-lg opacity-30 z-0"
                              style={{ backgroundColor: eventColor || '#3b82f6' }}
                            />
                          )}

                          {hasDeadline && (
                            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg z-10 font-bold">
                              !
                            </div>
                          )}
                          
                          <div className={`
                            absolute inset-0 flex items-center justify-center rounded-lg
                            ${isCurrentDay ? 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg' : 
                              isSelected ? 'ring-2 ring-indigo-400' : 'hover:bg-gray-100'}
                          `}>
                            <div className="flex flex-col items-center">
                              <span className={`text-xs sm:text-sm font-semibold ${isCurrentDay ? 'text-white' : 'text-gray-700'}`}>
                                {day.date}
                              </span>
                              
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
                  </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
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
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

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
                      <div className="space-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{formatDate(event.startDate)}
                            {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {event.isAllDay ? 'All Day' : `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''}`}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        )}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
