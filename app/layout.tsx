import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AppwriteInit from "@/components/AppwriteInit";
import { AuthProvider } from "@/contexts/AuthContext";
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

export const metadata: Metadata = {
  title: "Bravo International - Study Abroad Consultancy | UK, USA, Canada",
  description: "Your trusted partner for studying in UK, USA, and Canada. Expert educational consultancy with 15+ years of experience. 500+ successful visas. Located in Putalisadak, Kathmandu.",
  keywords: "study abroad, UK education, USA education, Canada education, educational consultancy Nepal, study visa, IELTS preparation, Kathmandu",
  authors: [{ name: "Bravo International" }],
  openGraph: {
    title: "Bravo International - Think Abroad, Think Bravo",
    description: "Expert educational consultancy for UK, USA, and Canada with 15+ years of experience",
    type: "website",
  },
};

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
          <AppwriteInit />
          {children}
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
