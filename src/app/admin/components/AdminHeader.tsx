"use client";

import Link from "next/link";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/buyereviews-logo.png"
                alt="BuyerReviews Admin"
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
            <div className="text-sm text-gray-600">
              Admin User
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
