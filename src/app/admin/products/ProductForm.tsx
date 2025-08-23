'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  score: number;
  categoryId: string;
  rank?: number | null;
  badge?: string | null;
  reviewsCount?: number | null;
  boughtNote?: string | null;
  discount?: string | null;
  retailer?: string | null;
  highlights: { id: string; text: string; }[];
  offers: { id: string; retailer: string; url: string; badge?: string | null; discount?: string | null; }[];
}

interface ProductFormProps {
  categories: Category[];
  product?: Product;
  isEdit?: boolean;
}

export default function ProductForm({ categories, product, isEdit = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    imageUrl: product?.imageUrl || '',
    score: product?.score || 0,
    categoryId: product?.categoryId || '',
    rank: product?.rank || '',
    badge: product?.badge || '',
    reviewsCount: product?.reviewsCount || '',
    boughtNote: product?.boughtNote || '',
    discount: product?.discount || '',
    retailer: product?.retailer || '',
  });

  const [highlights, setHighlights] = useState<string[]>(
    product?.highlights?.map(h => h.text) || ['']
  );

  const [offers, setOffers] = useState<{retailer: string; url: string; badge?: string; discount?: string;}[]>(
    product?.offers?.map(o => ({ retailer: o.retailer, url: o.url, badge: o.badge || '', discount: o.discount || '' })) || 
    [{ retailer: '', url: '', badge: '', discount: '' }]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addHighlight = () => {
    setHighlights(prev => [...prev, '']);
  };

  const removeHighlight = (index: number) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const updateHighlight = (index: number, value: string) => {
    setHighlights(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addOffer = () => {
    setOffers(prev => [...prev, { retailer: '', url: '', badge: '', discount: '' }]);
  };

  const removeOffer = (index: number) => {
    setOffers(prev => prev.filter((_, i) => i !== index));
  };

  const updateOffer = (index: number, field: string, value: string) => {
    setOffers(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Tên sản phẩm là bắt buộc';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'URL hình ảnh là bắt buộc';
    if (!formData.categoryId) newErrors.categoryId = 'Danh mục là bắt buộc';
    if (formData.score < 0 || formData.score > 10) newErrors.score = 'Điểm phải từ 0 đến 10';

    const validHighlights = highlights.filter(h => h.trim());
    if (validHighlights.length === 0) newErrors.highlights = 'Cần ít nhất 1 highlight';

    const validOffers = offers.filter(o => o.retailer.trim() && o.url.trim());
    if (validOffers.length === 0) newErrors.offers = 'Cần ít nhất 1 offer';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = {
        ...formData,
        score: Number(formData.score),
        rank: formData.rank ? Number(formData.rank) : null,
        reviewsCount: formData.reviewsCount ? Number(formData.reviewsCount) : null,
        highlights: validHighlights,
        offers: validOffers.map(o => ({
          retailer: o.retailer.trim(),
          url: o.url.trim(),
          badge: o.badge?.trim() || null,
          discount: o.discount?.trim() || null,
        })),
      };

      const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          alert(errorData.message || 'Có lỗi xảy ra');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi xảy ra khi gửi form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form">
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Thông tin cơ bản
          </h3>
          
          <div className="form-group">
            <label htmlFor="title" className="form-label">Tên sản phẩm *</label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ví dụ: Máy lọc không khí PuroAir 1115"
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL hình ảnh *</label>
            <input
              type="url"
              id="imageUrl"
              className="form-input"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <div className="form-error">{errors.imageUrl}</div>}
            {formData.imageUrl && (
              <div style={{ marginTop: '0.5rem' }}>
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.375rem' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="categoryId" className="form-label">Danh mục *</label>
              <select
                id="categoryId"
                className="form-select"
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <div className="form-error">{errors.categoryId}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="score" className="form-label">Điểm đánh giá (0-10) *</label>
              <input
                type="number"
                id="score"
                className="form-input"
                value={formData.score}
                onChange={(e) => handleInputChange('score', parseFloat(e.target.value) || 0)}
                min="0"
                max="10"
                step="0.1"
                placeholder="9.5"
              />
              {errors.score && <div className="form-error">{errors.score}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="rank" className="form-label">Hạng (thứ tự hiển thị)</label>
              <input
                type="number"
                id="rank"
                className="form-input"
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                min="1"
                placeholder="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="badge" className="form-label">Badge</label>
              <input
                type="text"
                id="badge"
                className="form-input"
                value={formData.badge}
                onChange={(e) => handleInputChange('badge', e.target.value)}
                placeholder="Best Overall, Popular, Hot Deal..."
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Thông tin bổ sung
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="reviewsCount" className="form-label">Số lượng đánh giá</label>
              <input
                type="number"
                id="reviewsCount"
                className="form-input"
                value={formData.reviewsCount}
                onChange={(e) => handleInputChange('reviewsCount', e.target.value)}
                placeholder="13721"
              />
            </div>

            <div className="form-group">
              <label htmlFor="boughtNote" className="form-label">Ghi chú mua hàng</label>
              <input
                type="text"
                id="boughtNote"
                className="form-input"
                value={formData.boughtNote}
                onChange={(e) => handleInputChange('boughtNote', e.target.value)}
                placeholder="9K+ bought in past month"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="discount" className="form-label">Thông tin giảm giá</label>
              <input
                type="text"
                id="discount"
                className="form-input"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                placeholder="20% off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="retailer" className="form-label">Nhà bán lẻ chính</label>
              <input
                type="text"
                id="retailer"
                className="form-input"
                value={formData.retailer}
                onChange={(e) => handleInputChange('retailer', e.target.value)}
                placeholder="amazon"
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Điểm nổi bật *
          </h3>
          {highlights.map((highlight, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder="Ví dụ: Covers large areas effectively up to 1,115 sq ft."
                style={{ flex: 1 }}
              />
              {highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="btn btn-danger"
                  style={{ padding: '0.75rem' }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="btn btn-outline"
            style={{ marginTop: '0.5rem' }}
          >
            + Thêm highlight
          </button>
          {errors.highlights && <div className="form-error">{errors.highlights}</div>}
        </div>

        {/* Offers */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
            Liên kết mua hàng *
          </h3>
          {offers.map((offer, index) => (
            <div key={index} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '0.5rem', 
              padding: '1rem', 
              marginBottom: '1rem' 
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  value={offer.retailer}
                  onChange={(e) => updateOffer(index, 'retailer', e.target.value)}
                  placeholder="Tên nhà bán lẻ (amazon, ebay...)"
                />
                <input
                  type="url"
                  className="form-input"
                  value={offer.url}
                  onChange={(e) => updateOffer(index, 'url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  value={offer.badge || ''}
                  onChange={(e) => updateOffer(index, 'badge', e.target.value)}
                  placeholder="Badge (tùy chọn)"
                />
                <input
                  type="text"
                  className="form-input"
                  value={offer.discount || ''}
                  onChange={(e) => updateOffer(index, 'discount', e.target.value)}
                  placeholder="Giảm giá (tùy chọn)"
                />
              </div>
              {offers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOffer(index)}
                  className="btn btn-danger"
                  style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  Xóa offer này
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOffer}
            className="btn btn-outline"
          >
            + Thêm liên kết mua hàng
          </button>
          {errors.offers && <div className="form-error">{errors.offers}</div>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Đang lưu...' : (isEdit ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm')}
          </button>
          <Link href="/admin/products" className="btn btn-secondary">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
