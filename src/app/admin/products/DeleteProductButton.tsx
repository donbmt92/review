'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
        setShowConfirm(false);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Có lỗi xảy ra khi xóa sản phẩm');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="action-btn delete"
          style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}
        >
          {isDeleting ? 'Đang xóa...' : 'Xác nhận'}
        </button>
        <button 
          onClick={handleCancel}
          className="action-btn edit"
          style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}
        >
          Hủy
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleDelete}
      className="action-btn delete"
    >
      Xóa
    </button>
  );
}
