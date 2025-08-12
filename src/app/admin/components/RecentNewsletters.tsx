import { prisma } from "@/app/lib/db";
import Link from "next/link";

async function getRecentNewsletters() {
  return await prisma.newsletterSubscription.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
}

export default async function RecentNewsletters() {
  const newsletters = await getRecentNewsletters();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Newsletter gần đây
          </h3>
          <Link
            href="/admin/newsletter"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {newsletter.email}
                </p>
                <p className="text-sm text-gray-500">
                  Đăng ký {new Date(newsletter.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Mới
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
