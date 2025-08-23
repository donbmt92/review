'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SeedPetsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedPets = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/seed-pets', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Lỗi kết nối: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tạo dữ liệu Pets</h1>
        <div className="page-actions">
          <Link href="/admin" className="btn btn-outline">
            ← Quay lại Dashboard
          </Link>
        </div>
      </div>

      <div className="admin-card">
        <h2>🎯 Tạo danh mục Pets và sản phẩm</h2>
        <p>
          Script này sẽ tạo:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>✅ Danh mục "Pets" với icon 🐕</li>
          <li>✅ 5 sản phẩm thú cưng phổ biến</li>
          <li>✅ Highlights, offers và review metadata</li>
          <li>✅ Dữ liệu đầy đủ để hiển thị trang so sánh</li>
        </ul>

        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={handleSeedPets}
            disabled={isLoading}
            className="btn btn-primary"
            style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
          >
            {isLoading ? '🔄 Đang tạo...' : '🚀 Tạo dữ liệu Pets'}
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            <strong>❌ Lỗi:</strong> {error}
          </div>
        )}

        {result && (
          <div className="alert alert-success">
            <strong>✅ Thành công!</strong>
            <div style={{ marginTop: '0.5rem' }}>
              <p><strong>Danh mục:</strong> {result.data.category.name}</p>
              <p><strong>Sản phẩm đã tạo:</strong> {result.data.totalProducts}</p>
              <p><strong>Slug:</strong> {result.data.category.slug}</p>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link 
                href={`/${result.data.category.slug}`} 
                className="btn btn-outline"
                target="_blank"
              >
                🌐 Xem trang so sánh
              </Link>
            </div>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>📋 Danh sách sản phẩm sẽ được tạo:</h3>
          <ol style={{ marginLeft: '1.5rem' }}>
            <li><strong>Royal Canin Adult Dog Food</strong> - Thức ăn chó (9.2/10)</li>
            <li><strong>Frisco Cat Scratching Post</strong> - Cột cào mèo (8.8/10)</li>
            <li><strong>PetSafe Wireless Dog Fence</strong> - Hàng rào vô tuyến (9.0/10)</li>
            <li><strong>Kong Classic Dog Toy</strong> - Đồ chơi chó (8.5/10)</li>
            <li><strong>Arm & Hammer Cat Litter</strong> - Cát mèo (8.7/10)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
