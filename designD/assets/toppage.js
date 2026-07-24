/* TOPページ反映スクリプト（職員管理ポータル「トップページ管理」demo_toppage と localStorage[jaico_toppage_v1] で連動）
   ※ app.js より前に読み込むこと（カルーセル初期化前にDOMを差し替える）*/
(function(){
  (function(){try{var q=location.search;
    if(/[?&]preview=1/.test(q)) sessionStorage.setItem('jaico_preview','1');
    if(/[?&]preview=0/.test(q)) sessionStorage.removeItem('jaico_preview');}catch(e){}})();
  function isPreview(){ try{ return sessionStorage.getItem('jaico_preview')==='1'; }catch(e){ return false; } }
  function pickCfg(){ var c=null; try{ var r=localStorage.getItem('jaico_toppage_v1'); if(r){ var j=JSON.parse(r);
    if(isPreview() && j && j.draft) c=j.draft; else if(j && j.published) c=j.published; } }catch(e){} return c; }
  function previewBar(){ if(!isPreview()) return; if(document.getElementById('jaicoPvBar')) return;
    var b=document.createElement('div'); b.id='jaicoPvBar';
    b.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#8a6d00;color:#fff;font-weight:700;font-size:13px;line-height:1.6;padding:9px 16px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;box-shadow:0 -3px 14px rgba(0,0,0,.2)';
    b.innerHTML='<span>👁 下書きプレビュー中です（この表示は利用者には公開されていません）</span>'
      +'<a href="?preview=0" style="background:#fff;color:#8a6d00;border-radius:999px;padding:4px 14px;text-decoration:none">公開中の内容を見る</a>';
    document.body.appendChild(b); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',previewBar); else previewBar();
  var cfg=pickCfg();
  if(!cfg) return;
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function head(h){ return esc(h).replace(/\n/g,'<br>').replace(/\*([^*]+)\*/g,'<em>$1</em>'); }
  /* 画像の表示方法（管理画面で指定・既定は「全体を表示」＝切れない） */
  function fitOf(o){ return (o&&o.fit==='cover') ? 'cover' : 'contain'; }
  function imgsrc(v){ v=String(v||''); return (/^(data:|https?:|\/)/.test(v)) ? v : ('../images/'+v); }
  function view(src,n){ if(n.link && String(n.link).trim()) return n.link; return n.id ? ('news/view/?src='+src+'&id='+encodeURIComponent(n.id)) : 'news/'; }

  /* ===== ① ヒーロー・カルーセル ===== */
  if(cfg.carousel && cfg.carousel.length){
    var tx=document.querySelector('.hero .tx'), vis=document.querySelector('.hero .vis'), dots=document.querySelector('.hero .dots');
    if(tx && vis){
      tx.querySelectorAll('[data-copy]').forEach(function(e){e.remove();});
      vis.querySelectorAll('.sl').forEach(function(e){e.remove();});
      var bs=tx.querySelector('.bs'), badge=vis.querySelector('.badge');
      if(dots) dots.innerHTML='';
      cfg.carousel.forEach(function(s,i){
        var cp=document.createElement('div'); cp.setAttribute('data-copy',''); if(i>0) cp.style.display='none';
        cp.innerHTML='<h1>'+head(s.h)+'</h1><p class="lead">'+esc(s.lead)+'</p>';
        tx.insertBefore(cp, bs);
        var sl=document.createElement('div'); sl.className='sl'+(i===0?' on':'');
        sl.innerHTML='<img src="'+imgsrc(s.img)+'" alt="" style="object-fit:'+fitOf(s)+'">';
        vis.insertBefore(sl, badge);
        if(dots){ var d=document.createElement('button'); if(i===0) d.className='on'; d.setAttribute('aria-label',String(i+1)); dots.appendChild(d); }
      });
    }
  }

  /* ===== ② 募集バナー（4枠・表示ONのみ） ===== */
  if(cfg.banners){
    var grid=document.querySelector('.bnrstrip .bn-grid');
    if(grid){
      grid.innerHTML='';
      cfg.banners.filter(function(b){return b.on!==false;}).forEach(function(b){
        var a=document.createElement('a'); a.href=b.link||'#'; a.title=b.alt||'';
        a.innerHTML='<img src="'+imgsrc(b.img)+'" alt="'+esc(b.alt)+'" style="object-fit:'+fitOf(b)+'">';
        grid.appendChild(a);
      });
    }
  }

  /* ===== ③ 重要なお知らせ（アーカイブ済みは除外） ===== */
  if(cfg.important){
    var ul=document.querySelector('.alert-list');
    if(ul){
      ul.innerHTML='';
      cfg.important.filter(function(n){return !n.archived;}).slice(0,3).forEach(function(n){
        var li=document.createElement('li');
        li.innerHTML='<a href="'+view('important',n)+'"><span class="tag '+(n.cls||'info')+'">'+esc(n.cat)+'</span><time>'+esc(n.date)+'</time><span class="ti">'+esc(n.title)+'</span><span class="chev">›</span></a>';
        ul.appendChild(li);
      });
    }
  }

  /* ===== ③ 新着お知らせ（アーカイブ済みは除外） ===== */
  if(cfg.news){
    var nl=document.querySelector('.news .nlist');
    if(nl){
      nl.innerHTML='';
      cfg.news.filter(function(n){return !n.archived;}).forEach(function(n){
        var a=document.createElement('a'); a.href=view('news',n); a.setAttribute('data-c', n.cls||'t1'); if(n.imp) a.className='imp';
        a.innerHTML='<time>'+esc(n.date)+'</time><span class="tag '+(n.cls||'t1')+'">'+esc(n.cat)+'</span><b>'+esc(n.title)+'</b><span class="ar">→</span>';
        nl.appendChild(a);
      });
    }
  }
})();
