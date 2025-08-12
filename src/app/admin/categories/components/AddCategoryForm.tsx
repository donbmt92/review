"use client";

import { useState } from "react";

interface CategoryForm {
  name: string;
  slug: string;
}

export default function AddCategoryForm() {
  const [form, setForm] = useState<CategoryForm>({
    name: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("Thêm danh mục thành công!");
        setForm({
          name: "",
          slug: "",
        });
        // Trigger refresh of categories list
        window.location.reload();
      } else {
        const error = await response.json();
        setMessage(`Lỗi: ${error.message || "Không thể thêm danh mục"}`);
      }
    } catch (error) {
      setMessage("Lỗi kết nối mạng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Thêm danh mục mới
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên danh mục
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập tên danh mục"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="ten-danh-muc"
          />
          <p className="text-xs text-gray-500 mt-1">
            Slug sẽ được tạo tự động từ tên danh mục
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.includes("thành công") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Đang thêm..." : "Thêm danh mục"}
        </button>
      </form>
    </div>
  );
}
