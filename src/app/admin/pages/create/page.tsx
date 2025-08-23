import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tạo trang so sánh mới - Admin Panel',
  robots: 'noindex, nofollow',
};

export default function CreatePagePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tạo trang so sánh mới</h1>
      </div>

      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#eff6ff', 
        border: '1px solid #3b82f6', 
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1e40af' }}>
          📋 Cách tạo trang so sánh
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#1e40af' }}>
          Để tạo một trang so sánh mới, bạn cần làm theo các bước sau:
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
          <li>Tạo danh mục mới (ví dụ: "Máy hút bụi", "Máy pha cà phê")</li>
          <li>Thêm sản phẩm vào danh mục đó</li>
          <li>Trang so sánh sẽ tự động có thể truy cập tại URL /{`{slug-danh-muc}`}</li>
        </ol>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Step 1: Create Category */}
        <div className="admin-form">
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Bước 1: Tạo danh mục
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Đầu tiên, bạn cần tạo một danh mục mới để chứa các sản phẩm.
          </p>
          <Link href="/admin/categories/create" className="btn btn-primary">
            🏷️ Tạo danh mục mới
          </Link>
        </div>

        {/* Step 2: Add Products */}
        <div className="admin-form">
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Bước 2: Thêm sản phẩm
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Sau khi có danh mục, thêm các sản phẩm để tạo nội dung so sánh.
          </p>
          <Link href="/admin/products/create" className="btn btn-primary">
            📦 Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Alternative: Import Data */}
      <div style={{ marginTop: '2rem' }}>
        <div className="admin-form">
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            🚀 Tùy chọn nhanh: Import dữ liệu
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Nếu bạn đã có dữ liệu sẵn, có thể import trực tiếp để tạo nhanh nhiều trang cùng lúc.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/admin/import" className="btn btn-secondary">
              ⬆️ Import dữ liệu
            </Link>
            <Link href="/admin/pages" className="btn btn-outline">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          💡 Ví dụ về trang so sánh
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.5rem' 
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
              🌬️ Air Purifiers
            </h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#6b7280' }}>
              So sánh các máy lọc không khí tốt nhất
            </p>
            <code style={{ fontSize: '0.6rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.25rem' }}>
              /air-purifiers
            </code>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.5rem' 
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
              🧽 Steam Cleaners
            </h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#6b7280' }}>
              So sánh các máy làm sạch bằng hơi nước
            </p>
            <code style={{ fontSize: '0.6rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.25rem' }}>
              /steam-cleaners
            </code>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.5rem' 
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
              💊 Vitamin D3 K2
            </h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#6b7280' }}>
              So sánh các viên bổ sung vitamin
            </p>
            <code style={{ fontSize: '0.6rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.25rem' }}>
              /vitamin-d3-k2
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
