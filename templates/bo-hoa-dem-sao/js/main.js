// Lời chúc gõ chữ bên bó hoa — lấy từ cấu hình người dùng (an toàn: textContent).
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove('not-loaded');
    const cfg = window.TPL_CFG || {};
    const text = (cfg.loiChucNgan && String(cfg.loiChucNgan).trim()) || 'THƯƠNG BẠN NHIỀU';
    const titleElement = document.getElementById('title');
    let index = 0;
    function appendTitle() {
      if (index < text.length) {
        titleElement.textContent += text[index];
        index++;
        setTimeout(appendTitle, 220);
      }
    }
    appendTitle();
    clearTimeout(c);
  }, 1000);
};
