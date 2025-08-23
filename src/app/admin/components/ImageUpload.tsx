'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string, file?: File) => void;
  label?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function ImageUpload({ 
  currentImageUrl, 
  onImageChange, 
  label = "Hình ảnh sản phẩm",
  required = false,
  size = 'medium'
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview first
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload thất bại');
      }

      const uploadResult = await response.json();
      
      // Update with server URL
      onImageChange(uploadResult.url, file);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload thất bại: ' + (error as Error).message);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageChange('', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label} {required && '*'}
      </label>
      
      <div
        className={`image-upload-area ${isDragging ? 'dragging' : ''} ${previewUrl ? 'has-image' : ''} size-${size}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
            <div className="image-overlay">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                Thay đổi
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            {isUploading ? (
              <div className="uploading">
                <div className="spinner"></div>
                <span>Đang xử lý...</span>
              </div>
            ) : (
              <>
                <div className="upload-icon">📁</div>
                <p>Kéo thả hình ảnh vào đây hoặc click để chọn</p>
                <p className="upload-hint">Hỗ trợ: JPG, PNG, GIF, WebP (tối đa 5MB)</p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <small className="form-hint">
        💡 Bạn có thể kéo thả file trực tiếp hoặc click để chọn từ máy tính
      </small>
    </div>
  );
}
