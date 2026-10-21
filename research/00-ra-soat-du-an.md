# Rà soát dự án hiện tại — trước khi tích hợp (21/10/2026)

## Hiện trạng
- Chưa có dự án "bán website mẫu" hợp nhất. Các mẫu đang chạy nằm rời rạc:
  - `~/workspace/flowers-20-10-*` — web quà tặng vườn hoa (clone từ IdeaToCodee/flowers-20-10).
  - `~/workspace/ts-spaces/vi-c-l-m-ph-th-ng-ng-vi-c-nh-n-vi-c` — web việc làm (React/TS, có backend nhẹ).
  - `~/workspace/ngshini-github-io` — trang danh sách link quà 20/10 trên GitHub Pages.
  - Page Facebook "Shini Web" — kênh bán dịch vụ (branding + bài đăng đã sẵn sàng, Page chưa tạo được do Facebook chặn tài khoản).
- Dự án mới được dựng tại `~/workspace/shini-web-mau/` (tĩnh, HTML/CSS/JS thuần, tương thích GitHub Pages) — KHÔNG sửa các bản gốc đang hoạt động.

## Cơ chế sẵn có để dùng chung (từ web vườn hoa)
- Sửa thiệp: người nhận / lời chúc / người gửi, lưu `localStorage` (card.js).
- Album: tải ảnh từ máy, đổi ảnh, khôi phục ảnh gốc; tự nén về tối đa 1024px JPEG; tối đa 20MB/ảnh; lưu `localStorage` theo vị trí (album.js).
- Tương tác bàn phím: bó hoa focus được, Enter/mũi tên (đã có aria-label tiếng Việt).
- QR: hiện tạo bằng script Python ngoài (in thiệp giấy) — chưa có trong web.

## Khoảng trống cần xây mới trong dự án mẫu
- Bộ sưu tập (catalog) phân nhóm + lọc theo nhóm.
- Trang xem trước có thanh: quay lại bộ sưu tập / chọn-chỉnh mẫu này.
- Trình chỉnh sửa theo schema từng mẫu (trường chữ + vị trí ảnh đúng số lượng của mẫu).
- Link chia sẻ mang theo nội dung chữ (mã hóa trong URL) + QR tạo ngay trong trình duyệt.
- Ghi nguồn/giấy phép/commit cho từng mẫu ngay trong catalog.

## Cảnh báo giấy phép phát hiện khi rà soát
- `IdeaToCodee/flowers-20-10`: **KHÔNG có LICENSE** (kiểm tra GitHub API 21/10/2026) → các web 20/10 cá nhân giữ nguyên như quà tặng cá nhân, nhưng **không đưa vào danh mục bán** (không xác minh được quyền thương mại). Nhóm quà tặng trong danh mục dùng mẫu MIT đã xác minh thay thế.
