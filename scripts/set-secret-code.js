const sdk = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('\n❌ Error: .env.local file not found');
    console.log('Please create .env.local with your Appwrite credentials\n');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  });
}

// Load environment variables first
loadEnv();

// Initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const users = new sdk.Users(client);

async function setUserSecretCode() {
  const userId = process.argv[2];
  const secretCode = process.argv[3];

  if (!userId || !secretCode) {
    console.error('\n❌ Error: Missing required arguments');
    console.log('\nUsage: node scripts/set-secret-code.js <userId> <secretCode>');
    console.log('\nExample: node scripts/set-secret-code.js 507f1f77bcf86cd799439011 12345');
    console.log('\nTo get the user ID:');
    console.log('1. Go to Appwrite Console');
    console.log('2. Navigate to Authentication → Users');
    console.log('3. Click on the user');
    console.log('4. Copy the User ID from the top\n');
    process.exit(1);
  }

  // Validate secret code (5 digits)
  if (!/^\d{5}$/.test(secretCode)) {
    console.error('\n❌ Error: Secret code must be exactly 5 digits (numbers only)');
    console.log('Example: 12345, 98765, 00000\n');
    process.exit(1);
  }

  try {
    console.log('\n🔐 Setting secret code for user...');
    
    // Update user preferences with secret code
    await users.updatePrefs(userId, {
      secretCode: secretCode
    });

    console.log('✅ Success! Secret code has been set.');
    console.log(`\nUser ID: ${userId}`);
    console.log(`Secret Code: ${secretCode}`);
    console.log('\n⚠️  Important: Keep this code secure!');
    console.log('The user will need this 5-digit code to login to the admin panel.\n');

  } catch (error) {
    console.error('\n❌ Error setting secret code:', error.message);
    
    if (error.code === 404) {
      console.log('\nUser not found. Please check the User ID.');
      console.log('Get the User ID from: Appwrite Console → Authentication → Users\n');
    } else if (error.code === 401) {
      console.log('\nAuthentication failed. Please check your APPWRITE_API_KEY in .env.local\n');
    }
  }
}

setUserSecretCode();
