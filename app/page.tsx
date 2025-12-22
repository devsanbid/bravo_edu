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
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
      <ChatWidget />
    </main>
  );
}

