"use client";

import { useState } from "react";
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { trackNewsletterSignup } = useGoogleAnalytics();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      // Placeholder for API call
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setEmail("");
      // Track newsletter signup
      trackNewsletterSignup("homepage");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
    
    </section>
  );
}


