"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      // Placeholder for API call
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-black/5 mx-auto max-w-6xl px-4">
      <div
        className="deals-newsletter-container relative overflow-hidden rounded-t-xl border-t border-sky-100 p-4 sm:p-6 md:p-10 text-white shadow-md bg-center bg-cover min-h-[140px] sm:min-h-[160px] md:min-h-[170px] flex flex-col justify-center"
        style={{ backgroundImage: "url(/newsletter-banner.png)" }}
      >
        <div
          className="absolute inset-0 bg-blue-300 mix-blend-color"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap text-center sm:text-left">
            Deals Newsletter
          </h3>
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 sm:h-12 w-full sm:w-96 rounded-full px-3 sm:px-4 bg-white text-black placeholder:text-gray-500 focus:outline-none shadow-md border border-black/10 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="h-10 sm:h-12 w-full sm:w-auto min-w-40 sm:min-w-48 px-5 sm:px-7 rounded-full bg-black font-semibold text-white hover:bg-black/90 transition-colors text-sm sm:text-base"
            >
              Send Me Deals
            </button>
          </form>
          {status === "success" && (
            <p
              role="status"
              className="mt-2 text-xs sm:text-sm text-emerald-100 text-center sm:text-left"
            >
              Thanks! Please check your inbox to confirm.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="mt-2 text-xs sm:text-sm text-red-100 text-center sm:text-left"
            >
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 text-sm text-white bg-black">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 font-semibold justify-center sm:justify-start">
              <Image
                src="/buyereviews-logo.png"
                alt="BuyeReview"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              <span className="text-lg">BuyeReview</span>
            </div>
            <p className="mt-2 text-white/80 text-sm leading-relaxed">
              Your ultimate destination for comprehensive comparisons and reviews of the top 10 products across a wide range of categories.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-semibold text-lg">BuyeReview</div>
          </div>
          <div className="text-center sm:text-left">
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/data-subject-request-form" className="hover:underline transition-colors">
                  Data Subject Request Form
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/ccpa-privacy-notice" className="hover:underline transition-colors">
                  CCPA Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t border-white/20 pt-4 text-xs text-center sm:text-left">
          © {new Date().getFullYear()} BuyeReviews.
        </div>
      </div>
    </footer>
  );
}
