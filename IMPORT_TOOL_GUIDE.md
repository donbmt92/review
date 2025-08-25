# Hướng dẫn sử dụng công cụ Import từ BuyeReviews

## Tổng quan
Công cụ Import từ BuyeReviews cho phép bạn tự động trích xuất thông tin sản phẩm từ trang web BuyeReviews và import vào database của admin panel.

## Cách sử dụng

### 1. Truy cập trang Import
- Vào Admin Panel → Sản phẩm → Import từ BuyeReviews
- Hoặc truy cập trực tiếp: `/admin/products/import`

### 2. Chuẩn bị dữ liệu
- Mở trang BuyeReviews chứa danh sách sản phẩm cần import
- Copy toàn bộ nội dung HTML của trang (Ctrl+A, Ctrl+C)
- Hoặc copy phần HTML chứa danh sách sản phẩm

### 3. Import dữ liệu
1. **Chọn danh mục**: Chọn danh mục phù hợp cho sản phẩm
2. **Dán HTML**: Dán nội dung HTML vào ô textarea
3. **Trích xuất**: Click "Trích xuất sản phẩm" để parse dữ liệu
4. **Kiểm tra**: Xem lại thông tin sản phẩm đã trích xuất
5. **Import**: Click "Import vào database" để lưu sản phẩm

## Dữ liệu được trích xuất

### Thông tin cơ bản
- **Tiêu đề**: Tên sản phẩm
- **Hình ảnh**: URL hình ảnh sản phẩm
- **Điểm số**: Đánh giá từ 0-10
- **Thứ hạng**: Vị trí trong danh sách
- **ASIN**: Mã sản phẩm Amazon

### Thông tin bổ sung
- **Số lượng review**: Số đánh giá của người dùng
- **Highlights**: Đặc điểm nổi bật (tối đa 3)
- **Discount**: Phần trăm giảm giá (nếu có)
- **Mô tả**: Mô tả ngắn gọn sản phẩm
- **Giá**: Giá sản phẩm (nếu có)

## Cấu trúc HTML được hỗ trợ

### BuyeReviews (Khuyến nghị)
- Trang có cấu trúc chuẩn của BuyeReviews
- Chứa các link với tham số `asin=`
- Thông tin sản phẩm được tổ chức rõ ràng

### HTML thông thường
- Các element có class chứa từ khóa: `product`, `item`, `card`
- Tiêu đề trong thẻ `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- Hình ảnh trong thẻ `img`
- Mô tả trong thẻ `p`, `li`

## Xử lý lỗi

### Lỗi thường gặp
1. **Không trích xuất được sản phẩm**
   - Kiểm tra định dạng HTML
   - Đảm bảo HTML chứa thông tin sản phẩm
   - Thử copy toàn bộ trang thay vì một phần

2. **Thiếu thông tin sản phẩm**
   - Kiểm tra cấu trúc HTML
   - Đảm bảo có hình ảnh và tiêu đề
   - Thử với trang khác có cấu trúc tương tự

3. **Lỗi khi import**
   - Kiểm tra kết nối database
   - Đảm bảo đã chọn danh mục
   - Kiểm tra quyền truy cập API

### Debug
- Mở Developer Tools (F12)
- Xem Console để kiểm tra lỗi
- Kiểm tra Network tab để xem API calls
- Sử dụng `console.log` để debug parser

## Tối ưu hóa

### Để có kết quả tốt nhất
1. **Sử dụng trang BuyeReviews gốc**
2. **Copy toàn bộ nội dung HTML**
3. **Chọn danh mục phù hợp**
4. **Kiểm tra dữ liệu trước khi import**

### Xử lý dữ liệu lớn
- Import từng phần nhỏ thay vì toàn bộ trang
- Kiểm tra và chỉnh sửa dữ liệu trước khi import
- Sử dụng tính năng xóa sản phẩm không cần thiết

## Bảo mật và quyền sử dụng

### Lưu ý quan trọng
- ⚠️ **Chỉ sử dụng dữ liệu bạn có quyền sử dụng**
- ⚠️ **Không vi phạm bản quyền của BuyeReviews**
- ⚠️ **Sử dụng cho mục đích học tập và nghiên cứu**
- ⚠️ **Tuân thủ robots.txt và terms of service**

### Khuyến nghị
- Liên hệ BuyeReviews để xin phép sử dụng dữ liệu
- Ghi rõ nguồn dữ liệu nếu sử dụng công khai
- Chỉ import dữ liệu cần thiết cho mục đích hợp pháp

## Hỗ trợ kỹ thuật

### Nếu gặp vấn đề
1. Kiểm tra console browser để xem lỗi
2. Kiểm tra định dạng HTML đầu vào
3. Thử với trang BuyeReviews khác
4. Liên hệ admin để được hỗ trợ

### Tính năng mới
- Công cụ đang được phát triển liên tục
- Các tính năng mới sẽ được cập nhật
- Góp ý và báo cáo lỗi được chào đón

---

**Lưu ý**: Công cụ này được thiết kế để hỗ trợ việc quản lý sản phẩm một cách hiệu quả. Hãy sử dụng có trách nhiệm và tuân thủ các quy định pháp luật về bản quyền.

