# Nguồn gốc mẫu: Portfolio vCard

- Repo: codewithsadee/vcard-personal-portfolio — https://github.com/codewithsadee/vcard-personal-portfolio
- Demo gốc: https://codewithsadee.github.io/vcard-personal-portfolio/
- Commit đã lấy: 927f09a6ef894a24cc8aef7a2e51f8e93ac306f7
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2022 codewithsadee.
- Công nghệ: HTML/CSS/JavaScript thuần, thư viện biểu tượng Ionicons 5.5.2 (MIT).

## Dependency đã đóng gói về máy
- Ionicons 5.5.2 (MIT): toàn bộ thư mục dist/ionicons trong vendor/ionicons/ (bản gốc tải từ unpkg).
- Font Poppins (OFL) trong vendor/fonts.css — subset latin + latin-ext (Poppins không có subset "vietnamese" riêng; glyph tiếng Việt nằm trong latin-ext).

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi"; dịch toàn bộ giao diện: thanh bên, điều hướng, giới thiệu, dịch vụ, nhận xét, học vấn/kinh nghiệm, kỹ năng, dự án + bộ lọc, bài viết, liên hệ, placeholder và nhãn aria.
- Thay toàn bộ dữ liệu cá nhân của tác giả mẫu (Richard hanrick, email/SĐT/địa chỉ Sacramento, ngày sinh) bằng dữ liệu mẫu tiếng Việt, chỉnh được trong trình chỉnh sửa: họ tên, chức danh, email, điện thoại, ngày sinh, địa điểm, giới thiệu, 4 dịch vụ, 3 dự án đầu.
- Nhận xét khách hàng: bỏ đoạn "Lorem ipsum" của bản gốc, thay bằng nhận xét mẫu tiếng Việt ghi rõ là mẫu.
- Sửa cơ chế điều hướng và lọc dự án trong script.js: đối chiếu bằng thuộc tính data-target-page / data-filter-value thay vì chữ hiển thị (bản gốc so bằng innerText nên dịch nhãn sẽ làm hỏng điều hướng/lọc).
- Bản đồ: bản gốc nhúng Sacramento, CA → nay tự tạo từ trường địa điểm người dùng nhập.
- Form liên hệ: bản gốc không có backend (nút Gửi không đi đâu). Bản tích hợp mở ứng dụng thư (mailto) soạn sẵn tới email trong hồ sơ, kèm dòng ghi chú rõ ràng ngay dưới form.
- 4 vị trí ảnh: ảnh đại diện + 3 ảnh dự án đầu — tải/đổi/xóa trong trình chỉnh sửa.
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
