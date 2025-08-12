"use client";

import { useEffect, useRef, useState } from "react";

export default function AdvertisingDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center gap-2 text-black/60">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-sm hover:text-black"
      >
        <svg
          className="shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeLinecap="round" />
          <path d="M12 17V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="currentColor" />
        </svg>
        <span>Advertising Disclosure</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          className="absolute left-0 top-7 z-50 w-80 max-w-[90vw] rounded-md border border-black/10 bg-white p-4 text-sm text-black/70 shadow-lg"
        >
          <div className="whitespace-pre-line">
            Our rankings are generated using advanced algorithms that process extensive data, including customer feedback on product quality, brand reputation, merchant service standards, and current market trends. These rankings represent our informed opinion and are intended to serve as a helpful shopping guide. Please note that we participate in affiliate marketing programs. When you purchase through links on our site, we may earn a commission as an Amazon Associate or from other affiliate partners. This comes at no additional cost to you and helps support the resources required to provide valuable content.
          </div>
        </div>
      )}
    </div>
  );
}


