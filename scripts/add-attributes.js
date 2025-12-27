const { Client, Databases } = require('node-appwrite');

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6949246e002f720eb299')
  .setKey(process.env.APPWRITE_API_KEY); // You need to set your API key

const databases = new Databases(client);

const DATABASE_ID = 'bravo_chat_db';
const COLLECTION_ID = 'website_settings';

async function addAttributes() {
  try {
    console.log('Adding attributes to website_settings collection...\n');

    // Team Section
    console.log('Adding teamTitle...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'teamTitle',
      255,
      false // required
    );
    console.log('✓ teamTitle added');

    console.log('Adding teamDescription...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'teamDescription',
      1000,
      false
    );
    console.log('✓ teamDescription added');

    console.log('Adding teamMembers...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'teamMembers',
      65535,
      false
    );
    console.log('✓ teamMembers added');

    // Testimonials Section
    console.log('Adding testimonialsTitle...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'testimonialsTitle',
      255,
      false
    );
    console.log('✓ testimonialsTitle added');

    console.log('Adding testimonialsDescription...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'testimonialsDescription',
      1000,
      false
    );
    console.log('✓ testimonialsDescription added');

    console.log('Adding testimonials...');
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'testimonials',
      65535,
      false
    );
    console.log('✓ testimonials added');

    console.log('\n✅ All attributes added successfully!');
    console.log('\nNote: It may take a few moments for the attributes to be fully available.');
  } catch (error) {
    if (error.code === 409) {
      console.error('❌ Error: Attribute already exists');
    } else {
      console.error('❌ Error adding attributes:', error.message);
    }
    process.exit(1);
  }
}

addAttributes();
