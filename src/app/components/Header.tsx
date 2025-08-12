"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const primaryNav: NavItem[] = [
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/buyereviews-logo.webp"
            alt="BuyeReviews logo"
            width={45}
            height={45}
            className="h-10 w-10 object-contain"
            style={{ width: '45px', height: '45px' }}
            priority
          />
          <span className="sr-only sm:not-sr-only text-2xl">BuyeReviews</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-6 text-base font-semibold">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            aria-label="Open menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded border border-white/20"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="i-heroicons-bars-3 w-5 h-5">≡</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black text-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


