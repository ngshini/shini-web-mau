// Logic riêng của mẫu thiệp cưới: ngày cưới, đếm ngược, bản đồ, lịch, xác nhận tham dự, ảnh câu chuyện.
// Nội dung lấy từ window.TPL_CFG (cau-hinh.js) — luôn gán qua textContent/setAttribute, không innerHTML.
(() => {
  'use strict';
  const cfg = window.TPL_CFG || {};
  const MAU_ID = 'thiep-cuoi-co-dien';
  const THU = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  function parseDate() {
    const raw = (cfg.ngayCuoi || '2026-11-15') + 'T' + ((cfg.gioLe || '09:00') + ':00');
    const d = new Date(raw);
    return isNaN(d) ? new Date('2026-11-15T09:00:00') : d;
  }
  const ngay = parseDate();

  // Hiển thị ngày theo định dạng Việt Nam
  const heroDate = document.getElementById('heroDate');
  if (heroDate) heroDate.textContent = THU[ngay.getDay()] + ', ngày ' + ngay.getDate() + ' tháng ' + (ngay.getMonth() + 1) + ' năm ' + ngay.getFullYear();
  const wdWeekday = document.getElementById('wdWeekday');
  if (wdWeekday) wdWeekday.textContent = THU[ngay.getDay()];
  const wdDay = document.getElementById('wdDay');
  if (wdDay) wdDay.textContent = String(ngay.getDate());
  const wdMonthYear = document.getElementById('wdMonthYear');
  if (wdMonthYear) wdMonthYear.textContent = 'Tháng ' + (ngay.getMonth() + 1) + ' · ' + ngay.getFullYear();
  document.title = 'Thiệp cưới — ' + (cfg.coDau || 'Cô Dâu') + ' & ' + (cfg.chuRe || 'Chú Rể');

  // Đếm ngược (plugin countdown của bản gốc, nhãn tiếng Việt, không alert khi hết giờ)
  function fmtPluginDate(d) {
    const p = n => String(n).padStart(2, '0');
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':00';
  }
  if (window.jQuery && jQuery.fn.countdown) {
    jQuery('#hitungmundur').countdown({
      date: fmtPluginDate(ngay),
      offset: +7,
      day: 'Ngày', days: 'Ngày', hour: 'Giờ', hours: 'Giờ',
      minute: 'Phút', minutes: 'Phút', second: 'Giây', seconds: 'Giây'
    }, function () { /* Đã đến ngày cưới — giữ nguyên 00, không bật alert */ });
  }

  // Bản đồ: nhúng + nút chỉ đường theo địa chỉ người dùng nhập
  const diaChi = (cfg.diaChi || '').trim();
  const diaDiem = (cfg.diaDiem || '').trim();
  const truyVan = encodeURIComponent([diaDiem, diaChi].filter(Boolean).join(', ') || 'TP. Hồ Chí Minh');
  const mapFrame = document.getElementById('mapFrame');
  if (mapFrame) mapFrame.setAttribute('src', 'https://www.google.com/maps?q=' + truyVan + '&output=embed');
  const mapBtn = document.getElementById('mapBtn');
  if (mapBtn) mapBtn.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + truyVan);

  // Lưu vào Google Calendar
  const calBtn = document.getElementById('calendarBtn');
  if (calBtn) {
    const p = n => String(n).padStart(2, '0');
    const stamp = d => d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + 'T' + p(d.getHours()) + p(d.getMinutes()) + '00';
    const end = new Date(ngay.getTime() + 2 * 3600 * 1000);
    const tieuDe = encodeURIComponent('Lễ cưới ' + (cfg.coDau || '') + ' & ' + (cfg.chuRe || ''));
    const chiTiet = encodeURIComponent('Lễ vu quy: ' + (cfg.gioLe || '') + ' · Tiệc cưới: ' + (cfg.gioTiec || ''));
    const dd = encodeURIComponent([diaDiem, diaChi].filter(Boolean).join(', '));
    calBtn.setAttribute('href', 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + tieuDe + '&dates=' + stamp(ngay) + '/' + stamp(end) + '&details=' + chiTiet + '&location=' + dd);
  }

  // Xác nhận tham dự qua WhatsApp (chức năng thật: mở WhatsApp với lời nhắn soạn sẵn).
  // Chưa nhập số điện thoại → ẩn cả 2 nút, không để nút giả.
  function chuanHoaSDT(raw) {
    let s = String(raw || '').replace(/[^0-9]/g, '');
    if (s.startsWith('0')) s = '84' + s.slice(1);
    return s;
  }
  const sdt = chuanHoaSDT(cfg.soDienThoai);
  const loiNhan = encodeURIComponent('Xin chào, tôi xác nhận sẽ đến dự lễ cưới của ' + (cfg.coDau || 'cô dâu') + ' & ' + (cfg.chuRe || 'chú rể') + ' vào ' + heroDate.textContent + '.');
  ['rsvpDau', 'rsvpRe'].forEach(idEl => {
    const a = document.getElementById(idEl);
    if (!a) return;
    if (sdt) a.setAttribute('href', 'https://wa.me/' + sdt + '?text=' + loiNhan);
    else a.hidden = true;
  });

  // Ảnh câu chuyện: 6 vị trí, áp dụng ảnh người dùng tải (giữ lớp phủ gradient của thiết kế gốc)
  try {
    const tiles = document.querySelectorAll('#tentang-pasangan article');
    tiles.forEach((tile, i) => {
      const data = localStorage.getItem('shini.mau.' + MAU_ID + '.photo.' + i);
      if (data) tile.style.backgroundImage = 'linear-gradient(rgba(95, 2, 2, 0.5), rgba(48, 47, 47, 0.9)), url("' + data + '")';
    });
  } catch (e) { /* Không có ảnh tùy chỉnh — dùng ảnh gốc của mẫu */ }
})();
