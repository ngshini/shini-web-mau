# Danh sách nguồn đã tìm — lý do chọn / loại (cập nhật 21/10/2026)

Phương pháp: tìm trên GitHub API chính thức (gh) + GitLab API công khai + website template.
Giấy phép được xác minh bằng 2 lớp: trường license của GitHub API **và** đọc trực tiếp file LICENSE trong bản clone.
Commit ghi theo `git log -1` của bản clone nông (depth 1) ngày 21/10/2026.
Trạng thái phân biệt rõ: **đã tìm thấy** ≠ **đã chạy thử** ≠ **đã tích hợp**.

## ĐÃ TÍCH HỢP — Đợt 1

| Mẫu (tên trong dự án) | Nhóm | Nguồn | Commit | Giấy phép | Công nghệ | Ghi chú lọc |
|---|---|---|---|---|---|---|
| Bó hoa đêm sao | Quà tặng | FIQTOR/flowers-for-someone — https://github.com/FIQTOR/flowers-for-someone — demo: https://fiqtor.github.io/flowers-for-someone/ | d1ac07eca9a4beff3274fdf2f45608fda737a996 | MIT (LICENSE trong repo) | HTML/CSS/JS thuần | Tự chứa hoàn toàn, không dependency ngoài. Không có ảnh người dùng → ẩn phần tải ảnh. |
| Sinh nhật pháo hoa | Sinh nhật | sapthesh/Birthday-V3 — https://github.com/sapthesh/Birthday-V3 — demo: https://sapthesh.github.io/Birthday-V3/ | 89c1194f04b8ccc6bd3698a9f076519763c597c0 | MIT | HTML/CSS/JS thuần + Google Fonts | File nhạc `birthday_song.mp3` bị tham chiếu nhưng KHÔNG có trong repo và không rõ quyền → bỏ thẻ audio, thay bằng giai điệu Happy Birthday (nhạc truyền thống, hết bản quyền) phát bằng WebAudio. Không có vị trí ảnh → ẩn phần tải ảnh. |
| Thiệp cưới cổ điển | Đám cưới | daengdoang/simple-wedding-invitation — https://github.com/daengdoang/simple-wedding-invitation — demo: https://simple-wedding-invitation.netlify.app/ | 4e3ebf627fc15fb93834b265583e8736d8c403d4 | MIT | HTML/CSS/JS, Bulma, jQuery countdown | Ảnh trong repo là ảnh Unsplash (tên file ghi rõ nguồn Unsplash — giấy phép Unsplash cho phép dùng thương mại). Xử lý khi tích hợp: đóng gói Bulma/jQuery về máy (bỏ CDN), gỡ Google Analytics + FontAwesome kit cá nhân của tác giả, gỡ ảnh thư pháp tôn giáo (không hợp thị trường VN), số WhatsApp mẫu `628xxx` → trường nhập số VN, RSVP = mở WhatsApp với lời nhắn soạn sẵn (chức năng thật, không phải nút giả). |
| Café Nắng | Website dịch vụ (café/nhà hàng) | StartBootstrap/startbootstrap-business-casual — https://github.com/StartBootstrap/startbootstrap-business-casual — demo: https://startbootstrap.com/previews/business-casual | b6f928934386a54e08c2e7f40ebd9e4d7510bba4 | MIT | Bootstrap 5, dùng bản `dist/` có sẵn — không cần build | 5 vị trí ảnh: ảnh giới thiệu, ảnh câu chuyện, 3 ảnh món/sản phẩm. |

## ĐÃ CHẠY THỬ / ĐÃ CLONE — để Đợt 2

| Ứng viên | Nhóm | Giấy phép | Lý do chưa tích hợp ở Đợt 1 |
|---|---|---|---|
| codewithsadee/vcard-personal-portfolio (927f09a6ef894a24cc8aef7a2e51f8e93ac306f7) | Dịch vụ — Portfolio cá nhân | MIT | Thuần HTML/CSS/JS, đạt chuẩn; để Đợt 2 vì khối lượng Việt hóa lớn (trang dài nhiều mục). |
| StartBootstrap/startbootstrap-agency (b2d5d5c6b1396bc5b0e8dd92c693b106cfb7cee1) | Dịch vụ — doanh nghiệp/studio | MIT | Dùng bản dist/ chạy ngay; để Đợt 2 cùng nhóm dịch vụ. |
| dewanakl/undangan (99e7c2d141858455a96ed1af58a129cea002c3b0) | Đám cưới | MIT | Cần build bằng esbuild; có file nhạc MP3 chưa xác minh quyền; hệ thống khách mời/bình luận phụ thuộc API ngoài. Cần xử lý riêng ở Đợt 2. |
| Harmann60/Happy-Birthday (0652da2935ce75c8bca0a7eee23fc30662b7831d) | Sinh nhật | MIT | Repo THIẾU toàn bộ ảnh/video được tham chiếu (thư mục img/ chỉ có Readme hướng dẫn tự thêm) + dùng Tailwind qua CDN bản dev. Muốn tích hợp phải đóng gói lại bộ ảnh mẫu → Đợt 2. |

## ĐÃ TÌM THẤY — LOẠI (không tích hợp)

| Ứng viên | Lý do loại |
|---|---|
| IdeaToCodee/flowers-20-10 | **Không có LICENSE** → không xác minh được quyền thương mại. (Các web 20/10 cá nhân đã live giữ nguyên làm quà tặng cá nhân/portfolio, không bán như mẫu.) |
| rampatra/wedding-website | GPL-3.0 — giấy phép copyleft không phù hợp mô hình bán mẫu đóng gói. |
| vinitshahdeo/Wedding-Invitation | AGPL-3.0 — copyleft mạnh, không phù hợp. |
| vinitshahdeo/HBD | MIT nhưng repo lẫn nhiều file ví dụ đa ngôn ngữ; 2 file nhạc (audio/hbd.mp3, audio/song.mp3) không xác minh được quyền sử dụng. |
| engrshuvodas/Birthday-Wish-Card | Apache-2.0 nhưng kèm 2 file nhạc .mpeg không rõ nguồn gốc/bản quyền. |
| faheel/TEDxJMI | MIT nhưng dùng thương hiệu/hình ảnh TEDx (rủi ro thương hiệu), thiết kế 2017 đã cũ, thư mục font lẫn file HTML lạ (dấu vết scrape). Nhóm sự kiện cần ứng viên khác ở Đợt 2. |
| sakeenah-wedding/template | Giấy phép NOASSERTION (không rõ ràng) → loại theo nguyên tắc không xác minh được quyền thương mại. |
| NgodingSolusi/the-wedding-of-rehan-maulidan và đa số repo thiệp cưới/sinh nhật nhỏ lẻ | Không có LICENSE → loại. |
| GitLab (tìm wedding invitation / birthday website) | Chỉ có repo 0–1 sao, không giấy phép rõ ràng, chất lượng không kiểm chứng được → không có ứng viên đạt chuẩn. |
| jonathanrao99/ForumX-Conference-Template | MIT nhưng mới 4 sao, dùng Next.js (cần build + runtime khác hẳn dự án tĩnh) → để danh sách nghiên cứu nhóm sự kiện. |

## Còn thiếu sau Đợt 1 (kế hoạch Đợt 2)
- Nhóm **Lời mời khác** (tốt nghiệp/tân gia/kỷ niệm): chưa tìm được template MIT chất lượng (đã tìm GitHub + GitLab). Hướng Đợt 2: tự dựng 1 mẫu từ khung thiệp cưới/sinh nhật đã tích hợp, hoặc tiếp tục tìm nguồn.
- Nhóm **Sự kiện**: ứng viên hiện có đều không đạt (thương hiệu TEDx / quá mới / cần build Next.js). Đợt 2 xử lý tiếp.
- Nhóm **Dịch vụ**: bổ sung Portfolio (vCard) + Agency ở Đợt 2.
