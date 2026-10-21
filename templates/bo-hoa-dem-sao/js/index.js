// Tiêu đề gõ chữ ở trang mở đầu — lấy từ cấu hình người dùng (an toàn: dùng textContent).
(() => {
  const cfg = window.TPL_CFG || {};
  const text = (cfg.tieuDe && String(cfg.tieuDe).trim()) || 'Mình có điều muốn nói';
  const title = document.querySelector('.title');
  title.style.display = 'flex';
  title.style.flexWrap = 'wrap';
  title.style.justifyContent = 'center';
  title.style.gap = '0.5rem';
  [...text].forEach(ch => {
    const span = document.createElement('span');
    if (ch === ' ') span.style.width = '1rem';
    else span.textContent = ch;
    title.appendChild(span);
  });
  title.querySelectorAll('span').forEach(el => {
    el.style.animationDelay = (Math.random() * 3) + 's';
  });
  // Giữ cấu hình khi chuyển sang trang hoa (dự phòng thêm vào sessionStorage qua cau-hinh.js).
  const btn = document.querySelector('a.btn');
  if (btn && location.hash) btn.href = 'flower.html' + location.hash;
})();
