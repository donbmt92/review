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
    if (!GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
    });
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

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
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });

            // Track scroll depth
            let maxScrollDepth = 0;
            window.addEventListener('scroll', () => {
              const docHeight = document.body.scrollHeight - window.innerHeight;
              if (docHeight <= 0) return;
              const scrollPercent = Math.round((window.scrollY / docHeight) * 100);
              if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
                maxScrollDepth = scrollPercent;
                gtag('event', 'scroll_depth', { scroll_percentage: scrollPercent });
              }
            });

            // Track outbound links
            document.addEventListener('click', (e) => {
              const link = (e.target as HTMLElement).closest?.('a');
              if (link && link.hostname !== window.location.hostname) {
                gtag('event', 'click_external_link', { link_url: link.href });
              }
            });

            // Track time on page
            let startTime = Date.now();
            window.addEventListener('beforeunload', () => {
              const timeOnPage = Math.round((Date.now() - startTime) / 1000);
              gtag('event', 'time_on_page', { seconds: timeOnPage });
            });
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
