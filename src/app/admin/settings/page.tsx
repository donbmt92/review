import { Metadata } from 'next';
import Link from 'next/link';
import { db } from '../../lib/db';

export const metadata: Metadata = {
  title: 'Cài đặt hệ thống - Admin Panel',
  robots: 'noindex, nofollow',
};

async function getSystemStats() {
  try {
    const [categoriesCount, productsCount, highlightsCount, offersCount] = await Promise.all([
      db.category.count(),
      db.product.count(),
      db.highlight.count(),
      db.offer.count(),
    ]);

    return {
      categoriesCount,
      productsCount,
      highlightsCount,
      offersCount
    };
  } catch (error) {
    console.error('Error fetching system stats:', error);
    return {
      categoriesCount: 0,
      productsCount: 0,
      highlightsCount: 0,
      offersCount: 0
    };
  }
}

export default async function SettingsPage() {
  const stats = await getSystemStats();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cài đặt hệ thống</h1>
      </div>

      {/* System Statistics */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          📊 Thống kê hệ thống
        </h2>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Tổng danh mục</h3>
            <p className="value">{stats.categoriesCount}</p>
          </div>
          <div className="dashboard-card">
            <h3>Tổng sản phẩm</h3>
            <p className="value">{stats.productsCount}</p>
          </div>
          <div className="dashboard-card">
            <h3>Tổng highlights</h3>
            <p className="value">{stats.highlightsCount}</p>
          </div>
          <div className="dashboard-card">
            <h3>Tổng offers</h3>
            <p className="value">{stats.offersCount}</p>
          </div>
        </div>
      </div>

      {/* Database Management */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          🗄️ Quản lý dữ liệu
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div className="admin-form">
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              Import dữ liệu
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Import dữ liệu từ file static để tạo nhanh danh mục và sản phẩm.
            </p>
            <Link href="/admin/import" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
              ⬆️ Import dữ liệu
            </Link>
          </div>

          <div className="admin-form">
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              Backup dữ liệu
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Tạo backup database để bảo vệ dữ liệu quan trọng.
            </p>
            <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }} disabled>
              💾 Backup (Sắp có)
            </button>
          </div>

          <div className="admin-form">
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              Reset dữ liệu
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Xóa toàn bộ dữ liệu và reset về trạng thái ban đầu.
            </p>
            <button className="btn btn-danger" style={{ fontSize: '0.875rem' }} disabled>
              🗑️ Reset (Nguy hiểm)
            </button>
          </div>
        </div>
      </div>

      {/* SEO & Performance */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          🚀 SEO & Performance
        </h2>
        <div className="admin-form">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              ✅ Tính năng đã được tối ưu
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#059669' }}>
              <li>Static generation cho tất cả trang so sánh</li>
              <li>Dynamic imports cho static data fallback</li>
              <li>Optimized metadata cho SEO</li>
              <li>Responsive images với proper alt text</li>
              <li>Clean URLs với slugs</li>
              <li>Structured data ready</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              🔧 Cài đặt cache
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
              Tất cả trang đã được cấu hình với force-static để tối ưu performance.
            </p>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f0fdf4', 
              border: '1px solid #22c55e', 
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#166534'
            }}>
              <strong>✓ Cache đã được bật:</strong> Trang sẽ được build một lần và serve static content
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          ℹ️ Thông tin hệ thống
        </h2>
        <div className="admin-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
                Framework
              </h4>
              <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>Next.js 14 with App Router</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
                Database
              </h4>
              <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>SQLite with Prisma ORM</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
                Deployment
              </h4>
              <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>Static Generation Ready</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
                Admin Panel
              </h4>
              <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>Custom React Components</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          ⚡ Thao tác nhanh
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin" className="btn btn-outline">
            🏠 Dashboard
          </Link>
          <Link href="/admin/categories" className="btn btn-outline">
            📂 Quản lý danh mục
          </Link>
          <Link href="/admin/products" className="btn btn-outline">
            📦 Quản lý sản phẩm
          </Link>
          <Link href="/admin/pages" className="btn btn-outline">
            📄 Trang so sánh
          </Link>
          <Link href="/" className="btn btn-primary" target="_blank">
            🌐 Xem website
          </Link>
        </div>
      </div>
    </div>
  );
}
