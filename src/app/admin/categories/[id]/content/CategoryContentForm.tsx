'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryContentFormProps {
  category: any;
}

export default function CategoryContentForm({ category }: CategoryContentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // SEO & Meta
    customTitle: '',
    customDescription: '',
    customBreadcrumb: '',
    
    // Content
    overviewTitle: '',
    overviewParagraphs: [''],
    
    topProductsTitle: '',
    topProductsParagraphs: [''],
    
    // FAQ
    faqItems: [
      { question: '', answer: '' }
    ],
    
    // Keywords & SEO
    keywords: '',
    metaTitle: '',
    metaDescription: ''
  });

  useEffect(() => {
    // Load existing data from CategoryContent
    const loadCategoryContent = async () => {
      try {
        const response = await fetch(`/api/admin/categories/${category.id}/content`);
        if (response.ok) {
          const data = await response.json();
          if (data.categoryContent) {
            setFormData({
              customTitle: data.categoryContent.customTitle || '',
              customDescription: data.categoryContent.customDescription || '',
              customBreadcrumb: data.categoryContent.customBreadcrumb || '',
              
              overviewTitle: data.categoryContent.overviewTitle || '',
              overviewParagraphs: data.categoryContent.overviewParagraphs || [''],
              
              topProductsTitle: data.categoryContent.topProductsTitle || '',
              topProductsParagraphs: data.categoryContent.topProductsParagraphs || [''],
              
              faqItems: data.categoryContent.faqItems || [{ question: '', answer: '' }],
              
              keywords: data.categoryContent.keywords || '',
              metaTitle: data.categoryContent.metaTitle || '',
              metaDescription: data.categoryContent.metaDescription || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading category content:', error);
      }
    };

    loadCategoryContent();
  }, [category.id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[] || []).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[] || []), '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[] || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const addFAQItem = () => {
    setFormData(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { question: '', answer: '' }]
    }));
  };

  const removeFAQItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, i) => i !== index)
    }));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqItems: prev.faqItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/categories/${category.id}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Lưu nội dung thành công!');
        router.refresh();
      } else {
        throw new Error('Lưu thất bại');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Lưu thất bại: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {/* SEO & Meta Section */}
      <div className="form-section" style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.5rem', 
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          🔍 SEO & Meta Tags
        </h3>
        
        <div className="form-group">
          <label>Tiêu đề tùy chỉnh (để trống để dùng mặc định)</label>
          <input
            type="text"
            value={formData.customTitle}
            onChange={(e) => handleInputChange('customTitle', e.target.value)}
            placeholder="Ví dụ: 5 Best Gaming Laptops 2024"
          />
          <small>Nếu để trống, sẽ dùng: "{category.products?.length || 0} Best {category.name}"</small>
        </div>

        <div className="form-group">
          <label>Mô tả tùy chỉnh</label>
          <textarea
            value={formData.customDescription}
            onChange={(e) => handleInputChange('customDescription', e.target.value)}
            placeholder="Mô tả ngắn gọn về danh mục này..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Breadcrumb tùy chỉnh</label>
          <input
            type="text"
            value={formData.customBreadcrumb}
            onChange={(e) => handleInputChange('customBreadcrumb', e.target.value)}
            placeholder="Ví dụ: ELECTRONICS GAMING"
          />
        </div>

        <div className="form-group">
          <label>Từ khóa SEO</label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
          />
        </div>
      </div>

      {/* Overview Content Section */}
      <div className="form-section" style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.5rem', 
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          📝 Nội dung tổng quan
        </h3>
        
        <div className="form-group">
          <label>Tiêu đề phần tổng quan</label>
          <input
            type="text"
            value={formData.overviewTitle}
            onChange={(e) => handleInputChange('overviewTitle', e.target.value)}
            placeholder={`Tổng quan về ${category.name}`}
          />
        </div>

        <div className="form-group">
          <label>Đoạn văn tổng quan</label>
          {(formData.overviewParagraphs as string[] || []).map((paragraph, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <textarea
                value={paragraph || ''}
                onChange={(e) => handleArrayChange('overviewParagraphs', index, e.target.value)}
                placeholder={`Đoạn văn ${index + 1}...`}
                rows={3}
              />
              {(formData.overviewParagraphs as string[] || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('overviewParagraphs', index)}
                  className="btn btn-danger"
                  style={{ marginLeft: '0.5rem' }}
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('overviewParagraphs')}
            className="btn btn-outline"
          >
            + Thêm đoạn văn
          </button>
        </div>
      </div>

      {/* Top Products Content Section */}
      <div className="form-section" style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.5rem', 
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          🏆 Nội dung sản phẩm hàng đầu
        </h3>
        
        <div className="form-group">
          <label>Tiêu đề phần sản phẩm hàng đầu</label>
          <input
            type="text"
            value={formData.topProductsTitle}
            onChange={(e) => handleInputChange('topProductsTitle', e.target.value)}
            placeholder={`Sản phẩm ${category.name} hàng đầu`}
          />
        </div>

        <div className="form-group">
          <label>Đoạn văn về sản phẩm hàng đầu</label>
          {(formData.topProductsParagraphs as string[] || []).map((paragraph, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <textarea
                value={paragraph || ''}
                onChange={(e) => handleArrayChange('topProductsParagraphs', index, e.target.value)}
                placeholder={`Đoạn văn ${index + 1}...`}
                rows={3}
              />
              {(formData.topProductsParagraphs as string[] || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('topProductsParagraphs', index)}
                  className="btn btn-danger"
                  style={{ marginLeft: '0.5rem' }}
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('topProductsParagraphs')}
            className="btn btn-outline"
          >
            + Thêm đoạn văn
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="form-section" style={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: '0.5rem', 
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          ❓ Câu hỏi thường gặp (FAQ)
        </h3>
        
        {(formData.faqItems as { question: string; answer: string }[] || []).map((faq, index) => (
          <div key={index} className="faq-item" style={{ 
            border: '1px solid #e2e8f0', 
            padding: '1rem', 
            marginBottom: '1rem',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>FAQ #{index + 1}</strong>
              {(formData.faqItems as { question: string; answer: string }[] || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFAQItem(index)}
                  className="btn btn-danger"
                  style={{ fontSize: '0.75rem' }}
                >
                  Xóa
                </button>
              )}
            </div>
            
            <div className="form-group">
              <label>Câu hỏi</label>
              <input
                type="text"
                value={faq.question || ''}
                onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                placeholder="Câu hỏi..."
              />
            </div>
            
            <div className="form-group">
              <label>Câu trả lời</label>
              <textarea
                value={faq.answer || ''}
                onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                placeholder="Câu trả lời..."
                rows={3}
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addFAQItem}
          className="btn btn-outline"
        >
          + Thêm FAQ
        </button>
      </div>

      {/* Submit Button */}
      <div className="form-actions" style={{ 
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Đang lưu...' : '💾 Lưu nội dung'}
        </button>
        
        <small style={{ marginLeft: '1rem', color: '#6b7280' }}>
          💡 Nội dung sẽ được lưu riêng biệt với thông tin danh mục
        </small>
      </div>
    </form>
  );
}
