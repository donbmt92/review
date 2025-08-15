# Demo Slug System - Hệ thống URL thân thiện SEO

## 🎯 **Mục đích**

Tạo URL thân thiện với SEO khi click vào sản phẩm, thay vì redirect trực tiếp sang Amazon.

## 🔄 **Flow hoạt động**

### 1. **User click sản phẩm**
```
Trang hiện tại: /vitamin-d3-k2
User click: "Micro Ingredients Vitamin D3 10000 IU Plus K2"
```

### 2. **Tạo slug URL**
```
Tên sản phẩm: "Micro Ingredients Vitamin D3 10000 IU Plus K2"
Slug được tạo: "micro-ingredients-vitamin-d3-10000-iu-plus-k2"
URL mới: /vitamin-d3-k2/micro-ingredients-vitamin-d3-10000-iu-plus-k2
```

### 3. **Hiển thị loading page**
```
- Loading spinner
- Thông báo "Đang chuyển hướng..."
- Hiển thị slug URL
- Track sự kiện Google Analytics
```

### 4. **Auto-redirect sau 1 giây**
```
Đích: URL thực tế của sản phẩm (Amazon, etc.)
```

## 📁 **Files đã được cập nhật**

### 1. **ProductComparisonPage.tsx**
- Thêm `handleProductClick` function
- Tạo slug từ tên sản phẩm
- Navigate đến slug page

### 2. **CompareRow.tsx**
- Thay thế Link bằng button
- Thêm prop `onProductClick`
- Track sự kiện click

### 3. **`[category]/[productSlug]/page.tsx`**
- Dynamic route cho slug
- Tìm sản phẩm dựa trên slug
- Auto-redirect sang URL thực tế
- Track sự kiện Google Analytics

## 🧪 **Cách test**

### 1. **Khởi động server**
```bash
npm run dev
```

### 2. **Truy cập trang sản phẩm**
```
http://localhost:3000/vitamin-d3-k2
```

### 3. **Click vào sản phẩm**
- Click vào hình ảnh sản phẩm
- Click vào tên sản phẩm
- Click vào sản phẩm trong "Top Products"

### 4. **Quan sát URL thay đổi**
```
Từ: /vitamin-d3-k2
Thành: /vitamin-d3-k2/micro-ingredients-vitamin-d3-10000-iu-plus-k2
```

### 5. **Xem loading page**
- Loading spinner
- Thông báo chuyển hướng
- Slug URL hiển thị

### 6. **Auto-redirect**
- Sau 1 giây tự động chuyển sang Amazon
- Kiểm tra Google Analytics events

## 📊 **Google Analytics Events**

### 1. **product_click**
- **Category:** `ecommerce`
- **Label:** Tên sản phẩm
- **Kích hoạt:** Khi click vào sản phẩm

### 2. **product_view_via_slug**
- **Category:** `ecommerce`
- **Label:** Tên sản phẩm
- **Kích hoạt:** Khi slug page load

### 3. **page_view**
- **Kích hoạt:** Khi slug page load
- **URL:** Slug URL

## 🔧 **Tùy chỉnh**

### 1. **Thay đổi thời gian redirect**
```typescript
// Trong [productSlug]/page.tsx
setTimeout(() => {
  window.location.href = product.url;
}, 2000); // Thay đổi từ 1000ms thành 2000ms
```

### 2. **Thêm thông tin sản phẩm**
```typescript
// Hiển thị thêm thông tin trong loading page
<div className="product-info">
  <h2>{product.title}</h2>
  <p>Score: {product.score}</p>
  <p>Price: {product.price}</p>
</div>
```

### 3. **Thay đổi loading UI**
```typescript
// Tùy chỉnh giao diện loading
<div className="custom-loading">
  <div className="progress-bar"></div>
  <div className="countdown">Redirecting in 3... 2... 1...</div>
</div>
```

## 🚀 **Lợi ích**

### 1. **SEO**
- URL thân thiện với search engine
- Có thể index được
- Tăng khả năng tìm kiếm

### 2. **Analytics**
- Track được user journey chi tiết
- Đo lường hiệu quả của từng sản phẩm
- Phân tích hành vi người dùng

### 3. **User Experience**
- URL dễ đọc và nhớ
- Có thể bookmark
- Có thể share trên social media

### 4. **Business Intelligence**
- Biết được sản phẩm nào được click nhiều
- Phân tích conversion funnel
- Tối ưu hóa product placement

## 📝 **Lưu ý**

### 1. **Performance**
- Redirect chỉ mất 1 giây
- Không ảnh hưởng đến user experience
- Có thể điều chỉnh thời gian

### 2. **SEO Best Practices**
- URL có ý nghĩa
- Dễ đọc và hiểu
- Thân thiện với search engine

### 3. **Analytics Tracking**
- Track đầy đủ user journey
- Đo lường được mọi tương tác
- Dữ liệu chi tiết cho optimization

## 🔍 **Troubleshooting**

### 1. **Slug không hoạt động**
- Kiểm tra dynamic route đã tạo đúng chưa
- Kiểm tra function `createProductSlug`
- Kiểm tra console errors

### 2. **Redirect không hoạt động**
- Kiểm tra `product.url` có đúng không
- Kiểm tra `setTimeout` function
- Kiểm tra browser console

### 3. **Google Analytics không track**
- Kiểm tra `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Kiểm tra `useGoogleAnalytics` hook
- Kiểm tra browser console
