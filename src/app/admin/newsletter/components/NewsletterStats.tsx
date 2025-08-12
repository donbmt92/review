import { prisma } from "@/app/lib/db";

async function getNewsletterStats() {
  const [totalSubscriptions, recentSubscriptions, monthlyGrowth] = await Promise.all([
    prisma.newsletterSubscription.count(),
    prisma.newsletterSubscription.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    }),
    prisma.newsletterSubscription.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    })
  ]);

  return {
    totalSubscriptions,
    recentSubscriptions,
    monthlyGrowth,
  };
}

export default async function NewsletterStats() {
  const stats = await getNewsletterStats();

  const statCards = [
    {
      name: "Tổng đăng ký",
      value: stats.totalSubscriptions,
      change: `+${stats.recentSubscriptions} tuần này`,
      changeType: "increase",
    },
    {
      name: "Tuần này",
      value: stats.recentSubscriptions,
      change: "Mới",
      changeType: "increase",
    },
    {
      name: "Tháng này",
      value: stats.monthlyGrowth,
      change: `+${stats.monthlyGrowth - stats.recentSubscriptions}`,
      changeType: "increase",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stat.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
