import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { getProductPageData } from '../lib/getProductPageData';

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for known categories
export async function generateStaticParams() {
  try {
    // Get all categories from database
    const { db } = await import('../lib/db');
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
      category: category.slug
    }));

    // Add fallback static params for compatibility
    const staticParams = [
      { category: 'air-purifiers' },
      { category: 'steam-cleaners' }, 
      { category: 'vitamin-d3-k2' },
      { category: 'pets' }, // Add pets category
    ];

    // Combine and deduplicate
    const allParams = [...dynamicParams, ...staticParams];
    const uniqueParams = allParams.filter((param, index, self) => 
      index === self.findIndex(p => p.category === param.category)
    );

    return uniqueParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to static params if database is not available
    return [
      { category: 'air-purifiers' },
      { category: 'steam-cleaners' }, 
      { category: 'vitamin-d3-k2' },
      { category: 'pets' }, // Add pets category
    ];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const data = await getProductPageData(category);
  
  if (!data) {
    return {
      title: 'Category Not Found',
      description: 'The requested category page could not be found.',
    };
  }

  const categoryDisplayName = data.categoryTitle.replace(/^\d+\s+/, ''); // Remove number prefix
  
  return {
    title: `${data.categoryTitle} - Compare Top Rated Models | BuyeReviews`,
    description: data.categoryDescription,
    keywords: `${category}, best ${category.replace('-', ' ')}, ${category.replace('-', ' ')} reviews, ${category.replace('-', ' ')} comparison`,
    openGraph: {
      title: `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.categoryDescription,
      type: "website",
      url: `https://buyereview.com/${category}`,
      images: [
        {
          url: data.items[0]?.image || `/categories/${category}.png`,
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
      images: [data.items[0]?.image || `/categories/${category}.png`]
    },
    alternates: {
      canonical: `https://buyereview.com/${category}`
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const data = await getProductPageData(category);
  
  if (!data) {
    notFound();
  }

  return (
    <ProductComparisonPage 
      category={data.category}
      categoryTitle={data.categoryTitle}
      categoryDescription={data.categoryDescription}
      items={data.items}
      updatedDate={data.updatedDate}
      breadcrumbPath={data.breadcrumbPath}
      overviewContent={data.overviewContent}
      topProductsContent={data.topProductsContent}
      faqItems={data.faqItems}
    />
  );
}
