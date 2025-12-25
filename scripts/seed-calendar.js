/**
 * Seed Academic Calendar Data Script
 * Adds sample events and holidays
 * 
 * Usage: node scripts/seed-calendar.js
 */

const sdk = require('node-appwrite');

// Configuration
const config = {
  endpoint: 'https://sgp.cloud.appwrite.io/v1',
  projectId: '6949246e002f720eb299',
  apiKey: 'standard_874ffa78ab2697dfbe11bf990b4b61dbbd83826df37c29b5a92a48e6b717dcd05cbb718696c13e5fa68cb6fa52b59328d010795107272d836f8e184baf16d34f37eef943068ee1991cae366555fc4142ddc4b846f555f1eb22f90ea44321c787a46f9a5f68de768034af7a553f5ec71aa95bc3b09eef4b8ebc12517b5b1aac2d',
  databaseId: 'bravo_chat_db',
  calendarCollectionId: '694d49d90018a1ae5ed2',
};

// Initialize Appwrite
const client = new sdk.Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setKey(config.apiKey);

const databases = new sdk.Databases(client);

// Sample calendar events
const sampleEvents = [
  // Holidays
  {
    title: 'New Year 2026',
    description: 'Public Holiday - New Year Celebration',
    type: 'holiday',
    startDate: new Date('2026-01-01').toISOString(),
    isAllDay: true,
    isRecurring: false,
    color: '#ef4444',
    active: true,
  },
  {
    title: 'Winter Break',
    description: 'Winter vacation for all students',
    type: 'holiday',
    startDate: new Date('2025-12-25').toISOString(),
    endDate: new Date('2026-01-05').toISOString(),
    isAllDay: true,
    isRecurring: false,
    color: '#ef4444',
    active: true,
  },
  {
    title: 'Spring Festival',
    description: 'Public Holiday',
    type: 'holiday',
    startDate: new Date('2026-03-15').toISOString(),
    isAllDay: true,
    isRecurring: false,
    color: '#ef4444',
    active: true,
  },
  
  // Exams
  {
    title: 'Mid-Term Examinations',
    description: 'Mid-semester exams for all programs',
    type: 'exam',
    startDate: new Date('2026-02-15').toISOString(),
    endDate: new Date('2026-02-28').toISOString(),
    isAllDay: true,
    isRecurring: false,
    color: '#f59e0b',
    location: 'Examination Hall',
    active: true,
  },
  {
    title: 'Final Examinations',
    description: 'End of semester final exams',
    type: 'exam',
    startDate: new Date('2026-05-01').toISOString(),
    endDate: new Date('2026-05-20').toISOString(),
    isAllDay: true,
    isRecurring: false,
    color: '#f59e0b',
    location: 'Examination Hall',
    active: true,
  },
  
  // Deadlines
  {
    title: 'Course Registration Deadline',
    description: 'Last day to register for Spring 2026 courses',
    type: 'deadline',
    startDate: new Date('2026-01-31').toISOString(),
    isAllDay: false,
    startTime: '17:00',
    isRecurring: false,
    color: '#dc2626',
    active: true,
  },
  {
    title: 'Scholarship Application Deadline',
    description: 'Submit your scholarship applications',
    type: 'deadline',
    startDate: new Date('2026-02-28').toISOString(),
    isAllDay: false,
    startTime: '23:59',
    isRecurring: false,
    color: '#dc2626',
    active: true,
  },
  
  // Workshops
  {
    title: 'IELTS Preparation Workshop',
    description: 'Free IELTS preparation session for all students',
    type: 'workshop',
    startDate: new Date('2026-01-20').toISOString(),
    startTime: '14:00',
    endTime: '17:00',
    location: 'Seminar Hall A',
    organizer: 'Bravo International',
    isAllDay: false,
    isRecurring: false,
    color: '#8b5cf6',
    active: true,
  },
  {
    title: 'Career Counseling Workshop',
    description: 'Expert guidance on career planning and job search',
    type: 'workshop',
    startDate: new Date('2026-02-10').toISOString(),
    startTime: '10:00',
    endTime: '13:00',
    location: 'Conference Room',
    organizer: 'Career Services',
    isAllDay: false,
    isRecurring: false,
    color: '#8b5cf6',
    active: true,
  },
  
  // Seminars
  {
    title: 'Study Abroad Seminar - Australia',
    description: 'Learn about study opportunities in Australia',
    type: 'seminar',
    startDate: new Date('2026-01-15').toISOString(),
    startTime: '15:00',
    endTime: '17:00',
    location: 'Main Auditorium',
    organizer: 'International Relations Office',
    isAllDay: false,
    isRecurring: false,
    color: '#3b82f6',
    active: true,
  },
  {
    title: 'University Fair 2026',
    description: 'Meet representatives from top universities worldwide',
    type: 'seminar',
    startDate: new Date('2026-03-05').toISOString(),
    startTime: '09:00',
    endTime: '18:00',
    location: 'Campus Ground',
    organizer: 'Bravo International',
    isAllDay: false,
    isRecurring: false,
    color: '#3b82f6',
    active: true,
  },
  
  // Events
  {
    title: 'Orientation Week',
    description: 'Welcome and orientation for new students',
    type: 'event',
    startDate: new Date('2026-01-10').toISOString(),
    endDate: new Date('2026-01-14').toISOString(),
    isAllDay: true,
    location: 'Campus',
    organizer: 'Student Affairs',
    isRecurring: false,
    color: '#10b981',
    active: true,
  },
  {
    title: 'Cultural Festival',
    description: 'Annual cultural celebration with performances and exhibitions',
    type: 'event',
    startDate: new Date('2026-04-10').toISOString(),
    startTime: '10:00',
    endTime: '20:00',
    location: 'Campus Ground',
    organizer: 'Cultural Committee',
    isAllDay: false,
    isRecurring: false,
    color: '#10b981',
    active: true,
  },
  {
    title: 'Graduation Ceremony',
    description: 'Graduation ceremony for Class of 2026',
    type: 'event',
    startDate: new Date('2026-06-15').toISOString(),
    startTime: '10:00',
    endTime: '14:00',
    location: 'Main Hall',
    organizer: 'Academic Affairs',
    isAllDay: false,
    isRecurring: false,
    color: '#10b981',
    active: true,
  },
];

/**
 * Seed calendar events
 */
async function seedCalendarEvents() {
  console.log('📅 Seeding calendar events...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const event of sampleEvents) {
    try {
      await databases.createDocument(
        config.databaseId,
        config.calendarCollectionId,
        sdk.ID.unique(),
        event
      );
      
      console.log(`✅ ${event.title} (${event.type})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to create "${event.title}":`, error.message);
      failCount++;
    }
  }

  return { successCount, failCount };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Academic Calendar Data Seeding...\n');
  console.log(`Database: ${config.databaseId}`);
  console.log(`Calendar Collection: ${config.calendarCollectionId}\n`);
  console.log('═══════════════════════════════════════════════\n');

  try {
    const { successCount, failCount } = await seedCalendarEvents();

    console.log('\n═══════════════════════════════════════════════');
    console.log('✨ Calendar data seeded successfully!');
    console.log('═══════════════════════════════════════════════\n');
    console.log(`📊 Summary:`);
    console.log(`   - Events created: ${successCount}/${sampleEvents.length}`);
    if (failCount > 0) {
      console.log(`   - Failed: ${failCount}`);
    }
    console.log(`   - Types: Holiday, Exam, Deadline, Workshop, Seminar, Event`);
    console.log(`   - Note: Saturdays are automatically marked as holidays\n`);
    console.log('📝 Next Steps:');
    console.log('1. Visit /calendar to view the academic calendar');
    console.log('2. Visit /admin/calendar to manage events');
    console.log('3. Add more events as needed\n');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
