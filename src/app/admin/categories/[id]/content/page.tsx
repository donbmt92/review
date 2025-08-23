import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '../../../../lib/db';
import CategoryContentForm from './CategoryContentForm';

export const metadata: Metadata = {
  title: 'Quản lý nội dung danh mục - Admin Panel',
  robots: 'noindex, nofollow',
};

interface CategoryContentPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCategory(id: string) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: {
        // content: true // Tạm thời comment để test
      }
    });
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export default async function CategoryContentPage({ params }: CategoryContentPageProps) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          Quản lý nội dung: {category.name}
        </h1>
        <div className="page-actions">
          <a href={`/admin/categories/${category.id}`} className="btn btn-outline">
            ← Quay lại danh mục
          </a>
        </div>
      </div>

      <div style={{ 
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        color: '#1e40af'
      }}>
        <strong>💡 Hướng dẫn:</strong> Điền nội dung tùy chỉnh cho danh mục này. Nếu để trống, hệ thống sẽ sử dụng nội dung mặc định tự động generate.
      </div>

      <CategoryContentForm category={category} />
    </div>
  );
}
