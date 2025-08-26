'use client';

import { useState, useEffect } from 'react';
import ProductForm from '../ProductForm';
import HtmlImportTool from '../HtmlImportTool';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  iconImage?: string | null;
  createdAt: Date;
}

export default function CreateProductPage() {
  const [activeTab, setActiveTab] = useState('form');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
        if (response.ok) {
          const cats = await response.json();
          setCategories(cats);
        }
      } catch (error) {
        console.error('Lỗi khi lấy categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Thêm sản phẩm mới</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Thêm sản phẩm mới</h1>
        </div>
        
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Chưa có danh mục nào
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Bạn cần tạo ít nhất một danh mục trước khi thêm sản phẩm.
          </p>
          <a href="/admin/categories/create" className="btn btn-primary">
            + Tạo danh mục đầu tiên
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Thêm sản phẩm mới</h1>
      </div>

      <div className="tabs-container" style={{ marginBottom: '2rem' }}>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            📝 Form thủ công
          </button>
          <button 
            className={`tab ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            📋 Import từ HTML
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'form' && (
          <div className="tab-pane active">
            <ProductForm categories={categories} />
          </div>
        )}
        
        {activeTab === 'import' && (
          <div className="tab-pane active">
            <HtmlImportTool categories={categories} />
          </div>
        )}
      </div>

      <style jsx>{`
        .tabs-container {
          border-bottom: 2px solid #e5e7eb;
        }
        
        .tabs {
          display: flex;
          gap: 0;
        }
        
        .tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s;
        }
        
        .tab:hover {
          color: #374151;
          background-color: #f9fafb;
        }
        
        .tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
          background-color: #eff6ff;
        }
        
        .tab-content {
          position: relative;
        }
        
        .tab-pane {
          display: block;
        }
      `}</style>
    </div>
  );
}
