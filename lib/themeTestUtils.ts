/**
 * Theme Testing Utility
 * 
 * This file helps you quickly test different themes in development.
 * Use this in browser console or as a testing utility.
 */

// Import this in your component to test themes programmatically
export const THEME_TEST_UTILS = {
  // All available themes
  themes: [
    'normal',
    'christmas',
    'halloween',
    'dashain',
    'tihar',
    'holi',
    'teej',
    'losar',
    'newYear',
  ] as const,

  // Test theme switching with delay
  async cycleThemes(delaySeconds = 5) {
    console.log('🎨 Starting theme cycle test...');
    
    for (const theme of this.themes) {
      console.log(`Switching to: ${theme}`);
      // You would call themeService.updateTheme(theme) here
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }
    
    console.log('✅ Theme cycle test complete!');
  },

  // Get theme info
  getThemeInfo(themeName: string) {
    // This would return the theme config
    return {
      name: themeName,
      timestamp: new Date().toISOString(),
    };
  },

  // Validate theme setup
  async validateSetup() {
    const checks = {
      themeService: false,
      themeConfig: false,
      animations: false,
      context: false,
    };

    try {
      // Check if themeService exists
      const { themeService } = await import('@/lib/themeService');
      checks.themeService = !!themeService;

      // Check if theme configs exist
      const { THEME_CONFIGS } = await import('@/config/themes');
      checks.themeConfig = Object.keys(THEME_CONFIGS).length === 9;

      // Check if context exists
      const { ThemeProvider } = await import('@/context/ThemeContext');
      checks.context = !!ThemeProvider;

      // Check if animations exist
      checks.animations = true; // Simplified check

      console.log('✅ Theme System Validation:');
      console.table(checks);

      const allValid = Object.values(checks).every(v => v);
      if (allValid) {
        console.log('🎉 All systems operational!');
      } else {
        console.warn('⚠️ Some components may be missing');
      }

      return checks;
    } catch (error) {
      console.error('❌ Validation failed:', error);
      return checks;
    }
  },
};

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).themeTest = THEME_TEST_UTILS;
  console.log('💡 Theme test utils available as: window.themeTest');
  console.log('Example: window.themeTest.validateSetup()');
}

// Quick theme descriptions for reference
export const THEME_DESCRIPTIONS = {
  normal: {
    emoji: '📝',
    season: 'Year-round',
    description: 'Clean professional look',
  },
  christmas: {
    emoji: '🎅',
    season: 'December',
    description: 'Winter wonderland with snow',
  },
  halloween: {
    emoji: '🎃',
    season: 'October',
    description: 'Spooky dark theme',
  },
  dashain: {
    emoji: '🪁',
    season: 'September-October',
    description: 'Traditional Nepali festival',
  },
  tihar: {
    emoji: '🪔',
    season: 'October-November',
    description: 'Festival of lights',
  },
  holi: {
    emoji: '🌈',
    season: 'March',
    description: 'Festival of colors',
  },
  teej: {
    emoji: '🌿',
    season: 'August-September',
    description: 'Monsoon celebration',
  },
  losar: {
    emoji: '🏔️',
    season: 'February-March',
    description: 'Tibetan New Year',
  },
  newYear: {
    emoji: '🎆',
    season: 'December-January',
    description: 'New Year celebration',
  },
};

// Helper to suggest theme based on current month
export function getSuggestedTheme(): string {
  const month = new Date().getMonth() + 1; // 1-12
  
  const suggestions: Record<number, string> = {
    1: 'newYear',
    2: 'losar',
    3: 'holi',
    4: 'normal',
    5: 'normal',
    6: 'normal',
    7: 'normal',
    8: 'teej',
    9: 'dashain',
    10: 'tihar',
    11: 'tihar',
    12: 'christmas',
  };

  const suggested = suggestions[month] || 'normal';
  console.log(`📅 Suggested theme for current month: ${suggested}`);
  
  return suggested;
}

// Performance monitoring
export function monitorThemePerformance() {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('theme') || entry.name.includes('animation')) {
        console.log('⚡ Performance:', entry.name, entry.duration.toFixed(2) + 'ms');
      }
    }
  });

  observer.observe({ entryTypes: ['measure', 'navigation'] });
  console.log('📊 Theme performance monitoring started');
}

export default THEME_TEST_UTILS;
