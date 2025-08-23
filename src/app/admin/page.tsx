import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../lib/db';

export const metadata: Metadata = {
  title: 'Dashboard - Admin Panel',
  robots: 'noindex, nofollow',
};

// Force dynamic rendering for admin panel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getStats() {
  try {
    const [categoriesCount, productsCount, totalProducts] = await Promise.all([
      db.category.count(),
      db.product.count(),
      db.product.count()
    ]);

    // Lấy categories với số lượng sản phẩm
    const categoriesWithProductCount = await db.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Lấy sản phẩm mới nhất
    const recentProducts = await db.product.findMany({
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return {
      categoriesCount,
      productsCount,
      totalProducts,
      categoriesWithProductCount,
      recentProducts
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      categoriesCount: 0,
      productsCount: 0,
      totalProducts: 0,
      categoriesWithProductCount: [],
      recentProducts: []
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="page-actions">
          <Link href="/admin/products/create" className="btn btn-primary">
            + Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Tổng danh mục</h3>
          <p className="value">{stats.categoriesCount}</p>
          <div className="change positive">
            <Link href="/admin/categories" style={{ color: 'inherit', textDecoration: 'none' }}>
              Xem tất cả →
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Tổng sản phẩm</h3>
          <p className="value">{stats.productsCount}</p>
          <div className="change positive">
            <Link href="/admin/products" style={{ color: 'inherit', textDecoration: 'none' }}>
              Quản lý →
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Trang so sánh</h3>
          <p className="value">{stats.categoriesCount}</p>
          <div className="change positive">
            <Link href="/admin/pages" style={{ color: 'inherit', textDecoration: 'none' }}>
              Xem tất cả →
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Hoạt động hôm nay</h3>
          <p className="value">0</p>
          <div className="change">Chưa có hoạt động</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Recent Categories */}
        <div className="admin-table">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
              Danh mục gần đây
            </h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Số sản phẩm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {stats.categoriesWithProductCount.length > 0 ? (
                stats.categoriesWithProductCount.map((category: any) => (
                  <tr key={category.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {category.icon && <span>{category.icon}</span>}
                        <strong>{category.name}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge active" style={{ fontSize: '0.75rem' }}>
                        {category._count.products} sản phẩm
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/admin/categories/${category.id}`} className="action-btn edit">
                          Quản lý
                        </Link>
                        <Link href={`/admin/products`} className="action-btn edit" style={{ marginLeft: '0.5rem' }}>
                          Xem sản phẩm
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    Chưa có danh mục nào. 
                    <Link href="/admin/categories" style={{ color: '#3b82f6', marginLeft: '0.5rem' }}>
                      Tạo danh mục đầu tiên
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Products */}
        <div className="admin-table">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
              Sản phẩm mới nhất
            </h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((product: any) => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="product-image"
                        />
                        <div>
                          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                            {product.title.length > 30 ? 
                              product.title.substring(0, 30) + '...' : 
                              product.title
                            }
                          </strong>
                          {product.badge && (
                            <span className="status-badge active" style={{ fontSize: '0.6rem' }}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{product.category.name}</td>
                    <td>
                      <strong style={{ color: '#059669' }}>{product.score}</strong>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    Chưa có sản phẩm nào. 
                    <Link href="/admin/products/create" style={{ color: '#3b82f6', marginLeft: '0.5rem' }}>
                      Thêm sản phẩm đầu tiên
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Thao tác nhanh
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin/categories" className="btn btn-outline">
            📂 Quản lý danh mục
          </Link>
          <Link href="/admin/products" className="btn btn-outline">
            📦 Sản phẩm theo danh mục
          </Link>
          <Link href="/admin/pages" className="btn btn-outline">
            📄 Trang so sánh
          </Link>
          <Link href="/admin/import" className="btn btn-outline">
            ⬆️ Import dữ liệu
          </Link>
          <Link href="/admin/seed-pets" className="btn btn-outline">
            🐕 Tạo Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
