// Logic riêng của mẫu Portfolio vCard: bản đồ theo địa chỉ + form liên hệ mở ứng dụng thư (mailto) — không gửi dữ liệu lên máy chủ nào.
(() => {
  'use strict';
  const cfg = window.TPL_CFG || {};
  const diaChi = (cfg.diaChi || 'Quận 1, TP. Hồ Chí Minh').trim();
  const map = document.getElementById('mapFrame');
  if (map) map.setAttribute('src', 'https://www.google.com/maps?q=' + encodeURIComponent(diaChi) + '&output=embed');

  const form = document.querySelector('[data-form]');
  if (form) {
    const note = document.createElement('p');
    note.style.cssText = 'color:#9ca3af;font-size:13px;margin-top:10px;';
    note.textContent = 'Form này mở ứng dụng thư trên máy của bạn để gửi tới địa chỉ email trong hồ sơ — website không lưu lại nội dung tin nhắn.';
    form.appendChild(note);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ten = form.querySelector('input[name="fullname"]');
      const email = form.querySelector('input[name="email"]');
      const nd = form.querySelector('textarea[name="message"]');
      const den = (cfg.email || 'lienhe@example.com').trim();
      const tieuDe = encodeURIComponent('Liên hệ từ portfolio — ' + (ten ? ten.value : ''));
      const than = encodeURIComponent((nd ? nd.value : '') + '\n\n— ' + (ten ? ten.value : '') + ' (' + (email ? email.value : '') + ')');
      window.location.href = 'mailto:' + den + '?subject=' + tieuDe + '&body=' + than;
    });
  }
})();
