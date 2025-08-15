"use client";

import { useState } from "react";
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { trackEvent, trackNewsletterSignup } = useGoogleAnalytics();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    
    // Track form submission attempt
    trackEvent('form_submit', 'engagement', 'newsletter_form');
    
    try {
      // Placeholder for API call
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
      setEmail("");
      // Track successful newsletter signup
      trackNewsletterSignup("homepage");
    } catch {
      setStatus("error");
      // Track form error
      trackEvent('form_error', 'engagement', 'newsletter_form');
    }
  }

  const handleEmailFocus = () => {
    trackEvent('form_focus', 'engagement', 'newsletter_email');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      trackEvent('form_input', 'engagement', 'newsletter_email');
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
        <p className="text-gray-600 mb-6">Nhận thông tin về sản phẩm mới và đánh giá chất lượng</p>
        
        <form onSubmit={onSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => trackEvent('button_click', 'engagement', 'newsletter_submit')}
            >
              Đăng ký
            </button>
          </div>
          
          {status === "success" && (
            <p className="text-green-600 mt-2">Đăng ký thành công!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 mt-2">Có lỗi xảy ra, vui lòng thử lại.</p>
          )}
        </form>
      </div>
    </section>
  );
}



