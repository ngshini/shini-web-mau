# Nguồn gốc mẫu: Thiệp cưới hiện đại (undangan)

- Repo: dewanakl/undangan — https://github.com/dewanakl/undangan
- Demo gốc: https://ulems.my.id
- Commit đã lấy: 99e7c2d141858455a96ed1af58a129cea002c3b0
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2023 Dewan Beri Tri Yoga.
- Công nghệ: Bootstrap 5.3.8, JavaScript dạng module được đóng gói bằng esbuild (lệnh build trong package.json của repo; bản tích hợp dùng dist/guest.js đã biên dịch), Font Awesome 7.

## Phần đã loại bỏ và lý do
- **Hệ thống bình luận/lời chúc + xác nhận tham dự qua API của tác giả** (data-key/data-url trỏ tới api.ulems.my.id): dữ liệu của khách hàng không thể đi qua máy chủ của người khác. Chính README/mã nguồn của tác giả hướng dẫn gỡ data-key và data-url khi không dùng bình luận — bản tích hợp làm đúng như vậy và gỡ hẳn mục bình luận + form.
- **Ảnh mã QR mừng cưới (donate.png) của tác giả** và số tài khoản/số điện thoại/địa chỉ mẫu ở Banyumas (Indonesia): đã gỡ; thay bằng trường thông tin mừng cưới của chính người dùng (ngân hàng/số tài khoản/chủ tài khoản/điện thoại), có nút sao chép hoạt động thật. Chưa nhập thông tin thì mục Mừng cưới tự ẩn.
- **Tệp nhạc pure-love-304010.mp3**: không xác minh được nguồn gốc/quyền → đã loại bỏ tính năng nhạc.
- **Video nền 265501_tiny.mp4** không rõ nguồn → thay bằng video cánh hoa rơi do dự án tự sản xuất (assets/video/nen-cuoi.mp4).
- **Ảnh thư viện picsum.photos** (dịch vụ ảnh ngẫu nhiên bên ngoài) → thay bằng 9 ảnh do dự án tự sản xuất trong assets/images/gallery-*.
- Nội dung tôn giáo Hồi giáo đặc thù của bản gốc (câu kinh, lời chào tôn giáo) → thay bằng lời mời/lời chúc tiếng Việt trung tính; font Sacramento và Noto Naskh Arabic (không hỗ trợ tiếng Việt) → Great Vibes; font Josefin Sans giữ nguyên (có subset tiếng Việt). Toàn bộ chữ Indonesia đã dịch; dữ liệu "Wahyu & Riski" và ngày cưới 2023 đã thay bằng trường cấu hình.
- dashboard.html/trang quản trị của bản gốc không đưa vào (phụ thuộc API đã gỡ).

## Dependency đã đóng gói về máy
Bootstrap 5.3.8 (MIT), Font Awesome Free 7.1.0 (CC BY 4.0/OFL/MIT), AOS 2.3.4 (MIT), canvas-confetti 1.9.3 (ISC), font Josefin Sans + Great Vibes (OFL) — tất cả trong vendor/.

## Sửa đổi ở tầng mã nguồn (js/ của repo, đã build lại bằng esbuild)
- js/app/guest/guest.js: chỉ khởi tạo module bình luận khi có data-key (bản tích hợp không có) — nếu không, module này báo lỗi vì phần tử bình luận đã bị gỡ.
- js/libs/loader.js: AOS + confetti vốn được tải động từ jsdelivr → trỏ về vendor/; bước nạp font động (Sacramento/Noto Naskh Arabic qua Google Fonts) bị vô hiệu hóa vì font đã nạp qua thẻ link ở đầu trang — nạp lại qua blob URL làm hỏng đường dẫn font con và khiến trang kẹt ở màn hình tải.

## Trường chỉnh sửa & ảnh
Cô dâu, chú rể, tên khách mời (hiện ở bìa), lời mời, ngày cưới, giờ lễ, giờ tiệc, địa điểm, địa chỉ, điện thoại, 3 đoạn câu chuyện tình yêu, thông tin mừng cưới. Ảnh: bìa (qua bộ chuyển đổi), cô dâu, chú rể. Thư viện ảnh dùng bộ ảnh mẫu cố định của mẫu (ghi rõ giới hạn này).
Đếm ngược chạy theo data-time được bộ chuyển đổi js/thiep-hien-dai.js đặt từ cấu hình trước khi mã của mẫu khởi chạy.
