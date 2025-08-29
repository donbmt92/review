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

    // Generate params ONLY for individual products, NOT for categories
    const dynamicParams = categories.flatMap(category => {
      // Only generate product params using title slug
      const productParams = category.products.map(product => ({
        category: category.slug,
        productSlug: createSlugFromTitle(product.title)
      }));
      
      return productParams;
    });

    // Add fallback static params ONLY for actual products, NOT categories
    const staticParams: Array<{category: string, productSlug: string}> = [
      // Remove category = productSlug params as they should go to [category]/page.tsx
    ];

    // Combine and deduplicate
    const allParams = [...dynamicParams, ...staticParams];
    const uniqueParams = allParams.filter((param, index, self) => 
      index === self.findIndex(p => p.category === param.category && p.productSlug === param.productSlug)
    );

    return uniqueParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to empty array - let [category]/page.tsx handle category routes
    return [];
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
    title: data.metaTitle || `${data.categoryTitle} - Compare Top Rated Models | BuyeReviews`,
    description: data.metaDescription || data.categoryDescription,
    keywords: data.keywords || `${category}, best ${category.replace('-', ' ')}, ${category.replace('-', ' ')} reviews, ${category.replace('-', ' ')} comparison`,
    openGraph: {
      title: data.metaTitle || `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.metaDescription || data.categoryDescription,
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
      title: data.metaTitle || `${data.categoryTitle} - Compare Top Rated Models`,
      description: data.metaDescription || data.categoryDescription,
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
  
  // If productSlug equals category, this should be handled by [category]/page.tsx, not here
  if (productSlug === category) {
    console.log("productSlug equals category - this should not happen! Redirecting to category page");
    // This should be handled by [category]/page.tsx
    notFound();
  }
  
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
      
      // Chỉ redirect khi có product và có offers với URL hợp lệ
      if (product && product.offers.length > 0 && product.offers[0].url && product.offers[0].url !== '#') {
        console.log("product.offers[0].url", product.offers[0].url);
        
        // Redirect to the actual product URL (first offer)
        const productUrl = product.offers[0].url;
        console.log("About to redirect to:", productUrl);
        
        // Return a loading page with delayed redirect (theo SLUG_SYSTEM_DEMO.md)
        return (
          <html>
            <head>
              <title>Redirecting to {product.title}...</title>
              <meta name="description" content={`Redirecting to ${product.title} on Amazon`} />
            </head>
            <body>
              <div style={{ 
                textAlign: 'center', 
                padding: '50px', 
                fontFamily: 'Arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
                  {product.title}
                </h1>
                
                <div style={{ marginBottom: '30px' }}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ 
                    backgroundColor: '#059669', 
                    color: 'white', 
                    padding: '5px 15px', 
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    ⭐ {product.score}
                  </span>
                </div>
                
                {product.badge && (
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ 
                      backgroundColor: '#f59e0b', 
                      color: 'white', 
                      padding: '5px 15px', 
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {product.badge}
                    </span>
                  </div>
                )}
                
                <h2 style={{ color: '#059669', marginBottom: '10px' }}>
                  🚀 Redirecting to Amazon...
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                  You will be redirected to the product page in a moment.
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                  <div className="loading-spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #e5e7eb',
                    borderTop: '4px solid #2563eb',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }}></div>
                </div>
                
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                  If you are not redirected automatically, <a href={productUrl} style={{ color: '#2563eb' }}>click here</a>.
                </p>
                
                <p style={{ fontSize: '12px', color: '#d1d5db', marginTop: '20px' }}>
                  URL: /{category}/{productSlug}
                </p>
              </div>
              
              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `
              }} />
              
              <script dangerouslySetInnerHTML={{
                __html: `
                  console.log('Product slug page loaded: ${product.title}');
                  console.log('Will redirect to: ${productUrl}');
                  
                  // Track Google Analytics event
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'product_view_via_slug', {
                      'event_category': 'ecommerce',
                      'event_label': '${product.title}'
                    });
                  }
                  
                  // Delay redirect by 1.5 seconds để user có thể thấy thông tin
                  setTimeout(() => {
                    console.log('Redirecting now to: ${productUrl}');
                    window.location.href = '${productUrl}';
                  }, 1500);
                `
              }} />
            </body>
          </html>
        );
      } else {
        console.log("No product found, no offers available, or invalid URL - showing category page");
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