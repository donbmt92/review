'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseBuyeReviewsHTML, ParsedProduct } from '../../../lib/parseBuyereviews';
import '../import-tool.css';

interface ImportedProduct extends ParsedProduct {}

interface ImportToolProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

export default function ImportTool({ categories }: ImportToolProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [importedProducts, setImportedProducts] = useState<ImportedProduct[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const router = useRouter();

  // Sử dụng parser từ lib
  const processHTML = (html: string): ImportedProduct[] => {
    return parseBuyeReviewsHTML(html);
  };



  const handleProcessHTML = async () => {
    if (!htmlContent.trim()) {
      alert('Vui lòng nhập nội dung HTML');
      return;
    }
    
    setIsProcessing(true);
    try {
      const products = processHTML(htmlContent);
      console.log(products);
      setImportedProducts(products);
      
      if (products.length === 0) {
        alert('Không thể trích xuất sản phẩm nào từ HTML. Vui lòng kiểm tra định dạng.');
      } else {
        alert(`Đã trích xuất ${products.length} sản phẩm thành công!`);
      }
    } catch (error) {
      console.error('Error processing HTML:', error);
      alert('Lỗi khi xử lý HTML: ' + error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportProducts = async () => {
    if (!selectedCategory) {
      alert('Vui lòng chọn danh mục');
      return;
    }
    
    if (importedProducts.length === 0) {
      alert('Không có sản phẩm nào để import');
      return;
    }
    
    setIsImporting(true);
    
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (const product of importedProducts) {
        try {
          const response = await fetch('/api/admin/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: product.title,
              imageUrl: product.imageUrl,
              score: product.score,
              categoryId: selectedCategory,
              rank: product.rank,
              reviewsCount: product.reviewsCount,
              badge: product.discount,
              highlights: product.highlights.map(text => ({ text })),
              offers: []
            }),
          });
          
          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error('Error importing product:', product.title, error);
          errorCount++;
        }
      }
      
      alert(`Import hoàn tất!\nThành công: ${successCount}\nLỗi: ${errorCount}`);
      
      if (successCount > 0) {
        router.refresh();
        setImportedProducts([]);
        setHtmlContent('');
      }
      
    } catch (error) {
      console.error('Error during import:', error);
      alert('Lỗi khi import: ' + error);
    } finally {
      setIsImporting(false);
    }
  };

  const removeProduct = (index: number) => {
    setImportedProducts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="import-tool">
      <div className="tool-header">
        <h2>🔄 Import Sản phẩm từ BuyeReviews</h2>
        <p>Dán nội dung HTML từ trang BuyeReviews để import sản phẩm tự động</p>
      </div>

      <div className="import-section">
        <div className="form-group">
          <label className="form-label">Chọn danh mục</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Dán HTML từ BuyeReviews</label>
          <textarea
            className="form-textarea"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="Dán nội dung HTML từ trang BuyeReviews vào đây..."
            rows={10}
          />
          <small>
            💡 Copy toàn bộ nội dung HTML từ trang BuyeReviews và dán vào đây
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleProcessHTML}
            disabled={isProcessing || !htmlContent.trim()}
            className="btn btn-primary"
          >
            {isProcessing ? '🔄 Đang xử lý...' : '🔍 Trích xuất sản phẩm'}
          </button>
        </div>
      </div>

      {importedProducts.length > 0 && (
        <div className="imported-products">
          <h3>📦 Sản phẩm đã trích xuất ({importedProducts.length})</h3>
          
          <div className="products-grid">
            {importedProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <div className="product-details">
                    <span className="score">⭐ {product.score}</span>
                    <span className="rank">#{product.rank}</span>
                    {product.reviewsCount && (
                      <span className="reviews">({product.reviewsCount} reviews)</span>
                    )}
                    {product.discount && (
                      <span className="discount">🏷️ {product.discount}</span>
                    )}
                  </div>
                  <div className="highlights">
                    {product.highlights.map((highlight, i) => (
                      <div key={i} className="highlight">• {highlight}</div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="btn btn-danger btn-sm"
                  >
                    ❌ Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="import-actions">
            <button
              type="button"
              onClick={handleImportProducts}
              disabled={isImporting || !selectedCategory}
              className="btn btn-success"
            >
              {isImporting ? '🔄 Đang import...' : '💾 Import vào database'}
            </button>
            
            <button
              type="button"
              onClick={() => setImportedProducts([])}
              className="btn btn-outline"
            >
              🗑️ Xóa tất cả
            </button>
          </div>
        </div>
      )}

      <div className="tool-tips">
        <h4>💡 Hướng dẫn sử dụng:</h4>
        <ol>
          <li>Chọn danh mục phù hợp cho sản phẩm</li>
          <li>Copy toàn bộ nội dung HTML từ trang BuyeReviews</li>
          <li>Dán vào ô textarea bên trên</li>
          <li>Click "Trích xuất sản phẩm" để parse dữ liệu</li>
          <li>Kiểm tra và chỉnh sửa thông tin sản phẩm nếu cần</li>
          <li>Click "Import vào database" để lưu sản phẩm</li>
        </ol>
        
        <div className="warning">
          ⚠️ <strong>Lưu ý:</strong> Công cụ này chỉ hỗ trợ import từ BuyeReviews. 
          Đảm bảo bạn có quyền sử dụng dữ liệu này.
        </div>
      </div>
    </div>
  );
}
