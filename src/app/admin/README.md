# Admin Panel - Hướng dẫn cấu hình

## Cấu hình đăng nhập

Để sử dụng admin panel, bạn cần tạo file `.env.local` trong thư mục gốc của dự án với nội dung sau:

```bash
# Admin credentials
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Database
DATABASE_URL="file:./dev.db"
```

## Thay đổi thông tin đăng nhập

Bạn có thể thay đổi tên đăng nhập và mật khẩu bằng cách sửa đổi các biến môi trường:

- `NEXT_PUBLIC_ADMIN_USERNAME`: Tên đăng nhập admin
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Mật khẩu admin

## Sử dụng

1. Truy cập `/admin/login` để đăng nhập
2. Sử dụng tài khoản và mật khẩu đã cấu hình
3. Sau khi đăng nhập thành công, bạn sẽ được chuyển đến dashboard
4. Sử dụng nút "Đăng xuất" để thoát khỏi hệ thống

## Bảo mật

- Chỉ sử dụng mật khẩu mạnh trong môi trường production
- Không commit file `.env.local` vào git
- Cân nhắc sử dụng JWT tokens thay vì localStorage trong môi trường production
