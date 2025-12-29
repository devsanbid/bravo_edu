'use client';

import { useEffect, useState } from 'react';
import { websiteService, WebsiteSettings } from '@/lib/websiteService';

const CACHE_KEY = 'bravo_website_settings';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  settings: WebsiteSettings;
  timestamp: number;
}

export function useWebsiteSettings() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(() => {
    // Load from cache immediately on mount
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { settings: cachedSettings, timestamp }: CachedData = JSON.parse(cached);
          // Return cached data immediately (even if expired, we'll update in background)
          return cachedSettings;
        }
      } catch (error) {
        console.error('Failed to load cached settings:', error);
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        // Check if cache is still fresh
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp }: CachedData = JSON.parse(cached);
          const isFresh = Date.now() - timestamp < CACHE_DURATION;
          
          // If cache is fresh, don't fetch
          if (isFresh) {
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data in background
        const data = await websiteService.getOrCreateSettings();
        setSettings(data);
        
        // Update cache
        const cacheData: CachedData = {
          settings: data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
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
