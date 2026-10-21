# Nguồn gốc mẫu: Sinh nhật hoa anh đào

- Repo: Harmann60/Happy-Birthday — https://github.com/Harmann60/Happy-Birthday
- Demo gốc: theo README của repo
- Commit đã lấy: 0652da2935ce75c8bca0a7eee23fc30662b7831d
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2025 Harmanpreet Singh.
- Công nghệ: HTML + Tailwind CSS (Play CDN) + AOS + JavaScript thuần, canvas cánh hoa rơi.

## Khuyết điểm của repo gốc và cách xử lý (quan trọng)
- Repo **không chứa bất kỳ tệp ảnh/video nào** mà index.html tham chiếu (img1–4, image1–6, 1–12, sa.mp4 — toàn bộ 404 ở bản gốc). Bản tích hợp **tự sản xuất toàn bộ ảnh/video mẫu bằng code** (script tools/tao-anh-mau-sinh-nhat.py: gradient + cánh hoa bằng PIL, video cánh hoa rơi bằng ffmpeg) — ảnh do dự án tự tạo, không vướng quyền của bên thứ ba; người dùng thay ảnh thật trong trình chỉnh sửa.
- lightGallery 2.7.1 (GPL-3.0 / bản thương mại trả phí) — **đã gỡ**, thay bằng hộp xem ảnh tự viết (cuối script.js).
- Thư viện Tailwind Play CDN và AOS đã đóng gói về vendor/ (Tailwind: MIT; AOS 2.3.1: MIT).
- Font tiêu đề Mochiy Pop One **không hỗ trợ tiếng Việt** → đổi sang Baloo 2 (có subset tiếng Việt, OFL), tự chứa cùng Poppins trong vendor/fonts.css.

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi"; dịch toàn bộ giao diện; thư sinh nhật viết lại bằng tiếng Việt (bản gốc là đoạn mẫu tiếng Anh có sẵn tên chờ điền).
- Bộ đếm tuổi chạy theo trường ngày sinh người dùng chọn, hiển thị "năm/tháng/ngày/giờ/phút/giây".
- Trường chỉnh sửa: người nhận, ngày sinh, lời dẫn, 2 đoạn thư, người gửi, 4 mốc hành trình (tiêu đề + mô tả).
- 18 vị trí ảnh: 4 ảnh hành trình, 6 ảnh khoảnh khắc, 8 ảnh bộ sưu tập (bản gốc có 12 ô bộ sưu tập; bản tích hợp giữ 8 ô cho gọn).
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
