"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductForm {
  title: string;
  imageUrl: string;
  score: number;
  categoryId: string;
}

export default function AddProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    imageUrl: "",
    score: 0,
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, categoryId: data[0].id }));
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("Thêm sản phẩm thành công!");
        setForm({
          title: "",
          imageUrl: "",
          score: 0,
          categoryId: categories[0]?.id || "",
        });
        // Trigger refresh of products list
        window.location.reload();
      } else {
        const error = await response.json();
        setMessage(`Lỗi: ${error.message || "Không thể thêm sản phẩm"}`);
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
        Thêm sản phẩm mới
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên sản phẩm
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL hình ảnh
          </label>
          <input
            type="url"
            required
            value={form.imageUrl}
            onChange={(e) => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Điểm đánh giá (0-10)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            required
            value={form.score}
            onChange={(e) => setForm(prev => ({ ...prev, score: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
          {loading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
}
