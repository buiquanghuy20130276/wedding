# Hướng Dẫn Xem Preview Image Ở Local

## Cách 1: Sử dụng file `preview-test.html` (Đơn giản nhất)

1. **Mở file `preview-test.html`** trong trình duyệt
2. **Đảm bảo bạn đang chạy local server:**
   - Nếu dùng VS Code: Cài extension "Live Server" và click "Go Live"
   - Hoặc dùng Python: `python -m http.server 8000` trong thư mục project
   - Hoặc dùng Node.js: `npx http-server` hoặc `npx serve`

3. **Mở:** `http://localhost:8000/preview-test.html` (hoặc port bạn đang dùng)

File này sẽ tự động đọc meta tags từ `index.html` và hiển thị preview giống Facebook/Messenger.

---

## Cách 2: Sử dụng ngrok để tạo public URL tạm thời

1. **Cài đặt ngrok:**
   ```bash
   # Windows: Download từ https://ngrok.com/download
   # Hoặc dùng Chocolatey: choco install ngrok
   ```

2. **Chạy local server:**
   ```bash
   # Ví dụ với Python
   python -m http.server 8000
   ```

3. **Chạy ngrok:**
   ```bash
   ngrok http 8000
   ```

4. **Copy URL từ ngrok** (ví dụ: `https://abc123.ngrok.io`)

5. **Test trên Facebook Debugger:**
   - Vào: https://developers.facebook.com/tools/debug/
   - Paste URL: `https://abc123.ngrok.io/`
   - Click "Debug"

6. **Test trên Messenger:**
   - Gửi link `https://abc123.ngrok.io/` trong Messenger
   - Xem preview

---

## Cách 3: Sử dụng Browser Extension

### Chrome/Edge:
- **Open Graph Preview**: Extension để xem OG tags
- **Meta Tags Inspector**: Kiểm tra meta tags

### Firefox:
- **Open Graph Preview**: Tương tự Chrome

---

## Cách 4: Kiểm tra bằng Developer Tools

1. **Mở `index.html` trong trình duyệt**
2. **Mở Developer Tools** (F12)
3. **Vào tab "Elements"**
4. **Tìm trong `<head>`** các thẻ `<meta property="og:...">`
5. **Kiểm tra giá trị** của các thuộc tính `content`

---

## Cách 5: Sử dụng công cụ online (cần URL public)

Sau khi có URL public (từ ngrok hoặc deploy):

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Open Graph Preview**: https://www.opengraph.xyz/

---

## Lưu ý:

⚠️ **Messenger cache rất lâu** (có thể 24-48 giờ), nên nếu test ở local với ngrok, có thể không thấy preview ngay trên Messenger.

✅ **Facebook Debugger** sẽ hiển thị preview ngay lập tức.

✅ **File `preview-test.html`** cho phép bạn xem preview ngay ở local mà không cần URL public.
