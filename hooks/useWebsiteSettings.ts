'use client';

import { useEffect, useState } from 'react';
import { websiteService, WebsiteSettings } from '@/lib/websiteService';

export function useWebsiteSettings() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await websiteService.getOrCreateSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load website settings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading };
}
