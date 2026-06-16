# Email Templates — Đại Hồng Việt Tử Vi

> File này dùng để review nội dung email trước khi paste vào Supabase Dashboard.
> Sau khi chốt nội dung, paste phần HTML tương ứng vào:
> **Supabase Dashboard → Authentication → Email Templates**

---

## 1. XÁC NHẬN ĐĂNG KÝ (Confirm Signup)

*Gửi ngay sau khi khách hoàn thành form đăng ký. Link có hiệu lực 24 giờ.*

---

### Tiêu đề email (Subject)

```
[Đại Hồng Việt Tử Vi] Xác nhận tài khoản của bạn
```

---

### Nội dung

**Dòng mở đầu**
```
Cảm ơn bạn đã đăng ký Đại Hồng Việt Tử Vi.
```

**Đoạn thân**
```
Để kích hoạt tài khoản và bắt đầu nhận phân tích chu kỳ vận trình hàng ngày,
vui lòng xác nhận địa chỉ email của bạn bằng cách nhấn vào nút bên dưới.
```

**Nút CTA**
```
Xác Nhận Email
```

**Ghi chú bên dưới nút**
```
Link có hiệu lực trong 24 giờ.
Sau khi xác nhận, bạn sẽ nhận bản luận đoán Nhật Vận đầu tiên vào 07:00 sáng ngày mai.
```

**Trường hợp không đăng ký**
```
Nếu bạn không thực hiện đăng ký này, hãy bỏ qua email. Tài khoản sẽ không được kích hoạt.
```

**Footer / Disclaimer**
```
Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học.
Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính.

Đại Hồng Việt Tử Vi
```

---

### HTML để paste vào Supabase Dashboard

> Supabase Dashboard → Authentication → Email Templates → **Confirm signup**
> Biến `{{ .ConfirmationURL }}` do Supabase tự điền vào link xác nhận.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:24px 16px; background:#0a1420; font-family:Arial, sans-serif;">

  <div style="max-width:520px; margin:0 auto; background:#0F1B2D; border-radius:8px; border:1px solid rgba(201,162,39,0.15); overflow:hidden;">

    <!-- Header -->
    <div style="padding:28px 32px 20px; border-bottom:1px solid rgba(201,162,39,0.15);">
      <p style="margin:0 0 4px; font-size:11px; color:#5A7A9A; letter-spacing:2px; text-transform:uppercase;">
        Đại Hồng Việt Tử Vi
      </p>
      <h1 style="margin:0; font-size:20px; font-weight:700; color:#C9A227;">
        Xác nhận tài khoản
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">

      <p style="margin:0 0 16px; font-size:14px; line-height:1.8; color:#D4D0C8;">
        Cảm ơn bạn đã đăng ký <strong style="color:#F4F1EC;">Đại Hồng Việt Tử Vi</strong>.
      </p>

      <p style="margin:0 0 28px; font-size:14px; line-height:1.8; color:#D4D0C8;">
        Để kích hoạt tài khoản và bắt đầu nhận phân tích chu kỳ vận trình hàng ngày,
        vui lòng xác nhận địa chỉ email của bạn:
      </p>

      <!-- CTA Button -->
      <div style="text-align:center; margin:0 0 28px;">
        <a href="{{ .ConfirmationURL }}"
           style="display:inline-block; background:#C9A227; color:#0F1B2D;
                  padding:14px 40px; border-radius:6px; font-size:15px;
                  font-weight:700; text-decoration:none; letter-spacing:0.3px;">
          Xác Nhận Email
        </a>
      </div>

      <p style="margin:0 0 16px; font-size:13px; line-height:1.7; color:#7A8FA5;">
        Link có hiệu lực trong <strong style="color:#9AA8B5;">24 giờ</strong>.<br>
        Sau khi xác nhận, bạn sẽ nhận bản luận đoán Nhật Vận đầu tiên vào
        <strong style="color:#9AA8B5;">07:00 sáng ngày mai</strong>.
      </p>

      <p style="margin:0; font-size:12px; line-height:1.7; color:#5A7A9A;">
        Nếu bạn không thực hiện đăng ký này, hãy bỏ qua email. Tài khoản sẽ không được kích hoạt.
      </p>

    </div>

    <!-- Footer -->
    <div style="padding:16px 32px 24px; border-top:1px solid rgba(244,241,236,0.07);">
      <p style="margin:0; font-size:11px; line-height:1.8; color:#5A7A9A;">
        Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống
        phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế,
        hoặc tài chính.<br>
        <strong style="color:#C9A227;">Đại Hồng Việt Tử Vi</strong>
      </p>
    </div>

  </div>

</body>
</html>
```

---

## 2. ĐẶT LẠI MẬT KHẨU (Reset Password)

*Chưa customize — đang dùng Supabase default template.*
*Sẽ bổ sung sau khi template #1 được duyệt.*

---

## 3. NHẬT VẬN HÀNG NGÀY (Daily Notification)

*Template này do Edge Function `send-nhat-van` tự build — xem `supabase/functions/send-nhat-van/index.ts`.*
*Nội dung ngày cụ thể nhập qua IOT CMS → bảng `nhat_van_content`.*

---

> **Quy trình duyệt:**
> 1. Anh review nội dung tiếng Việt trong file này
> 2. Chỉnh sửa copy trực tiếp tại đây nếu cần
> 3. Khi chốt → paste HTML vào Supabase Dashboard
> 4. Test bằng cách đăng ký 1 tài khoản mới với email thật
