# Hướng dẫn thiết lập hệ thống xác thực Admin

## Tổng quan
Hệ thống admin panel đã được thiết lập với xác thực tự động. Khi truy cập `/admin`, người dùng sẽ được chuyển hướng đến trang đăng nhập nếu chưa xác thực.

## Cài đặt

### 1. Tạo file .env.local
Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# Admin credentials - Thay đổi các giá trị này để bảo mật
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Database
DATABASE_URL="file:./dev.db"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL for metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Thay đổi thông tin đăng nhập
Để bảo mật, hãy thay đổi:
- `NEXT_PUBLIC_ADMIN_USERNAME`: Tên đăng nhập admin
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Mật khẩu admin

## Cách hoạt động

### Middleware
- File `src/middleware.ts` kiểm tra tất cả các route `/admin/*`
- Nếu chưa xác thực, chuyển hướng đến `/admin/login`
- Nếu đã xác thực, cho phép truy cập admin panel

### API Endpoints
- `POST /api/admin/auth`: Xác thực đăng nhập
- `POST /api/admin/logout`: Đăng xuất

### Cookie
- Sử dụng cookie `admin-auth` để lưu trạng thái xác thực
- Cookie có thời hạn 30 ngày
- HttpOnly và Secure (trong production)

## Sử dụng

### Đăng nhập
1. Truy cập `/admin`
2. Sẽ được chuyển hướng đến `/admin/login`
3. Nhập username và password từ file .env
4. Sau khi đăng nhập thành công, được chuyển đến dashboard

### Đăng xuất
- Click nút 🚪 ở header admin panel
- Hoặc truy cập trực tiếp `/api/admin/logout`

## Bảo mật

### Khuyến nghị
- Thay đổi username và password mặc định
- Sử dụng mật khẩu mạnh
- Không commit file .env.local vào git
- Sử dụng HTTPS trong production

### Lưu ý
- Cookie xác thực có thời hạn 30 ngày
- Middleware chặn tất cả route admin nếu chưa xác thực
- API routes được bỏ qua khỏi middleware

## Troubleshooting

### Lỗi thường gặp
1. **Không thể đăng nhập**: Kiểm tra file .env.local và restart server
2. **Bị redirect liên tục**: Xóa cookie `admin-auth` và thử lại
3. **API không hoạt động**: Kiểm tra middleware config

### Debug
- Kiểm tra console browser để xem lỗi
- Kiểm tra Network tab để xem API calls
- Kiểm tra Application tab để xem cookies
