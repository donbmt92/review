"use client";

import { useState } from "react";

export function useNewsletter(): {
  submit: (email: string) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
} {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string): Promise<void> {
    setSubmitting(true);
    setError(null);
    try {
      // Replace with real API
      await new Promise((r) => setTimeout(r, 400));
    } catch (e) {
      setError("Failed to subscribe");
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}


