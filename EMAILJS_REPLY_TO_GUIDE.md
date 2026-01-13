# Hướng Dẫn Cấu Hình Reply To trong EmailJS

## Reply To là gì?

**Reply To** là địa chỉ email sẽ nhận được khi người nhận email click nút **"Reply"** hoặc **"Reply All"** trong email client của họ.

## Cấu Hình Reply To

### 1. RSVP Notification Template (Email gửi cho bạn)

**Mục đích:** Khi bạn nhận được email RSVP và muốn reply, email sẽ gửi trực tiếp cho khách mời.

**Cấu hình trong EmailJS Template:**
- **Reply To**: `{{reply_to}}`

**Giá trị trong script.js (dòng 193):**
```javascript
reply_to: data.email || RECIPIENT_EMAIL
```

**Giải thích:**
- Nếu khách mời có email → Reply To = email của khách mời
- Nếu khách mời không có email → Reply To = email của bạn (fallback)

**Ví dụ:**
- Khách mời: `nguyenvana@gmail.com`
- Khi bạn click "Reply" → Email sẽ gửi đến `nguyenvana@gmail.com`

---

### 2. Auto-Reply Template (Email gửi cho khách mời)

**Mục đích:** Khi khách mời nhận được email xác nhận và muốn reply, email sẽ gửi về cho bạn.

**Cấu hình trong EmailJS Template:**
- **Reply To**: `{{reply_to}}` hoặc email của bạn trực tiếp

**Giá trị trong script.js (dòng 218):**
```javascript
reply_to: RECIPIENT_EMAIL
```

**Giải thích:**
- Reply To luôn = email của bạn
- Khi khách mời click "Reply" → Email sẽ gửi về email của bạn

**Ví dụ:**
- Email của bạn: `bichngoc@example.com`
- Khi khách mời click "Reply" → Email sẽ gửi về `bichngoc@example.com`

---

## Cách Kiểm Tra Reply To Hoạt Động

### Trong EmailJS Dashboard:

1. Vào **Email Templates**
2. Chọn template bạn muốn kiểm tra
3. Xem phần **Template Settings**
4. Đảm bảo **Reply To** được set đúng:
   - RSVP Notification: `{{reply_to}}`
   - Auto-Reply: `{{reply_to}}` hoặc email của bạn

### Test Thực Tế:

1. **Test RSVP Notification:**
   - Submit form RSVP với email của bạn
   - Kiểm tra email nhận được
   - Click "Reply" → Xem email "To" có phải email khách mời không

2. **Test Auto-Reply:**
   - Submit form RSVP với email của bạn
   - Kiểm tra email auto-reply nhận được
   - Click "Reply" → Xem email "To" có phải email của bạn không

---

## Lưu Ý Quan Trọng

### ⚠️ Reply To vs From Email

- **From Email**: Email hiển thị là người gửi (có thể là email service của EmailJS)
- **Reply To**: Email thực sự nhận được khi reply (quan trọng hơn!)

### ⚠️ Email Service Limitations

Một số email service (như Gmail) có thể:
- Hiển thị cả "From" và "Reply-To" trong email header
- Ưu tiên "Reply To" khi click Reply
- Có thể hiển thị cảnh báo nếu From và Reply To khác nhau

### ⚠️ Best Practice

1. **RSVP Notification:**
   - Reply To = Email khách mời → Để bạn có thể reply trực tiếp
   - Fallback = Email của bạn nếu khách mời không có email

2. **Auto-Reply:**
   - Reply To = Email của bạn → Để khách mời có thể reply cho bạn
   - Luôn set về email của bạn để đảm bảo nhận được reply

---

## Troubleshooting

### Vấn đề: Reply không gửi đúng địa chỉ

**Nguyên nhân:**
- Reply To không được set trong EmailJS template
- Giá trị `{{reply_to}}` không đúng trong script.js

**Giải pháp:**
1. Kiểm tra EmailJS Template Settings → Reply To
2. Kiểm tra script.js → `reply_to` trong `templateParams`
3. Đảm bảo biến `{{reply_to}}` được set trong template

### Vấn đề: Reply gửi về email service thay vì email thực

**Nguyên nhân:**
- From Email là email của EmailJS service
- Reply To không được set hoặc không đúng

**Giải pháp:**
- Luôn set Reply To rõ ràng trong template
- Không để Reply To trống

---

## Ví Dụ Cấu Hình

### RSVP Notification Template:

```
To Email: {{to_email}}
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}  ← QUAN TRỌNG!
Subject: {{subject}}
```

### Auto-Reply Template:

```
To Email: {{to_email}}
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}  ← QUAN TRỌNG! (hoặc email của bạn trực tiếp)
Subject: {{subject}}
```

---

**Chúc bạn cấu hình thành công! 💕**
