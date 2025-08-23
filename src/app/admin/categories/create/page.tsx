import { Metadata } from 'next';
import CategoryForm from '../CategoryForm';

export const metadata: Metadata = {
  title: 'Tạo danh mục mới - Admin Panel',
  robots: 'noindex, nofollow',
};

export default function CreateCategoryPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tạo danh mục mới</h1>
      </div>

      <CategoryForm />
    </div>
  );
}
