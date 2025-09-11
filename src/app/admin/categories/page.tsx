import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../../lib/db';
import DeleteCategoryButton from './DeleteCategoryButton';

export const metadata: Metadata = {
  title: 'Quản lý danh mục - Admin Panel',
  robots: 'noindex, nofollow',
};

// Force dynamic rendering for admin panel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCategories() {
  try {
    return await db.category.findMany({
      include: {
        _count: {
          select: { products: true, children: true }
        },
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          select: { id: true, name: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý danh mục</h1>
        <div className="page-actions">
          <Link href="/admin/categories/create" className="btn btn-primary">
            + Thêm danh mục
          </Link>
        </div>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Loại</th>
              <th>Slug</th>
              <th>Icon</th>
              <th>Số sản phẩm</th>
              <th>Sub-categories</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {category.parent && (
                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>└─</span>
                      )}
                      <strong>{category.name}</strong>
                    </div>
                  </td>
                  <td>
                    {category.parent ? (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        backgroundColor: '#e0f2fe', 
                        color: '#0369a1', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '0.25rem'
                      }}>
                        Sub-category
                      </span>
                    ) : (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        backgroundColor: '#f0f9ff', 
                        color: '#0c4a6e', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '0.25rem'
                      }}>
                        Parent
                      </span>
                    )}
                  </td>
                  <td>
                    <code style={{ 
                      backgroundColor: '#f1f5f9', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {category.slug}
                    </code>
                  </td>
                  <td>
                    {category.icon ? (
                      <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                    ) : (
                      <span style={{ color: '#6b7280' }}>—</span>
                    )}
                  </td>
                  <td>
                    <span className="status-badge active">
                      {category._count.products} sản phẩm
                    </span>
                  </td>
                  <td>
                    {category._count.children > 0 ? (
                      <span className="status-badge active">
                        {category._count.children} sub-categories
                      </span>
                    ) : (
                      <span style={{ color: '#6b7280' }}>—</span>
                    )}
                  </td>
                  <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link 
                        href={`/admin/categories/${category.id}`} 
                        className="action-btn edit"
                      >
                        Sửa
                      </Link>
                      <Link 
                        href={`/${category.slug}`} 
                        className="action-btn edit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem
                      </Link>
                      {category._count.products === 0 && category._count.children === 0 && (
                        <DeleteCategoryButton categoryId={category.id} />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                  <div className="empty-state">
                    <h3>Chưa có danh mục nào</h3>
                    <p>Hãy tạo danh mục đầu tiên để bắt đầu quản lý sản phẩm.</p>
                    <Link href="/admin/categories/create" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                      + Tạo danh mục đầu tiên
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {categories.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 Ghi chú
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
            <li>Slug sẽ được sử dụng trong URL (ví dụ: /air-purifiers)</li>
            <li>Chỉ có thể xóa danh mục không có sản phẩm nào</li>
            <li>Icon sẽ hiển thị trong trang chủ và navigation</li>
            <li>Tên danh mục nên ngắn gọn và dễ hiểu</li>
          </ul>
        </div>
      )}
    </div>
  );
}
