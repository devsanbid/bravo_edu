'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

export default function AppwriteInit() {
  useEffect(() => {
    // Ping Appwrite server to verify setup
    client.ping()
      .then(() => {
        console.log('✅ Appwrite connection established successfully!');
      })
      .catch((error) => {
        console.error('❌ Appwrite connection failed:', error);
      });
  }, []);

  return null;
}
