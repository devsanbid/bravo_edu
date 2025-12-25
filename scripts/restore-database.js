const sdk = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Initialize Appwrite client
const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6949246e002f720eb299')
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

async function restoreDatabase(backupFilePath) {
    try {
        console.log('🔄 Starting database restore...\n');
        
        // Read backup file
        if (!fs.existsSync(backupFilePath)) {
            console.error(`❌ Backup file not found: ${backupFilePath}`);
            process.exit(1);
        }
        
        const backup = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
        
        console.log(`📦 Restoring backup from: ${backup.exportedAt}`);
        console.log(`📊 Database: ${backup.databaseId}`);
        console.log(`📋 Collections to restore: ${backup.collections.length}\n`);
        
        for (const collectionData of backup.collections) {
            try {
                console.log(`📦 Restoring collection: ${collectionData.name}...`);
                
                // Try to create collection
                try {
                    await databases.createCollection(
                        backup.databaseId,
                        collectionData.id,
                        collectionData.name,
                        collectionData.permissions || [],
                        collectionData.documentSecurity || false,
                        collectionData.enabled !== false
                    );
                    console.log(`  ✅ Collection created: ${collectionData.name}`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`  ⚠️  Collection already exists: ${collectionData.name}`);
                    } else {
                        throw error;
                    }
                }
                
                // Create attributes
                for (const attr of collectionData.attributes) {
                    try {
                        console.log(`    ➕ Adding attribute: ${attr.key} (${attr.type})...`);
                        
                        // Check if attribute already exists
                        try {
                            const existingCollection = await databases.getCollection(backup.databaseId, collectionData.id);
                            const attrExists = existingCollection.attributes.some(a => a.key === attr.key);
                            
                            if (attrExists) {
                                console.log(`    ⏭️  Attribute already exists: ${attr.key}`);
                                continue;
                            }
                        } catch (e) {
                            // Collection doesn't exist or can't be fetched, continue
                        }
                        
                        if (attr.type === 'string') {
                            await databases.createStringAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.size || 255,
                                attr.required || false,
                                attr.default || null,
                                attr.array || false
                            );
                        } else if (attr.type === 'boolean') {
                            await databases.createBooleanAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.default !== undefined ? attr.default : null,
                                attr.array || false
                            );
                        } else if (attr.type === 'integer') {
                            await databases.createIntegerAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.min,
                                attr.max,
                                attr.default || null,
                                attr.array || false
                            );
                        } else if (attr.type === 'double' || attr.type === 'float') {
                            await databases.createFloatAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.min,
                                attr.max,
                                attr.default || null,
                                attr.array || false
                            );
                        } else if (attr.type === 'datetime') {
                            await databases.createDatetimeAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.default || null,
                                attr.array || false
                            );
                        } else if (attr.type === 'email') {
                            await databases.createEmailAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.default || null,
                                attr.array || false
                            );
                        } else if (attr.type === 'url') {
                            await databases.createUrlAttribute(
                                backup.databaseId,
                                collectionData.id,
                                attr.key,
                                attr.required || false,
                                attr.default || null,
                                attr.array || false
                            );
                        }
                        
                        console.log(`    ✅ Attribute added: ${attr.key}`);
                        
                        // Wait between attribute creation
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (error) {
                        console.error(`    ❌ Error creating attribute ${attr.key}:`, error.message);
                    }
                }
                
                console.log(`  ✅ Collection ${collectionData.name} restored!\n`);
                
                // Wait between collections
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                console.error(`❌ Error restoring collection ${collectionData.name}:`, error.message);
            }
        }
        
        console.log('\n🎉 Database restore completed!\n');
        
    } catch (error) {
        console.error('❌ Restore failed:', error.message);
        process.exit(1);
    }
}

// Check for API key
if (!process.env.APPWRITE_API_KEY) {
    console.error('❌ Error: APPWRITE_API_KEY environment variable is required!');
    console.log('\nRun: export APPWRITE_API_KEY="your-api-key"\n');
    process.exit(1);
}

// Get backup file path from command line argument or use latest
const backupFile = process.argv[2] || path.join(__dirname, '../backups/latest-backup.json');

console.log(`📂 Using backup file: ${backupFile}\n`);

// Run restore
restoreDatabase(backupFile).catch(console.error);
