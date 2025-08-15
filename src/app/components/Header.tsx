"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Categories data
const categories = [
  { id: "appliances", label: "Appliances", icon: "/categories/appliances.png", href: "/categories/appliances" },
  { id: "automobile", label: "Automobile", icon: "/categories/automobile.png", href: "/categories/automobile" },
  { id: "beauty", label: "Beauty", icon: "/categories/beauty.png", href: "/categories/beauty" },
  { id: "electronics", label: "Electronics", icon: "/categories/electronics.png", href: "/categories/electronics" },
  { id: "garden", label: "Garden", icon: "/categories/garden.png", href: "/categories/garden" },
  { id: "health", label: "Health", icon: "/categories/health.png", href: "/categories/health" },
  { id: "home-kitchen", label: "Home & Kitchen", icon: "/categories/home-kitchen.png", href: "/categories/home-kitchen" },
  { id: "improvements", label: "Home Improvements", icon: "/categories/improvements.png", href: "/categories/improvements" },
  { id: "office", label: "Office", icon: "/categories/office.png", href: "/categories/office" },
  { id: "pets", label: "Pets", icon: "/categories/pets.png", href: "/categories/pets" },
  { id: "sports", label: "Sports", icon: "/categories/sports.png", href: "/categories/sports" },
  { id: "toys", label: "Toys & Games", icon: "/categories/toys.png", href: "/categories/toys" },
  { id: "other", label: "Other", icon: "/categories/other.png", href: "/categories/other" },
];

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const primaryNav: NavItem[] = [
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <div key={item.href} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  <button
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                    className="hover:underline underline-offset-4 flex items-center gap-1"
                  >
                    {item.label}
                    <svg 
                      width="10" 
                      height="7" 
                      viewBox="0 0 10 7" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${showCategoriesDropdown ? 'rotate-180' : ''}`}
                    >
                      <path 
                        d="M1 1L5 6L9 1" 
                        stroke="white" 
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:underline underline-offset-4 flex items-center gap-1"
                  >
                    {item.label}
                  </Link>
                )}
                
                                                  {/* Categories Dropdown */}
                 {item.hasDropdown && showCategoriesDropdown && (
                   <div className="fixed top-16 left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                     <div className="p-6">
                       <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                         {categories.map((category) => (
                           <Link
                             key={category.id}
                             href={category.href}
                             className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                             onClick={() => setShowCategoriesDropdown(false)}
                           >
                             <div className="w-16 h-16 flex items-center justify-center">
                               <Image
                                 src={category.icon}
                                 alt={category.label}
                                 width={48}
                                 height={48}
                                 className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                               />
                             </div>
                             <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                               {category.label}
                             </span>
                           </Link>
                         ))}
                       </div>
                     </div>
                   </div>
                 )}
              </div>
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
          <div className="mx-auto px-4 py-3 flex flex-col gap-3">
            {primaryNav.map((item) => (
              <div key={item.href}>
                {item.hasDropdown ? (
                  <button
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                    className="py-2 flex items-center justify-between w-full text-left"
                  >
                    {item.label}
                    <svg 
                      width="10" 
                      height="7" 
                      viewBox="0 0 10 7" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`ml-auto transition-transform duration-200 ${showCategoriesDropdown ? 'rotate-180' : ''}`}
                    >
                      <path 
                        d="M1 1L5 6L9 1" 
                        stroke="white" 
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="py-2 flex items-center justify-between"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                
                                 {/* Mobile Categories Dropdown */}
                 {item.hasDropdown && showCategoriesDropdown && (
                   <div className="ml-4 mt-2 bg-gray-800 rounded-lg p-3">
                     <h4 className="text-sm font-semibold text-gray-200 mb-3 text-center">Categories</h4>
                     <div className="grid grid-cols-3 gap-3">
                       {categories.map((category) => (
                         <Link
                           key={category.id}
                           href={category.href}
                           className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-700 transition-colors"
                           onClick={() => {
                             setIsOpen(false);
                             setShowCategoriesDropdown(false);
                           }}
                         >
                           <div className="w-8 h-8 flex items-center justify-center">
                             <Image
                               src={category.icon}
                               alt={category.label}
                               width={24}
                               height={24}
                               className="w-6 h-6 object-contain"
                             />
                           </div>
                           <span className="text-xs text-gray-200 text-center leading-tight">
                             {category.label}
                           </span>
                         </Link>
                       ))}
                     </div>
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
