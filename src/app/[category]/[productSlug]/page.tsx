import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductComparisonPage from '../../components/ProductComparisonPage';
import { getProductPageData } from '../../lib/getProductPageData';

export const dynamic = "force-dynamic";
// export const revalidate = 3600; // Revalidate every hour

interface CategoryPageProps {
  params: Promise<{
    category: string;
    productSlug: string;
  }>;
}

// Generate static params for known categories and products
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
      include: {
        products: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    // Function để tạo slug từ title
    const createSlugFromTitle = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    // Generate params for database categories and products
    const dynamicParams = categories.flatMap(category => {
      const categoryParams = [{
        category: category.slug,
        productSlug: category.slug
      }];
      
      // Add individual product params using title slug
      const productParams = category.products.map(product => ({
        category: category.slug,
        productSlug: createSlugFromTitle(product.title)
      }));
      
      return [...categoryParams, ...productParams];
    });

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
  const { category, productSlug } = await params;
  
  // If productSlug is different from category, try to find specific product
  if (productSlug !== category) {
    try {
      const { db } = await import('../../lib/db');
      
      // Function để tạo slug từ title
      const createSlugFromTitle = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };
      
      // Tìm tất cả products trong category
      const products = await db.product.findMany({
        where: {
          category: {
            slug: category
          }
        },
        include: {
          category: true
        }
      });
      
      // Tìm product có slug khớp với productSlug
      const product = products.find(p => createSlugFromTitle(p.title) === productSlug);

      if (product) {
        // Generate metadata for specific product
        return {
          title: `${product.title} - ${product.category.name} | BuyeReviews`,
          description: `Buy ${product.title} - Best price, reviews, and deals. Compare with other ${product.category.name.toLowerCase()} products.`,
          keywords: `${product.title}, ${product.category.name}, best price, reviews, deals`,
          openGraph: {
            title: `${product.title} - ${product.category.name}`,
            description: `Buy ${product.title} - Best price, reviews, and deals.`,
            type: "website",
            url: `https://buyereview.com/${category}/${productSlug}`,
            images: [
              {
                url: product.imageUrl,
                width: 1200,
                height: 630,
                alt: product.title
              }
            ]
          },
          twitter: {
            card: "summary_large_image",
            title: `${product.title} - ${product.category.name}`,
            description: `Buy ${product.title} - Best price, reviews, and deals.`,
            images: [product.imageUrl]
          },
          alternates: {
            canonical: `https://buyereview.com/${category}/${productSlug}`
          }
        };
      }
    } catch (error) {
      console.error('Error finding product for metadata:', error);
    }
  }

  // Fallback to category metadata
  const data = await getProductPageData(category);
  
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
    keywords: `${category}, best ${category.replace('-', ' ')}, ${category.replace('-', ' ')} reviews, ${category.replace('-', ' ')} comparison`,
    openGraph: {
      title: `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.categoryDescription,
      type: "website",
      url: `https://buyereview.com/${category}`,
      images: [
        {
          url: data.items[0]?.image || `/categories/${category}.webp`,
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
      images: [data.items[0]?.image || `/categories/${category}.webp`]
    },
    alternates: {
      canonical: `https://buyereview.com/${category}`
    }
  };
}

export default async function CategoryProductPage({ params }: CategoryPageProps) {
  const { category, productSlug } = await params;
  
  console.log("=== PRODUCT PAGE DEBUG ===");
  console.log("category:", category);
  console.log("productSlug:", productSlug);
  console.log("productSlug !== category:", productSlug !== category);
  
  // If productSlug is different from category, try to find specific product and redirect
  if (productSlug !== category) {
    console.log("Looking for product with slug:", productSlug, "in category:", category);
    
    try {
      const { db } = await import('../../lib/db');
      
      // Function để tạo slug từ title (giống như trong CompareRow)
      const createSlugFromTitle = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };
      
      // Tìm tất cả products trong category
      const products = await db.product.findMany({
        where: {
          category: {
            slug: category
          }
        },
        include: {
          offers: true
        }
      });
      
      console.log("Found", products.length, "products in category");
      console.log("Product titles:", products.map(p => p.title));
      console.log("Product slugs:", products.map(p => createSlugFromTitle(p.title)));
      
      // Tìm product có slug khớp với productSlug
      const product = products.find(p => createSlugFromTitle(p.title) === productSlug);
      
      console.log("Matched product:", product);
             if (product && product.offers.length > 0) {
         console.log("product.offers[0].url", product.offers[0].url);
         
         // Redirect to the actual product URL (first offer)
         const productUrl = product.offers[0].url;
         console.log("About to redirect to:", productUrl);
         
         // Return a redirect component instead of using Next.js redirect
         return (
           <html>
             <head>
               <meta httpEquiv="refresh" content={`0;url=${productUrl}`} />
               <title>Redirecting to Amazon...</title>
             </head>
             <body>
               <div style={{ 
                 textAlign: 'center', 
                 padding: '50px', 
                 fontFamily: 'Arial, sans-serif' 
               }}>
                 <h2>Redirecting to Amazon...</h2>
                 <p>You will be redirected to the product page in a few seconds.</p>
                 <p>If you are not redirected automatically, <a href={productUrl}>click here</a>.</p>
               </div>
               <script dangerouslySetInnerHTML={{
                 __html: `
                   console.log('Redirecting to: ${productUrl}');
                   window.location.href = '${productUrl}';
                 `
               }} />
             </body>
           </html>
         );
       } else {
         console.log("No product found or no offers available");
       }
    } catch (error) {
      console.error('Error finding product for redirect:', error);
    }
  }
  
  // If no specific product found or redirect failed, show category comparison page
  // First try to get data from database
  let data = await getProductPageData(category);

  // If no data from database, fallback to static data
  if (!data) {
    try {
      // Import static data as fallback
      let staticData;
      switch (category) {
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