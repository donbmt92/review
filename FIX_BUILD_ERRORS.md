# 🔧 Sửa lỗi Build - Hướng dẫn từng bước

## ❌ **Lỗi hiện tại:**
1. Prisma database URL không đúng format
2. Admin page bị lỗi prerendering
3. Database chưa được khởi tạo

## ✅ **Cách sửa:**

### **Bước 1: Tạo file .env**
Tạo file `.env` trong thư mục gốc với nội dung:
```bash
# Database - SQLite
DATABASE_URL="file:./prisma/dev.db"

# Admin credentials
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Environment
NODE_ENV=development
```

### **Bước 2: Khởi tạo Database**
```bash
# Generate Prisma client
npx prisma generate

# Push schema vào database
npx prisma db push

# Hoặc chạy migration
npx prisma migrate dev
```

### **Bước 3: Seed dữ liệu (nếu cần)**
```bash
# Chạy seed script
npm run seed
```

### **Bước 4: Build lại**
```bash
npm run build
```

## 🔍 **Kiểm tra sau khi sửa:**

1. ✅ File `.env` đã được tạo với DATABASE_URL đúng
2. ✅ Database đã được khởi tạo
3. ✅ Prisma client đã được generate
4. ✅ Build thành công không có lỗi

## 📁 **Cấu trúc file cần thiết:**
```
review/
├── .env                    ← Tạo file này
├── prisma/
│   ├── dev.db            ← Sẽ được tạo tự động
│   └── schema.prisma
└── src/
    └── app/
        └── admin/        ← Đã disable prerendering
```

## 🚨 **Nếu vẫn gặp lỗi:**
1. Kiểm tra console để xem lỗi chi tiết
2. Đảm bảo file `.env` đã được tạo đúng
3. Restart server sau khi tạo file môi trường
4. Kiểm tra database connection
