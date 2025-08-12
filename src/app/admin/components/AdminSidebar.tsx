"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  CubeIcon, 
  TagIcon, 
  EnvelopeIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Sản phẩm", href: "/admin/products", icon: CubeIcon },
  { name: "Danh mục", href: "/admin/categories", icon: TagIcon },
  { name: "Newsletter", href: "/admin/newsletter", icon: EnvelopeIcon },
  { name: "Thống kê", href: "/admin/analytics", icon: ChartBarIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
