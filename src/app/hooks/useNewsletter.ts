"use client";

import { useState } from "react";

export function useNewsletter(): {
  submit: (email: string) => Promise<{ ok: boolean; error?: string }>;
  isSubmitting: boolean;
  error: string | null;
} {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string): Promise<{ ok: boolean; error?: string }> {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message: string = data?.error || "Failed to subscribe";
        setError(message);
        return { ok: false, error: message };
      }
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to subscribe";
      setError(message);
      return { ok: false, error: message };
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}


