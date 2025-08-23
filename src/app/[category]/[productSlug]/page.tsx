import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductComparisonPage from '../../components/ProductComparisonPage';
import { getProductPageData } from '../../lib/getProductPageData';

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface CategoryPageProps {
  params: {
    category: string;
    productSlug: string;
  };
}

// Generate static params for known categories
export async function generateStaticParams() {
  try {
    // Get all categories from database
    const { db } = await import('../../lib/db');
    const categories = await db.category.findMany({
      where: {
        products: {
          some: {} // Only categories that have products
        }
      },
      select: {
        slug: true
      }
    });

    // Generate params for database categories
    const dynamicParams = categories.map(category => ({
      category: category.slug,
      productSlug: category.slug
    }));

    // Add fallback static params for compatibility
    const staticParams = [
      { category: 'air-purifiers', productSlug: 'air-purifiers' },
      { category: 'steam-cleaners', productSlug: 'steam-cleaners' }, 
      { category: 'vitamin-d3-k2', productSlug: 'vitamin-d3-k2' },
    ];

    // Combine and deduplicate
    const allParams = [...dynamicParams, ...staticParams];
    const uniqueParams = allParams.filter((param, index, self) => 
      index === self.findIndex(p => p.category === param.category && p.productSlug === param.productSlug)
    );

    return uniqueParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to static params if database is not available
    return [
      { category: 'air-purifiers', productSlug: 'air-purifiers' },
      { category: 'steam-cleaners', productSlug: 'steam-cleaners' }, 
      { category: 'vitamin-d3-k2', productSlug: 'vitamin-d3-k2' },
    ];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const data = await getProductPageData(params.category);
  
  if (!data) {
    return {
      title: 'Product Not Found',
      description: 'The requested product page could not be found.',
    };
  }

  const categoryDisplayName = data.categoryTitle.replace(/^\d+\s+/, ''); // Remove number prefix
  
  return {
    title: `${data.categoryTitle} - Compare Top Rated Models | BuyeReviews`,
    description: data.categoryDescription,
    keywords: `${params.category}, best ${params.category.replace('-', ' ')}, ${params.category.replace('-', ' ')} reviews, ${params.category.replace('-', ' ')} comparison`,
    openGraph: {
      title: `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.categoryDescription,
      type: "website",
      url: `https://buyereview.com/${params.category}`,
      images: [
        {
          url: data.items[0]?.image || `/categories/${params.category}.webp`,
          width: 1200,
          height: 630,
          alt: categoryDisplayName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.categoryDescription,
      images: [data.items[0]?.image || `/categories/${params.category}.webp`]
    },
    alternates: {
      canonical: `https://buyereview.com/${params.category}`
    }
  };
}

export default async function CategoryProductPage({ params }: CategoryPageProps) {
  // First try to get data from database
  let data = await getProductPageData(params.category);

  // If no data from database, fallback to static data
  if (!data) {
    try {
      // Import static data as fallback
      let staticData;
      switch (params.category) {
        case 'air-purifiers':
          const { airPurifiersData } = await import('../../data/airPurifiersData');
          staticData = airPurifiersData;
          break;
        case 'steam-cleaners':
          const { steamCleanersData } = await import('../../data/steamCleanersData');
          staticData = steamCleanersData;
          break;
        case 'vitamin-d3-k2':
          const { vitaminD3K2Data } = await import('../../data/vitaminD3K2Data');
          staticData = vitaminD3K2Data;
          break;
        default:
          notFound();
      }
      
      if (staticData) {
        data = staticData;
      }
    } catch (error) {
      console.error('Error loading static data:', error);
      notFound();
    }
  }

  if (!data) {
    notFound();
  }

  return <ProductComparisonPage {...data} />;
}