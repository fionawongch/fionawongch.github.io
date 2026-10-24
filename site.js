/* =========================================================
   黃紫紅網站 — 共用功能
   1. 頁尾（版權、網頁鳴謝及私隱政策連結）：修改下面的 FOOTER_HTML 即可更新所有頁面
   2. 導覽列自動標示目前頁面
   3. 「回頁頂」按鈕
   4. 點擊圖片放大
   ========================================================= */

const FOOTER_HTML = `
  <p>
    <span>版權所有 © ${new Date().getFullYear()} 黃紫紅</span>
    <a href="credits.html">網頁鳴謝</a>
    <a href="privacy.html">私隱政策</a>
  </p>
`;

document.addEventListener('DOMContentLoaded', () => {
  /* 1. 頁尾 */
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = `<div class="footer-inner">${FOOTER_HTML}</div>`;

  /* 2. 導覽列：標示目前頁面 */
  const page = s => (s.split('/').pop() || 'index').replace(/\.html$/, '');
  const here = page(location.pathname);
  document.querySelectorAll('#nav_buttons a').forEach(a => {
    if (page(a.getAttribute('href')) === here) a.setAttribute('aria-current', 'page');
  });

  /* 3. 回頁頂按鈕：向下捲動一段距離後出現 */
  const btn = document.createElement('button');
  btn.id = 'to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', '回頁頂');
  btn.title = '回頁頂';
  btn.textContent = '↑';
  btn.addEventListener('click', () => window.scrollTo({ top: 0 }));
  document.body.appendChild(btn);

  let ticking = false;
  const update = () => {
    btn.classList.toggle('show', window.scrollY > 500);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  /* 4. 點擊圖片放大（適用於 .media 及 .poster-grid 內的圖片） */
  const imgs = document.querySelectorAll('.media img, .poster-grid img');
  if (imgs.length && typeof HTMLDialogElement === 'function') {
    const box = document.createElement('dialog');
    box.id = 'lightbox';
    box.innerHTML = '<img alt="">';
    document.body.appendChild(box);
    const big = box.querySelector('img');
    box.addEventListener('click', () => box.close());

    imgs.forEach(img => {
      img.classList.add('zoomable');
      img.addEventListener('click', () => {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.showModal();
      });
    });
  }
});
