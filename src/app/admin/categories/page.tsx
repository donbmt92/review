import { Suspense } from "react";
import CategoriesList from "./components/CategoriesList";
import AddCategoryForm from "./components/AddCategoryForm";

export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
        <p className="text-gray-600 mt-2">
          Thêm, sửa và xóa danh mục sản phẩm
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Đang tải danh sách danh mục...</div>}>
            <CategoriesList />
          </Suspense>
        </div>
        
        <div>
          <Suspense fallback={<div>Đang tải form...</div>}>
            <AddCategoryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
