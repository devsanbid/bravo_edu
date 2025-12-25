'use client';

import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DirectorMessage from '@/components/DirectorMessage';
import DestinationHub from '@/components/DestinationHub';
import USPSection from '@/components/USPSection';
import TestPreparation from '@/components/TestPreparation';
import ProcessMap from '@/components/ProcessMap';
import TestimonialSlider from '@/components/TestimonialSlider';
import ConsultationForm from '@/components/ConsultationForm';
import Footer from '@/components/Footer';
import CallWidget from '@/components/CallWidget';
import ThemeAnimations from '@/components/ThemeAnimations';

export default function Home() {
  const { themeConfig, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main 
      className="min-h-screen relative overflow-hidden bg-white"
    >
      {/* Theme-specific animations */}
      <ThemeAnimations />
      
      {/* Main content with theme-aware styling */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <DirectorMessage />
        <DestinationHub />
        <USPSection />
        <TestPreparation />
        <ProcessMap />
        <TestimonialSlider />
        <ConsultationForm />
        <Footer />
      </div>
    </main>
  );
}

