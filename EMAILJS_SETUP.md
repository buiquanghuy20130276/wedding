# Hướng Dẫn Cấu Hình EmailJS cho RSVP Form

## Bước 1: Đăng ký tài khoản EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/)
2. Đăng ký tài khoản miễn phí (cho phép 200 email/tháng)
3. Xác nhận email của bạn

## Bước 2: Tạo Email Service

1. Vào **Email Services** trong dashboard
2. Click **Add New Service**
3. Chọn nhà cung cấp email của bạn (Gmail, Outlook, Yahoo, etc.)
4. Làm theo hướng dẫn để kết nối tài khoản email
5. **Lưu lại Service ID** (ví dụ: `service_abc123`)

## Bước 3: Tạo Email Template

1. Vào **Email Templates** trong dashboard
2. Click **Create New Template**
3. Đặt tên template: "Wedding RSVP"
4. Thiết lập template như sau:

### Template Settings:
- **To Email**: `{{to_email}}` (sẽ được thay thế bằng email của bạn)
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Reply To**: `{{reply_to}}` ⚠️ **QUAN TRỌNG**: Đây là email sẽ nhận khi người nhận click "Reply"
  - Cho RSVP Notification: `{{reply_to}}` = email của khách mời (để bạn có thể reply trực tiếp cho họ)
  - Cho Auto-Reply: `{{reply_to}}` = email của bạn (để khách mời có thể reply cho bạn)
- **Subject**: `{{subject}}`

### Email Template Content:

**Cách 1: Sử dụng HTML Template (Khuyến nghị - Đẹp hơn)**

1. Mở file `EMAILJS_TEMPLATE.html` trong project
2. Copy toàn bộ nội dung HTML
3. Trong EmailJS Template editor, chọn tab **"Code"** (thay vì "Visual")
4. Paste HTML code vào
5. Lưu template

**Cách 2: Sử dụng Plain Text (Đơn giản)**

```
Subject: {{subject}}

Xin chào Bích Ngọc & Tấn Tài! 💕

Bạn có một RSVP mới từ đám cưới của bạn:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 THÔNG TIN KHÁCH MỜI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Họ và tên: {{name}}
Số điện thoại: {{phone}}
Email: {{email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💒 XÁC NHẬN THAM DỰ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tham dự: {{attendance}}
Số khách đi cùng: {{guests}} người

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💝 LỜI CHÚC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ngày đám cưới: {{wedding_date}}
Cô dâu & Chú rể: {{couple_names}}

Chúc mừng! 🎉
```

**Lưu ý:** 
- File `EMAILJS_TEMPLATE.html` có design đẹp với gradient, cards, và responsive
- File `EMAILJS_TEMPLATE_EN.html` là phiên bản tiếng Anh
- Chọn một trong hai tùy theo ngôn ngữ bạn muốn

5. **Lưu lại Template ID** (ví dụ: `template_xyz789`)

### Tạo Template Auto-Reply (Gửi cho khách mời)

1. Tạo một template mới với tên "Wedding RSVP Auto-Reply"
2. Mở file `EMAILJS_TEMPLATE_AUTO_REPLY.html` (hoặc `EMAILJS_TEMPLATE_AUTO_REPLY_EN.html` cho tiếng Anh)
3. Copy toàn bộ HTML và paste vào EmailJS template editor (tab "Code")
4. Thiết lập:
   - **To Email**: `{{to_email}}` (sẽ là email của khách mời)
   - **From Name**: `{{from_name}}` (Bích Ngọc & Tấn Tài)
   - **From Email**: Email của bạn
   - **Reply To**: Email của bạn
   - **Subject**: `{{subject}}`
5. **Lưu lại Auto-Reply Template ID** (ví dụ: `template_abc456`)

## Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Tìm **Public Key** trong phần API Keys
3. **Copy Public Key** (ví dụ: `abcdefghijklmnop`)

## Bước 5: Cập nhật Code

Mở file `script.js` và tìm phần RSVP Form Submission (khoảng dòng 150-250).

Cập nhật các giá trị sau:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // Thay bằng Service ID của bạn
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // Thay bằng Template ID của bạn
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Thay bằng Public Key của bạn
const RECIPIENT_EMAIL = 'your-email@example.com' // Thay bằng email của bạn
```

Ví dụ:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_xyz789' // Template cho email thông báo RSVP (gửi cho bạn)
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = 'template_abc456' // Template cho auto-reply (gửi cho khách mời)
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop'
const RECIPIENT_EMAIL = 'bichngoc@example.com'
```

**Lưu ý:** 
- `EMAILJS_TEMPLATE_ID`: Template gửi email thông báo RSVP cho bạn (cô dâu & chú rể)
- `EMAILJS_AUTO_REPLY_TEMPLATE_ID`: Template gửi email auto-reply cho khách mời (xác nhận đã nhận RSVP)

## Bước 6: Khởi tạo EmailJS (Tùy chọn)

Nếu bạn muốn khởi tạo EmailJS sớm hơn, thêm vào đầu file `script.js`:

```javascript
// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init('YOUR_PUBLIC_KEY') // Thay bằng Public Key của bạn
}
```

## Bước 7: Test

1. Mở website của bạn
2. Điền form RSVP
3. Submit form
4. Kiểm tra email của bạn để xem RSVP mới

## Lưu Ý

- ⚠️ **KHÔNG** commit Public Key vào Git nếu repository là public
- ⚠️ EmailJS miễn phí cho phép 200 email/tháng
- ⚠️ Nếu cần nhiều hơn, có thể nâng cấp lên gói trả phí
- ✅ Public Key an toàn để sử dụng ở client-side
- ✅ EmailJS tự động xử lý spam và bảo mật

## Troubleshooting

### Email không được gửi?
1. Kiểm tra console browser để xem lỗi
2. Kiểm tra EmailJS dashboard > Logs để xem chi tiết
3. Đảm bảo Service ID, Template ID, và Public Key đúng
4. Kiểm tra email service đã được kết nối đúng chưa

### Template variables không hoạt động?
- Đảm bảo tên biến trong template khớp với `templateParams` trong code
- Sử dụng cú pháp `{{variable_name}}` trong template

### Cần hỗ trợ?
- Xem documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Hoặc liên hệ support của EmailJS

---

**Chúc bạn thành công! 💕**
