# Nguồn gốc mẫu: Café Nắng (website dịch vụ — café/nhà hàng)

- Repo: StartBootstrap/startbootstrap-business-casual — https://github.com/StartBootstrap/startbootstrap-business-casual
- Demo gốc: https://startbootstrap.com/previews/business-casual
- Commit đã lấy: b6f928934386a54e08c2e7f40ebd9e4d7510bba4
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2013-2023 Start Bootstrap LLC.
- Công nghệ: Bootstrap 5 (CSS đã biên dịch sẵn trong css/styles.css), JavaScript thuần. Dùng bản `dist/` có sẵn của repo — không cần build.
- Bootstrap bundle JS 5.2.3 (MIT) được đóng gói vào vendor/ thay cho CDN jsdelivr.
- Font: Raleway + Lora qua Google Fonts (cả hai đều hỗ trợ dấu tiếng Việt).

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi"; dịch toàn bộ 4 trang (Trang chủ / Giới thiệu / Thực đơn / Liên hệ): tiêu đề, menu, nội dung, giờ mở cửa, địa chỉ, điện thoại, footer.
- Xóa toàn bộ thông tin mẫu của tác giả (địa chỉ Minnesota, số điện thoại Mỹ, "Your Website 2023", câu chuyện anh em Hernandez) → thay bằng dữ liệu mẫu tiếng Việt rõ ràng, chỉnh được trong trình chỉnh sửa.
- Trường chỉnh sửa: tên quán, slogan, tiêu đề + đoạn giới thiệu, cam kết, câu chuyện, 3 món (tên + mô tả), giờ mở cửa (văn bản tự do), địa chỉ, số điện thoại.
- 5 vị trí ảnh: ảnh giới thiệu (trang chủ), ảnh câu chuyện (trang Giới thiệu + Liên hệ), 3 ảnh món (trang Thực đơn) — tải/đổi/xóa trong trình chỉnh sửa.
- Giờ mở cửa: bản gốc là danh sách 7 ngày cố định kèm tô sáng ngày hiện tại (js/scripts.js). Bản tích hợp dùng trường văn bản tự do cho đúng thực tế quán VN; đã thêm điều kiện chống lỗi trong scripts.js khi danh sách cố định không còn.
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này" ở cả 4 trang.
- Không có nút đặt bàn/thanh toán (bản gốc cũng không có) — đúng phạm vi: website giới thiệu + liên hệ.
