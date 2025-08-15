import type { Metadata } from "next";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard - BuyerReviews",
  description: "Quản lý nội dung và dữ liệu website",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
