'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface ParsedProduct {
  title: string;
  imageUrl: string;
  score: number;
  rank: number;
  badge?: string;
  reviewsCount?: number;
  highlights: string[];
  discount?: string;
  retailer?: string;
}

interface HtmlImportToolProps {
  categories: Category[];
}

export default function HtmlImportTool({ categories }: HtmlImportToolProps) {
  const [htmlInput, setHtmlInput] = useState('');
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Hàm tải ảnh từ URL và upload lên hệ thống
  const downloadAndUploadImage = async (imageUrl: string, productTitle: string): Promise<string> => {
    try {
      // Kiểm tra URL hợp lệ
      if (!imageUrl || !imageUrl.startsWith('http')) {
        console.warn(`URL ảnh không hợp lệ: ${imageUrl}`);
        return imageUrl;
      }

      // Tải ảnh từ URL
      const response = await fetch(imageUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Không thể tải ảnh từ ${imageUrl} - Status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error(`URL không phải là ảnh: ${contentType}`);
      }
      
      const blob = await response.blob();
      
      // Kiểm tra kích thước ảnh (giới hạn 10MB)
      if (blob.size > 10 * 1024 * 1024) {
        throw new Error(`Ảnh quá lớn: ${(blob.size / 1024 / 1024).toFixed(2)}MB`);
      }
      
      // Tạo tên file an toàn
      const safeTitle = productTitle
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      
      const fileExtension = contentType.split('/')[1] || 'jpg';
      const fileName = `${safeTitle}_${Date.now()}.${fileExtension}`;
      
      // Tạo FormData để upload
      const formData = new FormData();
      formData.append('file', blob, fileName);
      
      // Upload lên hệ thống
      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(`Lỗi upload: ${errorData.message || uploadResponse.statusText}`);
      }
      
      const uploadResult = await uploadResponse.json();
      console.log(`✅ Đã upload ảnh thành công: ${fileName}`);
      return uploadResult.url; // URL mới của ảnh đã upload
      
    } catch (error) {
      console.error(`❌ Lỗi khi tải/upload ảnh cho "${productTitle}":`, error);
      // Nếu không thể tải được, trả về URL gốc và ghi log
      return imageUrl;
    }
  };

  const parseHtml = () => {
    if (!htmlInput.trim()) {
      setError('Vui lòng nhập HTML để parse');
      return;
    }

    setIsParsing(true);
    setError('');

    try {
      // Tạo một DOM parser để parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      
      // Tìm tất cả các container sản phẩm - thử nhiều selector khác nhau
      let productContainers = doc.querySelectorAll('.ComparisonPaidSingleProductComponentAU24_paid-single-product-au24-container__qRMhK');
      
      // Nếu không tìm thấy, thử tìm theo class khác
      if (productContainers.length === 0) {
        productContainers = doc.querySelectorAll('[class*="paid-single-product"]');
      }
      
      // Nếu vẫn không tìm thấy, thử tìm theo cấu trúc chung
      if (productContainers.length === 0) {
        productContainers = doc.querySelectorAll('[id^="section"], .product-container, .single-product');
      }
      
      const products: ParsedProduct[] = [];
      
      productContainers.forEach((container, index) => {
        try {
          // Lấy thông tin cơ bản - thử nhiều selector
          let titleElement = container.querySelector('.header-text-au24, h3, .product-title, .title');
          let title = titleElement?.textContent?.trim() || `Sản phẩm ${index + 1}`;
          
          // Lấy hình ảnh - thử nhiều selector
          let imgElement = container.querySelector('img.ui.image, img[src*="amazon"], img[alt], img');
          let imageUrl = imgElement?.getAttribute('src') || '';
          
          // Lấy điểm số - thử nhiều selector
          let scoreElement = container.querySelector('.rating-value-au24-desktop span, .rating span, .score, [class*="rating"] span');
          let scoreText = scoreElement?.textContent?.trim() || '0';
          let score = parseFloat(scoreText) || 0;
          
          // Lấy thứ hạng - thử nhiều selector
          let rankElement = container.querySelector('.number-corner-au24 p, .rank p, .position p, [class*="rank"] p');
          let rankText = rankElement?.textContent?.trim() || '0';
          let rank = parseInt(rankText) || 0;
          
          // Lấy badge - thử nhiều selector
          let badgeElement = container.querySelector('.ribbon-label-item-container-au24 span, .badge, .label, [class*="ribbon"] span');
          let badge = badgeElement?.textContent?.trim() || undefined;
          
          // Lấy số lượng review - thử nhiều selector
          let reviewsElement = container.querySelector('.reviews-count-au24-desktop, .reviews, [class*="review"]');
          let reviewsText = reviewsElement?.textContent?.match(/\(([^)]+)\)/)?.[1] || '';
          let reviewsCount = parseInt(reviewsText.replace(/,/g, '')) || 0;
          
          // Lấy highlights - thử nhiều selector
          let highlightElements = container.querySelectorAll('.more-info-line-text-au24-desktop, .highlight, .feature, [class*="info"]');
          let highlights: string[] = [];
          highlightElements.forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.length > 10) highlights.push(text); // Chỉ lấy text có ý nghĩa
          });
          
          // Lấy discount - thử nhiều selector
          let discountElement = container.querySelector('.ribbon-desktop .text-desktop .bold-desktop, .discount, .off, [class*="discount"]');
          let discount = discountElement?.textContent?.trim() || undefined;
          
          // Lấy retailer (mặc định là Amazon)
          let retailer = 'Amazon';
          
          // Kiểm tra xem có đủ thông tin cơ bản không
          if (title && imageUrl && score > 0) {
            products.push({
              title,
              imageUrl,
              score,
              rank,
              badge,
              reviewsCount,
              highlights,
              discount,
              retailer
            });
          }
          
        } catch (err) {
          console.error(`Lỗi khi parse sản phẩm ${index + 1}:`, err);
        }
      });
      
      setParsedProducts(products);
      
      if (products.length === 0) {
        setError('Không thể tìm thấy sản phẩm nào trong HTML. Vui lòng kiểm tra lại định dạng HTML hoặc thử với HTML khác.');
      } else {
        setError(''); // Xóa lỗi nếu parse thành công
      }
      
    } catch (err) {
      console.error('Lỗi khi parse HTML:', err);
      setError('Có lỗi xảy ra khi parse HTML. Vui lòng kiểm tra lại định dạng.');
    } finally {
      setIsParsing(false);
    }
  };

  const createProducts = async () => {
    if (!selectedCategory) {
      setError('Vui lòng chọn danh mục cho sản phẩm');
      return;
    }

    if (parsedProducts.length === 0) {
      setError('Không có sản phẩm nào để tạo');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      // Tải và upload ảnh cho từng sản phẩm
      const productsToCreate = await Promise.all(parsedProducts.map(async (product) => {
        const imageUrl = product.imageUrl;
        const title = product.title;
        const uploadedImageUrl = await downloadAndUploadImage(imageUrl, title);

        return {
          title: product.title,
          imageUrl: uploadedImageUrl,
          score: product.score,
          categoryId: selectedCategory,
          rank: product.rank,
          badge: product.badge,
          reviewsCount: product.reviewsCount,
          discount: product.discount,
          retailer: product.retailer,
          highlights: product.highlights,
          offers: [{ retailer: product.retailer || 'Amazon', url: 'https://amazon.com', badge: product.badge, discount: product.discount }]
        };
      }));

      // Tạo từng sản phẩm
      for (const product of productsToCreate) {
        const response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi tạo sản phẩm: ${product.title}`);
        }
      }

      // Chuyển hướng đến trang danh sách sản phẩm
      router.push('/admin/products');
      
    } catch (err) {
      console.error('Lỗi khi tạo sản phẩm:', err);
      setError(`Có lỗi xảy ra: ${err instanceof Error ? err.message : 'Không xác định'}`);
    } finally {
      setIsCreating(false);
    }
  };

  const clearData = () => {
    setHtmlInput('');
    setParsedProducts([]);
    setSelectedCategory('');
    setError('');
  };

  return (
    <div className="html-import-tool">
      <div className="import-section">
        <h3>📋 Import sản phẩm từ HTML</h3>
        <p className="description">
          Dán HTML chứa thông tin sản phẩm vào ô bên dưới để tự động trích xuất thông tin.
          <br />
          <strong>Lưu ý:</strong> Ảnh sản phẩm sẽ được tự động tải về và lưu vào hệ thống.
        </p>
        
        <div className="input-group">
          <label htmlFor="html-input">HTML sản phẩm:</label>
          <textarea
            id="html-input"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Dán HTML sản phẩm vào đây..."
            rows={10}
            className="html-textarea"
          />
        </div>

        <div className="actions">
          <button 
            onClick={parseHtml} 
            disabled={isParsing || !htmlInput.trim()}
            className="btn btn-primary"
          >
            {isParsing ? '🔄 Đang parse...' : '🔍 Parse HTML'}
          </button>
          
          <button 
            onClick={clearData} 
            className="btn btn-secondary"
          >
            🗑️ Xóa dữ liệu
          </button>
        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
      </div>

      {parsedProducts.length > 0 && (
        <div className="results-section">
          <h3>📊 Kết quả parse ({parsedProducts.length} sản phẩm)</h3>
          
          <div className="category-selection">
            <label htmlFor="category-select">Chọn danh mục:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="products-preview">
            {parsedProducts.map((product, index) => (
              <div key={index} className="product-preview">
                <div className="product-header">
                  <span className="rank">#{product.rank}</span>
                  {product.badge && <span className="badge">{product.badge}</span>}
                </div>
                
                <div className="product-content">
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  
                  <div className="product-info">
                    <h4 className="product-title">{product.title}</h4>
                    <div className="product-meta">
                      <span className="score">⭐ {product.score}</span>
                      {product.reviewsCount && product.reviewsCount > 0 && (
                        <span className="reviews">({product.reviewsCount} reviews)</span>
                      )}
                      {product.discount && (
                        <span className="discount">🎯 {product.discount}</span>
                      )}
                    </div>
                    
                    {product.highlights.length > 0 && (
                      <div className="highlights">
                        <strong>Điểm nổi bật:</strong>
                        <ul>
                          {product.highlights.map((highlight, hIndex) => (
                            <li key={hIndex}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="create-actions">
            {isCreating && (
              <div className="creating-notice">
                <p>🔄 Đang tải ảnh và tạo sản phẩm...</p>
                <p className="notice-text">Quá trình này có thể mất vài phút tùy thuộc vào số lượng ảnh cần tải.</p>
              </div>
            )}
            
            <button
              onClick={createProducts}
              disabled={!selectedCategory || isCreating}
              className="btn btn-success"
            >
              {isCreating ? '🚀 Đang tạo...' : '🚀 Tạo'} {parsedProducts.length} sản phẩm
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .html-import-tool {
          max-width: 1200px;
        }
        
        .import-section {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
        }
        
        .description {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        
        .input-group {
          margin-bottom: 1.5rem;
        }
        
        .input-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .html-textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          resize: vertical;
        }
        
        .actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .btn-primary {
          background-color: #2563eb;
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          background-color: #1d4ed8;
        }
        
        .btn-secondary {
          background-color: #6b7280;
          color: white;
        }
        
        .btn-secondary:hover:not(:disabled) {
          background-color: #4b5563;
        }
        
        .btn-success {
          background-color: #059669;
          color: white;
          font-size: 1.1rem;
          padding: 1rem 2rem;
        }
        
        .btn-success:hover:not(:disabled) {
          background-color: #047857;
        }
        
        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-top: 1rem;
        }
        
        .results-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 2rem;
        }
        
        .category-selection {
          margin-bottom: 2rem;
        }
        
        .category-selection label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .category-select {
          width: 100%;
          max-width: 300px;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
        }
        
        .products-preview {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .product-preview {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1.5rem;
          background: #f9fafb;
        }
        
        .product-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .rank {
          background: #2563eb;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .badge {
          background: #f59e0b;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .product-content {
          display: flex;
          gap: 1.5rem;
        }
        
        .product-image img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 0.375rem;
        }
        
        .product-info {
          flex: 1;
        }
        
        .product-title {
          margin: 0 0 0.75rem 0;
          font-size: 1.125rem;
          color: #111827;
        }
        
        .product-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        
        .score {
          color: #059669;
          font-weight: 600;
        }
        
        .reviews {
          color: #6b7280;
        }
        
        .discount {
          color: #dc2626;
          font-weight: 600;
        }
        
        .highlights {
          margin-top: 1rem;
        }
        
        .highlights strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .highlights ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #6b7280;
        }
        
        .highlights li {
          margin-bottom: 0.25rem;
        }
        
        .create-actions {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .creating-notice {
          background-color: #e0f2fe;
          border: 1px solid #bbdefb;
          color: #1976d2;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .notice-text {
          font-size: 0.875rem;
          color: #1976d2;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
