import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../../lib/db';

export const metadata: Metadata = {
  title: 'Quản lý trang so sánh - Admin Panel',
  robots: 'noindex, nofollow',
};

async function getCategories() {
  try {
    return await db.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function PagesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý trang so sánh</h1>
        <div className="page-actions">
          <Link href="/admin/pages/create" className="btn btn-primary">
            + Tạo trang mới
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#eff6ff', 
          border: '1px solid #3b82f6', 
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e40af' }}>
            ℹ️ Về trang so sánh
          </h3>
          <p style={{ margin: 0, color: '#1e40af' }}>
            Mỗi danh mục có thể tạo thành một trang so sánh sản phẩm. Trang sẽ hiển thị tất cả sản phẩm trong danh mục đó theo thứ tự hạng (rank).
          </p>
        </div>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Danh mục</th>
              <th>URL</th>
              <th>Số sản phẩm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {category.icon && <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>}
                      <div>
                        <strong>{category.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          ID: {category.id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style={{ 
                      backgroundColor: '#f1f5f9', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      /{category.slug}
                    </code>
                  </td>
                  <td>
                    <span className={`status-badge ${category._count.products > 0 ? 'active' : 'inactive'}`}>
                      {category._count.products} sản phẩm
                    </span>
                  </td>
                  <td>
                    {category._count.products > 0 ? (
                      <span className="status-badge active">Có thể tạo trang</span>
                    ) : (
                      <span className="status-badge inactive">Cần thêm sản phẩm</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      {category._count.products > 0 ? (
                        <>
                          <Link 
                            href={`/${category.slug}`} 
                            className="action-btn edit"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            👀 Xem trang
                          </Link>
                          <Link 
                            href={`/admin/pages/${category.id}/edit`} 
                            className="action-btn edit"
                          >
                            ⚙️ Cấu hình
                          </Link>
                        </>
                      ) : (
                        <Link 
                          href={`/admin/products/create?categoryId=${category.id}`} 
                          className="action-btn edit"
                        >
                          + Thêm sản phẩm
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                  <div className="empty-state">
                    <h3>Chưa có danh mục nào</h3>
                    <p>Hãy tạo danh mục đầu tiên để bắt đầu tạo trang so sánh.</p>
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
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            🚀 Thao tác nhanh
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.5rem' 
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                📄 Tạo trang so sánh mới
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                Tạo danh mục và thêm sản phẩm để tự động có trang so sánh
              </p>
              <Link href="/admin/categories/create" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                Bắt đầu tạo
              </Link>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.5rem' 
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                📊 Import dữ liệu
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                Import dữ liệu từ file static để tạo nhanh các trang
              </p>
              <Link href="/admin/import" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                Import ngay
              </Link>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.5rem' 
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                🔧 Quản lý sản phẩm
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                Thêm, sửa, xóa sản phẩm để cập nhật trang so sánh
              </p>
              <Link href="/admin/products" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                Quản lý sản phẩm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
