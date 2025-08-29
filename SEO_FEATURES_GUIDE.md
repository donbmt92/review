# 🚀 Hướng dẫn sử dụng tính năng SEO cho danh mục

## Tổng quan

Hệ thống đã được cập nhật để hỗ trợ tối ưu hóa SEO cho từng danh mục sản phẩm. Các tính năng SEO bao gồm:

- **Keywords SEO**: Từ khóa chính để tối ưu hóa tìm kiếm
- **Meta Title**: Tiêu đề hiển thị trên kết quả tìm kiếm
- **Meta Description**: Mô tả hiển thị trên kết quả tìm kiếm

## Cách sử dụng

### 1. Truy cập form nội dung danh mục

1. Vào **Admin Panel** → **Categories**
2. Chọn danh mục cần chỉnh sửa
3. Click vào tab **"Content"** hoặc **"Nội dung"**

### 2. Cập nhật thông tin SEO

Trong form nội dung, bạn sẽ thấy phần **"🚀 Tối ưu hóa SEO"** với các trường:

#### Keywords SEO
- **Mục đích**: Các từ khóa chính, phân cách bằng dấu phẩy
- **Ví dụ**: `máy lọc không khí, air purifier, lọc bụi, khử mùi`
- **Lưu ý**: Giúp tối ưu hóa tìm kiếm và xếp hạng

#### Meta Title
- **Mục đích**: Tiêu đề hiển thị trên kết quả tìm kiếm
- **Giới hạn**: Tối đa 60 ký tự
- **Ví dụ**: `Máy lọc không khí tốt nhất 2025 - Đánh giá & So sánh`

#### Meta Description
- **Mục đích**: Mô tả hiển thị trên kết quả tìm kiếm
- **Giới hạn**: Tối đa 160 ký tự
- **Ví dụ**: `Khám phá top máy lọc không khí tốt nhất 2025. So sánh tính năng, giá cả và đánh giá từ người dùng thực tế.`

### 3. Xem trước kết quả tìm kiếm

Form sẽ hiển thị phần **"🔍 Xem trước kết quả tìm kiếm"** để bạn có thể xem trước cách trang sẽ xuất hiện trên Google:

- **Tiêu đề**: Màu xanh dương (như trên Google)
- **URL**: Màu xanh lá
- **Mô tả**: Màu xám

### 4. Lưu thay đổi

Click **"💾 Lưu nội dung"** để lưu các thay đổi SEO.

## Lưu ý quan trọng

### Fallback values
Nếu không nhập thông tin SEO tùy chỉnh, hệ thống sẽ tự động sử dụng:

- **Title**: Tên danh mục + "Compare Top Rated Models | BuyeReviews"
- **Description**: Mô tả danh mục mặc định
- **Keywords**: Tên danh mục + các từ khóa liên quan

### Ưu tiên SEO
Thông tin SEO từ CategoryContent sẽ được ưu tiên hơn so với các giá trị mặc định.

### Cập nhật real-time
Thay đổi SEO sẽ được áp dụng ngay lập tức sau khi lưu, không cần restart server.

## Ví dụ thực tế

### Danh mục: Máy lọc không khí

**Keywords SEO:**
```
máy lọc không khí, air purifier, lọc bụi, khử mùi, máy lọc không khí cho phòng ngủ, máy lọc không khí cho văn phòng
```

**Meta Title:**
```
Máy lọc không khí tốt nhất 2025 - Đánh giá & So sánh từ chuyên gia
```

**Meta Description:**
```
Khám phá top máy lọc không khí tốt nhất 2025. So sánh tính năng, giá cả và đánh giá từ người dùng thực tế. Chọn máy lọc phù hợp nhất cho không gian của bạn.
```

## Lợi ích

1. **Tối ưu hóa SEO**: Cải thiện thứ hạng trên Google
2. **Kiểm soát hoàn toàn**: Tùy chỉnh title, description cho từng danh mục
3. **Tăng traffic**: Từ khóa được tối ưu hóa giúp thu hút người dùng
4. **Dễ sử dụng**: Giao diện trực quan với preview real-time
5. **Linh hoạt**: Có thể cập nhật SEO mà không ảnh hưởng đến nội dung chính

## Hỗ trợ kỹ thuật

Nếu gặp vấn đề hoặc cần hỗ trợ, vui lòng:

1. Kiểm tra console browser để xem lỗi
2. Xác nhận dữ liệu đã được lưu trong database
3. Kiểm tra API endpoint `/api/admin/categories/[id]/content`
4. Liên hệ team phát triển nếu cần thiết
