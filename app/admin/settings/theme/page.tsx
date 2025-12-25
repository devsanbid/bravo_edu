'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/AdminLayout';
import { themeService, ThemeType } from '@/lib/themeService';
import { THEME_CONFIGS } from '@/config/themes';
import { Paintbrush, Sparkles, Check } from 'lucide-react';

export default function ThemeSettingsPage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('normal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedTheme, setSavedTheme] = useState<ThemeType>('normal');

  useEffect(() => {
    loadCurrentTheme();
  }, []);

  const loadCurrentTheme = async () => {
    try {
      const theme = await themeService.getCurrentTheme();
      setCurrentTheme(theme);
      setSavedTheme(theme);
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = async (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  const handleSaveTheme = async () => {
    setSaving(true);
    try {
      await themeService.updateTheme(currentTheme);
      setSavedTheme(currentTheme);
      alert('Theme updated successfully! The changes will be visible on the website.');
    } catch (error) {
      console.error('Failed to save theme:', error);
      alert('Failed to update theme. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const themes: ThemeType[] = [
    'normal',
    'christmas',
    'halloween',
    'dashain',
    'tihar',
    'holi',
    'teej',
    'losar',
    'newYear',
  ];

  const hasChanges = currentTheme !== savedTheme;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Paintbrush className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Website Theme Settings</h1>
          </div>
          <p className="text-gray-600">
            Select a theme to change the appearance of your website. The theme will be applied to the landing page with
            festival-specific animations and decorations.
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Current Active Theme</h3>
          </div>
          <p className="text-blue-800">
            <span className="font-bold">{THEME_CONFIGS[savedTheme].name}</span> -{' '}
            {THEME_CONFIGS[savedTheme].description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {themes.map((theme) => {
            const config = THEME_CONFIGS[theme];
            const isSelected = currentTheme === theme;
            const isActive = savedTheme === theme;

            return (
              <motion.div
                key={theme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleThemeChange(theme)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all ${
                  isSelected ? 'ring-4 ring-indigo-500' : 'hover:shadow-xl'
                }`}
              >
                <div
                  className="h-48 p-6 flex flex-col justify-between"
                  style={{ background: config.colors.background }}
                >
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: config.colors.text }}
                    >
                      {config.name}
                    </h3>
                    <p
                      className="text-sm opacity-80"
                      style={{ color: config.colors.text }}
                    >
                      {config.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: config.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: config.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: config.colors.accent }}
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}

                {isActive && !isSelected && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </div>
                )}

                <div className="p-4 bg-white border-t">
                  <div className="text-xs text-gray-600">
                    <strong>Features:</strong>
                    <ul className="mt-1 space-y-1">
                      {config.effects.particleEffect && (
                        <li>• {config.effects.particleEffect} effects</li>
                      )}
                      {config.animations.floatingElements && config.animations.floatingElements.length > 0 && (
                        <li>
                          • {config.animations.floatingElements.reduce((sum, el) => sum + el.count, 0)} animated elements
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 border-2 border-indigo-200"
          >
            <p className="mb-4 text-gray-700">
              You have unsaved changes. Click save to apply the theme.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentTheme(savedTheme)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTheme}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Theme
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
