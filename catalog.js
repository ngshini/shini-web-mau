// Catalog mẫu — mỗi mục chỉ được thêm vào sau khi đã chạy thử + kiểm tra đạt.
// fields: trường chữ người dùng chỉnh được. photos: số vị trí ảnh (0 = mẫu không dùng ảnh → ẩn phần tải ảnh).
window.CATALOG = [
  {
    id: 'bo-hoa-dem-sao',
    ten: 'Bó hoa đêm sao',
    nhom: 'qua-tang',
    nhomLabel: 'Quà tặng tương tác',
    moTa: 'Mở quà để xem bó hoa CSS nở giữa đêm sao, kèm lời chúc gõ chữ và tấm thiệp nhỏ.',
    duongDan: 'templates/bo-hoa-dem-sao/',
    thumb: 'assets/thumb/bo-hoa-dem-sao.jpg',
    fields: [
      { key: 'tieuDe', label: 'Tiêu đề trang mở đầu', type: 'text', max: 60, macDinh: 'Mình có điều muốn nói' },
      { key: 'nguoiNhan', label: 'Người nhận', type: 'text', max: 60, macDinh: 'bạn' },
      { key: 'loiChucNgan', label: 'Lời chúc ngắn (gõ chữ bên bó hoa)', type: 'text', max: 40, macDinh: 'THƯƠNG BẠN NHIỀU' },
      { key: 'loiChuc', label: 'Lời chúc đầy đủ (trong thiệp)', type: 'textarea', max: 800, macDinh: 'Chúc bạn luôn khỏe mạnh, bình an và gặp thật nhiều niềm vui. Mong những điều tốt đẹp nhất sẽ đến với bạn, hôm nay và cả những ngày sau nữa.' },
      { key: 'nguoiGui', label: 'Người gửi', type: 'text', max: 60, macDinh: 'Một người quý mến bạn' }
    ],
    photos: 0,
    nguon: { repo: 'FIQTOR/flowers-for-someone', url: 'https://github.com/FIQTOR/flowers-for-someone', commit: 'd1ac07eca9a4beff3274fdf2f45608fda737a996', license: 'MIT', licensePath: 'templates/bo-hoa-dem-sao/LICENSE' },
    trangThai: 'da-tich-hop'
  },
  {
    id: 'sinh-nhat-phao-hoa',
    ten: 'Sinh nhật pháo hoa',
    nhom: 'sinh-nhat',
    nhomLabel: 'Sinh nhật',
    moTa: 'Hành trình sinh nhật 4 bước: mở phong bì, đọc thư, rồi pháo hoa, bóng bay và bánh kem với lời chúc gõ chữ. Có nhạc Happy Birthday phát khi bắt đầu.',
    duongDan: 'templates/sinh-nhat-phao-hoa/',
    thumb: 'assets/thumb/sinh-nhat-phao-hoa.jpg',
    fields: [
      { key: 'nguoiNhan', label: 'Người nhận (tên người sinh nhật)', type: 'text', max: 60, macDinh: 'bạn' },
      { key: 'loiChucThu', label: 'Lời mở đầu trong thư', type: 'textarea', max: 600, macDinh: 'Tấm thiệp này mang theo những lời chúc từ tận đáy lòng, sẵn sàng mở ra một bữa tiệc sinh nhật thật đáng nhớ dành riêng cho bạn.' },
      { key: 'loiChucNgan', label: 'Lời chào gõ chữ ở màn kết', type: 'text', max: 40, macDinh: 'Chúc mừng sinh nhật,' },
      { key: 'loiChuc', label: 'Lời chúc ở màn kết', type: 'textarea', max: 800, macDinh: 'Chúc ngày đặc biệt của bạn tràn ngập niềm vui, tiếng cười và mọi điều tốt đẹp nhất. Chúc một tuổi mới với thật nhiều chuyến phiêu lưu tuyệt vời!' },
      { key: 'nguoiGui', label: 'Người gửi', type: 'text', max: 60, macDinh: 'mình' }
    ],
    photos: 0,
    nguon: { repo: 'sapthesh/Birthday-V3', url: 'https://github.com/sapthesh/Birthday-V3', commit: '89c1194f04b8ccc6bd3698a9f076519763c597c0', license: 'MIT', licensePath: 'templates/sinh-nhat-phao-hoa/LICENSE' },
    trangThai: 'da-tich-hop'
  },
  {
    id: 'thiep-cuoi-co-dien',
    ten: 'Thiệp cưới cổ điển',
    nhom: 'dam-cuoi',
    nhomLabel: 'Đám cưới',
    moTa: 'Thiệp cưới trực tuyến đầy đủ: đếm ngược tới ngày cưới, lời mời, thời gian, địa điểm kèm bản đồ và chỉ đường, album câu chuyện 6 ảnh, lưu vào Google Calendar và xác nhận tham dự qua WhatsApp.',
    duongDan: 'templates/thiep-cuoi-co-dien/',
    thumb: 'assets/thumb/thiep-cuoi-co-dien.jpg',
    fields: [
      { key: 'coDau', label: 'Tên cô dâu', type: 'text', max: 60, macDinh: 'Phương Anh' },
      { key: 'chuRe', label: 'Tên chú rể', type: 'text', max: 60, macDinh: 'Minh Tuấn' },
      { key: 'loiMoi', label: 'Lời mời', type: 'textarea', max: 900, macDinh: 'Trân trọng kính mời quý khách đến dự lễ cưới của chúng tôi.\nSự hiện diện của quý khách là niềm vinh hạnh cho gia đình hai bên.' },
      { key: 'ngayCuoi', label: 'Ngày cưới', type: 'date', max: 10, macDinh: '2026-11-15' },
      { key: 'gioLe', label: 'Giờ lễ vu quy (ví dụ 09:00)', type: 'text', max: 5, macDinh: '09:00' },
      { key: 'gioTiec', label: 'Giờ tiệc cưới (ví dụ 11:00 – 13:00)', type: 'text', max: 20, macDinh: '11:00 – 13:00' },
      { key: 'diaDiem', label: 'Tên địa điểm tổ chức', type: 'text', max: 120, macDinh: 'Nhà hàng tiệc cưới mẫu' },
      { key: 'diaChi', label: 'Địa chỉ đầy đủ', type: 'textarea', max: 300, macDinh: 'Địa chỉ mẫu, TP. Hồ Chí Minh' },
      { key: 'soDienThoai', label: 'Số điện thoại nhận xác nhận tham dự (Zalo/WhatsApp) — để trống thì ẩn nút xác nhận', type: 'text', max: 15, macDinh: '' }
    ],
    photos: 6,
    photoLabels: ['Ảnh câu chuyện 1 — Lần đầu gặp gỡ', 'Ảnh câu chuyện 2 — Ngày tháng bên nhau', 'Ảnh câu chuyện 3 — Câu chuyện bắt đầu', 'Ảnh câu chuyện 4 — Hai gia đình gặp mặt', 'Ảnh câu chuyện 5 — Lời cầu hôn', 'Ảnh câu chuyện 6 — Ngày trọng đại'],
    nguon: { repo: 'daengdoang/simple-wedding-invitation', url: 'https://github.com/daengdoang/simple-wedding-invitation', commit: '4e3ebf627fc15fb93834b265583e8736d8c403d4', license: 'MIT', licensePath: 'templates/thiep-cuoi-co-dien/LICENSE' },
    trangThai: 'da-tich-hop'
  },
  {
    id: 'cafe-nang',
    ten: 'Café Nắng — web café / nhà hàng',
    nhom: 'dich-vu',
    nhomLabel: 'Website dịch vụ',
    moTa: 'Website 4 trang cho café/nhà hàng/quán ăn nhỏ: trang chủ, câu chuyện quán, thực đơn 3 món nổi bật, giờ mở cửa và liên hệ. Đổi được tên quán, nội dung, món ăn và 5 ảnh.',
    duongDan: 'templates/cafe-nang/',
    thumb: 'assets/thumb/cafe-nang.jpg',
    fields: [
      { key: 'tenQuan', label: 'Tên quán / thương hiệu', type: 'text', max: 60, macDinh: 'Café Nắng' },
      { key: 'slogan', label: 'Slogan (dòng nhỏ trên tên quán)', type: 'text', max: 80, macDinh: 'Cà phê ngon — không gian ấm' },
      { key: 'tieuDeChinhNho', label: 'Tiêu đề nhỏ trang chủ', type: 'text', max: 60, macDinh: 'Cà phê tươi mỗi ngày' },
      { key: 'tieuDeChinh', label: 'Tiêu đề lớn trang chủ', type: 'text', max: 60, macDinh: 'Đáng để thưởng thức' },
      { key: 'doanGioiThieu', label: 'Đoạn giới thiệu trang chủ', type: 'textarea', max: 700, macDinh: 'Mỗi ly cà phê của quán đều bắt đầu từ hạt tuyển chọn kỹ. Thử một lần, bạn sẽ muốn ghé lại mỗi sáng — quán cam kết đấy!' },
      { key: 'doanCamKet', label: 'Đoạn cam kết với khách', type: 'textarea', max: 700, macDinh: 'Từ khi bạn bước vào quán, chúng tôi luôn đón tiếp bằng sự thân thiện, không gian ấm cúng và những sản phẩm làm từ nguyên liệu chất lượng nhất. Chưa hài lòng ở điểm nào, cứ nói với quán — chúng tôi sẽ sửa ngay!' },
      { key: 'cauChuyen', label: 'Câu chuyện quán (trang Giới thiệu)', type: 'textarea', max: 900, macDinh: 'Quán được mở với mong muốn giản dị: một góc nhỏ yên bình để mọi người thưởng thức cà phê ngon mỗi ngày.' },
      { key: 'mon1Ten', label: 'Món 1 — tên', type: 'text', max: 60, macDinh: 'Cà phê & Trà' },
      { key: 'mon1MoTa', label: 'Món 1 — mô tả', type: 'textarea', max: 500, macDinh: 'Chúng tôi tự hào về từng ly đồ uống làm ra. Dù là cappuccino béo ngậy, trà thảo mộc mát lành hay cà phê đen nguyên chất, bạn đều sẽ muốn quay lại lần nữa.' },
      { key: 'mon2Ten', label: 'Món 2 — tên', type: 'text', max: 60, macDinh: 'Bánh & Bếp' },
      { key: 'mon2MoTa', label: 'Món 2 — mô tả', type: 'textarea', max: 500, macDinh: 'Thực đơn theo mùa với bánh ngọt, món nướng và cả bữa ăn nhẹ cho buổi sáng hoặc trưa. Nguyên liệu ưu tiên từ nông trại địa phương và nhà cung cấp uy tín.' },
      { key: 'mon3Ten', label: 'Món 3 — tên', type: 'text', max: 60, macDinh: 'Cà phê hạt đặc sản' },
      { key: 'mon3MoTa', label: 'Món 3 — mô tả', type: 'textarea', max: 500, macDinh: 'Quán luôn có những dòng cà phê hạt mới từ nhiều vùng trồng nổi tiếng. Bán lẻ từ gói nhỏ đến số lượng lớn — ghé quán để được tư vấn trực tiếp.' },
      { key: 'gioMoCua', label: 'Giờ mở cửa (mỗi dòng một mục)', type: 'textarea', max: 300, macDinh: 'Thứ 2 – Thứ 6: 7:00 – 20:00\nThứ 7: 9:00 – 17:00\nChủ Nhật: Nghỉ' },
      { key: 'diaChi', label: 'Địa chỉ quán', type: 'textarea', max: 300, macDinh: 'Địa chỉ mẫu của quán' },
      { key: 'soDienThoai', label: 'Số điện thoại quán', type: 'text', max: 15, macDinh: 'Số điện thoại mẫu' }
    ],
    photos: 5,
    photoLabels: ['Ảnh giới thiệu (trang chủ)', 'Ảnh câu chuyện quán', 'Ảnh món 1', 'Ảnh món 2', 'Ảnh món 3'],
    nguon: { repo: 'StartBootstrap/startbootstrap-business-casual', url: 'https://github.com/StartBootstrap/startbootstrap-business-casual', commit: 'b6f928934386a54e08c2e7f40ebd9e4d7510bba4', license: 'MIT', licensePath: 'templates/cafe-nang/LICENSE' },
    trangThai: 'da-tich-hop'
  },
  {
    id: 'vuon-hoa-20-10',
    ten: 'Vườn hoa & thiệp 20/10 (bản cá nhân)',
    nhom: 'qua-tang',
    nhomLabel: 'Quà tặng tương tác',
    moTa: 'Mẫu quà tặng đang chạy thật của Shini Web: vườn hoa nở theo chạm, thiệp chúc, album ảnh. CHỈ dùng làm tham chiếu/portfolio — nguồn gốc không có giấy phép nên KHÔNG bán như mẫu thương mại.',
    duongDan: 'https://ngshini.github.io/flowers-20-10-tang-chi/',
    thumb: 'assets/thumb/vuon-hoa-20-10.jpg',
    fields: [],
    photos: 3,
    nguon: { repo: 'IdeaToCodee/flowers-20-10 (clone, không LICENSE)', url: 'https://github.com/IdeaToCodee/flowers-20-10', commit: '-', license: 'KHÔNG CÓ — loại khỏi danh mục bán', licensePath: '' },
    trangThai: 'tham-chieu'
  }
];
window.NHOM = [
  { id: 'tat-ca', label: 'Tất cả' },
  { id: 'qua-tang', label: 'Quà tặng tương tác' },
  { id: 'sinh-nhat', label: 'Sinh nhật' },
  { id: 'dam-cuoi', label: 'Đám cưới' },
  { id: 'loi-moi', label: 'Lời mời khác' },
  { id: 'su-kien', label: 'Sự kiện' },
  { id: 'dich-vu', label: 'Website dịch vụ' }
];
