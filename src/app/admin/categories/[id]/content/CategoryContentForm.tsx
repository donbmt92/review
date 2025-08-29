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
       <div className="form-section">
         <h3>🔍 SEO & Meta Tags</h3>
        
        <div className="form-group">
          <label className="form-label">Tiêu đề tùy chỉnh (để trống để dùng mặc định)</label>
          <input
            type="text"
            className="form-input"
            value={formData.customTitle}
            onChange={(e) => handleInputChange('customTitle', e.target.value)}
            placeholder="Ví dụ: 5 Best Gaming Laptops 2024"
          />
          <small>Nếu để trống, sẽ dùng: "{category.products?.length || 0} Best {category.name}"</small>
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả tùy chỉnh</label>
          <textarea
            className="form-textarea"
            value={formData.customDescription}
            onChange={(e) => handleInputChange('customDescription', e.target.value)}
            placeholder="Mô tả ngắn gọn về danh mục này..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Breadcrumb tùy chỉnh</label>
          <input
            type="text"
            className="form-input"
            value={formData.customBreadcrumb}
            onChange={(e) => handleInputChange('customBreadcrumb', e.target.value)}
            placeholder="Ví dụ: ELECTRONICS GAMING"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Từ khóa SEO</label>
          <input
            type="text"
            className="form-input"
            value={formData.keywords}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
          />
          <small className="form-help">Các từ khóa chính, phân cách bằng dấu phẩy. Giúp tối ưu hóa tìm kiếm.</small>
        </div>

        <div className="form-group">
          <label className="form-label">Meta Title</label>
          <input
            type="text"
            className="form-input"
            value={formData.metaTitle}
            onChange={(e) => handleInputChange('metaTitle', e.target.value)}
            placeholder={`${category.name} tốt nhất 2025 - Đánh giá & So sánh`}
            maxLength={60}
          />
          <small className="form-help">Tiêu đề hiển thị trên kết quả tìm kiếm (tối đa 60 ký tự)</small>
        </div>

        <div className="form-group">
          <label className="form-label">Meta Description</label>
          <textarea
            className="form-textarea"
            value={formData.metaDescription}
            onChange={(e) => handleInputChange('metaDescription', e.target.value)}
            placeholder={`Khám phá top ${category.name} tốt nhất 2025. So sánh tính năng, giá cả và đánh giá từ người dùng thực tế.`}
            rows={3}
            maxLength={160}
          />
          <small className="form-help">Mô tả hiển thị trên kết quả tìm kiếm (tối đa 160 ký tự)</small>
        </div>
      </div>

             {/* Overview Content Section */}
       <div className="form-section">
         <h3>📝 Nội dung tổng quan</h3>
        
        <div className="form-group">
          <label className="form-label">Tiêu đề phần tổng quan</label>
          <input
            type="text"
            className="form-input"
            value={formData.overviewTitle}
            onChange={(e) => handleInputChange('overviewTitle', e.target.value)}
            placeholder={`Tổng quan về ${category.name}`}
          />
        </div>

                 <div className="form-group">
           <label className="form-label">Đoạn văn tổng quan</label>
                     {(formData.overviewParagraphs as string[] || []).map((paragraph, index) => (
             <div key={index} className="array-item">
               <textarea
                 className="form-textarea"
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
       <div className="form-section">
         <h3>🏆 Nội dung sản phẩm hàng đầu</h3>
        
        <div className="form-group">
          <label className="form-label">Tiêu đề phần sản phẩm hàng đầu</label>
          <input
            type="text"
            className="form-input"
            value={formData.topProductsTitle}
            onChange={(e) => handleInputChange('topProductsTitle', e.target.value)}
            placeholder={`Sản phẩm ${category.name} hàng đầu`}
          />
        </div>

                 <div className="form-group">
           <label className="form-label">Đoạn văn về sản phẩm hàng đầu</label>
                     {(formData.topProductsParagraphs as string[] || []).map((paragraph, index) => (
             <div key={index} className="array-item">
               <textarea
                 className="form-textarea"
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
       <div className="form-section">
         <h3>❓ Câu hỏi thường gặp (FAQ)</h3>
        
                 {(formData.faqItems as { question: string; answer: string }[] || []).map((faq, index) => (
           <div key={index} className="faq-item">
                         <div className="faq-header">
               <strong>FAQ #{index + 1}</strong>
               {(formData.faqItems as { question: string; answer: string }[] || []).length > 1 && (
                 <button
                   type="button"
                   onClick={() => removeFAQItem(index)}
                   className="btn btn-danger"
                 >
                   Xóa
                 </button>
               )}
             </div>
            
                         <div className="form-group">
               <label className="form-label">Câu hỏi</label>
               <input
                 type="text"
                 className="form-input"
                 value={faq.question || ''}
                 onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                 placeholder="Câu hỏi..."
               />
             </div>
            
                         <div className="form-group">
               <label className="form-label">Câu trả lời</label>
               <textarea
                 className="form-textarea"
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

      {/* SEO Preview */}
      {(formData.metaTitle || formData.metaDescription) && (
        <div className="form-section">
          <h3>🔍 Xem trước kết quả tìm kiếm</h3>
          <div className="seo-preview">
            <div className="seo-preview-title">
              {formData.metaTitle || `Tên danh mục: ${category.name}`}
            </div>
            <div className="seo-preview-url">
              /{category.slug}
            </div>
            <div className="seo-preview-description">
              {formData.metaDescription || 'Mô tả sẽ hiển thị ở đây...'}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Đang lưu...' : '💾 Lưu nội dung'}
        </button>
        
        <small>
          💡 Nội dung sẽ được lưu riêng biệt với thông tin danh mục
        </small>
      </div>
    </form>
  );
}
