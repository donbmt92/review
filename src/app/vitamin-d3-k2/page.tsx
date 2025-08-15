import React from 'react';
import { Metadata } from 'next';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { vitaminD3K2Data } from '../data/vitaminD3K2Data';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best Vitamin D3 + K2 Supplements 2024 - Compare Top Rated | BuyeReviews",
  description: "Find the best Vitamin D3 + K2 supplements for 2024. Compare top-rated supplements by dosage, absorption, and price. Expert reviews and buying guide.",
  keywords: "vitamin d3 k2, best vitamin d3 k2, vitamin d3 k2 supplements, vitamin d3 k2 reviews, bone health supplements",
  openGraph: {
    title: "Best Vitamin D3 + K2 Supplements 2024 - Compare Top Rated",
    description: "Find the best Vitamin D3 + K2 supplements for 2024. Compare top-rated supplements by dosage, absorption, and price.",
    type: "website",
    url: "https://buyereview.com/vitamin-d3-k2",
    images: [
      {
        url: "/vitamin-d3-k2.webp",
        width: 1200,
        height: 630,
        alt: "Best Vitamin D3 + K2 Supplements 2024"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Vitamin D3 + K2 Supplements 2024 - Compare Top Rated",
    description: "Find the best Vitamin D3 + K2 supplements for 2024. Compare top-rated supplements by dosage, absorption, and price.",
    images: ["/vitamin-d3-k2.webp"]
  },
  alternates: {
    canonical: "https://buyereview.com/vitamin-d3-k2"
  }
};

export default function VitaminD3K2Page() {
  return <ProductComparisonPage {...vitaminD3K2Data} />;
}
