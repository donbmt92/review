"use client";

import { useState, useEffect } from "react";
import { TrashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterList() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/admin/newsletter");
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (subscriptionId: string) => {
    if (!confirm("Bạn có chắc muốn xóa đăng ký này?")) return;

    try {
      const response = await fetch(`/api/admin/newsletter/${subscriptionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSubscriptions(subscriptions.filter(s => s.id !== subscriptionId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa newsletter:", error);
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Danh sách đăng ký ({filteredSubscriptions.length})
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Tìm kiếm email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đăng ký
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(subscription.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
