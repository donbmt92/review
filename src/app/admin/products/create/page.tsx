import { Metadata } from 'next';
import { db } from '../../../lib/db';
import ProductForm from '../ProductForm';

export const metadata: Metadata = {
  title: 'Thêm sản phẩm mới - Admin Panel',
  robots: 'noindex, nofollow',
};

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

export default async function CreateProductPage() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Thêm sản phẩm mới</h1>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Chưa có danh mục nào
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Bạn cần tạo ít nhất một danh mục trước khi thêm sản phẩm.
          </p>
          <a href="/admin/categories/create" className="btn btn-primary">
            + Tạo danh mục đầu tiên
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Thêm sản phẩm mới</h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
