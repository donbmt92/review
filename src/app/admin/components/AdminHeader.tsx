"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function AdminHeader() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/buyereviews-logo.png"
                alt="BuyerReview Admin"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Xem website
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 transition-colors font-medium"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
