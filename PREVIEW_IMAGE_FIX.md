# Fix: Link Preview Không Hiển Thị Hình

## Nguyên Nhân Có Thể

1. **Hình ảnh không thể truy cập công khai**
2. **Kích thước hình ảnh không đúng** (Facebook yêu cầu tối thiểu 200x200px, khuyến nghị 1200x630px)
3. **Facebook/Messenger cache cũ**
4. **URL hình ảnh không đúng**
5. **Content-Type header không đúng**

## Các Bước Kiểm Tra & Fix

### Bước 1: Kiểm Tra Hình Ảnh Có Truy Cập Được Không

Mở trình duyệt và truy cập trực tiếp:
```
https://bichngoc-tantai-wedding.vercel.app/images/preview.jpg
```

**Nếu không mở được:**
- Kiểm tra file `preview.jpg` có tồn tại trong thư mục `images/` không
- Kiểm tra tên file có đúng không (phân biệt chữ hoa/thường)
- Đảm bảo file đã được commit và push lên Git

### Bước 2: Kiểm Tra Kích Thước Hình Ảnh

Facebook yêu cầu:
- **Tối thiểu**: 200x200px
- **Khuyến nghị**: 1200x630px (tỷ lệ 1.91:1)
- **Tối đa**: 8MB

**Cách kiểm tra:**
1. Mở file `images/preview.jpg` trong image viewer
2. Xem properties → Dimensions
3. Nếu không đúng, resize lại hình ảnh

**Công cụ resize:**
- Online: https://www.iloveimg.com/resize-image
- Hoặc dùng Photoshop/GIMP

### Bước 3: Clear Facebook Cache

1. **Facebook Sharing Debugger:**
   - Vào: https://developers.facebook.com/tools/debug/
   - Paste URL: `https://bichngoc-tantai-wedding.vercel.app/`
   - Click **"Debug"**
   - Click **"Scrape Again"** (có thể cần click nhiều lần)
   - Kiểm tra phần **"Image"** xem có hiển thị không

2. **Kiểm tra lỗi:**
   - Nếu thấy lỗi: "Image URL is not accessible"
   - → Hình ảnh không thể truy cập công khai
   - → Cần kiểm tra URL và permissions

### Bước 4: Kiểm Tra Meta Tags

Đảm bảo các meta tags sau có trong `<head>`:

```html
<!-- Bắt buộc -->
<meta property="og:image" content="https://bichngoc-tantai-wedding.vercel.app/images/preview.jpg">
<meta property="og:image:secure_url" content="https://bichngoc-tantai-wedding.vercel.app/images/preview.jpg">
<meta property="og:image:type" content="image/jpeg">

<!-- Khuyến nghị -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Thiệp Mời Đám Cưới - Bích Ngọc & Tấn Tài">
```

### Bước 5: Kiểm Tra URL Hình Ảnh

**Yêu cầu:**
- ✅ Phải là **absolute URL** (có https://)
- ✅ Phải **publicly accessible** (không cần login)
- ✅ Phải có **Content-Type đúng** (image/jpeg, image/png, etc.)
- ✅ Không được redirect (301/302)

**Test URL:**
```bash
# Kiểm tra headers
curl -I https://bichngoc-tantai-wedding.vercel.app/images/preview.jpg

# Kết quả mong đợi:
# HTTP/2 200
# content-type: image/jpeg
# content-length: [số bytes]
```

### Bước 6: Thử Dùng Hình Ảnh Khác

Nếu `preview.jpg` không hoạt động, thử dùng một trong các hình ảnh khác:
- `v2.jpg`
- `v4.jpg`
- `v6.jpg`

**Cập nhật trong `index.html` và `index-en.html`:**
```html
<meta property="og:image" content="https://bichngoc-tantai-wedding.vercel.app/images/v4.jpg">
```

### Bước 7: Kiểm Tra Vercel Deployment

1. Vào Vercel Dashboard
2. Kiểm tra xem file `preview.jpg` có trong deployment không
3. Xem Build Logs xem có lỗi gì không

## Giải Pháp Nhanh

### Option 1: Dùng Hình Ảnh Đã Có Sẵn

Nếu `preview.jpg` không hoạt động, dùng `v4.jpg` (đã được test trước đó):

```html
<!-- Thay đổi trong index.html và index-en.html -->
<meta property="og:image" content="https://bichngoc-tantai-wedding.vercel.app/images/v4.jpg">
<meta property="og:image:secure_url" content="https://bichngoc-tantai-wedding.vercel.app/images/v4.jpg">
<meta name="twitter:image" content="https://bichngoc-tantai-wedding.vercel.app/images/v4.jpg">
```

### Option 2: Tạo Hình Ảnh Preview Mới

1. Chọn một hình ảnh đẹp từ album
2. Resize về **1200x630px**
3. Save với tên `og-image.jpg` hoặc `preview.jpg`
4. Đảm bảo file size < 8MB
5. Upload vào thư mục `images/`
6. Cập nhật meta tags

### Option 3: Dùng Online Image Hosting

Nếu Vercel không serve image đúng cách:
1. Upload hình ảnh lên:
   - Imgur
   - Cloudinary
   - ImageKit
2. Copy URL
3. Cập nhật meta tags với URL mới

## Debug Checklist

- [ ] Hình ảnh có thể mở được trực tiếp từ URL
- [ ] Kích thước hình ảnh đúng (1200x630px)
- [ ] File size < 8MB
- [ ] Meta tags đúng format
- [ ] URL là absolute URL (https://)
- [ ] Đã clear Facebook cache
- [ ] Đã redeploy Vercel
- [ ] Đã test trong Facebook Debugger

## Test Sau Khi Fix

1. **Facebook Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Paste URL → Debug → Scrape Again
   - Kiểm tra phần "Image" có hiển thị không

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Paste URL → Xem preview

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/
   - Paste URL → Xem preview

4. **Test Thực Tế:**
   - Share link trên Facebook
   - Share link trên Messenger
   - Share link trên WhatsApp
   - Kiểm tra preview có hiển thị không

---

## Nếu Vẫn Không Hoạt Động

1. Kiểm tra Vercel logs xem có lỗi gì không
2. Thử dùng một hình ảnh khác từ album
3. Kiểm tra xem có CORS issues không
4. Contact Vercel support nếu cần
