# Nguồn gốc mẫu: Thiệp cưới cổ điển

- Repo: daengdoang/simple-wedding-invitation — https://github.com/daengdoang/simple-wedding-invitation
- Demo gốc: https://simple-wedding-invitation.netlify.app/
- Commit đã lấy: 4e3ebf627fc15fb93834b265583e8736d8c403d4
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2020 Daeng M. Feisal.
- Công nghệ: HTML/CSS/JS với Bulma 0.8, jQuery, plugin countdown (epiksel/countdown), AOS.
- Ảnh trong repo: ảnh Unsplash (tên file ghi nguồn Unsplash; giấy phép Unsplash cho phép sử dụng thương mại).

## Dependency đã đóng gói về máy (vendor/, kèm bản quyền gốc trong file)
- Bulma 0.8.0 (MIT), bulma-tooltip 0.1.5 (MIT), jQuery 3.7.1 (MIT), AOS 2.3.1 (MIT).
- Bản gốc tải các thư viện này qua CDN (unpkg, Google, cdnjs) và AOS qua cdn.rawgit.com — **rawgit đã ngừng hoạt động**, nên đóng gói về máy là bắt buộc để mẫu chạy ổn định.

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi"; dịch toàn bộ giao diện Indonesia → tiếng Việt (menu, thời gian, địa điểm, câu chuyện, xác nhận tham dự, tooltip, nhãn đếm ngược Ngày/Giờ/Phút/Giây).
- Gỡ: Google Analytics của tác giả, FontAwesome kit cá nhân của tác giả, nút GitHub, huy hiệu Netlify/Bulma ở footer, thông tin cá nhân/địa chỉ Bekasi của tác giả.
- Gỡ ảnh thư pháp tôn giáo Hồi giáo (bismillah.png) — không phù hợp thị trường VN; thay bằng họa tiết hoa lá của chính mẫu.
- Font Rouge Script (không hỗ trợ dấu tiếng Việt) → Great Vibes (có hỗ trợ tiếng Việt); Lato/Raleway giữ nguyên.
- Ảnh nền hero: bản gốc dùng picsum.photos (dịch vụ ảnh ngẫu nhiên ngoài) → thay bằng ảnh Unsplash có sẵn trong repo.
- Đếm ngược: bản gốc đếm tới ngày cố định 21/03/2020 (đã qua) và bật alert khi xong → nay lấy ngày cưới + giờ lễ từ cấu hình, hết giờ giữ 00, không alert.
- Ngày cưới hiển thị tự suy ra từ trường ngày (thứ/ngày/tháng/năm theo tiếng Việt).
- Bản đồ: nhúng + nút chỉ đường tự tạo từ địa điểm/địa chỉ người dùng nhập (Google Maps), không còn địa chỉ Indonesia.
- Nút "Lưu vào Google Calendar": tự tạo link sự kiện đúng ngày/giờ/địa điểm.
- Xác nhận tham dự: bản gốc là link WhatsApp với số mẫu `628xxxxxxxxxx` → nay dùng số điện thoại người dùng nhập (chuẩn hóa +84), lời nhắn soạn sẵn tiếng Việt; **chưa nhập số thì ẩn nút** (không để nút giả).
- 6 ảnh câu chuyện: người dùng tải/đổi/xóa trong trình chỉnh sửa; giữ lớp phủ gradient của thiết kế gốc.
- Sửa js/menikah.js cho tương thích jQuery 3 (`.load()` → `.on('load')`) và chống lỗi khi không có nút #toTop.
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
