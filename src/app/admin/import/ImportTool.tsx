'use client';

import { useState } from 'react';

interface ImportStatus {
  status: 'idle' | 'importing' | 'success' | 'error';
  message: string;
  details?: string[];
}

export default function ImportTool() {
  const [importStatus, setImportStatus] = useState<ImportStatus>({
    status: 'idle',
    message: ''
  });

  const handleImport = async () => {
    setImportStatus({
      status: 'importing',
      message: 'Đang import dữ liệu...'
    });

    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setImportStatus({
          status: 'success',
          message: 'Import thành công!',
          details: result.details
        });
      } else {
        setImportStatus({
          status: 'error',
          message: result.message || 'Có lỗi xảy ra',
          details: result.errors
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus({
        status: 'error',
        message: 'Có lỗi xảy ra khi import dữ liệu'
      });
    }
  };

  const getStatusColor = () => {
    switch (importStatus.status) {
      case 'importing': return '#f59e0b';
      case 'success': return '#059669';
      case 'error': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBg = () => {
    switch (importStatus.status) {
      case 'importing': return '#fef3c7';
      case 'success': return '#dcfce7';
      case 'error': return '#fef2f2';
      default: return '#f9fafb';
    }
  };

  return (
    <div className="admin-form">
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          Bắt đầu import
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Nhấn nút bên dưới để bắt đầu import dữ liệu từ các file static vào database.
        </p>

        <button
          onClick={handleImport}
          disabled={importStatus.status === 'importing'}
          className="btn btn-primary"
          style={{ 
            opacity: importStatus.status === 'importing' ? 0.6 : 1,
            cursor: importStatus.status === 'importing' ? 'not-allowed' : 'pointer'
          }}
        >
          {importStatus.status === 'importing' ? '⏳ Đang import...' : '🚀 Bắt đầu import'}
        </button>
      </div>

      {/* Status Display */}
      {importStatus.message && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: getStatusBg(),
          border: `1px solid ${getStatusColor()}`,
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: importStatus.details ? '1rem' : 0
          }}>
            {importStatus.status === 'importing' && <span>⏳</span>}
            {importStatus.status === 'success' && <span>✅</span>}
            {importStatus.status === 'error' && <span>❌</span>}
            <strong style={{ color: getStatusColor() }}>
              {importStatus.message}
            </strong>
          </div>

          {importStatus.details && (
            <div>
              <h4 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '0.875rem', 
                fontWeight: '600',
                color: getStatusColor()
              }}>
                Chi tiết:
              </h4>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '1.5rem', 
                color: getStatusColor(),
                fontSize: '0.875rem'
              }}>
                {importStatus.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Import Progress Explanation */}
      {importStatus.status === 'importing' && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '0.5rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            Quá trình import đang diễn ra...
          </h4>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>1. Tạo danh mục (air-purifiers, steam-cleaners, vitamin-d3-k2)</p>
            <p style={{ margin: '0 0 0.5rem 0' }}>2. Import sản phẩm và thông tin chi tiết</p>
            <p style={{ margin: '0 0 0.5rem 0' }}>3. Tạo highlights cho từng sản phẩm</p>
            <p style={{ margin: '0 0 0.5rem 0' }}>4. Tạo offers/liên kết mua hàng</p>
            <p style={{ margin: '0' }}>5. Hoàn tất và kiểm tra dữ liệu</p>
          </div>
        </div>
      )}

      {/* Success Actions */}
      {importStatus.status === 'success' && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: 'white', 
          border: '1px solid #e2e8f0', 
          borderRadius: '0.5rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            🎉 Import hoàn tất!
          </h4>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Dữ liệu đã được import thành công. Bạn có thể:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/admin/categories" className="btn btn-outline">
              📂 Xem danh mục
            </a>
            <a href="/admin/products" className="btn btn-outline">
              📦 Xem sản phẩm
            </a>
            <a href="/admin/pages" className="btn btn-outline">
              📄 Tạo trang so sánh
            </a>
            <a href="/air-purifiers" className="btn btn-primary" target="_blank">
              👀 Xem trang Air Purifiers
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
