# Báo cáo bàn giao — Đợt 1 (21/10/2026)

## 1. Danh sách nguồn đã tìm và lý do chọn/loại
Xem `research/01-danh-sach-nguon.md` (đầy đủ repo, demo, công nghệ, giấy phép, commit).
Tóm tắt: đã tìm trên GitHub (API chính thức) + GitLab (API công khai) + các hệ template lớn (StartBootstrap).
Đã clone & đọc code 10 ứng viên. Chọn tích hợp Đợt 1: 4 mẫu (MIT, tự chứa hoặc đóng gói được dependency).
Loại đáng chú ý: IdeaToCodee/flowers-20-10 (không LICENSE), thiệp cưới GPL/AGPL, mẫu kèm nhạc không rõ quyền, TEDxJMI (thương hiệu TEDx).

## 2. Các mẫu đã tích hợp (chạy từ mã nguồn trong dự án)
| Mẫu | Nhóm | Trường chỉnh sửa | Vị trí ảnh | Nguồn / Commit / Giấy phép |
|---|---|---|---|---|
| Bó hoa đêm sao | Quà tặng tương tác | Tiêu đề, người nhận, lời chúc ngắn, lời chúc đầy đủ, người gửi | 0 (ẩn phần tải ảnh) | FIQTOR/flowers-for-someone · d1ac07e · MIT |
| Sinh nhật pháo hoa | Sinh nhật | Người nhận, lời thư, lời chào gõ chữ, lời chúc kết, người gửi | 0 (ẩn phần tải ảnh) | sapthesh/Birthday-V3 · 89c1194 · MIT |
| Thiệp cưới cổ điển | Đám cưới | Cô dâu, chú rể, lời mời, ngày cưới, giờ lễ, giờ tiệc, địa điểm, địa chỉ, SĐT xác nhận | 6 ảnh câu chuyện | daengdoang/simple-wedding-invitation · 4e3ebf6 · MIT |
| Café Nắng | Website dịch vụ | Tên quán, slogan, tiêu đề, giới thiệu, cam kết, câu chuyện, 3 món (tên+mô tả), giờ mở cửa, địa chỉ, SĐT | 5 ảnh | StartBootstrap/business-casual · b6f9289 · MIT |
| Vườn hoa 20/10 | Quà tặng (THAM CHIẾU — không bán) | (cơ chế riêng của bản gốc) | 3 | IdeaToCodee — KHÔNG giấy phép → chỉ portfolio |

Mỗi mẫu có `LICENSE` gốc + `NGUON.md` trong thư mục của nó. Link xem thử bản chạy trong dự án:
**https://ngshini.github.io/shini-web-mau/** (repo: https://github.com/ngshini/shini-web-mau)

## 3. Kết quả kiểm tra (tools/kiem-tra.py — Playwright, vòng cuối: 21/21 đạt, exit 0)
- 9 trang (4 mẫu + các trang con café + bộ sưu tập) × desktop 1280 + mobile 390: **không lỗi JavaScript, không request nội bộ hỏng (404), không tràn ngang** (sau khi sửa tràn Bulma ở thiệp cưới).
- Trình chỉnh sửa thiệp cưới: nhập tên mới → iframe xem trước hiển thị đúng; mở link chia sẻ ở trang mới → đúng bản cá nhân hóa; **QR tạo được**.
- Chống XSS: nhập `<img src=x onerror=...>` vào tên cô dâu → hiển thị nguyên văn như chữ, mã không chạy (mọi mẫu áp dụng bằng textContent).
- Tải ảnh (café): ảnh được nén, lưu localStorage, hiện ngay trong xem trước (sự kiện storage); xóa ảnh → mất khỏi lưu trữ và xem trước.
- Bàn phím: phong bì sinh nhật mở bằng Enter/Space; các nút/link đều là phần tử thật, focus được.
- Lỗi đã phát hiện & sửa trong quá trình kiểm tra: (1) QR cộng dồn dữ liệu do tái sử dụng object → tạo mới mỗi lần + mức L; (2) xem trước không nạp lại khi chỉ đổi #hash → thêm tham số nạp lại + nghe hashchange; (3) đoạn giới thiệu café còn tiếng Anh do khớp chuỗi thiếu class → đã sửa và quét lại toàn bộ văn bản hiển thị; (4) tràn ngang desktop ở thiệp cưới → overflow-x: clip.
- Font: cả 3 mẫu dùng Google Fonts đã được tải về tự chứa (subset tiếng Việt + latin, giấy phép OFL) → mẫu chạy không phụ thuộc Google Fonts.

## 4. Giới hạn còn lại (nói rõ, không giấu)
- **Link/QR chỉ mang theo phần chữ.** Ảnh người dùng tải được lưu trong localStorage của trình duyệt máy đó (giống cơ chế album của web 20/10 hiện tại) — mở link ở máy khác sẽ thấy nội dung chữ đã cá nhân hóa nhưng ảnh quay về ảnh gốc của mẫu. Muốn chia sẻ trọn gói cả ảnh cần backend/lưu trữ — chưa làm ở Đợt 1, giao diện đã ghi chú rõ điều này.
- **QR có giới hạn dung lượng:** mẫu nhiều chữ (café khi điền tối đa mọi trường) có thể vượt khả năng chứa của QR → giao diện báo rõ và hướng dùng nút sao chép link.
- **Bản đồ thiệp cưới** là iframe Google Maps (cần internet); môi trường kiểm tra sandbox chặn google.com nên không chụp được bản đồ trong test, nhưng URL nhúng đã kiểm chứng bằng curl (HTTP 301 → Google Maps) và đúng định dạng embed chuẩn.
- Nhóm **Lời mời khác** và **Sự kiện** chưa có mẫu tích hợp (chưa tìm được nguồn đạt chuẩn — xem danh sách loại). Nhóm Dịch vụ mới có café; portfolio/doanh nghiệp để Đợt 2.

## 5. Kế hoạch Đợt 2
1. Portfolio cá nhân (codewithsadee/vcard — MIT, đã clone) + Website doanh nghiệp/studio (StartBootstrap Agency — MIT, đã clone).
2. Thiệp cưới #2 (dewanakl/undangan — cần xử lý build + bỏ nhạc không rõ quyền + API khách mời).
3. Sinh nhật #2 (Harmann60/Happy-Birthday — cần đóng gói bộ ảnh mẫu thay phần ảnh bị thiếu trong repo).
4. Tiếp tục tìm nguồn cho Lời mời khác (tốt nghiệp/tân gia/kỷ niệm) và Sự kiện; nếu không có nguồn đạt chuẩn, đề xuất tự dựng từ khung đã tích hợp.
5. Cân nhắc backend nhẹ để link chia sẻ mang được cả ảnh (phục vụ bán hàng thật).
