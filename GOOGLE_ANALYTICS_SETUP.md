# Hướng dẫn cài đặt Google Analytics

## Bước 1: Tạo tài khoản Google Analytics

1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Đăng nhập bằng tài khoản Google của bạn
3. Tạo tài khoản mới (nếu chưa có)
4. Tạo thuộc tính (Property) mới cho website
5. Chọn "Web" làm nền tảng
6. Điền thông tin website:
   - Website URL: URL của website của bạn
   - Industry category: Chọn danh mục phù hợp
   - Business size: Chọn quy mô doanh nghiệp
7. Chọn mục tiêu kinh doanh (Business objectives)
8. Tạo thuộc tính

## Bước 2: Lấy Measurement ID

1. Sau khi tạo thuộc tính, bạn sẽ nhận được Measurement ID
2. Measurement ID có định dạng: `G-XXXXXXXXXX`
3. Copy ID này để sử dụng trong bước tiếp theo

## Bước 3: Cấu hình biến môi trường

1. Tạo file `.env.local` trong thư mục gốc của dự án
2. Thêm dòng sau vào file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Lưu ý:** Thay thế `G-XXXXXXXXXX` bằng Measurement ID thực tế của bạn.

## Bước 4: Kiểm tra cài đặt

1. Khởi động lại development server:
```bash
npm run dev
```

2. Mở website và kiểm tra Console trong Developer Tools
3. Bạn sẽ thấy Google Analytics đang hoạt động

## Bước 5: Kiểm tra trong Google Analytics

1. Quay lại Google Analytics
2. Vào "Reports" > "Realtime" > "Overview"
3. Mở website trong tab khác
4. Bạn sẽ thấy dữ liệu realtime xuất hiện

## Các tính năng đã tích hợp

### 1. Theo dõi trang (Page Tracking)
- Tự động theo dõi tất cả các trang
- Theo dõi thời gian xem trang
- Theo dõi nguồn traffic

### 2. Theo dõi tìm kiếm (Search Tracking)
- Theo dõi từ khóa tìm kiếm
- Theo dõi số lần tìm kiếm
- Phân tích hành vi người dùng

### 3. Theo dõi đăng ký Newsletter
- Theo dõi tỷ lệ đăng ký
- Phân tích nguồn đăng ký
- Đo lường hiệu quả marketing

### 4. Theo dõi xem sản phẩm
- Theo dõi sản phẩm được xem nhiều nhất
- Phân tích danh mục sản phẩm
- Đo lường engagement

## Tùy chỉnh thêm

### Thêm sự kiện tùy chỉnh

```typescript
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const { trackEvent } = useGoogleAnalytics();

// Theo dõi sự kiện tùy chỉnh
trackEvent('button_click', 'engagement', 'cta_button', 1);
```

### Theo dõi chuyển đổi

```typescript
// Theo dõi form submission
trackEvent('form_submit', 'conversion', 'contact_form');

// Theo dõi download
trackEvent('file_download', 'engagement', 'pdf_guide');
```

## Troubleshooting

### Google Analytics không hoạt động
1. Kiểm tra Measurement ID trong `.env.local`
2. Đảm bảo file `.env.local` được tạo đúng vị trí
3. Khởi động lại development server
4. Kiểm tra Console trong Developer Tools

### Không thấy dữ liệu trong Google Analytics
1. Đợi 24-48 giờ để dữ liệu xuất hiện
2. Kiểm tra filter trong Google Analytics
3. Đảm bảo không có ad blocker
4. Kiểm tra quyền truy cập tài khoản

## Lưu ý bảo mật

- Không commit file `.env.local` vào Git
- Measurement ID là public và an toàn để hiển thị
- Sử dụng HTTPS trong production để bảo mật dữ liệu
- Tuân thủ GDPR và các quy định về quyền riêng tư

## Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. [Google Analytics Help Center](https://support.google.com/analytics/)
2. [Next.js Documentation](https://nextjs.org/docs)
3. Console errors trong Developer Tools
