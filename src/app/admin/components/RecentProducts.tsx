import { prisma } from "@/app/lib/db";
import Link from "next/link";
import Image from "next/image";

async function getRecentProducts() {
  return await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      reviewMeta: true,
    },
  });
}

export default async function RecentProducts() {
  const products = await getRecentProducts();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Sản phẩm gần đây
          </h3>
          <Link
            href="/admin/products"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.title}
                </p>
                <p className="text-sm text-gray-500">
                  {product.category.name} • {product.score}/10
                </p>
                {product.reviewMeta && (
                  <p className="text-xs text-gray-400">
                    {product.reviewMeta.reviewsCount} đánh giá
                  </p>
                )}
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {product.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
