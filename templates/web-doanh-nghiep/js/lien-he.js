// Nút liên hệ của mẫu Agency: cập nhật địa chỉ mailto theo email trong cấu hình.
(() => {
  'use strict';
  const cfg = window.TPL_CFG || {};
  const btn = document.getElementById('contactMailBtn');
  if (btn && cfg.email) btn.setAttribute('href', 'mailto:' + cfg.email.trim() + '?subject=' + encodeURIComponent('Yêu cầu tư vấn dự án'));
})();
