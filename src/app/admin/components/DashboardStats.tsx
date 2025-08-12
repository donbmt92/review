import { prisma } from "@/app/lib/db";

async function getStats() {
  const [productsCount, categoriesCount, newslettersCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.newsletterSubscription.count(),
  ]);

  return {
    productsCount,
    categoriesCount,
    newslettersCount,
  };
}

export default async function DashboardStats() {
  const stats = await getStats();

  const statCards = [
    {
      name: "Tổng sản phẩm",
      value: stats.productsCount,
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Danh mục",
      value: stats.categoriesCount,
      change: "+2",
      changeType: "increase",
    },
    {
      name: "Newsletter",
      value: stats.newslettersCount,
      change: "+8%",
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
