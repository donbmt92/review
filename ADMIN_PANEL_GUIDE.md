# Hướng dẫn sử dụng Admin Panel

## Tổng quan

Admin Panel được xây dựng để quản lý các trang so sánh sản phẩm một cách động thay vì sử dụng các file static như trước. Hệ thống cho phép:

- ✅ Quản lý danh mục sản phẩm
- ✅ Thêm/sửa/xóa sản phẩm
- ✅ Tạo trang so sánh tự động
- ✅ Import dữ liệu từ file static
- ✅ Tối ưu SEO và performance

## Truy cập Admin Panel

Truy cập: `http://localhost:3000/admin`

## Cấu trúc hệ thống

### 1. Dashboard (`/admin`)
- Hiển thị thống kê tổng quan
- Danh mục và sản phẩm mới nhất
- Thao tác nhanh

### 2. Quản lý danh mục (`/admin/categories`)
- Xem danh sách tất cả danh mục
- Tạo danh mục mới
- Chỉnh sửa thông tin danh mục
- Xóa danh mục (chỉ khi không có sản phẩm)

### 3. Quản lý sản phẩm (`/admin/products`)
- Xem danh sách tất cả sản phẩm
- Thêm sản phẩm mới với đầy đủ thông tin
- Chỉnh sửa sản phẩm
- Xóa sản phẩm

### 4. Quản lý trang so sánh (`/admin/pages`)
- Xem các trang so sánh có thể tạo
- Trạng thái của từng trang
- Link xem trang trực tiếp

### 5. Import dữ liệu (`/admin/import`)
- Import dữ liệu từ file static hiện tại
- Tự động tạo danh mục và sản phẩm
- Theo dõi quá trình import

### 6. Cài đặt (`/admin/settings`)
- Thống kê hệ thống
- Thông tin performance
- Cài đặt SEO

## Hướng dẫn sử dụng

### Bước 1: Import dữ liệu hiện tại

1. Truy cập `/admin/import`
2. Nhấn "Bắt đầu import"
3. Đợi quá trình hoàn tất
4. Kiểm tra kết quả tại Dashboard

### Bước 2: Tạo trang so sánh mới

#### Cách 1: Tạo từ đầu
1. Vào `/admin/categories/create`
2. Nhập thông tin danh mục:
   - Tên danh mục
   - Slug (URL)
   - Icon (emoji)
3. Vào `/admin/products/create`
4. Thêm sản phẩm vào danh mục:
   - Thông tin cơ bản
   - Điểm nổi bật (highlights)
   - Liên kết mua hàng (offers)
5. Trang sẽ tự động có thể truy cập tại `/{slug-danh-muc}`

#### Cách 2: Import dữ liệu có sẵn
1. Chuẩn bị dữ liệu theo format như `airPurifiersData.ts`
2. Thêm vào API import
3. Chạy import

### Bước 3: Quản lý nội dung

#### Thêm sản phẩm mới
1. Vào `/admin/products/create`
2. Chọn danh mục
3. Điền thông tin:
   - Tên sản phẩm
   - Hình ảnh (URL)
   - Điểm đánh giá
   - Hạng (thứ tự hiển thị)
   - Badge (nếu có)
   - Highlights (ít nhất 1)
   - Offers (ít nhất 1)

#### Chỉnh sửa sản phẩm
1. Vào `/admin/products`
2. Nhấn "Sửa" trên sản phẩm cần chỉnh sửa
3. Cập nhật thông tin
4. Lưu thay đổi

#### Quản lý danh mục
1. Vào `/admin/categories`
2. Tạo mới hoặc chỉnh sửa danh mục
3. Lưu ý: Không thể xóa danh mục có sản phẩm

## Tính năng nâng cao

### SEO Optimization
- Tự động generate metadata cho từng trang
- Clean URLs với slugs
- Open Graph và Twitter Cards
- Structured data ready

### Performance
- Static generation cho tất cả trang
- Revalidate mỗi giờ
- Dynamic imports cho fallback
- Optimized images

### Database Schema
```
Category
├── id (cuid)
├── name (string)
├── slug (string, unique)
├── icon (string, nullable)
└── products (relation)

Product
├── id (cuid)
├── title (string)
├── imageUrl (string)
├── score (float)
├── rank (int, nullable)
├── badge (string, nullable)
├── categoryId (string)
├── highlights (relation)
└── offers (relation)

Highlight
├── id (cuid)
├── text (string)
└── productId (string)

Offer
├── id (cuid)
├── retailer (string)
├── url (string)
├── badge (string, nullable)
├── discount (string, nullable)
└── productId (string)
```

## Troubleshooting

### Lỗi thường gặp

1. **Không thể tạo danh mục**
   - Kiểm tra slug đã tồn tại chưa
   - Đảm bảo tên danh mục chưa được sử dụng

2. **Không thể thêm sản phẩm**
   - Kiểm tra danh mục đã được chọn
   - Đảm bảo có ít nhất 1 highlight và 1 offer
   - Kiểm tra hạng (rank) không trùng trong cùng danh mục

3. **Trang không hiển thị**
   - Đảm bảo danh mục có ít nhất 1 sản phẩm
   - Kiểm tra slug URL đúng
   - Restart development server nếu cần

4. **Import thất bại**
   - Kiểm tra format dữ liệu
   - Xem log lỗi trong console
   - Đảm bảo database connection ổn định

### Database Issues

Nếu gặp lỗi database:
```bash
npx prisma db push
npx prisma generate
```

Reset database:
```bash
rm prisma/dev.db
npx prisma db push
```

## Deployment Notes

### Environment Variables
```env
DATABASE_URL="file:./dev.db"
```

### Build Process
1. Database sẽ được tạo tự động
2. Static pages sẽ được generate
3. Admin panel sẽ hoạt động với database

### Performance Tips
- Sử dụng CDN cho images
- Enable gzip compression
- Monitor database size
- Regular backup database

## Support

Nếu gặp vấn đề, kiểm tra:
1. Console logs trong browser
2. Server logs
3. Database connection
4. File permissions

Admin Panel được thiết kế để dễ sử dụng và mở rộng. Mọi thay đổi sẽ được phản ánh ngay lập tức trên website.
