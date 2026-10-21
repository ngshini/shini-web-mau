(() => {
  'use strict';
  const grid = document.getElementById('grid');
  const filters = document.getElementById('filters');
  const emptyNote = document.getElementById('emptyNote');
  let active = 'tat-ca';

  function renderFilters() {
    filters.textContent = '';
    window.NHOM.forEach(n => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = n.label;
      b.className = 'chip' + (n.id === active ? ' is-active' : '');
      b.setAttribute('aria-pressed', String(n.id === active));
      b.addEventListener('click', () => { active = n.id; renderFilters(); renderGrid(); });
      filters.appendChild(b);
    });
  }

  function renderGrid() {
    grid.textContent = '';
    const items = window.CATALOG.filter(t => active === 'tat-ca' || t.nhom === active);
    emptyNote.hidden = items.length > 0;
    items.forEach(t => {
      const card = document.createElement('article');
      card.className = 'card';
      const img = document.createElement('img');
      img.src = t.thumb; img.alt = 'Ảnh chụp mẫu ' + t.ten; img.loading = 'lazy'; img.width = 640; img.height = 420;
      const body = document.createElement('div'); body.className = 'card-body';
      const tag = document.createElement('p'); tag.className = 'tag'; tag.textContent = t.nhomLabel;
      const h = document.createElement('h2'); h.textContent = t.ten;
      const p = document.createElement('p'); p.className = 'desc'; p.textContent = t.moTa;
      const meta = document.createElement('p'); meta.className = 'meta';
      meta.textContent = 'Nguồn: ' + t.nguon.repo + ' · Giấy phép: ' + t.nguon.license;
      const actions = document.createElement('div'); actions.className = 'actions';
      const preview = document.createElement('a');
      preview.className = 'btn primary'; preview.href = t.duongDan; preview.textContent = 'Xem trước';
      preview.setAttribute('aria-label', 'Xem trước mẫu ' + t.ten);
      actions.appendChild(preview);
      if (t.trangThai === 'da-tich-hop') {
        const edit = document.createElement('a');
        edit.className = 'btn'; edit.href = 'chinh-sua.html?mau=' + encodeURIComponent(t.id);
        edit.textContent = 'Chọn & chỉnh mẫu';
        actions.appendChild(edit);
      } else {
        const badge = document.createElement('span');
        badge.className = 'badge'; badge.textContent = 'Chỉ tham chiếu — không bán';
        actions.appendChild(badge);
      }
      body.append(tag, h, p, meta, actions);
      card.append(img, body);
      grid.appendChild(card);
    });
  }

  renderFilters();
  renderGrid();
})();
