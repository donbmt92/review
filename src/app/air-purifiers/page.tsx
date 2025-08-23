import React from 'react';
import { Metadata } from 'next';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { airPurifiersData } from '../data/airPurifiersData';

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Best Air Purifiers 2024 - Compare Top Rated Models | BuyeReviews",
  description: "Find the best air purifiers for 2024. Compare top-rated air purifiers by performance, features, and price. Expert reviews and buying guide for clean air.",
  keywords: "air purifiers, best air purifier, air purifier reviews, HEPA air purifier, air cleaner, indoor air quality",
  openGraph: {
    title: "Best Air Purifiers 2024 - Compare Top Rated Models",
    description: "Find the best air purifiers for 2024. Compare top-rated air purifiers by performance, features, and price.",
    type: "website",
    url: "https://buyereview.com/air-purifiers",
    images: [
      {
        url: "/air-purifier.webp",
        width: 1200,
        height: 630,
        alt: "Best Air Purifiers 2024"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Air Purifiers 2024 - Compare Top Rated Models",
    description: "Find the best air purifiers for 2024. Compare top-rated air purifiers by performance, features, and price.",
    images: ["/air-purifier.webp"]
  },
  alternates: {
    canonical: "https://buyereview.com/air-purifiers"
  }
};

export default function AirPurifiersPage() {
  return <ProductComparisonPage {...airPurifiersData} />;
}
