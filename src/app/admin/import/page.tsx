import { Metadata } from 'next';
import ImportTool from './ImportTool';

export const metadata: Metadata = {
  title: 'Import dữ liệu - Admin Panel',
  robots: 'noindex, nofollow',
};

export default function ImportPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Import dữ liệu</h1>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#fef3c7', 
          border: '1px solid #f59e0b', 
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#92400e' }}>
            ⚠️ Lưu ý quan trọng
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#92400e' }}>
            <li>Tool này sẽ import dữ liệu từ các file static hiện tại vào database</li>
            <li>Nếu danh mục/sản phẩm đã tồn tại, nó sẽ được cập nhật</li>
            <li>Hãy backup database trước khi chạy import</li>
            <li>Quá trình có thể mất vài phút</li>
          </ul>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#eff6ff', 
          border: '1px solid #3b82f6', 
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e40af' }}>
            📋 Dữ liệu sẽ được import
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
            <li><strong>Air Purifiers</strong> - 10 sản phẩm từ airPurifiersData.ts</li>
            <li><strong>Steam Cleaners</strong> - Dữ liệu từ steamCleanersData.ts</li>
            <li><strong>Vitamin D3 K2</strong> - Dữ liệu từ vitaminD3K2Data.ts</li>
            <li>Tất cả highlights, offers và metadata</li>
          </ul>
        </div>
      </div>

      <ImportTool />
    </div>
  );
}
