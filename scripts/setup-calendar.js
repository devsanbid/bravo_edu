/**
 * Academic Calendar Database Setup Script
 * Creates collection for calendar events and holidays
 * 
 * Usage: node scripts/setup-calendar.js
 */

const sdk = require('node-appwrite');

// Configuration
const config = {
  endpoint: 'https://sgp.cloud.appwrite.io/v1',
  projectId: '6949246e002f720eb299',
  apiKey: 'standard_874ffa78ab2697dfbe11bf990b4b61dbbd83826df37c29b5a92a48e6b717dcd05cbb718696c13e5fa68cb6fa52b59328d010795107272d836f8e184baf16d34f37eef943068ee1991cae366555fc4142ddc4b846f555f1eb22f90ea44321c787a46f9a5f68de768034af7a553f5ec71aa95bc3b09eef4b8ebc12517b5b1aac2d',
  databaseId: 'bravo_chat_db',
};

// Initialize Appwrite
const client = new sdk.Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setKey(config.apiKey);

const databases = new sdk.Databases(client);

/**
 * Create Academic Calendar Collection
 */
async function createCalendarCollection() {
  console.log('📅 Creating academic_calendar collection...');
  
  try {
    const collection = await databases.createCollection(
      config.databaseId,
      sdk.ID.unique(),
      'academic_calendar',
      [
        sdk.Permission.read(sdk.Role.any()),
        sdk.Permission.create(sdk.Role.users()),
        sdk.Permission.update(sdk.Role.users()),
        sdk.Permission.delete(sdk.Role.users()),
      ]
    );

    const collectionId = collection.$id;
    console.log(`✅ Collection created with ID: ${collectionId}`);

    // Create attributes
    console.log('Adding attributes...');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'title',
      255,
      true
    );
    console.log('  ✓ title');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'description',
      1000,
      false
    );
    console.log('  ✓ description');

    await databases.createEnumAttribute(
      config.databaseId,
      collectionId,
      'type',
      ['event', 'holiday', 'exam', 'deadline', 'workshop', 'seminar'],
      true
    );
    console.log('  ✓ type');

    await databases.createDatetimeAttribute(
      config.databaseId,
      collectionId,
      'startDate',
      true
    );
    console.log('  ✓ startDate');

    await databases.createDatetimeAttribute(
      config.databaseId,
      collectionId,
      'endDate',
      false
    );
    console.log('  ✓ endDate');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'startTime',
      10,
      false
    );
    console.log('  ✓ startTime');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'endTime',
      10,
      false
    );
    console.log('  ✓ endTime');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'location',
      255,
      false
    );
    console.log('  ✓ location');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'organizer',
      100,
      false
    );
    console.log('  ✓ organizer');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'color',
      20,
      false,
      '#3b82f6' // default blue
    );
    console.log('  ✓ color');

    await databases.createBooleanAttribute(
      config.databaseId,
      collectionId,
      'isAllDay',
      false,
      false
    );
    console.log('  ✓ isAllDay');

    await databases.createBooleanAttribute(
      config.databaseId,
      collectionId,
      'isRecurring',
      false,
      false
    );
    console.log('  ✓ isRecurring');

    await databases.createStringAttribute(
      config.databaseId,
      collectionId,
      'recurringPattern',
      50,
      false
    );
    console.log('  ✓ recurringPattern');

    await databases.createBooleanAttribute(
      config.databaseId,
      collectionId,
      'active',
      false,
      true // default active
    );
    console.log('  ✓ active');

    // Create indexes
    console.log('Creating indexes...');

    await databases.createIndex(
      config.databaseId,
      collectionId,
      'type_idx',
      'key',
      ['type'],
      ['ASC']
    );
    console.log('  ✓ type index');

    await databases.createIndex(
      config.databaseId,
      collectionId,
      'startDate_idx',
      'key',
      ['startDate'],
      ['ASC']
    );
    console.log('  ✓ startDate index');

    await databases.createIndex(
      config.databaseId,
      collectionId,
      'active_idx',
      'key',
      ['active'],
      ['DESC']
    );
    console.log('  ✓ active index');

    console.log(`\n✅ Academic calendar collection created successfully!`);
    console.log(`   Collection ID: ${collectionId}\n`);

    return collectionId;
  } catch (error) {
    console.error('❌ Error creating calendar collection:', error.message);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Academic Calendar Database Setup...\n');
  console.log(`Database: ${config.databaseId}`);
  console.log(`Endpoint: ${config.endpoint}\n`);

  try {
    const calendarId = await createCalendarCollection();

    console.log('═══════════════════════════════════════════════');
    console.log('✨ Calendar database setup completed successfully!');
    console.log('═══════════════════════════════════════════════\n');
    console.log('📝 Next Steps:');
    console.log('1. Update lib/calendarService.ts with collection ID:');
    console.log(`   - CALENDAR_COLLECTION_ID = '${calendarId}'`);
    console.log('2. Run seed script: node scripts/seed-calendar.js');
    console.log('3. Visit /calendar to see the academic calendar\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
