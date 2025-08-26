import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductComparisonPage from '../components/ProductComparisonPage';
import { getProductPageData } from '../lib/getProductPageData';

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
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

    // Generate params for database categories - filter out invalid ones
    const dynamicParams = categories
      .filter(cat => {
        const slug = cat.slug;
        return slug && 
               !slug.includes('.') && 
               slug !== 'manifest.json' && 
               slug !== 'favicon.ico' &&
               slug !== 'robots.txt' &&
               slug !== 'sitemap.xml' &&
               slug !== '_next' &&
               slug !== 'api' &&
               slug !== 'admin' &&
               !slug.startsWith('_') &&
               !slug.startsWith('.') &&
               !slug.includes(' ') &&
               slug.length >= 2;
      })
      .map(category => ({
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

    console.log("Generated static params:", uniqueParams);
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
  
  // Kiểm tra category có hợp lệ không
  if (!category || category.includes('.') || category === 'manifest.json' || category === 'favicon.ico') {
    return {
      title: 'Invalid Category',
      description: 'The requested category is not valid.',
    };
  }
  
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
  
  console.log("=== CATEGORY PAGE DEBUG ===");
  console.log("category:", category);
  console.log("params:", params);
  console.log("This is the CATEGORY page, NOT the product slug page");
  console.log("URL path should be:", `/${category}`);
  
  // Kiểm tra category có hợp lệ không
  if (!category || 
      category.includes('.') || 
      category === 'manifest.json' || 
      category === 'favicon.ico' ||
      category === 'robots.txt' ||
      category === 'sitemap.xml' ||
      category === '_next' ||
      category === 'api' ||
      category === 'admin' ||
      category.startsWith('_') ||
      category.startsWith('.') ||
      category.includes(' ') ||
      category.length < 2) {
    console.log("Invalid category:", category, "- showing notFound()");
    notFound();
  }
  
  const data = await getProductPageData(category);
  
  console.log("data from getProductPageData:", data ? "Found" : "Not found");
  if (data) {
    console.log("Number of items:", data.items.length);
    console.log("First item URL:", data.items[0]?.url);
    console.log("Category title:", data.categoryTitle);
  }
  
  if (!data) {
    console.log("No data found, showing notFound()");
    notFound();
  }

  console.log("Rendering ProductComparisonPage with data - NO REDIRECT SHOULD HAPPEN HERE");
  
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
