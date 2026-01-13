# Hướng Dẫn Fix Lỗi Cache Vercel - Không Apply Data Mới

## Vấn Đề
Khi deploy lên Vercel, website không hiển thị data mới, vẫn hiển thị data cũ do cache.

## Giải Pháp Đã Áp Dụng

### 1. ✅ Cập Nhật `vercel.json`
Đã cập nhật cache headers:
- **HTML files**: `max-age=0, must-revalidate` - Không cache, luôn tải mới
- **JS/CSS files**: `max-age=31536000, immutable` - Cache lâu (có thể dùng versioning)
- **Images**: `max-age=31536000, immutable` - Cache lâu
- **Other files**: `max-age=300` - Cache 5 phút

### 2. 🔄 Các Bước Deploy Lại

#### Bước 1: Clear Cache Vercel
1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project của bạn
3. Vào tab **"Deployments"**
4. Tìm deployment mới nhất
5. Click **"..."** (3 chấm) → **"Redeploy"**
6. Chọn **"Use existing Build Cache"** = **OFF** (quan trọng!)
7. Click **"Redeploy"**

#### Bước 2: Force Redeploy từ Git
```bash
# Commit và push code mới
git add .
git commit -m "Fix: Update cache headers for Vercel"
git push origin main
```

#### Bước 3: Clear Browser Cache
Sau khi deploy xong:
- **Chrome/Edge**: `Ctrl + Shift + Delete` → Clear cached images and files
- **Firefox**: `Ctrl + Shift + Delete` → Clear cache
- Hoặc dùng **Incognito/Private mode** để test

#### Bước 4: Hard Refresh
- **Windows**: `Ctrl + F5` hoặc `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 3. 🛠️ Các Cách Khác Để Force Update

#### Option A: Thêm Query String Version
Thêm version vào URL khi test:
```
https://bichngoc-tantai-wedding.vercel.app/?v=2
https://bichngoc-tantai-wedding.vercel.app/?v=3
```

#### Option B: Thêm Timestamp (Trong Code)
Nếu vẫn bị cache, có thể thêm timestamp vào các file tĩnh:
```html
<link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>">
<script src="script.js?v=<?php echo time(); ?>"></script>
```

#### Option C: Disable Cache trong Vercel Settings
1. Vào Vercel Dashboard → Project Settings
2. Vào tab **"General"**
3. Tìm **"Build & Development Settings"**
4. Có thể tắt cache nếu cần

### 4. ✅ Kiểm Tra Deployment

#### Kiểm tra Headers
Sau khi deploy, kiểm tra headers:
```bash
# Dùng curl để xem headers
curl -I https://bichngoc-tantai-wedding.vercel.app/

# Hoặc dùng browser DevTools:
# F12 → Network tab → Reload → Click vào file → Headers tab
```

Bạn sẽ thấy:
```
Cache-Control: public, max-age=0, must-revalidate
```

#### Kiểm tra Content
1. Mở website trong **Incognito mode**
2. Xem source code: `Ctrl + U` (hoặc `Cmd + Option + U` trên Mac)
3. Kiểm tra xem content mới đã được apply chưa

### 5. 🔍 Debug Cache Issues

#### Kiểm tra Vercel Logs
1. Vào Vercel Dashboard → Project
2. Tab **"Deployments"** → Click vào deployment
3. Tab **"Logs"** để xem build logs
4. Kiểm tra xem có lỗi gì không

#### Kiểm tra Build Output
1. Vào deployment → Tab **"Source"**
2. Xem các files đã được deploy
3. Kiểm tra xem files mới có trong đó không

### 6. ⚠️ Lưu Ý Quan Trọng

1. **Vercel Cache**: Vercel có thể cache build output, nên cần **Redeploy với Build Cache OFF**
2. **CDN Cache**: Vercel dùng CDN, có thể mất vài phút để propagate
3. **Browser Cache**: Luôn test trong Incognito mode hoặc clear cache
4. **Service Worker**: Nếu có service worker, cần unregister nó

### 7. 🚀 Best Practices

#### Để Tránh Cache Issues:
1. **Versioning cho static assets**: Thêm version vào JS/CSS files
2. **Content-based hashing**: Dùng hash của content làm filename
3. **Cache busting**: Thêm query string hoặc timestamp

#### Ví dụ Versioning:
```html
<!-- Thay vì -->
<link rel="stylesheet" href="styles.css">

<!-- Dùng -->
<link rel="stylesheet" href="styles.css?v=1.0.1">
```

### 8. 📝 Checklist

Sau khi fix:
- [ ] Đã cập nhật `vercel.json` với cache headers mới
- [ ] Đã commit và push code
- [ ] Đã redeploy với Build Cache OFF
- [ ] Đã test trong Incognito mode
- [ ] Đã kiểm tra headers trong DevTools
- [ ] Đã verify content mới hiển thị đúng

---

## Nếu Vẫn Không Hoạt Động

1. **Kiểm tra Vercel Build Logs** - Xem có lỗi gì không
2. **Kiểm tra Git Commit** - Đảm bảo code mới đã được commit
3. **Contact Vercel Support** - Nếu vẫn không được

---

**Sau khi làm theo các bước trên, website sẽ hiển thị data mới ngay lập tức! 🎉**
