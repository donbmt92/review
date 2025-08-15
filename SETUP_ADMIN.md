# 🚀 Setup Admin Panel - Hướng dẫn nhanh

## Bước 1: Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc của dự án với nội dung:

```bash
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

## Bước 2: Restart server

```bash
npm run dev
```

## Bước 3: Truy cập admin

- Vào: `http://localhost:3000/admin/login`
- Đăng nhập với: `admin` / `admin123`

## 🔧 Nếu vẫn có lỗi

1. Kiểm tra console browser để xem lỗi chi tiết
2. Đảm bảo file `.env.local` đã được tạo đúng
3. Restart server sau khi tạo file môi trường

## 📁 Cấu trúc đã tạo

- `/admin/login` - Trang đăng nhập
- `/admin` - Dashboard (cần đăng nhập)
- Tất cả route admin đều được bảo vệ
