# Thiệp Mời Đám Cưới Online - Minh & Linh

Một trang web thiệp mời đám cưới đẹp mắt, lãng mạn với đầy đủ tính năng để mời bạn bè và người thân tham dự ngày trọng đại.

## Tính Năng

- ✨ **Giao diện đẹp mắt**: Thiết kế hiện đại với màu sắc tươi tắn, lãng mạn
- 📸 **Album ảnh**: Hiển thị 10+ ảnh cưới với lightbox gallery
- 💕 **Câu chuyện tình yêu**: Timeline đẹp mắt kể về hành trình yêu của đôi bạn
- ⏰ **Đếm ngược**: Countdown timer đến ngày cưới
- 📧 **Gửi email**: Tính năng gửi thiệp mời qua email
- 📝 **RSVP**: Form xác nhận tham dự
- 📱 **Responsive**: Tối ưu cho mọi thiết bị

## Hướng Dẫn Sử Dụng

### 1. Cấu Hình Thông Tin Cơ Bản

Chỉnh sửa file `index.html` để thay đổi:
- Tên cô dâu và chú rể
- Ngày cưới
- Địa điểm và thời gian
- Thông tin liên hệ

### 2. Thêm Ảnh

Thay thế các placeholder images bằng ảnh thật của bạn:
- Hero background: `.hero-bg`
- Ảnh cô dâu/chú rể: `.couple-image img`
- Timeline images: `.timeline-image img`
- Gallery images: `.gallery-item img`

### 3. Cấu Hình Email

#### Cách 1: Sử dụng EmailJS (Khuyến nghị)

1. Đăng ký tài khoản tại [EmailJS](https://www.emailjs.com/)
2. Tạo một Email Service (Gmail, Outlook, etc.)
3. Tạo Email Template với các biến:
   - `{{to_email}}` - Email người nhận
   - `{{from_name}}` - Tên người gửi
   - `{{subject}}` - Tiêu đề email
   - `{{message}}` - Nội dung email
   - `{{wedding_url}}` - Link trang thiệp mời

4. Lấy Service ID, Template ID và Public Key
5. Mở file `script.js` và cập nhật:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY')
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {...})
   ```

6. Uncomment dòng EmailJS SDK trong `index.html`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

#### Cách 2: Sử dụng Backend Service

1. Tạo một API endpoint để gửi email (Node.js, Python, etc.)
2. Cập nhật function `simulateEmailSending` trong `script.js` để gọi API thực tế
3. Đảm bảo backend xử lý việc gửi email an toàn

#### Cách 3: Sử dụng Gmail App Password

1. Bật 2-Step Verification cho Gmail
2. Tạo App Password tại [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Nhập App Password vào form cấu hình email
4. **Lưu ý**: Cách này chỉ hoạt động với backend, không thể gửi trực tiếp từ browser

### 4. Deploy Website

#### Deploy lên Netlify/Vercel:

1. Push code lên GitHub
2. Kết nối repository với Netlify hoặc Vercel
3. Deploy tự động

#### Deploy lên GitHub Pages (Tự động với GitHub Actions):

1. **Bật GitHub Pages trong repository settings:**
   - Vào Settings > Pages
   - Source: chọn "GitHub Actions"

2. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Workflow sẽ tự động chạy:**
   - Mỗi khi push code lên branch `main` hoặc `master`
   - Website sẽ tự động được deploy lên GitHub Pages
   - URL sẽ có dạng: `https://[username].github.io/[repository-name]`

4. **Kiểm tra deployment:**
   - Vào tab "Actions" trong repository để xem trạng thái deployment
   - Sau khi thành công, website sẽ có sẵn trên GitHub Pages

**Lưu ý:** File `.github/workflows/deploy.yml` đã được tạo sẵn để tự động deploy.

## Tùy Chỉnh Màu Sắc

Chỉnh sửa các biến CSS trong `styles.css`:

```css
:root {
  --color-primary: #e91e63;        /* Màu hồng chính */
  --color-secondary: #9c27b0;      /* Màu tím */
  --color-accent: #ffc107;          /* Màu vàng nhạt */
  /* ... */
}
```

## Cấu Trúc File

```
├── index.html          # File HTML chính
├── styles.css          # File CSS styling
├── script.js           # File JavaScript
├── package.json        # Dependencies (nếu cần)
└── README.md           # Hướng dẫn này



```

## Lưu Ý Bảo Mật

- ⚠️ **KHÔNG** lưu email password trực tiếp trong code
- ⚠️ Sử dụng environment variables cho sensitive data
- ⚠️ Sử dụng backend service để gửi email thay vì expose credentials

## Hỗ Trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.

## License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

Chúc bạn có một đám cưới tuyệt vời! 💕
# wedding
