# Festival Theme System - Complete Guide

## Overview
The festival theme system allows administrators to change the entire website appearance based on different festivals and occasions. Each theme includes custom colors, backgrounds, and animated elements that create an immersive festive experience for students.

## 🎨 Available Themes

### 1. **Normal** (Default)
- Clean and professional design
- No animations
- Default branding colors

### 2. **Christmas** 🎅
- Winter wonderland theme
- **Animations:**
  - Falling snowflakes (50 particles)
  - Santa flying across the screen with sleigh
  - Floating gifts, Christmas trees, and stars
- **Colors:** Red, green, and gold on blue winter gradient

### 3. **Halloween** 🎃
- Spooky dark theme
- **Animations:**
  - Floating ghosts (3 units)
  - Flying bats (5 units)
  - Bouncing pumpkins at the bottom
- **Colors:** Orange, purple, and brown on dark gradient

### 4. **Dashain** 🪁
- Traditional Nepali festival
- **Animations:**
  - Falling flower petals (30 particles)
  - Flying kites in the sky
  - Tika symbols
- **Colors:** Red, yellow, and orange on warm gradient

### 5. **Tihar** 🪔
- Festival of lights
- **Animations:**
  - 8 twinkling diyas at the bottom
  - Rising sky lanterns
  - Twinkling stars
- **Colors:** Golden yellow and red on dark purple night gradient

### 6. **Holi** 🌈
- Festival of colors
- **Animations:**
  - Colorful powder bursts (15 particles)
  - Water balloon drops
  - Color splash effects
- **Colors:** Vibrant multi-color gradient (pink, purple, green, yellow)

### 7. **Teej** 🌿
- Monsoon celebration
- **Animations:**
  - Falling leaves/petals
  - Green nature theme
- **Colors:** Various shades of green

### 8. **Losar** 🏔️
- Tibetan New Year
- **Animations:**
  - Prayer flags fluttering
  - Falling flower petals
- **Colors:** Red, yellow, and blue

### 9. **New Year** 🎆
- New Year celebration
- **Animations:**
  - Firework explosions (8 bursts)
  - Falling confetti (20 pieces)
  - Rising balloons (4 balloons)
- **Colors:** Gold, pink, and purple on dark blue gradient

## 📋 Setup Instructions

### Step 1: Create Database Collection

You need to create a new collection in Appwrite to store theme settings:

1. Go to your Appwrite Console
2. Navigate to **Database** → `bravo_chat_db`
3. Create a new collection named: **`website_settings`**
4. Add the following attributes:
   - `theme` (String, required)
   - `updatedAt` (String, required)
5. Set permissions appropriately (read: any, write: admin only)

### Step 2: Access Admin Theme Settings

1. Log in to the admin panel
2. Navigate to: `/admin/settings/theme`
3. You'll see all available themes with preview cards

### Step 3: Select and Apply Theme

1. Click on any theme card to select it
2. Preview shows the theme name, description, color palette, and features
3. Click **"Save Theme"** button to apply
4. The theme will be activated website-wide immediately

## 🎯 How It Works

### Architecture

```
┌─────────────────────────────────────────────┐
│           ThemeProvider (Context)           │
│  - Loads current theme from Appwrite        │
│  - Provides theme config to all components  │
└─────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌───────▼────────┐
│  Landing Page  │         │ Admin Settings │
│  - Background  │         │  - Select      │
│  - Animations  │         │  - Preview     │
│  - Colors      │         │  - Save        │
└────────────────┘         └────────────────┘
```

### Key Files

1. **`lib/themeService.ts`**
   - Handles Appwrite database operations
   - Gets/updates current theme
   - Type definitions for all themes

2. **`config/themes.ts`**
   - Configuration for all 9 themes
   - Colors, effects, and animation settings
   - Easy to add new themes

3. **`context/ThemeContext.tsx`**
   - React Context for theme state
   - Provides `useTheme()` hook
   - Auto-loads theme on app start

4. **`components/animations/`**
   - ChristmasAnimations.tsx
   - HalloweenAnimations.tsx
   - DashainAnimations.tsx
   - TiharAnimations.tsx
   - HoliAnimations.tsx
   - NewYearAnimations.tsx

5. **`app/admin/settings/theme/page.tsx`**
   - Admin interface for theme selection
   - Visual preview of each theme
   - Save/cancel functionality

6. **`app/page.tsx`**
   - Landing page with theme support
   - Applies background gradients
   - Renders appropriate animations

## 🔧 Adding a New Theme

To add a new festival theme:

### 1. Update Theme Type
```typescript
// lib/themeService.ts
export type ThemeType = 
  | 'normal' 
  | 'christmas' 
  // ... existing themes
  | 'your_new_theme'; // Add here
```

### 2. Create Animation Component
```typescript
// components/animations/YourThemeAnimations.tsx
'use client';
import { motion } from 'framer-motion';

export function YourAnimation() {
  return (
    <motion.div
      // Your animation logic
    >
      🎨
    </motion.div>
  );
}
```

### 3. Add Theme Configuration
```typescript
// config/themes.ts
export const THEME_CONFIGS = {
  // ... existing themes
  your_new_theme: {
    name: 'Your Theme Name',
    description: 'Description of your theme',
    colors: {
      primary: '#color1',
      secondary: '#color2',
      accent: '#color3',
      background: 'linear-gradient(...)',
      text: '#textcolor',
    },
    effects: {
      particleEffect: 'confetti', // or snow, petals, etc.
    },
    animations: {
      floatingElements: [
        { type: 'element1', count: 5 },
      ],
    },
  },
};
```

### 4. Add to Theme Animations
```typescript
// components/ThemeAnimations.tsx
import { YourAnimation } from '@/components/animations/YourThemeAnimations';

export default function ThemeAnimations() {
  // ... existing code
  
  {currentTheme === 'your_new_theme' && (
    <YourAnimation />
  )}
}
```

## 🎭 Animation Performance

All animations are optimized for performance:
- **Framer Motion** for smooth 60fps animations
- **CSS transforms** (translate, scale, rotate)
- **pointer-events-none** to avoid interaction issues
- **Fixed positioning** with z-index layering
- **Lazy loading** - animations only render when theme is active

## 📱 Responsive Design

- All animations adapt to screen size
- Reduced particle count on mobile devices
- Touch-optimized interactions
- Smooth transitions between themes

## 🎨 Customization Tips

### Adjust Animation Speed
```typescript
transition={{
  duration: 10, // Increase for slower, decrease for faster
  repeat: Infinity,
}}
```

### Change Particle Count
```typescript
Array.from({ length: 50 }, ...) // Adjust number
```

### Modify Colors
```typescript
colors: {
  primary: '#your-hex-color',
  background: 'linear-gradient(to bottom, #color1, #color2)',
}
```

## 🐛 Troubleshooting

### Theme not changing?
- Check Appwrite connection
- Verify collection name is `website_settings`
- Check browser console for errors

### Animations laggy?
- Reduce particle count
- Check device performance
- Ensure GPU acceleration is enabled

### Database errors?
- Verify Appwrite credentials
- Check collection permissions
- Ensure database ID is correct

## 📊 Database Schema

```
Collection: website_settings
Document ID: theme_settings

Fields:
{
  "theme": "christmas",           // ThemeType enum
  "updatedAt": "2025-12-25T..."  // ISO timestamp
}
```

## 🚀 Future Enhancements

Potential additions:
- Auto-theme based on date (e.g., auto-Christmas in December)
- Theme scheduling (set future themes)
- Custom theme builder
- Theme preview before saving
- Multiple active regions support
- Theme analytics (which themes get most engagement)

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Test in browser developer tools
4. Check Appwrite dashboard logs

---

**Enjoy creating festive experiences for your students! 🎉**
