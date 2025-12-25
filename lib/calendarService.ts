import { databases, ID, Query } from './appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CALENDAR_COLLECTION_ID = '694d49d90018a1ae5ed2';

export interface CalendarEvent {
  $id: string;
  title: string;
  description?: string;
  type: 'event' | 'holiday' | 'exam' | 'deadline' | 'workshop' | 'seminar';
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  organizer?: string;
  color?: string;
  isAllDay: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  active: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}

class CalendarService {
  async createEvent(data: Omit<CalendarEvent, '$id' | '$createdAt' | '$updatedAt'>) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        CALENDAR_COLLECTION_ID,
        ID.unique(),
        data
      ) as unknown as CalendarEvent;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  async getEvents(filters?: {
    type?: string;
    month?: number;
    year?: number;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const queries: any[] = [Query.equal('active', true)];
      
      if (filters?.type) {
        queries.push(Query.equal('type', filters.type));
      }

      // For date range filtering
      if (filters?.startDate) {
        queries.push(Query.greaterThanEqual('startDate', filters.startDate));
      }
      
      if (filters?.endDate) {
        queries.push(Query.lessThanEqual('startDate', filters.endDate));
      }

      queries.push(Query.orderAsc('startDate'));
      queries.push(Query.limit(100));

      const response = await databases.listDocuments(
        DATABASE_ID,
        CALENDAR_COLLECTION_ID,
        queries
      );

      return response.documents as unknown as CalendarEvent[];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  async getEvent(id: string) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        CALENDAR_COLLECTION_ID,
        id
      ) as unknown as CalendarEvent;
    } catch (error) {
      console.error('Error fetching calendar event:', error);
      throw error;
    }
  }

  async updateEvent(id: string, data: Partial<CalendarEvent>) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        CALENDAR_COLLECTION_ID,
        id,
        data
      ) as unknown as CalendarEvent;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  }

  async deleteEvent(id: string) {
    try {
      return await databases.deleteDocument(
        DATABASE_ID,
        CALENDAR_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }

  // Helper method to get events for a specific month
  async getMonthEvents(year: number, month: number) {
    const startDate = new Date(year, month, 1).toISOString();
    const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
    
    return this.getEvents({ startDate, endDate });
  }

  // Helper to check if a date is Saturday (holiday)
  isSaturday(date: Date): boolean {
    return date.getDay() === 6;
  }

  // Get all events for calendar display including Saturdays
  async getCalendarData(year: number, month: number) {
    const events = await this.getMonthEvents(year, month);
    
    // Add Saturday holidays automatically
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const saturdays: CalendarEvent[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (this.isSaturday(date)) {
        saturdays.push({
          $id: `saturday-${year}-${month}-${day}`,
          title: 'Saturday Holiday',
          type: 'holiday',
          startDate: date.toISOString(),
          isAllDay: true,
          isRecurring: true,
          recurringPattern: 'weekly',
          active: true,
          color: '#ef4444',
        });
      }
    }
    
    return [...events, ...saturdays].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }
}

export const calendarService = new CalendarService();
