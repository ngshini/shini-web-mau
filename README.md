# Shini Web — Bộ sưu tập website mẫu

Dự án bán website mẫu của Shini Web: bộ sưu tập tĩnh (HTML/CSS/JS thuần, không cần build),
mỗi mẫu chạy trực tiếp trong thư mục `templates/`, chỉnh nội dung/ảnh ngay trong trình duyệt,
tạo link chia sẻ và mã QR cho bản đã cá nhân hóa.

## Chạy tại máy
```bash
# từ thư mục cha của dự án (để mục tham chiếu vườn hoa 20/10 mở đúng bản local)
python3 -m http.server 8902
# mở http://127.0.0.1:8902/shini-web-mau/
```

## Kiểm tra tự động
```bash
PLAYWRIGHT_BROWSERS_PATH=~/workspace/pwbrowsers ~/workspace/pwenv/bin/python tools/kiem-tra.py
```
Kiểm tra: lỗi JS, request hỏng nội bộ, tràn ngang desktop/mobile, chụp ảnh đại diện vào `assets/thumb/`,
test trình chỉnh sửa (nhập liệu → xem trước, chống XSS, tải/xóa ảnh, link chia sẻ, QR).

## Cấu trúc
- `index.html` + `assets/gallery.js` — bộ sưu tập, lọc theo nhóm.
- `catalog.js` — đăng ký mẫu: nhóm, trường chỉnh sửa, số vị trí ảnh, nguồn/commit/giấy phép.
- `chinh-sua.html` + `assets/editor.js` — trình chỉnh sửa theo schema, lưu localStorage, link #c=, QR (qrcode-generator MIT, đóng gói ở assets/vendor/).
- `assets/cau-hinh.js` — cầu nối cấu hình cho mọi mẫu (đọc #c=/localStorage, áp dụng bằng textContent, thanh quay lại/chỉnh mẫu, cập nhật trực tiếp qua sự kiện storage/hashchange).
- `templates/<mau>/` — mã nguồn từng mẫu đã Việt hóa, kèm `LICENSE` gốc và `NGUON.md` (nguồn, commit, thay đổi).
- `research/` — rà soát dự án, danh sách nguồn chọn/loại, báo cáo từng đợt.
- `tools/` — script kiểm tra + tải font tự chứa.

## Nguyên tắc
Chỉ mẫu đã chạy thử + kiểm tra đạt mới vào `catalog.js` với trạng thái `da-tich-hop`.
Mẫu chưa đạt nằm ở `research/01-danh-sach-nguon.md`. Xem báo cáo mới nhất trong `research/`.
