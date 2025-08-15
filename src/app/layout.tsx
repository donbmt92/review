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
  title: "BuyeReviews - Home Page",
  description: "Top products in every category so you can compare what truly matters and choose the best for you.",
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
