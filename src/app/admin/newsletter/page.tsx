import { Suspense } from "react";
import NewsletterList from "./components/NewsletterList";
import NewsletterStats from "./components/NewsletterStats";

export default function AdminNewsletter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Newsletter</h1>
        <p className="text-gray-600 mt-2">
          Xem và quản lý danh sách đăng ký newsletter
        </p>
      </div>

      <Suspense fallback={<div>Đang tải thống kê...</div>}>
        <NewsletterStats />
      </Suspense>

      <Suspense fallback={<div>Đang tải danh sách...</div>}>
        <NewsletterList />
      </Suspense>
    </div>
  );
}
