const sdk = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Initialize Appwrite client
const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6949246e002f720eb299')
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);
const DATABASE_ID = 'bravo_chat_db';

async function backupDatabase() {
    try {
        console.log('🔄 Starting database backup...\n');
        
        // Get all collections
        const collectionsResponse = await databases.listCollections(DATABASE_ID);
        const collections = collectionsResponse.collections;
        
        console.log(`📦 Found ${collections.length} collections\n`);
        
        const backup = {
            exportedAt: new Date().toISOString(),
            databaseId: DATABASE_ID,
            endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
            projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
            collections: []
        };
        
        // For each collection, get its attributes
        for (const collection of collections) {
            console.log(`📋 Backing up collection: ${collection.name} (${collection.$id})`);
            
            const collectionBackup = {
                id: collection.$id,
                name: collection.name,
                permissions: collection.$permissions,
                documentSecurity: collection.documentSecurity,
                enabled: collection.enabled,
                attributes: collection.attributes.map(attr => ({
                    key: attr.key,
                    type: attr.type,
                    status: attr.status,
                    required: attr.required,
                    array: attr.array,
                    size: attr.size,
                    min: attr.min,
                    max: attr.max,
                    default: attr.default,
                    elements: attr.elements
                })),
                indexes: collection.indexes || []
            };
            
            backup.collections.push(collectionBackup);
            console.log(`  ✅ ${collectionBackup.attributes.length} attributes backed up`);
        }
        
        // Create backups directory if it doesn't exist
        const backupsDir = path.join(__dirname, '../backups');
        if (!fs.existsSync(backupsDir)) {
            fs.mkdirSync(backupsDir, { recursive: true });
        }
        
        // Save backup with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const backupFileName = `appwrite-backup-${timestamp}.json`;
        const backupFilePath = path.join(backupsDir, backupFileName);
        
        fs.writeFileSync(backupFilePath, JSON.stringify(backup, null, 2));
        
        // Also save as latest backup
        const latestBackupPath = path.join(backupsDir, 'latest-backup.json');
        fs.writeFileSync(latestBackupPath, JSON.stringify(backup, null, 2));
        
        console.log('\n✅ Backup completed successfully!\n');
        console.log('📁 Backup files created:');
        console.log(`   ${backupFilePath}`);
        console.log(`   ${latestBackupPath}`);
        console.log('\n💡 Keep these files safe! You can restore from them anytime.\n');
        
        // Print summary
        console.log('📊 Backup Summary:');
        backup.collections.forEach(col => {
            console.log(`   • ${col.name}: ${col.attributes.length} attributes`);
        });
        
    } catch (error) {
        console.error('❌ Backup failed:', error.message);
        process.exit(1);
    }
}

// Check for API key
if (!process.env.APPWRITE_API_KEY) {
    console.error('❌ Error: APPWRITE_API_KEY environment variable is required!');
    console.log('\nRun: export APPWRITE_API_KEY="your-api-key"\n');
    process.exit(1);
}

// Run backup
backupDatabase().catch(console.error);
