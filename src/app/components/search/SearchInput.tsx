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
    <div className="relative">
      <input
        aria-label="Search products"
        placeholder="What are you searching for?"
        className="w-full h-12 rounded-full border border-black/10 bg-white/95 px-5 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
      />
      <button
        aria-label="Search"
        className="absolute right-1 top-1 h-10 w-10 rounded-full bg-black text-white"
      >
        →
      </button>
      {focused && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-black/10 bg-white shadow-lg">
          <ul className="py-2">
            {results.map((s) => (
              <li key={s.id}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-black/[.03]"
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
            <div className="border-t border-black/5 px-4 py-2 text-xs text-black/60">
              Showing results for: {displayQuery}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


