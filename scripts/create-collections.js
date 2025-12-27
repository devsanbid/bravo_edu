const { Client, Databases, ID, Permission, Role } = require('node-appwrite');

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6949246e002f720eb299')
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = 'bravo_chat_db';

async function createCollections() {
  try {
    console.log('Creating new collections...\n');

    // Create team_members collection
    console.log('Creating team_members collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        'team_members',
        'team_members',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ]
      );
      console.log('✓ team_members collection created');

      // Add attributes to team_members
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'role', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'email', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'phone', 50, false);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'linkedin', 500, false);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'message', 1000, false);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'imageFileId', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'team_members', 'imageFileName', 255, false);
      await databases.createIntegerAttribute(DATABASE_ID, 'team_members', 'order', false, 0, 1000);
      console.log('✓ team_members attributes added');
    } catch (error) {
      if (error.code === 409) {
        console.log('⚠ team_members collection already exists, skipping...');
      } else {
        throw error;
      }
    }

    // Create testimonials collection
    console.log('\nCreating testimonials collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        'testimonials',
        'testimonials',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ]
      );
      console.log('✓ testimonials collection created');

      // Add attributes to testimonials
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'name', 255, true);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'college', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'location', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'program', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'year', 50, false);
      await databases.createIntegerAttribute(DATABASE_ID, 'testimonials', 'rating', true, 1, 5);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'quote', 4000, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'imageFileId', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'imageFileName', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'videoFileId', 255, false);
      await databases.createStringAttribute(DATABASE_ID, 'testimonials', 'videoFileName', 255, false);
      await databases.createIntegerAttribute(DATABASE_ID, 'testimonials', 'order', false, 0, 1000);
      console.log('✓ testimonials attributes added');
    } catch (error) {
      if (error.code === 409) {
        console.log('⚠ testimonials collection already exists, skipping...');
      } else {
        throw error;
      }
    }

    console.log('\n✅ All collections created successfully!');
    console.log('\nNote: It may take a few moments for the collections to be fully available.');
  } catch (error) {
    console.error('❌ Error creating collections:', error.message);
    process.exit(1);
  }
}

createCollections();
