'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track SPA page views
  useEffect(() => {
    const tryGtag = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
        });
      } else {
        // Retry sau 100ms nếu gtag chưa load
        setTimeout(tryGtag, 100);
      }
    };
    tryGtag();
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  useEffect(() => {
    // Scroll depth
    let maxScroll = 0;
    const scrollHandler = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((window.scrollY / docHeight) * 100);
      if (percent > maxScroll && percent % 25 === 0) {
        maxScroll = percent;
        window.gtag?.('event', 'scroll_depth', { scroll_percentage: percent });
      }
    };
    window.addEventListener('scroll', scrollHandler);

    // Outbound links
    const clickHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hostname !== window.location.hostname) {
        window.gtag?.('event', 'click_external_link', { link_url: target.href });
      }
    };
    document.addEventListener('click', clickHandler);

    // Time on page
    const startTime = Date.now();
    const unloadHandler = () => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      window.gtag?.('event', 'time_on_page', { seconds });
    };
    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, []);

  return (
    <>
      {/* Load GA script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}
