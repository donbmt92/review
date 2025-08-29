# 🔍 Hướng dẫn Debug Google Analytics

## Tổng quan

Hook `useGoogleAnalytics` đã được cập nhật với logging chi tiết để giúp debug các vấn đề với Google Analytics.

## 📊 Các thông tin được log

### 1. Khi hook được khởi tạo
```
🚀 Google Analytics Hook Initialized:
- Environment: development/production
- NEXT_PUBLIC_GA_MEASUREMENT_ID: G-XXXXXXXXXX
- Window gtag available: true/false
- Current URL: https://example.com/page
```

### 2. Khi track page view
```
🔍 GA Debug Info:
- NEXT_PUBLIC_GA_MEASUREMENT_ID: G-XXXXXXXXXX
- Type: string/undefined
- Length: 12
- URL being tracked: /page
✅ GA Measurement ID found, tracking page view...
```

### 3. Khi track event
```
📊 GA Event Debug:
- Action: search
- Category: engagement
- Label: laptop
- Value: undefined
- GA Measurement ID available: true
✅ Tracking event...
```

## 🚨 Các lỗi thường gặp

### Lỗi 1: NEXT_PUBLIC_GA_MEASUREMENT_ID không được định nghĩa
```
❌ NEXT_PUBLIC_GA_MEASUREMENT_ID is not defined!
Please check your .env.local file
```

**Nguyên nhân:**
- File `.env.local` không tồn tại
- Biến môi trường không được đặt tên đúng
- File `.env.local` không được restart sau khi thay đổi

**Cách khắc phục:**
1. Tạo file `.env.local` trong thư mục gốc
2. Thêm dòng: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Restart development server

### Lỗi 2: Window hoặc gtag không khả dụng
```
⚠️ Window or gtag not available
```

**Nguyên nhân:**
- Code chạy trên server-side
- Google Analytics script chưa được load
- Lỗi trong Google Analytics script

**Cách khắc phục:**
1. Đảm bảo code chỉ chạy trên client-side
2. Kiểm tra Google Analytics script trong `_document.tsx` hoặc `layout.tsx`
3. Kiểm tra console browser để xem lỗi script

### Lỗi 3: GA Measurement ID không hợp lệ
```
❌ Cannot track event: NEXT_PUBLIC_GA_MEASUREMENT_ID not defined
```

**Nguyên nhân:**
- ID không đúng format (phải bắt đầu bằng G-)
- ID bị trống hoặc chỉ có khoảng trắng

## 🔧 Cách kiểm tra

### 1. Kiểm tra file môi trường
```bash
# Kiểm tra file .env.local
cat .env.local

# Hoặc tạo file mới
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env.local
```

### 2. Kiểm tra console browser
1. Mở Developer Tools (F12)
2. Vào tab Console
3. Tìm các log có prefix 🚀, 🔍, 📊
4. Kiểm tra các lỗi có prefix ❌, ⚠️

### 3. Kiểm tra Network tab
1. Vào tab Network
2. Tìm các request đến `google-analytics.com`
3. Kiểm tra status code và response

## 📝 Ví dụ file .env.local

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Các biến môi trường khác
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-here"
```

## 🎯 Best Practices

1. **Luôn sử dụng prefix `NEXT_PUBLIC_`** cho biến môi trường client-side
2. **Restart server** sau khi thay đổi file `.env.local`
3. **Kiểm tra console** trước khi deploy
4. **Sử dụng logging** để debug trong development
5. **Tắt logging** trong production để tăng performance

## 🚀 Cách test

1. **Khởi động development server:**
   ```bash
   npm run dev
   ```

2. **Mở browser và navigate** đến các trang khác nhau

3. **Kiểm tra console** để xem các log GA

4. **Kiểm tra Google Analytics Real-time** để xem data có được gửi không

## 📞 Hỗ trợ

Nếu vẫn gặp vấn đề:

1. Kiểm tra tất cả log trong console
2. Xác nhận file `.env.local` có đúng format
3. Kiểm tra Google Analytics script đã được load
4. Restart development server
5. Clear browser cache và cookies
