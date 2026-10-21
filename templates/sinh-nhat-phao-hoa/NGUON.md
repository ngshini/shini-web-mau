# Nguồn gốc mẫu: Sinh nhật pháo hoa

- Repo: sapthesh/Birthday-V3 — https://github.com/sapthesh/Birthday-V3
- Demo gốc: https://sapthesh.github.io/Birthday-V3/
- Commit đã lấy: 89c1194f04b8ccc6bd3698a9f076519763c597c0
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này.
- Công nghệ: HTML/CSS/JavaScript thuần; font Google Fonts (Pacifico, Poppins, Great Vibes — đều hỗ trợ dấu tiếng Việt).

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi", dịch toàn bộ chữ hiển thị: màn chào, thư, lời chúc, nút bấm, hướng dẫn.
- Gỡ thẻ audio: bản gốc tham chiếu `birthday_song.mp3` nhưng file KHÔNG có trong repo và không xác minh được quyền nhạc. Thay bằng giai điệu "Happy Birthday" (nhạc truyền thống, đã hết bản quyền) phát bằng WebAudio sau thao tác chạm đầu tiên.
- Tên người nhận, lời chúc trong thư, lời chúc kết, người gửi, lời chào gõ chữ: lấy từ cấu hình người dùng (assets/cau-hinh.js) qua data-bind/textContent.
- Thêm hỗ trợ bàn phím cho phong bì (Enter/Phím cách) + aria-label tiếng Việt.
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
- Mẫu không có vị trí ảnh → trình chỉnh sửa ẩn phần tải ảnh.
