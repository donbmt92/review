import { Metadata } from 'next';
import Link from 'next/link';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin Panel - BuyeReviews',
  description: 'Quản lý sản phẩm và danh mục',
  robots: 'noindex, nofollow', // Không cho search engine index trang admin
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link href="/" className="logo-link">
            <img src="/buyereviews-logo.webp" alt="BuyeReviews" width={150} height={40} />
          </Link>
        </div>
        
        <nav className="admin-nav">
          <div className="nav-section">
            <h3>Trang chủ</h3>
            <Link href="/admin" className="nav-link">
              <span className="nav-icon">📊</span>
              Dashboard
            </Link>
          </div>

          <div className="nav-section">
            <h3>Quản lý sản phẩm</h3>
            <Link href="/admin/categories" className="nav-link">
              <span className="nav-icon">📂</span>
              Danh mục
            </Link>
            <Link href="/admin/products" className="nav-link">
              <span className="nav-icon">📦</span>
              Sản phẩm
            </Link>
            <Link href="/admin/products/create" className="nav-link">
              <span className="nav-icon">➕</span>
              Thêm sản phẩm
            </Link>
          </div>

          <div className="nav-section">
            <h3>Nội dung</h3>
            <Link href="/admin/pages" className="nav-link">
              <span className="nav-icon">📄</span>
              Trang so sánh
            </Link>
            <Link href="/admin/pages/create" className="nav-link">
              <span className="nav-icon">🆕</span>
              Tạo trang mới
            </Link>
          </div>

          {/* <div className="nav-section">
            <h3>Công cụ</h3>
            <Link href="/admin/import" className="nav-link">
              <span className="nav-icon">⬆️</span>
              Import dữ liệu
            </Link>
            <Link href="/admin/settings" className="nav-link">
              <span className="nav-icon">⚙️</span>
              Cài đặt
            </Link>
          </div> */}
        </nav>

        <div className="admin-footer">
          <Link href="/" className="back-to-site">
            ← Về trang chính
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <div className="admin-user">
            <span>👤 Admin</span>
          </div>
        </header>
        
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
