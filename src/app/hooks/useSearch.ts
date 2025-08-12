"use client";

import { useEffect, useState } from "react";

export function useSearch(initial = ""): {
  query: string;
  setQuery: (q: string) => void;
  isLoading: boolean;
  results: string[];
} {
  const [query, setQuery] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const handle = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      // demo: pretend to search
      await new Promise((r) => setTimeout(r, 200));
      setResults([`Result for ${query}`]);
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  return { query, setQuery, isLoading, results };
}


