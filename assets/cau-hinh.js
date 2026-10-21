// Cầu nối cấu hình chung cho mọi mẫu đã tích hợp.
// Đọc nội dung người dùng nhập từ: 1) link chia sẻ #c=<base64url JSON>, 2) localStorage của trình chỉnh sửa.
// Áp dụng bằng textContent (không bao giờ innerHTML) để nội dung người dùng không thể chạy như HTML/JS.
(() => {
  'use strict';
  const script = document.currentScript;
  const mauId = script.getAttribute('data-mau') || '';
  const goc = script.getAttribute('data-goc') || '../../';

  function decodeHash() {
    const m = location.hash.match(/#c=([A-Za-z0-9_-]+)/);
    if (!m) return null;
    try {
      const b64 = m[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(escape(atob(b64)));
      const obj = JSON.parse(json);
      // Lưu lại để các trang con của mẫu (cùng thư mục) dùng chung khi điều hướng nội bộ.
      try { sessionStorage.setItem('shini.mau.' + mauId + '.hashcfg', JSON.stringify(obj)); } catch (e) {}
      return obj;
    } catch (e) { return null; }
  }
  function fromSession() {
    try {
      const raw = sessionStorage.getItem('shini.mau.' + mauId + '.hashcfg');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function fromLocal() {
    try {
      const raw = localStorage.getItem('shini.mau.' + mauId + '.cfg');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  let cfg = decodeHash() || fromSession() || fromLocal() || {};
  window.TPL_CFG = cfg;
  window.TPL_MAU_ID = mauId;

  function apply() {
    document.querySelectorAll('[data-bind]').forEach(el => {
      const key = el.getAttribute('data-bind');
      if (cfg[key] != null && cfg[key] !== '') el.textContent = cfg[key];
    });
    document.querySelectorAll('[data-photo]').forEach(el => {
      const i = el.getAttribute('data-photo');
      try {
        const data = localStorage.getItem('shini.mau.' + mauId + '.photo.' + i);
        if (data) el.setAttribute('src', data);
      } catch (e) {}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  // Khi link thay đổi phần #c= ngay trong cùng trang (không tải lại), áp dụng lại cấu hình mới.
  window.addEventListener('hashchange', () => {
    const h = decodeHash();
    if (h) { cfg = h; window.TPL_CFG = cfg; apply(); }
  });

  // Khi trình chỉnh sửa (cùng nguồn) lưu nội dung/ảnh, sự kiện storage giúp bản xem trước cập nhật ngay không cần tải lại trang.
  window.addEventListener('storage', (e) => {
    if (!e.key || e.key.indexOf('shini.mau.' + mauId + '.') !== 0) return;
    if (e.key.endsWith('.cfg')) { try { cfg = JSON.parse(e.newValue || '{}'); window.TPL_CFG = cfg; } catch (err) {} }
    apply();
  });

  // Thanh điều hướng của mẫu: quay lại bộ sưu tập + chỉnh mẫu này.
  function bar() {
    if (document.getElementById('shiniTplBar')) return;
    const bar = document.createElement('div');
    bar.id = 'shiniTplBar';
    bar.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:9999;display:flex;gap:8px;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;';
    const mk = (href, text, primary) => {
      const a = document.createElement('a');
      a.href = href; a.textContent = text;
      a.style.cssText = 'padding:9px 16px;border-radius:999px;font-size:14px;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.25);' +
        (primary ? 'background:#1d4ed8;color:#fff;' : 'background:rgba(255,255,255,.95);color:#1e293b;border:1px solid #cbd5e1;');
      return a;
    };
    bar.append(
      mk(goc + 'index.html', '← Bộ sưu tập'),
      mk(goc + 'chinh-sua.html?mau=' + encodeURIComponent(mauId), 'Chỉnh mẫu này', true)
    );
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bar);
  else bar();
})();
