# Nguồn gốc mẫu: Web doanh nghiệp / studio (Agency)

- Repo: StartBootstrap/startbootstrap-agency — https://github.com/StartBootstrap/startbootstrap-agency
- Demo gốc: https://startbootstrap.com/previews/agency
- Commit đã lấy: b2d5d5c6b1396bc5b0e8dd92c693b106cfb7cee1
- Giấy phép: MIT — file LICENSE nằm cùng thư mục này. Copyright (c) 2013-2023 Start Bootstrap LLC.
- Công nghệ: Bootstrap 5 (CSS biên dịch sẵn), JavaScript thuần. Dùng bản dist/ có sẵn — không cần build.

## Dependency đã đóng gói về máy
- Bootstrap bundle 5.2.3 (MIT) — vendor/bootstrap.bundle.min.js (bản gốc dùng jsdelivr).
- Font Awesome 6.3.0 (biểu tượng: CC BY 4.0; font: SIL OFL 1.1; mã nguồn: MIT) — vendor/fontawesome/ (bản gốc tải JS từ use.fontawesome.com).
- Font Montserrat + Roboto Slab (OFL) tự chứa trong vendor/fonts.css.

## Đã thay đổi khi Việt hóa & tích hợp
- lang="vi"; dịch toàn bộ trang 1 trang: menu, lời chào, dịch vụ, dự án + hộp thoại chi tiết, dòng thời gian, đội ngũ, liên hệ, footer. Toàn bộ "Lorem ipsum" đã thay bằng nội dung mẫu tiếng Việt.
- Logo chữ SVG của Start Bootstrap → tên công ty dạng chữ, chỉnh được.
- **Gỡ bỏ SB Forms**: form liên hệ của bản gốc phụ thuộc dịch vụ Start Bootstrap (cần API token, dữ liệu gửi qua máy chủ bên thứ ba). Bản tích hợp thay bằng khối thông tin liên hệ thật (email/điện thoại/địa chỉ chỉnh được) + nút mở ứng dụng thư (mailto).
- Trường chỉnh sửa: tên công ty, câu chào, tiêu đề chính, 3 dịch vụ (tên + mô tả), 6 dự án (tên), email, điện thoại, địa chỉ.
- 6 vị trí ảnh dự án (áp dụng đồng thời ở lưới và hộp thoại chi tiết).
- Thêm thanh "← Bộ sưu tập / Chỉnh mẫu này".
