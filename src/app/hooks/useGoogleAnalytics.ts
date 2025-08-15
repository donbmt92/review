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
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: url,
      });
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
