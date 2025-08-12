import { Suspense } from "react";
import ProductsList from "./components/ProductsList";
import AddProductForm from "./components/AddProductForm";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <p className="text-gray-600 mt-2">
          Thêm, sửa và xóa sản phẩm trên website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Đang tải danh sách sản phẩm...</div>}>
            <ProductsList />
          </Suspense>
        </div>
        
        <div>
          <Suspense fallback={<div>Đang tải form...</div>}>
            <AddProductForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
