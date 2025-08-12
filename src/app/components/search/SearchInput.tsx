"use client";

import { useEffect, useMemo, useState } from "react";

type Suggestion = {
  id: string;
  label: string;
};

const demoSuggestions: Suggestion[] = [
  { id: "air-purifiers", label: "Air Purifiers" },
  { id: "pool-cleaners", label: "Pool Cleaners" },
  { id: "vibration-plates", label: "Vibration Plates" },
  { id: "lawn-mower", label: "Mowing Lawn Robot" },
];

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demoSuggestions;
    return demoSuggestions.filter((s) => s.label.toLowerCase().includes(q));
  }, [query]);

  // Simple debouncing for demo
  const [displayQuery, setDisplayQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDisplayQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] self-center mx-auto">
      <input
        aria-label="Search products"
        placeholder="What are you searching for?"
        className="w-full h-10 sm:h-12 rounded-lg sm:rounded-[12px] border border-black/10 bg-white/95 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-[14px] leading-tight sm:leading-[1.4285em] shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
      />
      <button
        aria-label="Search"
        className="absolute right-1 top-1 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-[12px] bg-black text-white text-sm sm:text-base hover:bg-black/90 transition-colors"
      >
        →
      </button>
      {focused && (
        <div className="absolute z-10 mt-2 w-full rounded-lg sm:rounded-[12px] border border-black/10 bg-white shadow-lg">
          <ul className="py-1 sm:py-2">
            {results.map((s) => (
              <li key={s.id}>
                <button
                  className="w-full px-3 sm:px-4 py-2 text-left text-sm sm:text-base hover:bg-black/[.03] transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setQuery(s.label);
                    setFocused(false);
                  }}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          {displayQuery && (
            <div className="border-t border-black/5 px-3 sm:px-4 py-2 text-xs text-black/60">
              Showing results for: {displayQuery}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


