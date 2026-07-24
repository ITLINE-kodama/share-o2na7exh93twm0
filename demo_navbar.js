/* 日程マスタ系デモに、本部HP（designD）と同じグローバルナビを差し込む共通スクリプト。
   designD のヘッダーHTMLとスタイルを実際に読み込んで使うため、メガメニューもそのまま動く。
   Shadow DOM に入れてデモ側のCSSと混ざらないようにしている。
   利用者画面のときだけ表示し、職員管理モード（body.admin）と埋め込み（body.embed）では隠す。
   使い方：<script src="../demo_navbar.js" data-back="qualification/career/renewal/" data-back-label="更新講習のページ"></script> */
(function () {
  var me = document.currentScript;
  var back = (me && me.dataset.back) || '';
  var backLabel = (me && me.dataset.backLabel) || '講座ページ';
  var crumb = (me && me.dataset.crumb) || '会場・日程一覧';

  var SRC = '../designD/index.html';                 // ヘッダーの取得元
  var CSS = '../designD/assets/style.css';
  var baseURL = new URL(SRC, location.href);         // 相対リンクの解決基準

  var MENU = [
    ['相談する', 'counseling/'],
    ['資格・講座', 'qualification/'],
    ['試験情報', 'examination/'],
    ['法人向け', 'company/'],
    ['会員・入会', 'member/'],
    ['協会について', 'about/'],
    ['ニュース', 'news/'],
    ['研究・刊行物', 'library/']
  ];

  /* 画面下のパンくず＋戻るリンク（デモ側の文書に置く） */
  var barCss = ''
    + '.jnavhost{display:block;position:sticky;top:0;z-index:100}'
    + 'body.admin .jnavhost,body.embed .jnavhost{display:none}'
    + '.jback{background:#f5f9f6;border-bottom:1px solid #e2e9e3}'
    + 'body.admin .jback,body.embed .jback{display:none}'
    + '.jback .in{max-width:1200px;margin:0 auto;padding:8px 24px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12.5px;color:#5c6b63}'
    + '.jback a{color:#1c7c2f;font-weight:800;text-decoration:none}'
    + '.jback a:hover{text-decoration:underline}';

  /* designD が読めなかったときの簡易ナビ（オフライン等の保険） */
  var fbCss = ''
    + '.jnav{background:#fff;border-bottom:1px solid #e2e9e3}'
    + '.jnav .in{max-width:1200px;margin:0 auto;padding:10px 24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}'
    + '.jnav .lg img{height:30px;display:block}'
    + '.jnav ul{list-style:none;display:flex;gap:2px;margin:0;padding:0;flex-wrap:wrap;flex:1;min-width:0}'
    + '.jnav ul a{display:block;padding:7px 11px;font-size:13px;font-weight:700;color:#243024;text-decoration:none;border-radius:8px;white-space:nowrap}'
    + '.jnav ul a:hover{background:#eef7f0;color:#1c7c2f}'
    + '.jnav .rt{display:flex;gap:8px}'
    + '.jnav .rt a{font-size:12.5px;font-weight:800;text-decoration:none;border-radius:999px;padding:8px 16px;white-space:nowrap;color:#fff}'
    + '.jnav .rt .b1{background:#eab010}.jnav .rt .b2{background:#1c7c2f}';

  function abs(u) {                                   // designD 基準の相対URLを実URLへ
    if (!u) return u;
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(u)) return u;
    try { return new URL(u, baseURL).href; } catch (e) { return u; }
  }

  function fixLinks(root) {
    root.querySelectorAll('[href]').forEach(function (a) { a.setAttribute('href', abs(a.getAttribute('href'))); });
    root.querySelectorAll('[src]').forEach(function (i) { i.setAttribute('src', abs(i.getAttribute('src'))); });
  }

  function breadcrumb() {
    var bar = document.createElement('div');
    bar.className = 'jback';
    bar.innerHTML = '<div class="in">'
      + '<a href="' + abs('index.html') + '">トップ</a><span>›</span>'
      + (back ? '<a href="' + abs(back) + '">' + backLabel + '</a><span>›</span>' : '')
      + '<span>' + crumb + '</span>'
      + (back ? '<a style="margin-left:auto" href="' + abs(back) + '">← ' + backLabel + 'へ戻る</a>' : '')
      + '</div>';
    return bar;
  }

  function fallback() {                               // 取得失敗時：リンクだけの簡易ナビ
    var st = document.createElement('style');
    st.textContent = fbCss;
    document.head.appendChild(st);
    var nav = document.createElement('header');
    nav.className = 'jnavhost jnav';
    nav.innerHTML = '<div class="in">'
      + '<a class="lg" href="' + abs('index.html') + '"><img src="' + abs('../images/logo.png') + '" alt="一般社団法人日本産業カウンセラー協会"></a>'
      + '<ul>' + MENU.map(function (m) { return '<li><a href="' + abs(m[1]) + '">' + m[0] + '</a></li>'; }).join('') + '</ul>'
      + '<div class="rt"><a class="b1" href="' + abs('member/join/') + '">入会案内</a>'
      + '<a class="b2" href="' + abs('contact/') + '">お問い合わせ</a></div></div>';
    document.body.insertBefore(breadcrumb(), document.body.firstChild);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* designD のヘッダーをそのまま持ってくる（メガメニュー込み） */
  function mount(html, css) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var hd = doc.querySelector('header.hd');
    var mnav = doc.querySelector('.mnav');
    if (!hd) { fallback(); return; }
    fixLinks(hd);
    if (mnav) fixLinks(mnav);

    var host = document.createElement('div');
    host.className = 'jnavhost';
    var sh = host.attachShadow({ mode: 'open' });

    var st = document.createElement('style');
    /* :root の変数は Shadow 内では効かないので :host に読み替える。
       ヘッダーは host 側で sticky にするので、中の sticky は解除する。 */
    st.textContent = css.split(':root').join(':host')
      + String.fromCharCode(10) + ':host{display:block;font-family:"Noto Sans JP",-apple-system,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.85}'
      + String.fromCharCode(10) + '.hd{position:static;box-shadow:0 2px 14px rgba(20,70,38,.06)}'
      + String.fromCharCode(10) + 'img{max-width:100%;display:block}a{color:inherit;text-decoration:none}ul{list-style:none}';
    sh.appendChild(st);
    sh.appendChild(hd);
    if (mnav) sh.appendChild(mnav);

    /* メガメニュー内「＋」の下層展開（designD の app.js と同じ動き） */
    sh.querySelectorAll('.mega .mg-tgl').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var mega = btn.closest('.mega');
        var item = btn.closest('.mg-item');
        var key = btn.dataset.sub;
        var panel = mega.querySelector('.mg-sub[data-panel="' + key + '"]');
        var wasOpen = item.classList.contains('open');
        mega.querySelectorAll('.mg-item.open').forEach(function (o) { o.classList.remove('open'); });
        mega.querySelectorAll('.mg-sub.show').forEach(function (s) { s.classList.remove('show'); });
        if (!wasOpen) { item.classList.add('open'); if (panel) panel.classList.add('show'); }
      });
    });
    /* スマホ用メニュー */
    var mb = sh.querySelector('.menu-btn');
    if (mb && mnav) {
      mb.addEventListener('click', function () { mnav.classList.toggle('open'); });
      var x = mnav.querySelector('.x');
      if (x) x.addEventListener('click', function () { mnav.classList.remove('open'); });
    }

    var st2 = document.createElement('style');
    st2.textContent = barCss;
    document.head.appendChild(st2);
    document.body.insertBefore(breadcrumb(), document.body.firstChild);
    document.body.insertBefore(host, document.body.firstChild);
  }

  function build() {
    if (document.querySelector('.jnavhost')) return;
    var st = document.createElement('style');
    st.textContent = barCss;
    document.head.appendChild(st);
    Promise.all([
      fetch(SRC).then(function (r) { return r.text(); }),
      fetch(CSS).then(function (r) { return r.text(); })
    ]).then(function (a) { mount(a[0], a[1]); }).catch(function () { fallback(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
