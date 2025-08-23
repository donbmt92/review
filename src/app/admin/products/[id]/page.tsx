import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '../../../lib/db';
import ProductForm from '../ProductForm';

export const metadata: Metadata = {
  title: 'Chỉnh sửa sản phẩm - Admin Panel',
  robots: 'noindex, nofollow',
};

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        highlights: true,
        offers: true,
        reviewMeta: true
      }
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getCategories() {
  try {
    return await db.category.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          Chỉnh sửa sản phẩm: {product.title.length > 50 ? 
            product.title.substring(0, 50) + '...' : 
            product.title
          }
        </h1>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        color: '#1e40af'
      }}>
        <strong>ℹ️ Thông tin:</strong> Thay đổi hạng (rank) có thể ảnh hưởng đến thứ tự hiển thị trong trang so sánh.
      </div>

      <ProductForm categories={categories} product={product} isEdit={true} />
    </div>
  );
}
