'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

function GoogleAnalyticsInner({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track SPA page views
  useEffect(() => {
    console.log('🔍 GoogleAnalytics Debug:');
    console.log('- GA_MEASUREMENT_ID:', GA_MEASUREMENT_ID);
    console.log('- Window gtag available:', !!window.gtag);
    console.log('- Current pathname:', pathname);
    
    if (!GA_MEASUREMENT_ID) {
      console.log('❌ Cannot track: Missing GA_MEASUREMENT_ID');
      return;
    }
    
    if (!window.gtag) {
      console.log('❌ Cannot track: gtag not available');
      return;
    }
    
    console.log('✅ gtag is available, tracking page view...');
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
    });
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  // Add event listeners for tracking
  useEffect(() => {
    if (!window.gtag) return;
    
    console.log('🎯 Setting up event listeners...');
    
    // Track scroll depth
    let maxScrollDepth = 0;
    const scrollHandler = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);
      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        window.gtag('event', 'scroll_depth', { scroll_percentage: scrollPercent });
      }
    };
    window.addEventListener('scroll', scrollHandler);
    console.log('✅ Scroll tracking attached');

    // Track outbound links
    const clickHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hostname !== window.location.hostname) {
        window.gtag('event', 'click_external_link', { link_url: target.href });
      }
    };
    document.addEventListener('click', clickHandler);
    console.log('✅ Outbound link tracking attached');

    // Track time on page
    const startTime = Date.now();
    const unloadHandler = () => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      window.gtag('event', 'time_on_page', { seconds });
    };
    window.addEventListener('beforeunload', unloadHandler);
    console.log('✅ Time tracking attached');

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
                 dangerouslySetInnerHTML={{
           __html: `
             console.log('🚀 Google Analytics Script Starting...');
             console.log('GA_MEASUREMENT_ID:', '${GA_MEASUREMENT_ID}');
             
             try {
               // Initialize dataLayer
               window.dataLayer = window.dataLayer || [];
               console.log('✅ dataLayer initialized');
               
               // Define gtag function
               function gtag(){dataLayer.push(arguments);}
               console.log('✅ gtag function defined');
               
               // Assign to window.gtag (IMPORTANT!)
               window.gtag = gtag;
               console.log('✅ gtag assigned to window.gtag');
               
               // Initialize gtag
               gtag('js', new Date());
               console.log('✅ gtag js initialized');
               
               // Configure gtag
               gtag('config', '${GA_MEASUREMENT_ID}', {
                 anonymize_ip: true,
                 allow_google_signals: false,
                 allow_ad_personalization_signals: false
               });
               console.log('✅ gtag config completed');
               
               // Test if gtag is working
               try {
                 gtag('event', 'test_event', { event_category: 'debug', event_label: 'script_loaded' });
                 console.log('✅ gtag event test successful');
               } catch (error) {
                 console.error('❌ gtag event test failed:', error);
               }
               
               console.log('✅ Google Analytics script fully loaded');
               console.log('Final check - window.gtag available:', !!window.gtag);
             } catch (error) {
               console.error('❌ Google Analytics Script Error:', error);
               console.error('Error details:', error.message);
             }
           `,
         }}
      />
    </>
  );
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
    </Suspense>
  );
}
