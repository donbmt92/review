import { Metadata } from 'next';
import { db } from '../../../lib/db';
import ImportTool from '../ImportTool';

export const metadata: Metadata = {
  title: 'Import Sản phẩm - Admin Panel',
  robots: 'noindex, nofollow',
};

// Force dynamic rendering for admin panel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCategories() {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ImportProductsPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Import Sản phẩm từ BuyeReviews</h1>
        <div className="page-actions">
          <a href="/admin/products" className="btn btn-outline">
            ← Quay lại danh sách sản phẩm
          </a>
        </div>
      </div>

      <ImportTool categories={categories} />
    </div>
  );
}
