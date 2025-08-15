'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

// Import data từ các file data
import { vitaminD3K2Data } from '../../data/vitaminD3K2Data';
import { airPurifiersData } from '../../data/airPurifiersData';
import { steamCleanersData } from '../../data/steamCleanersData';

// Map category với data tương ứng
const categoryDataMap: Record<string, any> = {
  'vitamin-d3-k2': vitaminD3K2Data,
  'air-purifiers': airPurifiersData,
  'steam-cleaners': steamCleanersData,
};

export default function ProductSlugPage() {
  const params = useParams();
  const router = useRouter();
  const { trackEvent, trackPageView } = useGoogleAnalytics();
  
  const category = params.category as string;
  const productSlug = params.productSlug as string;

  useEffect(() => {
    // Track page view
    trackPageView(`/${category}/${productSlug}`);
    
    // Tìm sản phẩm dựa trên slug
    const categoryData = categoryDataMap[category];
    if (!categoryData) {
      console.error('Category not found:', category);
      return;
    }

    const product = categoryData.items.find((item: any) => {
      const itemSlug = createProductSlug(item.title);
      return itemSlug === productSlug;
    });

    if (product) {
      // Track sự kiện sản phẩm được xem qua slug
      trackEvent('product_view_via_slug', 'ecommerce', product.title);
      
      // Redirect sang URL thực tế sau 1 giây (để user có thể thấy slug)
      setTimeout(() => {
        window.location.href = product.url;
      }, 500);
    } else {
      console.error('Product not found for slug:', productSlug);
      // Redirect về trang chủ nếu không tìm thấy sản phẩm
      router.push('/');
    }
  }, [category, productSlug, trackEvent, trackPageView, router]);

  // Function để tạo slug từ tên sản phẩm (giống như trong ProductComparisonPage)
  const createProductSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, '-') // Loại bỏ dấu gạch ngang liên tiếp
      .trim(); // Loại bỏ khoảng trắng đầu cuối
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Đang chuyển hướng...
        </h1>
        <p className="text-gray-600">
          Bạn sẽ được chuyển đến trang sản phẩm trong giây lát
        </p>
       
      </div>
    </div>
  );
}
