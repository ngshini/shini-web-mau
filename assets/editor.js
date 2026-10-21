(() => {
  'use strict';
  const id = new URLSearchParams(location.search).get('mau');
  const tpl = (window.CATALOG || []).find(t => t.id === id);
  const $ = s => document.querySelector(s);

  if (!tpl || tpl.trangThai !== 'da-tich-hop') {
    $('#tplName').textContent = 'Không tìm thấy mẫu để chỉnh sửa';
    $('#tplMeta').textContent = 'Mẫu này chưa được tích hợp hoặc chỉ dùng tham chiếu. Quay lại bộ sưu tập để chọn mẫu khác.';
    $('#editForm').innerHTML = '';
    document.querySelector('.preview-panel').hidden = true;
    return;
  }

  $('#tplName').textContent = 'Chỉnh mẫu: ' + tpl.ten;
  $('#tplMeta').textContent = 'Nguồn: ' + tpl.nguon.repo + ' · Commit: ' + tpl.nguon.commit + ' · Giấy phép: ' + tpl.nguon.license;

  const cfgKey = 'shini.mau.' + tpl.id + '.cfg';
  const photoKey = i => 'shini.mau.' + tpl.id + '.photo.' + i;
  const MAX_FILE = 20 * 1024 * 1024;

  function defaults() {
    const d = {};
    tpl.fields.forEach(f => { d[f.key] = f.macDinh; });
    return d;
  }
  function loadCfg() {
    try {
      const raw = localStorage.getItem(cfgKey);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) { /* bỏ qua dữ liệu hỏng */ }
    return defaults();
  }
  let cfg = loadCfg();

  // ---- Form chữ ----
  const form = $('#editForm');
  const inputs = {};
  tpl.fields.forEach(f => {
    const wrap = document.createElement('div');
    wrap.className = 'field';
    const label = document.createElement('label');
    label.htmlFor = 'f-' + f.key;
    label.textContent = f.label;
    let input;
    if (f.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 5;
    } else {
      input = document.createElement('input');
      input.type = f.type === 'text' ? 'text' : f.type;
    }
    input.id = 'f-' + f.key;
    input.maxLength = f.max || 500;
    input.value = cfg[f.key] || '';
    input.addEventListener('input', () => { cfg[f.key] = input.value; refreshPreview(); });
    inputs[f.key] = input;
    wrap.append(label, input);
    form.appendChild(wrap);
  });

  // ---- Ảnh ----
  const photoBlock = $('#photoBlock');
  const slotsEl = $('#photoSlots');
  const photos = [];
  if (tpl.photos > 0) {
    photoBlock.hidden = false;
    $('#photoHint').textContent = 'Mẫu này có ' + tpl.photos + ' vị trí ảnh. Chọn ảnh từ máy (tối đa 20MB/ảnh), ảnh được tự nén và lưu trên trình duyệt này.';
    for (let i = 0; i < tpl.photos; i++) {
      photos.push(localStorage.getItem(photoKey(i)) || '');
      const slot = document.createElement('div');
      slot.className = 'photo-slot';
      const img = document.createElement('img');
      img.alt = (tpl.photoLabels && tpl.photoLabels[i]) || ('Ảnh vị trí ' + (i + 1));
      img.width = 320; img.height = 200;
      const file = document.createElement('input');
      file.type = 'file'; file.accept = 'image/*';
      file.id = 'photo-' + i;
      file.setAttribute('aria-label', 'Tải ảnh cho ' + ((tpl.photoLabels && tpl.photoLabels[i]) || ('vị trí ' + (i + 1))));
      const del = document.createElement('button');
      del.type = 'button'; del.className = 'btn small'; del.textContent = 'Xóa ảnh';
      const render = () => {
        if (photos[i]) { img.src = photos[i]; img.hidden = false; del.disabled = false; }
        else { img.removeAttribute('src'); img.hidden = true; del.disabled = true; }
      };
      file.addEventListener('change', async () => {
        const f = file.files[0];
        if (!f) return;
        if (f.size > MAX_FILE) { setStatus('Ảnh quá lớn (tối đa 20MB).'); return; }
        try {
          photos[i] = await preparePhoto(f);
          localStorage.setItem(photoKey(i), photos[i]);
          render(); refreshPreview(); setStatus('Đã cập nhật ảnh ' + (i + 1) + '.');
        } catch (e) { setStatus('Không đọc được ảnh này, hãy thử ảnh khác.'); }
        file.value = '';
      });
      del.addEventListener('click', () => {
        photos[i] = '';
        localStorage.removeItem(photoKey(i));
        render(); refreshPreview(); setStatus('Đã xóa ảnh ' + (i + 1) + '.');
      });
      slot.append(img, file, del);
      slotsEl.appendChild(slot);
      render();
    }
  }

  async function preparePhoto(file) {
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const scale = Math.min(1, 1024 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.85);
    } finally { URL.revokeObjectURL(url); }
  }

  // ---- Link chia sẻ / xem trước ----
  function encoded() {
    const json = JSON.stringify(cfg);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function templateURL() {
    return new URL(tpl.duongDan, location.href).href;
  }
  function refreshPreview() {
    const link = templateURL() + '#c=' + encoded();
    $('#preview').src = link;
    $('#openFull').href = link;
    $('#shareLink').value = link;
    const box = $('#qrBox');
    box.textContent = '';
    try {
      if (window.qrcode) {
        const q = window.qrcode(0, 'L'); // Tạo mới mỗi lần — tái sử dụng object sẽ cộng dồn dữ liệu và tràn QR
        q.addData(link); q.make();
        box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 8, scalable: true });
      }
    } catch (e) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.textContent = 'Link quá dài để tạo mã QR, hãy dùng nút Sao chép link.';
      box.appendChild(p);
    }
  }

  function setStatus(msg) { $('#saveStatus').textContent = msg; }

  $('#saveBtn').addEventListener('click', () => {
    try {
      localStorage.setItem(cfgKey, JSON.stringify(cfg));
      setStatus('Đã lưu. Nội dung sẽ tự được áp dụng mỗi lần mở mẫu trên trình duyệt này.');
      refreshPreview();
    } catch (e) { setStatus('Trình duyệt không lưu được (có thể do chế độ riêng tư). Link chia sẻ vẫn dùng được.'); }
  });
  $('#resetBtn').addEventListener('click', () => {
    cfg = defaults();
    tpl.fields.forEach(f => { inputs[f.key].value = cfg[f.key]; });
    localStorage.removeItem(cfgKey);
    refreshPreview();
    setStatus('Đã khôi phục nội dung mặc định của mẫu.');
  });
  $('#copyBtn').addEventListener('click', async () => {
    const link = $('#shareLink').value;
    try { await navigator.clipboard.writeText(link); $('#shareStatus').textContent = 'Đã sao chép link.'; }
    catch (e) { $('#shareLink').select(); $('#shareStatus').textContent = 'Hãy sao chép thủ công link trong ô phía trên.'; }
  });

  refreshPreview();
})();
