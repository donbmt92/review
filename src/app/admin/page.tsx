import { Suspense } from "react";
import DashboardStats from "./components/DashboardStats";
import RecentProducts from "./components/RecentProducts";
import RecentNewsletters from "./components/RecentNewsletters";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Tổng quan về website và dữ liệu
        </p>
      </div>

      <Suspense fallback={<div>Đang tải thống kê...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Đang tải sản phẩm gần đây...</div>}>
          <RecentProducts />
        </Suspense>
        
        <Suspense fallback={<div>Đang tải newsletter gần đây...</div>}>
          <RecentNewsletters />
        </Suspense>
      </div>
    </div>
  );
}
