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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Xử lý tìm kiếm ở đây
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold ml-5">
          <Image
            src="/buyereviews-logo.webp"
            alt="BuyeReview logo"
            width={45}
            height={45}
            className="h-10 w-10 object-contain"
            style={{ width: "45px", height: "45px" }}
            priority
          />
          <span className="sr-only sm:not-sr-only text-2xl">BuyeReview</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {/* Search Icon and Input */}
          <div className="relative">
            {showSearch ? (
              <div style={{ position: "relative" }}>
                <form onSubmit={handleSearch} className="flex items-center">
                  <div style={{ position: "relative" }}>
                    <input
                      id="search-input"
                      type="text"
                      autoComplete="off"
                      placeholder="What are you searching for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: "250px",
                        height: "30px",
                        borderRadius: "25px",
                        borderColor: "transparent",
                        paddingLeft: "30px",
                        backgroundColor: "white",
                        color: "gray",
                        outline: "none",
                        fontSize: "14px",
                      }}
                      autoFocus
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    >
                                             <svg
                         width="16"
                         height="17"
                         viewBox="0 0 16 17"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         style={{ opacity: 0.7 }}
                       >
                         <circle
                           cx="6.25"
                           cy="6.75"
                           r="5.25"
                           stroke="gray"
                           strokeWidth="1.5"
                         ></circle>
                         <path
                           d="M15 15.5L9.75 10.25"
                           stroke="gray"
                           strokeWidth="1.5"
                         ></path>
                       </svg>
                    </div>
                  </div>

                  <button
                    aria-label="Search"
                    className="inline-flex h-9 w-9 items-center justify-center rounded transition-colors"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                  >
                    <svg
                      className="search-icon-header"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="6.25"
                        cy="6.75"
                        r="5.25"
                        stroke="white"
                        strokeWidth="1.5"
                      ></circle>
                      <path
                        d="M15 15.5L9.75 10.25"
                        stroke="white"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            ) : (
              <button
                aria-label="Search"
                className="inline-flex h-9 w-9 items-center justify-center rounded transition-colors"
                onClick={() => setShowSearch(true)}
              >
                <svg
                  className="search-icon-header"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.25"
                    cy="6.75"
                    r="5.25"
                    stroke="white"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M15 15.5L9.75 10.25"
                    stroke="white"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-base font-semibold">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:underline underline-offset-4"
              >
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
