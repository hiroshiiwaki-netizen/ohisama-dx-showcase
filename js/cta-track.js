/**
 * 相談ボタンとフォーム送信の計測（GA4）
 * 見たいイベント: consult_click / generate_lead
 */
(function () {
  function destType(href) {
    try {
      var t = new URL(href, location.href).searchParams.get('type');
      if (t === 'visit' || t === 'consult' || t === 'guide') return t;
    } catch (e) {}
    return 'other';
  }

  function isContactLink(a) {
    if (!a) return false;
    var raw = a.getAttribute('href') || '';
    if (/contact\/?/i.test(raw)) return true;
    try {
      return /\/contact\/?$/i.test(new URL(a.href, location.href).pathname);
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a || !isContactLink(a)) return;
    if (typeof gtag !== 'function') return;
    var text = (a.textContent || '').replace(/\s+/g, ' ').trim();
    gtag('event', 'consult_click', {
      link_text: text.slice(0, 80),
      dest_type: destType(a.href),
      page_path: location.pathname
    });
  }, true);

  window.ohisamaTrackLead = function (type) {
    if (typeof gtag !== 'function') return;
    gtag('event', 'generate_lead', {
      dest_type: type || 'form',
      page_path: location.pathname
    });
  };
})();
