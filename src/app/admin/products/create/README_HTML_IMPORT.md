# Hướng dẫn sử dụng công cụ Import HTML

## Tổng quan
Công cụ Import HTML cho phép bạn tự động trích xuất thông tin sản phẩm từ HTML và tạo sản phẩm mới trong hệ thống một cách nhanh chóng.

**Tính năng đặc biệt:** Ảnh sản phẩm sẽ được tự động tải về từ URL gốc và lưu vào hệ thống của bạn, đảm bảo tính ổn định và không bị mất khi trang web gốc thay đổi.

## Cách sử dụng

### 1. Chuẩn bị HTML
- Copy HTML từ trang web chứa thông tin sản phẩm
- HTML nên có cấu trúc rõ ràng với các class CSS cụ thể
- Đảm bảo HTML chứa đầy đủ thông tin: tên, hình ảnh, điểm số, đánh giá, v.v.

### 2. Import HTML
1. Vào trang "Thêm sản phẩm mới" trong Admin Panel
2. Chọn tab "📋 Import từ HTML"
3. Paste HTML vào ô "HTML sản phẩm"
4. Nhấn nút "🔍 Parse HTML"

### 3. Kiểm tra kết quả
- Công cụ sẽ hiển thị danh sách sản phẩm đã parse được
- Kiểm tra thông tin của từng sản phẩm
- Chọn danh mục phù hợp cho tất cả sản phẩm

### 4. Tạo sản phẩm
- Nhấn nút "🚀 Tạo X sản phẩm"
- Hệ thống sẽ tự động tải về tất cả ảnh sản phẩm từ URL gốc
- Upload ảnh vào hệ thống của bạn
- Tạo tất cả sản phẩm với ảnh đã được lưu trữ cục bộ
- Chuyển hướng đến trang danh sách sản phẩm sau khi hoàn thành

**Lưu ý:** Quá trình tải ảnh có thể mất vài phút tùy thuộc vào số lượng ảnh và tốc độ mạng.

## Cấu trúc HTML được hỗ trợ

### Selectors chính
- **Container sản phẩm**: `.ComparisonPaidSingleProductComponentAU24_paid-single-product-au24-container__qRMhK`
- **Tên sản phẩm**: `.header-text-au24`, `h3`, `.product-title`
- **Hình ảnh**: `img.ui.image`, `img[src*="amazon"]`, `img[alt]`
- **Điểm số**: `.rating-value-au24-desktop span`, `.rating span`, `.score`
- **Thứ hạng**: `.number-corner-au24 p`, `.rank p`, `.position p`
- **Badge**: `.ribbon-label-item-container-au24 span`, `.badge`, `.label`
- **Số lượng review**: `.reviews-count-au24-desktop`, `.reviews`
- **Điểm nổi bật**: `.more-info-line-text-au24-desktop`, `.highlight`, `.feature`
- **Giảm giá**: `.ribbon-desktop .text-desktop .bold-desktop`, `.discount`, `.off`

### Fallback selectors
Nếu không tìm thấy với selectors chính, công cụ sẽ thử:
- `[class*="paid-single-product"]`
- `[id^="section"]`
- `.product-container`
- `.single-product`

## Xử lý lỗi

### Lỗi thường gặp
1. **"Không thể tìm thấy sản phẩm nào"**
   - Kiểm tra cấu trúc HTML
   - Đảm bảo HTML có các class CSS cần thiết
   - Thử với HTML từ trang web khác

2. **"Có lỗi xảy ra khi parse HTML"**
   - HTML có thể bị lỗi cú pháp
   - Kiểm tra HTML có hợp lệ không
   - Thử copy lại HTML từ nguồn gốc

3. **Thiếu thông tin sản phẩm**
   - Đảm bảo HTML chứa đầy đủ thông tin cần thiết
   - Kiểm tra các selectors có đúng không

### Yêu cầu tối thiểu
Để parse thành công, mỗi sản phẩm cần có:
- ✅ Tên sản phẩm
- ✅ Hình ảnh
- ✅ Điểm số (rating)

## Ví dụ HTML

Bạn có thể sử dụng HTML từ các trang review sản phẩm thực tế. Công cụ sẽ tự động nhận diện và parse thông tin sản phẩm.

## Lưu ý

- Công cụ hoạt động tốt nhất với HTML từ các trang review sản phẩm
- Hỗ trợ nhiều định dạng HTML khác nhau
- Tự động xử lý các trường hợp đặc biệt
- Có thể cần điều chỉnh HTML nếu cấu trúc quá phức tạp
- **Xử lý ảnh tự động:**
  - Tải ảnh từ URL gốc với User-Agent hợp lệ
  - Kiểm tra định dạng và kích thước ảnh (giới hạn 10MB)
  - Tạo tên file an toàn với timestamp
  - Upload vào hệ thống lưu trữ của bạn
  - Fallback về URL gốc nếu không thể tải được

## Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra console browser để xem lỗi chi tiết
2. Thử với HTML đơn giản hơn
3. Liên hệ admin để được hỗ trợ
