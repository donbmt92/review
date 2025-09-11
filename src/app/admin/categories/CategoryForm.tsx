'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    iconImage?: string | null;
    parentId?: string | null;
  };
  isEdit?: boolean;
}

export default function CategoryForm({ category, isEdit = false }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    icon: category?.icon || '',
    iconImage: category?.iconImage || '',
    parentId: category?.parentId || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [parentCategories, setParentCategories] = useState<Array<{id: string, name: string}>>([]);
  const router = useRouter();

  // Load parent categories on component mount
  useEffect(() => {
    const loadParentCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
        if (response.ok) {
          const data = await response.json();
          // Filter out sub-categories and current category (if editing)
          const parents = data.categories.filter((cat: any) => 
            !cat.parentId && cat.id !== category?.id
          );
          setParentCategories(parents);
        }
      } catch (error) {
        console.error('Error loading parent categories:', error);
      }
    };
    loadParentCategories();
  }, [category?.id]);

  // Auto generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: isEdit ? prev.slug : generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Tên danh mục là bắt buộc';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug là bắt buộc';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const url = isEdit ? `/api/admin/categories/${category!.id}` : '/api/admin/categories';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Force reload trang để lấy data mới từ database
        window.location.href = '/admin/categories';
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
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Tên danh mục *
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Ví dụ: Máy lọc không khí"
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="slug" className="form-label">
            Slug (URL) *
          </label>
          <input
            type="text"
            id="slug"
            className="form-input"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="air-purifiers"
          />
          {errors.slug && <div className="form-error">{errors.slug}</div>}
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
            URL sẽ là: <code>/{formData.slug}</code>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="parentId" className="form-label">
            Danh mục cha (tùy chọn)
          </label>
          <select
            id="parentId"
            className="form-input"
            value={formData.parentId}
            onChange={(e) => setFormData(prev => ({ ...prev, parentId: e.target.value }))}
          >
            <option value="">-- Chọn danh mục cha (để trống nếu là danh mục chính) --</option>
            {parentCategories.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Để trống nếu muốn tạo danh mục chính. Chọn danh mục cha để tạo sub-category.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="icon" className="form-label">
              Icon (Emoji)
            </label>
            <input
              type="text"
              id="icon"
              className="form-input"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              placeholder="🏠 (tùy chọn)"
              style={{ width: '100px' }}
            />
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Sử dụng emoji để làm icon cho danh mục
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Icon hình ảnh
            </label>
            <ImageUpload
              currentImageUrl={formData.iconImage}
              onImageChange={(imageUrl) => setFormData(prev => ({ ...prev, iconImage: imageUrl }))}
              label=""
              required={false}
              size="small"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Tạo danh mục')}
          </button>
          <Link href="/admin/categories" className="btn btn-secondary">
            Hủy
          </Link>
        </div>
      </form>

      {/* Preview */}
      {formData.name && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
            Xem trước
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {formData.iconImage ? (
              <img 
                src={formData.iconImage} 
                alt="Icon" 
                style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '4px' }}
              />
            ) : formData.icon ? (
              <span style={{ fontSize: '1.5rem' }}>{formData.icon}</span>
            ) : null}
            <strong>{formData.name}</strong>
            {formData.parentId && (
              <span style={{ 
                fontSize: '0.75rem', 
                backgroundColor: '#e0f2fe', 
                color: '#0369a1', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem',
                marginLeft: '0.5rem'
              }}>
                Sub-category
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            URL: <code>/{formData.slug}</code>
            {formData.parentId && (
              <div style={{ marginTop: '0.25rem' }}>
                Parent: {parentCategories.find(p => p.id === formData.parentId)?.name || 'Loading...'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
