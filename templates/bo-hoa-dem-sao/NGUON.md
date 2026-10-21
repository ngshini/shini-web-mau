# Nguồn gốc mẫu: Bó hoa đêm sao

- Repo: FIQTOR/flowers-for-someone — https://github.com/FIQTOR/flowers-for-someone
- Demo gốc: https://fiqtor.github.io/flowers-for-someone/
- Commit đã lấy: d1ac07eca9a4beff3274fdf2f45608fda737a996 (08/10/2026)
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2026 FIQTOR.
- Công nghệ: HTML/CSS/JavaScript thuần, không dependency ngoài.

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi", dịch toàn bộ chữ hiển thị (nút "Mở quà", tiêu đề trang).
- Tiêu đề trang mở đầu, lời chúc gõ chữ, người nhận/người gửi, lời chúc đầy đủ: lấy từ cấu hình người dùng (assets/cau-hinh.js), mặc định là nội dung tiếng Việt mẫu.
- Thêm tấm thiệp chúc dưới bó hoa (bản gốc không có) để hiển thị lời chúc đầy đủ.
- Viết lại js/index.js và js/main.js: dùng textContent thay cho innerHTML khi chèn chữ người dùng (chống XSS), giữ nguyên hiệu ứng gõ chữ và hoa nở.
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
- Mẫu không có vị trí ảnh → trình chỉnh sửa ẩn phần tải ảnh.
