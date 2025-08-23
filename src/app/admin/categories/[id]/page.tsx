import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '../../../lib/db';
import CategoryForm from '../CategoryForm';
import CategoryContentForm from './content/CategoryContentForm';

export const metadata: Metadata = {
  title: 'Chỉnh sửa danh mục - Admin Panel',
  robots: 'noindex, nofollow',
};

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCategory(id: string) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Chỉnh sửa danh mục: {category.name}</h1>
      </div>

      {category._count.products > 0 && (
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '0.5rem',
          color: '#92400e'
        }}>
          <strong>⚠️ Lưu ý:</strong> Danh mục này có {category._count.products} sản phẩm. 
          Thay đổi slug sẽ ảnh hưởng đến URL của trang so sánh.
        </div>
      )}

      <CategoryForm category={category} isEdit={true} />
      
      {/* Content Management Section */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          📝 Quản lý nội dung
        </h2>
        
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '0.5rem',
          color: '#0c4a6e'
        }}>
          <strong>💡 Hướng dẫn:</strong> Điền nội dung tùy chỉnh cho danh mục này. 
          Nếu để trống, hệ thống sẽ sử dụng nội dung mặc định tự động generate.
        </div>
        
        <CategoryContentForm category={category} />
      </div>
    </div>
  );
}
