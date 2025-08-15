# DealPopup Component

## Mô tả
Component DealPopup là một popup hiển thị thông tin về deal/khuyến mãi sản phẩm với thiết kế responsive và hiệu ứng ribbon.

## Tính năng
- Responsive design cho mobile, tablet và desktop
- Hiệu ứng ribbon với discount badge
- Hình ảnh sản phẩm
- Nút đóng popup
- Link đến Amazon
- Thiết kế theo phong cách modern

## Cách sử dụng

### Import component
```tsx
import DealPopup from './components/DealPopup';
```

### Sử dụng cơ bản
```tsx
const [isOpen, setIsOpen] = useState(false);

const openPopup = () => setIsOpen(true);
const closePopup = () => setIsOpen(false);

<DealPopup 
  isOpen={isOpen} 
  onClose={closePopup} 
/>
```

### Props
- `isOpen: boolean` - Trạng thái hiển thị popup
- `onClose: () => void` - Function đóng popup

## CSS Classes

### Mobile (320px+)
- `.dealPopupContainer` - Container chính
- `.dealPopupOnLeaveContainer` - Background overlay
- `.popupCenterContainer` - Container trung tâm
- `.leftSidePopup` - Phần bên trái (tiêu đề và nút)
- `.rightSidePopup` - Phần bên phải (hình ảnh)
- `.ribbon` - Badge discount
- `.popUpImgContainer` - Container hình ảnh

### Desktop (992px+)
- Responsive layout với flexbox
- Kích thước cố định 700x450px
- Layout 2 cột với arrow effect

## Responsive Breakpoints
- **Mobile**: 320px - 599px
- **Tablet**: 600px - 991px  
- **Desktop**: 992px+

## Demo
Sử dụng `DealPopupDemo.tsx` để test component:
```tsx
import DealPopupDemo from './components/DealPopupDemo';
```

## Tùy chỉnh
Để tùy chỉnh style, chỉnh sửa file `DealPopup.module.css`:
- Thay đổi màu sắc
- Điều chỉnh kích thước
- Thay đổi font chữ
- Tùy chỉnh animation
