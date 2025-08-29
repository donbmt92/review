'use client';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  // Log GA status when hook is initialized
  if (typeof window !== 'undefined') {
    console.log('🚀 Google Analytics Hook Initialized:');
    console.log('- Environment:', process.env.NODE_ENV);
    console.log('- NEXT_PUBLIC_GA_MEASUREMENT_ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    console.log('- Window gtag available:', !!window.gtag);
    console.log('- Current URL:', window.location.href);
  }

  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    // Log event tracking for debugging
    console.log('📊 GA Event Debug:');
    console.log('- Action:', action);
    console.log('- Category:', category);
    console.log('- Label:', label);
    console.log('- Value:', value);
    console.log('- GA Measurement ID available:', !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    
    if (typeof window !== 'undefined' && window.gtag) {
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        console.log('✅ Tracking event...');
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      } else {
        console.error('❌ Cannot track event: NEXT_PUBLIC_GA_MEASUREMENT_ID not defined');
      }
    } else {
      console.log('⚠️ Window or gtag not available for event tracking');
    }
  };

  const trackPageView = (url: string) => {
    // Log GA Measurement ID for debugging
    console.log('🔍 GA Debug Info:');
    console.log('- NEXT_PUBLIC_GA_MEASUREMENT_ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    console.log('- Type:', typeof process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    console.log('- Length:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.length);
    console.log('- URL being tracked:', url);
    
    if (typeof window !== 'undefined' && window.gtag) {
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        console.log('✅ GA Measurement ID found, tracking page view...');
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      } else {
        console.error('❌ NEXT_PUBLIC_GA_MEASUREMENT_ID is not defined!');
        console.error('Please check your .env.local file');
      }
    } else {
      console.log('⚠️ Window or gtag not available');
    }
  };

  const trackSearch = (searchTerm: string) => {
    trackEvent('search', 'engagement', searchTerm);
  };

  const trackProductView = (productName: string, category: string) => {
    trackEvent('view_item', 'ecommerce', productName);
  };

  const trackNewsletterSignup = (source: string) => {
    trackEvent('sign_up', 'engagement', source);
  };

  return {
    trackEvent,
    trackPageView,
    trackSearch,
    trackProductView,
    trackNewsletterSignup,
  };
};
