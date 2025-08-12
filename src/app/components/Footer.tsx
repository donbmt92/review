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
    <footer className="border-t border-black/5 mx-auto max-w-7xl px-4 ">
      <div
className="relative overflow-hidden rounded-t-xl border-t border-sky-100 p-6 sm:p-10 text-white shadow-md bg-center bg-cover min-h-[170px] flex flex-col justify-center"        style={{ backgroundImage: "url(/newsletter-banner.png)" }}
      >
        <div className="absolute inset-0 bg-blue-500/30" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold whitespace-nowrap">
            Deals Newsletter
          </h3>
          <form
            onSubmit={onSubmit}
            className="flex flex-row items-center gap-3"
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
              className="h-12 w-72 sm:w-96 flex-none rounded-full px-4 bg-white text-black placeholder:text-gray-500 focus:outline-none shadow-md border border-black/10"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-black px-6 font-semibold text-white hover:bg-black/90"
            >
              Send Me Deals
            </button>
          </form>
          {status === "success" && (
            <p role="status" className="mt-2 text-sm text-emerald-100">
              Thanks! Please check your inbox to confirm.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-2 text-sm text-red-100">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-black/70 bg-black text-white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/buyereviews-logo.webp"
                alt="BuyeReviews logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              <span className="sr-only sm:not-sr-only">BuyeReviews</span>
            </Link>
            {/* <div className="font-semibold">BuyeReviews</div> */}
            <p className="mt-2 text-white/60">
            Your ultimate destination for comprehensive comparisons and
            reviews of the top 10 products across a wide range of categories.            </p>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a className="hover:underline" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Privacy</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a className="hover:underline" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-black/5 pt-4 text-xs">
          © {new Date().getFullYear()} BuyeReviews.
        </div>
      </div>
    </footer>
  );
}
