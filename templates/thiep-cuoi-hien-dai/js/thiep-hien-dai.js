// Bộ chuyển đổi riêng của mẫu Thiệp cưới hiện đại:
// - Đặt mốc đếm ngược (data-time) theo ngày/giờ cưới trong cấu hình TRƯỚC khi mã của mẫu chạy.
// - Tên khách mời ở bìa, ngày cưới dạng chữ, nút sao chép thông tin mừng cưới, ảnh bìa từ thư viện ảnh của người dùng.
(() => {
  'use strict';
  const cfg = window.TPL_CFG || {};
  const setTime = () => {
    if (cfg.ngayCuoi) {
      const gio = (cfg.gioLe || '10:00').toString().slice(0, 5);
      document.body.setAttribute('data-time', cfg.ngayCuoi + ' ' + gio + ':00');
    }
  };
  setTime();
  document.addEventListener('DOMContentLoaded', () => {
    setTime();
    // Ngày cưới dạng chữ
    if (cfg.ngayCuoi) {
      const d = new Date(cfg.ngayCuoi + 'T00:00:00');
      if (!isNaN(d)) {
        const thu = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][d.getDay()];
        document.querySelectorAll('.js-ngay-cuoi').forEach(el => {
          el.textContent = thu + ', ngày ' + d.getDate() + ' tháng ' + (d.getMonth() + 1) + ' năm ' + d.getFullYear();
        });
      }
    }
    // Tên khách mời trên bìa thiệp
    const gn = document.getElementById('guest-name');
    if (gn && cfg.khachMoi) {
      const nameEl = document.createElement('p');
      nameEl.className = 'font-esthetic mb-3';
      nameEl.style.fontSize = '1.75rem';
      nameEl.textContent = cfg.khachMoi;
      gn.textContent = '';
      const label = document.createElement('p');
      label.className = 'mb-1';
      label.style.fontSize = '0.9rem';
      label.textContent = 'Kính gửi quý khách';
      gn.appendChild(label);
      gn.appendChild(nameEl);
    }
    // Nút sao chép: điền giá trị thật từ cấu hình
    document.querySelectorAll('[data-copy-key]').forEach(btn => {
      const v = cfg[btn.getAttribute('data-copy-key')];
      if (v) btn.setAttribute('data-copy', v);
    });
    // Ảnh bìa từ ảnh người dùng tải (vị trí 0)
    try {
      const p0 = localStorage.getItem('shini.mau.thiep-cuoi-hien-dai.photo.0');
      const cover = document.querySelector('#welcome img[data-src]');
      if (p0 && cover) { cover.setAttribute('data-src', p0); cover.setAttribute('src', p0); }
    } catch (e) { /* bỏ qua */ }
    // Ẩn thẻ mừng cưới nếu chưa nhập thông tin tài khoản
    if (!cfg.soTaiKhoan && !cfg.soDienThoai) {
      document.querySelectorAll('section').forEach(sec => {
        if (sec.querySelector('h2') && sec.querySelector('h2').textContent.trim() === 'Mừng cưới') sec.style.display = 'none';
      });
    }
  });
})();
