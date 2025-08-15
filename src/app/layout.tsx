import type { Metadata } from "next";
import { Lato, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollTracker from "./components/ScrollTracker";

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyeReview - Home Page",
  description: "Top products in every category so you can compare what truly matters and choose the best for you.",
  icons: {
    icon: [
      { url: '/buyereviews-logo.webp', sizes: 'any', type: 'image/webp' },
      { url: '/buyereviews-logo.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/buyereviews-logo.webp',
    apple: '/buyereviews-logo.webp',
  },
  openGraph: {
    title: "BuyeReviews - Home Page",
    description: "Top products in every category so you can compare what truly matters and choose the best for you.",
    url: "https://buyereviews.com",
    siteName: "BuyeReviews",
    images: [
      {
        url: '/buyereviews-logo.webp',
        width: 1200,
        height: 630,
        alt: 'BuyeReviews Logo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BuyeReviews - Home Page",
    description: "Top products in every category so you can compare what truly matters and choose the best for you.",
    images: ['/buyereviews-logo.webp'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${lato.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <ScrollTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
