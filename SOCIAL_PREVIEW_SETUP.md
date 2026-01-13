# Hướng Dẫn Cấu Hình Social Media Preview

## Đã Thêm Meta Tags

Tôi đã thêm các meta tags sau vào `index.html` và `index-en.html`:

### ✅ Open Graph Tags (Facebook, LinkedIn, WhatsApp)
- `og:title` - Tiêu đề khi share
- `og:description` - Mô tả khi share
- `og:image` - Hình ảnh preview
- `og:url` - URL của trang
- `og:type` - Loại nội dung (website)

### ✅ Twitter Card Tags
- `twitter:card` - Loại card (summary_large_image)
- `twitter:title` - Tiêu đề
- `twitter:description` - Mô tả
- `twitter:image` - Hình ảnh preview

## Cần Cập Nhật

### Bước 1: Thay URL Vercel

Mở file `index.html` và `index-en.html`, tìm và thay thế:

```html
<!-- Tìm dòng này: -->
<meta property="og:url" content="https://your-vercel-url.vercel.app/">

<!-- Thay bằng URL Vercel thực tế của bạn: -->
<meta property="og:url" content="https://wedding-bichngoc-tantai.vercel.app/">
```

**Các dòng cần thay:**
- `og:url` (2 chỗ: index.html và index-en.html)
- `twitter:url` (2 chỗ)
- `og:image` (2 chỗ) - URL đầy đủ đến hình ảnh
- `twitter:image` (2 chỗ) - URL đầy đủ đến hình ảnh

### Bước 2: Cập Nhật Hình Ảnh Preview

Hiện tại đang dùng: `/images/v2.jpg`

**Khuyến nghị:**
- Tạo một hình ảnh preview đẹp (1200x630px)
- Hoặc dùng một trong các hình ảnh đám cưới đẹp nhất
- Đảm bảo hình ảnh có kích thước tối thiểu 1200x630px

**Ví dụ:**
```html
<meta property="og:image" content="https://wedding-bichngoc-tantai.vercel.app/images/v2.jpg">
```

### Bước 3: Test Preview

Sau khi deploy, test preview bằng các công cụ:

1. **Facebook Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Paste URL và click "Debug"
   - Click "Scrape Again" để refresh cache

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Paste URL để xem preview

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/
   - Paste URL để xem preview

## Tùy Chỉnh Nội Dung

### Thay Đổi Title & Description

Trong `index.html`:
```html
<meta property="og:title" content="Thiệp Mời Đám Cưới - Bích Ngọc & Tấn Tài">
<meta property="og:description" content="Chúng mình rất vui mừng được mời bạn đến tham dự lễ cưới của chúng mình vào ngày 24.01.2026. Hãy gửi lời chúc và xác nhận tham dự nhé! 💕">
```

Trong `index-en.html`:
```html
<meta property="og:title" content="Wedding Invitation - Bích Ngọc & Tấn Tài">
<meta property="og:description" content="We are delighted to invite you to our wedding ceremony on January 24, 2026. Please send your wishes and confirm your attendance! 💕">
```

## Lưu Ý Quan Trọng

1. **URL phải là absolute URL** (có https://)
2. **Hình ảnh phải là absolute URL** (có https://)
3. **Kích thước hình ảnh khuyến nghị:** 1200x630px
4. **Sau khi thay đổi:** Cần clear cache trên Facebook/Twitter để thấy preview mới

## Checklist

- [ ] Thay `your-vercel-url.vercel.app` bằng URL Vercel thực tế
- [ ] Kiểm tra hình ảnh preview có tồn tại không
- [ ] Test preview trên Facebook Debugger
- [ ] Test preview trên Twitter Card Validator
- [ ] Deploy lại lên Vercel
- [ ] Test share link trên Facebook/WhatsApp/Twitter

---

**Sau khi cập nhật URL và deploy lại, preview sẽ hiển thị đẹp khi share link! 💕**
