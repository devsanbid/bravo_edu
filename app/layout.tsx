import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppwriteInit from "@/components/AppwriteInit";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ChatWidget from "@/components/ChatWidget";
import CallWidget from "@/components/CallWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import PopupModal from "@/components/PopupModal";
import { websiteService } from "@/lib/websiteService";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await websiteService.getOrCreateSettings();
    
    return {
      title: settings.siteTitle || "Bravo International - Study Abroad Consultancy | UK, USA, Canada",
      description: settings.siteDescription || "Your trusted partner for studying in UK, USA, and Canada. Expert educational consultancy with 15+ years of experience. 500+ successful visas. Located in Putalisadak, Kathmandu.",
      keywords: settings.siteKeywords || "study abroad, UK education, USA education, Canada education, educational consultancy Nepal, study visa, IELTS preparation, Kathmandu",
      authors: [{ name: settings.siteTitle || "Bravo International" }],
      icons: {
        icon: settings.logoFileId ? websiteService.getImageUrl(settings.logoFileId) : '/logo1.png',
        apple: settings.logoFileId ? websiteService.getImageUrl(settings.logoFileId) : '/logo1.png',
      },
      openGraph: {
        title: settings.siteTitle || "Bravo International - Think Abroad, Think Bravo",
        description: settings.siteDescription || "Expert educational consultancy for UK, USA, and Canada with 15+ years of experience",
        type: "website",
        images: [
          {
            url: settings.logoFileId ? websiteService.getImageUrl(settings.logoFileId) : '/logo1.png',
            width: 1200,
            height: 630,
            alt: settings.siteTitle || 'Bravo International Logo',
          },
        ],
      },
    };
  } catch (error) {
    console.error('Failed to load metadata from settings:', error);
    // Fallback to default metadata
    return {
      title: "Bravo International - Study Abroad Consultancy | UK, USA, Canada",
      description: "Your trusted partner for studying in UK, USA, and Canada. Expert educational consultancy with 15+ years of experience. 500+ successful visas. Located in Putalisadak, Kathmandu.",
      keywords: "study abroad, UK education, USA education, Canada education, educational consultancy Nepal, study visa, IELTS preparation, Kathmandu",
      authors: [{ name: "Bravo International" }],
      icons: {
        icon: '/logo1.png',
        apple: '/logo1.png',
      },
      openGraph: {
        title: "Bravo International - Think Abroad, Think Bravo",
        description: "Expert educational consultancy for UK, USA, and Canada with 15+ years of experience",
        type: "website",
        images: [
          {
            url: '/logo1.png',
            width: 1200,
            height: 630,
            alt: 'Bravo International Logo',
          },
        ],
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <AppwriteInit />
            <PopupModal />
            {children}
            <ChatWidget />
            <WhatsAppWidget />
            <CallWidget />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
