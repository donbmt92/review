'use client';

import { useEffect } from 'react';
import { useGoogleAnalytics } from './useGoogleAnalytics';

export const useScrollTracking = () => {
  const { trackEvent } = useGoogleAnalytics();

  useEffect(() => {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let isTracking = false;

    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollDepth = Math.round((scrollTop / scrollHeight) * 100);

      // Track scroll depth milestones
      if (currentScrollDepth >= 25 && scrollDepth < 25) {
        trackEvent('scroll_depth', 'engagement', '25%');
      }
      if (currentScrollDepth >= 50 && scrollDepth < 50) {
        trackEvent('scroll_depth', 'engagement', '50%');
      }
      if (currentScrollDepth >= 75 && scrollDepth < 75) {
        trackEvent('scroll_depth', 'engagement', '75%');
      }
      if (currentScrollDepth >= 90 && scrollDepth < 90) {
        trackEvent('scroll_depth', 'engagement', '90%');
      }

      scrollDepth = currentScrollDepth;
      maxScrollDepth = Math.max(maxScrollDepth, currentScrollDepth);
    };

    const handleScroll = () => {
      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(() => {
          trackScrollDepth();
          isTracking = false;
        });
      }
    };

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      if (maxScrollDepth > 0) {
        trackEvent('scroll_depth', 'engagement', `max_${maxScrollDepth}%`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackEvent]);
};
