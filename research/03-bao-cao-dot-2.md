# Báo cáo bàn giao — Đợt 2 (21/10/2026)

## 1. Mẫu đã tích hợp thêm (6 mẫu — đủ 6 nhóm)
| Mẫu | Nhóm | Trường chữ | Vị trí ảnh | Nguồn / giấy phép |
|---|---|---|---|---|
| Portfolio cá nhân vCard | Dịch vụ | 18 | 4 | codewithsadee/vcard-personal-portfolio · MIT |
| Web doanh nghiệp / studio | Dịch vụ | 18 | 6 | StartBootstrap Agency · MIT |
| Sinh nhật hoa anh đào | Sinh nhật | 14 | 18 | Harmann60/Happy-Birthday · MIT |
| Thiệp cưới hiện đại | Đám cưới | 16 | 3 | dewanakl/undangan · MIT |
| Thiệp mời đa năng | Lời mời khác | 10 | 3 | Shini Web tự dựng |
| Sự kiện cộng đồng | Sự kiện | 20 | 2 | Shini Web tự dựng |

Tổng toàn dự án: **10 mẫu đã tích hợp** (4 đợt 1 + 6 đợt 2) + 1 mục tham chiếu không bán (Vườn hoa 20/10 — không giấy phép).

## 2. Việc xử lý đáng chú ý theo mẫu
- **vCard**: đóng gói Ionicons 5.4MB về máy; vá script.js để điều hướng/lọc dự án dùng data-target-page/data-filter-value (bản gốc so khớp bằng chữ hiển thị — dịch sang tiếng Việt sẽ làm hỏng); thay Lorem ipsum trong nhận xét; form liên hệ mở mailto kèm ghi chú minh bạch; bản đồ theo địa chỉ nhập.
- **Agency**: gỡ hoàn toàn SB Forms (form phụ thuộc API token + máy chủ Start Bootstrap) → khối liên hệ thật + nút mailto; Font Awesome đóng gói dạng CSS/webfont.
- **Sinh nhật hoa anh đào**: repo gốc thiếu toàn bộ 22 tệp ảnh/video được tham chiếu (404 ngay ở bản gốc). Đã tự sản xuất: 18 ảnh trừu tượng + video cánh hoa rơi (PIL/ffmpeg, script tools/tao-anh-mau-sinh-nhat.py). Gỡ lightGallery (GPL/thương mại) → hộp xem ảnh tự viết. Đổi font tiêu đề Mochiy Pop One (không hỗ trợ tiếng Việt) → Baloo 2.
- **Thiệp cưới hiện đại (undangan)**: khó nhất đợt. Đã (a) gỡ data-key/data-url + toàn bộ mục bình luận theo đúng hướng dẫn của tác giả khi không dùng bình luận; (b) gỡ ảnh QR mừng cưới + số tài khoản + nhạc + video của tác giả (không rõ quyền), thay bằng trường mừng cưới của người dùng và media tự sản xuất; (c) vá mã nguồn rồi build lại bằng esbuild: guest.js chỉ khởi tạo bình luận khi có data-key; loader.js trỏ AOS/confetti về vendor thay vì jsdelivr và tắt bước nạp font qua blob URL (lỗi này khiến trang kẹt ở màn hình tải "Error loading libs"); (d) thay toàn bộ ảnh mèo làm mẫu của tác giả (bg/cewe/cowo/banner) bằng họa tiết hoa tự sản xuất; (e) dịch toàn bộ tiếng Indonesia, thay nội dung tôn giáo đặc thù bằng lời mời trung tính tiếng Việt.
- **2 mẫu tự dựng**: vì tìm kiếm 2 đợt không có nguồn đạt chuẩn cho Lời mời khác + Sự kiện (repo tốt nghiệp toàn bộ không giấy phép; template sự kiện MIT không có kết quả đạt). Cả hai dùng chung cơ chế cấu hình/link/QR của dự án, font tự chứa, có đếm ngược, bản đồ, nút WhatsApp thật.

## 3. Kết quả kiểm tra (tools/kiem-tra.py — vòng cuối: 34/34 đạt, exit 0)
- 15 trang (10 mẫu + các trang con café + bộ sưu tập) × desktop + mobile: không lỗi JS, không request nội bộ hỏng, không tràn ngang.
- Test chức năng: trình chỉnh sửa thiệp cưới (XSS không chạy, link chia sẻ đúng, có QR), trình chỉnh sửa sự kiện (nhập tên → xem trước cập nhật), tải ảnh (lưu + hiện trong xem trước), xóa ảnh.
- Lỗi thật đã bắt & sửa trong đợt 2: tràn ngang do AOS ở mẫu hoa anh đào (overflow-x: clip); lỗi innerHTML null ở undangan (khởi tạo bình luận); trang undangan kẹt màn hình tải (font qua blob URL); ảnh mèo của tác giả trong thiệp cưới; đoạn giới thiệu còn tiếng Anh (đợt 1) đã quét lại.
- Đã kiểm tra trực quan cả 10 ảnh đại diện chụp từ bản tích hợp.

## 4. Giới hạn còn lại (kế thừa đợt 1 + riêng đợt 2)
- Link/QR vẫn chỉ mang phần chữ; ảnh người dùng tải nằm ở localStorage của trình duyệt nơi chỉnh sửa (đã ghi chú trong giao diện trình chỉnh sửa). Muốn chia sẻ trọn gói cả ảnh cần backend — đề xuất làm ở đợt 3 nếu anh muốn bán thật.
- Thiệp cưới hiện đại: thư viện ảnh dùng 9 ảnh mẫu cố định tự sản xuất (không có vị trí tải ảnh riêng cho thư viện; 3 vị trí ảnh chính là bìa/cô dâu/chú rể).
- Sinh nhật hoa anh đào dùng Tailwind Play CDN đóng gói tại máy (bản runtime của Tailwind) — chạy tốt nhưng khi bán nên cân nhắc biên dịch CSS tĩnh ở đợt sau.
- Bản đồ Google Maps cần internet (môi trường kiểm tra sandbox chặn google.com nên không chụp được bản đồ; URL nhúng đúng định dạng embed chuẩn, đã kiểm chứng ở đợt 1).

## 5. Đề xuất đợt 3 (chờ anh chọn)
1. Backend nhẹ để link chia sẻ mang được cả ảnh (phục vụ bán hàng thật).
2. Thêm mẫu: thiệp cưới #3 phong cách tối giản, landing page bán hàng, nhà hàng #2.
3. Trang giá/gói dịch vụ + nút liên hệ mua mẫu ngay trong bộ sưu tập (gắn với Page Shini Web).
