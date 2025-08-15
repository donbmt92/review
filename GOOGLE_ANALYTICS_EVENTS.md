# Danh sách sự kiện Google Analytics đã được tracking

## 📊 **Sự kiện tự động (Automatic Events)**

### 1. Page View Tracking
- **Sự kiện:** `page_view`
- **Mô tả:** Tự động theo dõi mỗi khi người dùng truy cập trang
- **Dữ liệu:** URL trang, tiêu đề trang, thời gian truy cập
- **Vị trí:** `layout.tsx` (tự động)

### 2. Scroll Depth Tracking
- **Sự kiện:** `scroll_depth`
- **Mô tả:** Theo dõi độ sâu cuộn trang của người dùng
- **Mốc tracking:** 25%, 50%, 75%, 90%, max depth
- **Vị trí:** `ScrollTracker.tsx` (tự động)

## 🔍 **Sự kiện tương tác (Interaction Events)**

### 3. Search Tracking
- **Sự kiện:** `search`
- **Category:** `engagement`
- **Label:** Từ khóa tìm kiếm
- **Vị trí:** `SearchInput.tsx`
- **Kích hoạt:** Khi người dùng nhấn Enter hoặc click nút tìm kiếm

### 4. Category Click Tracking
- **Sự kiện:** `category_click`
- **Category:** `navigation`
- **Label:** Tên danh mục (Air Purifiers, Pool Cleaners, etc.)
- **Vị trí:** `CategoryCard.tsx`
- **Kích hoạt:** Khi người dùng click vào danh mục

### 5. Trending Item Click Tracking
- **Sự kiện:** `trending_click`
- **Category:** `engagement`
- **Label:** Tên sản phẩm trending
- **Vị trí:** `TrendingPills.tsx`
- **Kích hoạt:** Khi người dùng click vào item trending

### 6. Product Click Tracking
- **Sự kiện:** `product_click`
- **Category:** `ecommerce`
- **Label:** Tên sản phẩm
- **Vị trí:** `ProductComparisonPage.tsx`, `CompareRow.tsx`
- **Kích hoạt:** Khi người dùng click vào sản phẩm trong comparison page

### 7. Related Product Click Tracking
- **Sự kiện:** `related_product_click`
- **Category:** `ecommerce`
- **Label:** Tên sản phẩm liên quan
- **Vị trí:** `ProductComparisonPage.tsx`
- **Kích hoạt:** Khi người dùng click vào sản phẩm liên quan

### 8. Product View via Slug
- **Sự kiện:** `product_view_via_slug`
- **Category:** `ecommerce`
- **Label:** Tên sản phẩm
- **Vị trí:** `[category]/[productSlug]/page.tsx`
- **Kích hoạt:** Khi người dùng xem sản phẩm thông qua slug URL

## 📝 **Sự kiện Form (Form Events)**

### 9. Newsletter Form Focus
- **Sự kiện:** `form_focus`
- **Category:** `engagement`
- **Label:** `newsletter_email`
- **Vị trí:** `NewsletterCTA.tsx`
- **Kích hoạt:** Khi người dùng focus vào input email

### 10. Newsletter Form Input
- **Sự kiện:** `form_input`
- **Category:** `engagement`
- **Label:** `newsletter_email`
- **Vị trí:** `NewsletterCTA.tsx`
- **Kích hoạt:** Khi người dùng nhập text vào input email

### 11. Newsletter Form Submit
- **Sự kiện:** `form_submit`
- **Category:** `engagement`
- **Label:** `newsletter_form`
- **Vị trí:** `NewsletterCTA.tsx`
- **Kích hoạt:** Khi người dùng submit form

### 12. Newsletter Form Error
- **Sự kiện:** `form_error`
- **Category:** `engagement`
- **Label:** `newsletter_form`
- **Vị trí:** `NewsletterCTA.tsx`
- **Kích hoạt:** Khi form gặp lỗi

### 13. Newsletter Signup Success
- **Sự kiện:** `sign_up`
- **Category:** `engagement`
- **Label:** Nguồn đăng ký (homepage, etc.)
- **Vị trí:** `NewsletterCTA.tsx`
- **Kích hoạt:** Khi đăng ký thành công

## 🎯 **Sự kiện Button (Button Events)**

### 14. Button Click Tracking
- **Sự kiện:** `button_click`
- **Category:** `engagement`
- **Label:** Tên button (newsletter_submit, etc.)
- **Vị trí:** Các component khác nhau
- **Kích hoạt:** Khi người dùng click button

## 📈 **Cách xem dữ liệu trong Google Analytics**

### 1. Realtime Reports
- **Đường dẫn:** Reports > Realtime > Overview
- **Mô tả:** Xem sự kiện đang xảy ra realtime

### 2. Events Report
- **Đường dẫn:** Reports > Engagement > Events
- **Mô tả:** Xem tất cả sự kiện đã xảy ra

### 3. Custom Reports
- **Đường dẫn:** Explore > Custom Report
- **Mô tả:** Tạo báo cáo tùy chỉnh cho từng loại sự kiện

## 🔧 **Tùy chỉnh thêm sự kiện**

### Thêm sự kiện mới:
```typescript
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const { trackEvent } = useGoogleAnalytics();

// Tracking sự kiện tùy chỉnh
trackEvent('custom_event', 'category', 'label', value);
```

### Ví dụ tracking download:
```typescript
const handleDownload = () => {
  trackEvent('file_download', 'engagement', 'product_guide');
};
```

### Ví dụ tracking video play:
```typescript
const handleVideoPlay = () => {
  trackEvent('video_start', 'engagement', 'product_demo');
};
```

## 📊 **Metrics quan trọng cần theo dõi**

### Engagement Metrics:
- **Session Duration:** Thời gian người dùng ở lại trang
- **Pages per Session:** Số trang người dùng xem mỗi phiên
- **Bounce Rate:** Tỷ lệ người dùng rời đi sau 1 trang
- **Scroll Depth:** Độ sâu cuộn trang trung bình

### Conversion Metrics:
- **Newsletter Signup Rate:** Tỷ lệ đăng ký newsletter
- **Search Usage:** Tần suất sử dụng tính năng tìm kiếm
- **Category Click Rate:** Tỷ lệ click vào danh mục
- **Product Click Rate:** Tỷ lệ click vào sản phẩm
- **Slug to Product Conversion:** Tỷ lệ chuyển đổi từ slug sang sản phẩm

## 🚀 **Tối ưu hóa dựa trên dữ liệu**

### 1. Content Optimization
- Xem sản phẩm nào được click nhiều nhất
- Tối ưu nội dung dựa trên từ khóa tìm kiếm phổ biến
- Phân tích hiệu quả của slug URLs

### 2. User Experience
- Cải thiện form dựa trên tỷ lệ completion
- Tối ưu navigation dựa trên hành vi click
- Cải thiện product discovery flow

### 3. Performance
- Theo dõi thời gian tải trang
- Tối ưu dựa trên bounce rate và session duration
- Đo lường hiệu quả của slug redirect system

## 🔗 **Slug System Flow**

### 1. User clicks product
- **Sự kiện:** `product_click`
- **URL:** Từ `/vitamin-d3-k2` → `/vitamin-d3-k2/micro-ingredients-vitamin-d3-10000-iu-plus-k2`

### 2. Slug page loads
- **Sự kiện:** `page_view` + `product_view_via_slug`
- **Hiển thị:** Loading spinner với thông tin slug

### 3. Auto-redirect
- **Thời gian:** Sau 1 giây
- **Đích:** URL thực tế của sản phẩm (Amazon, etc.)

### 4. Benefits
- **SEO:** Tạo URL thân thiện với search engine
- **Analytics:** Track được user journey chi tiết
- **UX:** User có thể bookmark và share slug URLs
