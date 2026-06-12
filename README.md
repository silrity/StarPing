# Đại Hồng Việt Tử Vi (ĐVTT) — Hệ thống Phân tích Chu kỳ Vận trình Cá nhân

> **Nguồn chân lý duy nhất (Single Source of Truth)** cho toàn bộ cấu trúc dự án StarPing. Tài liệu này điều hướng luồng phát triển cho cả Kỹ sư phần mềm (Con người) và các Trợ lý lập trình AI (Lovable, Claude Code).

---

## 1. TỔNG QUAN DỰ ÁN

**Đại Hồng Việt Tử Vi (ĐVTT)** là nền tảng SaaS phân tích mô hình chu kỳ cá nhân dựa trên hệ thống cổ học phương Đông (Tử Vi Đẩu Số). Hệ thống tự động xử lý dữ liệu đầu vào (Bát Tự), tính toán tinh bàn và gửi các tín hiệu phân tích hàng ngày (**Nhật Vận**) được cá nhân hóa sâu sắc cho từng người dùng thông qua kênh Zalo OA và Email.

> [!IMPORTANT]
> **DISCLAIMER PHÁP LÝ (BẮT BUỘC):**
> Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN (WORKSPACE STRUCTURE)

Dự án áp dụng mô hình kiến trúc hiện đại, tách biệt hoàn toàn tầng hiển thị (Frontend) và tầng xử lý lõi (Backend/Engine) nhằm bảo mật thuật toán tối đa:

```text
StarPing/
├── CLAUDE.md                # Hướng dẫn và quy tắc cốt lõi dành riêng cho AI (Claude Code)
├── README.md                # Tài liệu này (Bản đồ điều hướng tổng quan dự án)
│
├── src/                     # FRONTEND (Do Lovable quản lý và tạo mã nguồn)
│   ├── components/          # Các UI Components dùng chung (Button, Card, Tinh bàn UI...)
│   ├── pages/               # Các trang chính (Landing Page, Dashboard, Pricing, Auth)
│   └── styles/              # Cấu hình giao diện và Design System
│
├── supabase/                # BACKEND (Quản lý bởi Supabase CLI & Hệ thống Cơ sở dữ liệu)
│   ├── functions/           # Supabase Edge Functions (Chứa thuật toán lõi)
│   │   └── calculate-laso/  # API nhận Bát Tự -> Tính toán và trả về kết quả JSON 12 cung
│   └── migrations/          # Lưu trữ lịch sử thay đổi cấu trúc Database (SQL Migrations)
│
├── docs/                    # Hệ thống tài liệu đặc tả sản phẩm và vận hành (.md)
│   ├── 1_product/           # PRD (Product Requirement Documents) & Chiến lược MVP
│   ├── 2_domain_knowledge/  # Tài liệu tham khảo thuật toán (Ngũ Hành, Tinh Đẩu, Tứ Trụ)
│   └── 3_prompts/           # Bộ Master Prompts tối ưu cho Lovable và các AI Tools khác
│
├── package.json             # Quản lý các thư viện và dependencies của Frontend
└── supabaseClient.ts        # File cấu hình kết nối lớp Frontend với dịch vụ Supabase