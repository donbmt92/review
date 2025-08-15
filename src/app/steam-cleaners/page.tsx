import React from 'react';
import { Metadata } from 'next';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { steamCleanersData } from '../data/steamCleanersData';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best Steam Cleaners 2024 - Compare Top Rated Models | BuyeReviews",
  description: "Find the best steam cleaners for 2024. Compare top-rated steam cleaners by performance, features, and price. Expert reviews and buying guide for deep cleaning.",
  keywords: "steam cleaners, best steam cleaner, steam cleaner reviews, steam mop, steam vacuum, deep cleaning",
  openGraph: {
    title: "Best Steam Cleaners 2024 - Compare Top Rated Models",
    description: "Find the best steam cleaners for 2024. Compare top-rated steam cleaners by performance, features, and price.",
    type: "website",
    url: "https://buyereview.com/steam-cleaners",
    images: [
      {
        url: "/steam-cleaner.webp",
        width: 1200,
        height: 630,
        alt: "Best Steam Cleaners 2024"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Steam Cleaners 2024 - Compare Top Rated Models",
    description: "Find the best steam cleaners for 2024. Compare top-rated steam cleaners by performance, features, and price.",
    images: ["/steam-cleaner.webp"]
  },
  alternates: {
    canonical: "https://buyereview.com/steam-cleaners"
  }
};

export default function SteamCleanersPage() {
  return <ProductComparisonPage {...steamCleanersData} />;
}
