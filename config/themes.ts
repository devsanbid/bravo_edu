import { ThemeType } from '@/lib/themeService';

export interface ThemeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  effects: {
    backgroundPattern?: string;
    backgroundAnimation?: string;
    particleEffect?: 'snow' | 'leaves' | 'petals' | 'lanterns' | 'fireworks' | 'flowers';
  };
  animations: {
    floatingElements?: Array<{
      type: string;
      count: number;
    }>;
  };
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  normal: {
    name: 'Normal',
    description: 'Default clean and professional design',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: 'linear-gradient(to bottom right, #faf5ff, #ffffff, #eff6ff)',
      text: '#1f2937',
    },
    effects: {
      backgroundPattern: 'none',
    },
    animations: {
      floatingElements: [],
    },
  },

  christmas: {
    name: 'Christmas',
    description: 'Festive Christmas theme with snow and Santa',
    colors: {
      primary: '#dc2626',
      secondary: '#16a34a',
      accent: '#eab308',
      background: 'linear-gradient(to bottom, #1e3a8a, #3b82f6, #ffffff)',
      text: '#1f2937',
    },
    effects: {
      backgroundPattern: 'snowflakes',
      backgroundAnimation: 'snow-fall',
      particleEffect: 'snow',
    },
    animations: {
      floatingElements: [
        { type: 'santa', count: 1 },
        { type: 'reindeer', count: 2 },
        { type: 'gift', count: 3 },
      ],
    },
  },

  halloween: {
    name: 'Halloween',
    description: 'Spooky Halloween theme with ghosts and bats',
    colors: {
      primary: '#ea580c',
      secondary: '#7c2d12',
      accent: '#a855f7',
      background: 'linear-gradient(to bottom, #1c1917, #422006, #57534e)',
      text: '#f5f5f4',
    },
    effects: {
      backgroundPattern: 'spiderwebs',
      backgroundAnimation: 'floating-ghosts',
      particleEffect: 'leaves',
    },
    animations: {
      floatingElements: [
        { type: 'ghost', count: 3 },
        { type: 'bat', count: 5 },
        { type: 'pumpkin', count: 2 },
      ],
    },
  },

  dashain: {
    name: 'Dashain',
    description: 'Traditional Dashain festival with tika and flowers',
    colors: {
      primary: '#dc2626',
      secondary: '#eab308',
      accent: '#f97316',
      background: 'linear-gradient(to bottom right, #fef3c7, #fecaca, #fed7aa)',
      text: '#7c2d12',
    },
    effects: {
      backgroundPattern: 'mandala',
      backgroundAnimation: 'gentle-sway',
      particleEffect: 'petals',
    },
    animations: {
      floatingElements: [
        { type: 'tika', count: 2 },
        { type: 'flowers', count: 5 },
        { type: 'kite', count: 3 },
      ],
    },
  },

  tihar: {
    name: 'Tihar',
    description: 'Festival of lights with diyas and rangoli',
    colors: {
      primary: '#f59e0b',
      secondary: '#dc2626',
      accent: '#10b981',
      background: 'linear-gradient(to bottom, #1e1b4b, #312e81, #7c3aed)',
      text: '#fef3c7',
    },
    effects: {
      backgroundPattern: 'rangoli',
      backgroundAnimation: 'twinkling-lights',
      particleEffect: 'lanterns',
    },
    animations: {
      floatingElements: [
        { type: 'diya', count: 8 },
        { type: 'crow', count: 2 },
        { type: 'dog', count: 1 },
      ],
    },
  },

  holi: {
    name: 'Holi',
    description: 'Colorful Holi festival with vibrant colors',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#10b981',
      background: 'linear-gradient(45deg, #fef3c7, #fecaca, #ddd6fe, #bbf7d0, #fef08a)',
      text: '#1f2937',
    },
    effects: {
      backgroundPattern: 'color-splash',
      backgroundAnimation: 'color-burst',
      particleEffect: 'petals',
    },
    animations: {
      floatingElements: [
        { type: 'color-powder', count: 10 },
        { type: 'water-balloon', count: 3 },
      ],
    },
  },

  teej: {
    name: 'Teej',
    description: 'Monsoon festival with swings and greenery',
    colors: {
      primary: '#16a34a',
      secondary: '#dc2626',
      accent: '#eab308',
      background: 'linear-gradient(to bottom, #065f46, #059669, #86efac)',
      text: '#f0fdf4',
    },
    effects: {
      backgroundPattern: 'leaves',
      backgroundAnimation: 'rain-drops',
      particleEffect: 'leaves',
    },
    animations: {
      floatingElements: [
        { type: 'swing', count: 1 },
        { type: 'peacock', count: 2 },
        { type: 'flowers', count: 6 },
      ],
    },
  },

  losar: {
    name: 'Losar',
    description: 'Tibetan New Year with prayer flags',
    colors: {
      primary: '#dc2626',
      secondary: '#eab308',
      accent: '#3b82f6',
      background: 'linear-gradient(to bottom right, #fef3c7, #ffffff, #dbeafe)',
      text: '#1f2937',
    },
    effects: {
      backgroundPattern: 'prayer-flags',
      backgroundAnimation: 'flag-flutter',
      particleEffect: 'petals',
    },
    animations: {
      floatingElements: [
        { type: 'prayer-flag', count: 5 },
        { type: 'khata', count: 3 },
      ],
    },
  },

  newYear: {
    name: 'New Year',
    description: 'New Year celebration with fireworks',
    colors: {
      primary: '#eab308',
      secondary: '#ec4899',
      accent: '#8b5cf6',
      background: 'linear-gradient(to bottom, #0c4a6e, #075985, #0369a1)',
      text: '#f0f9ff',
    },
    effects: {
      backgroundPattern: 'stars',
      backgroundAnimation: 'sparkle',
      particleEffect: 'fireworks',
    },
    animations: {
      floatingElements: [
        { type: 'firework', count: 5 },
        { type: 'confetti', count: 8 },
        { type: 'balloon', count: 4 },
      ],
    },
  },
};
