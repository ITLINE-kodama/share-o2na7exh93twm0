/* JAICO AIチャットボット（デモ版・有償AIオプション +18,000円/月）
   全ページ共通ウィジェット。管理画面(demo_chatbot)と localStorage[jaico_chatbot_v1] で連動 */
(function(){
  if(window.__jaicoChatbotLoaded) return; window.__jaicoChatbotLoaded=true;

  /* ルートパス（このスクリプトのsrcから算出）*/
  var sc=document.currentScript, ROOT='';
  if(sc && sc.src){ ROOT=sc.src.replace(/assets\/chatbot\.js.*$/,''); }

  /* ===== 管理画面の設定を読む ===== */
  var CFG={greeting:'', ng:[], extraQA:[]};
  try{
    var raw=localStorage.getItem('jaico_chatbot_v1');
    if(raw){ var j=JSON.parse(raw); if(j&&j.published){ CFG.greeting=j.published.greeting||''; CFG.ng=j.published.ng||[]; CFG.extraQA=j.published.extraQA||[]; } }
  }catch(e){}

  /* ===== デモ用Q&A（キーワードマッチ）===== */
  var L=function(t,href){return {t:t,href:ROOT+href};};
  var QA=[
    {kw:['講座','資格','コース','学びたい','探したい','一覧','どんな'],
     a:'当協会では、目的に合わせて5つの講座をご用意しています。\n\n● 産業カウンセラー養成講座（協会の中核資格）\n● シニア産業カウンセラー育成講座（上位資格）\n● キャリアコンサルタント養成講習（国家資格）\n● キャリアコンサルタント更新講習（資格の更新）\n● 心の健康アドバイザー認定講座（はじめての方に）\n\n下のボタンから各講座のページをご覧いただけます。',
     links:[L('産業カウンセラー養成講座','qualification/counselor/index.html'),L('シニア産業カウンセラー育成講座','qualification/senior/index.html'),L('キャリアコンサルタント養成講習','qualification/career/course/index.html'),L('キャリアコンサルタント更新講習','qualification/career/renewal/index.html'),L('心の健康アドバイザー認定講座','qualification/kokoro/index.html'),L('資格・講座 一覧・講座カレンダー','qualification/index.html')]},
    {kw:['産業カウンセラー','養成講座','資格を取','カウンセラーになる'],
     a:'産業カウンセラー養成講座は、働く人を心理面から支える専門家を育てる当協会の中核講座です。全国13支部＋オンラインで受講できます。',
     links:[L('産業カウンセラー養成講座を見る','qualification/counselor/index.html'),L('開講日程・お申し込み','qualification/counselor/index.html#schedule')]},
    {kw:['受講料','費用','料金','いくら','給付金','教育訓練'],
     a:'受講料は講座ごとに各講座ページの「受講料」欄でご案内しています。\n産業カウンセラー養成講座・キャリアコンサルタント養成講習は専門実践教育訓練給付金の対象で、条件を満たすと受講料の最大80%が支給されます。',
     links:[L('産業カウンセラー養成講座の受講料・給付金','qualification/counselor/index.html#fee'),L('資格・講座 一覧（各講座の受講料へ）','qualification/index.html')]},
    {kw:['説明会','無料説明','セミナー日程'],
     a:'無料説明会をオンラインで定期開催しています。最新の開催日は各講座ページの「説明会」ボタンからご確認・お申し込みいただけます。',
     links:[L('産業カウンセラー養成講座（説明会）','qualification/counselor/index.html'),L('キャリアコンサルタント養成講習','qualification/career/course/index.html'),L('心の健康アドバイザー認定講座','qualification/kokoro/index.html')]},
    {kw:['更新講習','資格更新','更新','キャリアコンサルタント','キャリコン','技能講習','知識講習'],
     a:'キャリアコンサルタントの資格更新に必要な知識講習（8時間）・技能講習（計30時間）を全国で開催しています。全国開催日程から種別・地域で絞り込めます。',
     links:[L('更新講習のご案内','qualification/career/renewal/index.html'),L('キャリアコンサルタント トップ','qualification/career/index.html')]},
    {kw:['相談','悩み','カウンセリング','ホットライン','つらい','苦しい'],
     a:'働く人の悩みホットライン（無料・匿名可）やSNS相談、全国の相談室での対面相談をご利用いただけます。ひとりで抱え込まず、お気軽にご相談ください。',
     links:[L('相談・カウンセリング','counseling/index.html'),L('働く人の悩みホットライン','counseling/hotline/index.html')]},
    {kw:['入会','会員','会費','マイページ'],
     a:'会員になると研修割引・賠償責任保険・求人情報など各種特典をご利用いただけます。入会案内ページでメリット・会員種別・会費をご確認ください。',
     links:[L('入会案内','member/join/index.html'),L('会員・入会 トップ','member/index.html')]},
    {kw:['心の健康アドバイザー','こころ','アドバイザー','入門'],
     a:'心の健康アドバイザー認定講座は、身近な人の「こころのサイン」に気づき支えるための入門講座です。オンラインで受講できます。',
     links:[L('心の健康アドバイザー認定講座','qualification/kokoro/index.html')]},
    {kw:['シニア','上位資格','育成講座'],
     a:'シニア産業カウンセラー育成講座は、産業カウンセラーの上位資格をめざす方向けの講座です。科目ごとに選んで受講できます。',
     links:[L('シニア産業カウンセラー育成講座','qualification/senior/index.html')]},
    {kw:['試験','受験','合格','2級','1級'],
     a:'産業カウンセラー試験（2級・1級）やキャリアコンサルタント国家試験の情報は試験情報ページでご案内しています。',
     links:[L('試験情報','examination/index.html')]},
    {kw:['企業','法人','研修','ストレスチェック','EAP'],
     a:'企業・団体向けに、メンタルヘルス対策支援・企業研修・ストレスチェック・外部相談窓口（EAP）をご提供しています。',
     links:[L('法人向けサービス','company/index.html'),L('法人お問い合わせ','company/contact/index.html')]},
    {kw:['アクセス','場所','住所','行き方'],
     a:'協会本部は東京都港区新橋6-17-17 御成門センタービル6階です。全国13支部の所在地もご案内しています。',
     links:[L('アクセス','access/index.html'),L('全国支部一覧','member/branch/index.html')]},
    {kw:['問い合わせ','連絡','電話','メール'],
     a:'お問い合わせフォームからご連絡いただけます。内容に応じて担当部署からご回答します。',
     links:[L('お問い合わせ','contact/index.html')]}
  ];
  var DEFAULT_NG=['診断','薬','処方','治療して'];

  /* ===== スタイル ===== */
  var css=''
  +'.jcb-btn{position:fixed;right:20px;bottom:20px;z-index:9990;display:flex;align-items:center;gap:9px;border:none;cursor:pointer;background:linear-gradient(135deg,#27ab41,#1c7c2f);box-shadow:0 6px 22px rgba(28,124,47,.45);color:#fff;border-radius:999px;padding:14px 22px 14px 18px;font-family:"Noto Sans JP","Yu Gothic UI",sans-serif;font-size:13.5px;font-weight:800;letter-spacing:.02em;transition:transform .15s;animation:jcbPulse 2.6s infinite}'
  +'.jcb-btn .jcb-ic{font-size:20px;line-height:1}'
  +'.jcb-btn .jcb-lb{line-height:1.3;white-space:nowrap}'
  +'.jcb-btn:hover{transform:scale(1.05)}'
  +'.jcb-btn.open{width:58px;height:58px;padding:0;justify-content:center;font-size:22px;animation:none}'
  +'@keyframes jcbPulse{0%,100%{box-shadow:0 6px 22px rgba(28,124,47,.45)}50%{box-shadow:0 6px 22px rgba(28,124,47,.45),0 0 0 11px rgba(39,171,65,.16)}}'
  +'.jcb-btn .jcb-dot{position:absolute;top:-3px;right:-1px;width:13px;height:13px;border-radius:50%;background:#eab010;border:2px solid #fff}'
  +'@media(max-width:560px){.jcb-btn .jcb-lb{display:none}.jcb-btn{width:58px;height:58px;padding:0;justify-content:center;font-size:22px}}'
  +'.jcb-panel{position:fixed;right:20px;bottom:92px;z-index:9991;width:370px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:18px;box-shadow:0 18px 60px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;font-family:"Noto Sans JP","Yu Gothic UI",sans-serif}'
  +'.jcb-panel.on{display:flex;animation:jcbUp .22s ease-out}'
  +'@keyframes jcbUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}'
  +'.jcb-hd{flex:0 0 auto;background:linear-gradient(135deg,#239b3b,#1c7c2f);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}'
  +'.jcb-hd .jcb-av{width:38px;height:38px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;flex:0 0 auto}'
  +'.jcb-hd .jcb-tt{font-size:14px;font-weight:800;line-height:1.3}'
  +'.jcb-hd .jcb-st{font-size:10.5px;opacity:.9}'
  +'.jcb-hd .jcb-cl{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:4px 8px}'
  +'.jcb-body{flex:1;min-height:0;overflow-y:auto;padding:14px;background:#f2f7f3;display:flex;flex-direction:column;gap:10px}'
  +'.jcb-m{max-width:86%;font-size:12.5px;line-height:1.75;border-radius:14px;padding:10px 13px;white-space:pre-wrap;word-break:break-word}'
  +'.jcb-m.bot{align-self:flex-start;background:#fff;border:1px solid #dfe9e1;border-bottom-left-radius:4px;color:#243024}'
  +'.jcb-m.user{align-self:flex-end;background:#1c7c2f;color:#fff;border-bottom-right-radius:4px}'
  +'.jcb-links{align-self:flex-start;display:flex;flex-direction:column;gap:6px;max-width:86%}'
  +'.jcb-links a{display:block;background:#fff;border:1.5px solid #27ab41;color:#1c7c2f;font-size:12px;font-weight:700;border-radius:10px;padding:8px 12px;text-decoration:none}'
  +'.jcb-links a:hover{background:#eef7f0}'
  +'.jcb-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:100%}'
  +'.jcb-chips button{border:1.5px solid #b9d8c1;background:#fff;color:#2c5a3a;font-size:11.5px;font-weight:700;border-radius:999px;padding:6px 12px;cursor:pointer;font-family:inherit}'
  +'.jcb-chips button:hover{background:#eef7f0;border-color:#27ab41}'
  +'.jcb-typing{align-self:flex-start;background:#fff;border:1px solid #dfe9e1;border-radius:14px;border-bottom-left-radius:4px;padding:12px 16px;display:flex;gap:4px}'
  +'.jcb-typing i{width:7px;height:7px;border-radius:50%;background:#9db8a3;animation:jcbB 1s infinite}'
  +'.jcb-typing i:nth-child(2){animation-delay:.15s}.jcb-typing i:nth-child(3){animation-delay:.3s}'
  +'@keyframes jcbB{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}'
  +'.jcb-ft{flex:0 0 auto;border-top:1px solid #e2ebe4;background:#fff;padding:10px 12px 8px}'
  +'.jcb-row{display:flex;gap:8px}'
  +'.jcb-row input{flex:1;border:1.5px solid #cfdfd3;border-radius:999px;padding:10px 16px;font-size:13px;font-family:inherit;min-width:0}'
  +'.jcb-row input:focus{outline:2px solid #27ab41;border-color:#27ab41}'
  +'.jcb-row button{flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:none;background:#1c7c2f;color:#fff;font-size:17px;cursor:pointer}'
  +'.jcb-note{margin-top:6px;font-size:9.5px;color:#8a978d;text-align:center;line-height:1.5}'
  +'@media(max-width:480px){.jcb-panel{right:8px;left:8px;width:auto;bottom:84px}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  /* ===== DOM ===== */
  var BTN_HTML='<span class="jcb-ic">💬</span><span class="jcb-lb">お困りごと・ご質問はこちら</span><span class="jcb-dot"></span>';
  var btn=document.createElement('button'); btn.className='jcb-btn'; btn.title='AIチャットボットに質問（デモ）';
  btn.innerHTML=BTN_HTML;
  var pn=document.createElement('div'); pn.className='jcb-panel';
  pn.innerHTML='<div class="jcb-hd"><span class="jcb-av">🤖</span><div><div class="jcb-tt">JAICO サポートAIチャット</div><div class="jcb-st">AI自動応答・24時間受付（デモ版）</div></div><button class="jcb-cl" title="閉じる">✕</button></div>'
    +'<div class="jcb-body"></div>'
    +'<div class="jcb-ft"><div class="jcb-row"><input placeholder="質問を入力（例：受講料はいくら？）"><button title="送信">➤</button></div>'
    +'<div class="jcb-note">AIによる自動応答（デモ版・回答はサンプルです）｜有償AIオプション：チャットボット +18,000円/月（税抜）</div></div>';
  document.body.appendChild(btn); document.body.appendChild(pn);

  var body=pn.querySelector('.jcb-body'), inp=pn.querySelector('input'), send=pn.querySelector('.jcb-row button');

  function scb(){ body.scrollTop=body.scrollHeight; }
  function addMsg(cls,text){ var d=document.createElement('div'); d.className='jcb-m '+cls; d.textContent=text; body.appendChild(d); scb(); return d; }
  function addLinks(links){ if(!links||!links.length) return; var w=document.createElement('div'); w.className='jcb-links';
    links.forEach(function(l){ var a=document.createElement('a'); a.href=l.href; a.textContent='▶ '+l.t; w.appendChild(a); }); body.appendChild(w); scb(); }
  function typing(fn){ var t=document.createElement('div'); t.className='jcb-typing'; t.innerHTML='<i></i><i></i><i></i>'; body.appendChild(t); scb();
    setTimeout(function(){ t.remove(); fn(); }, 650); }

  function answer(q){
    /* 禁止事項チェック（標準＋管理画面で追加した禁止事項） */
    var ngAll=DEFAULT_NG.concat(CFG.ng||[]);
    for(var i=0;i<ngAll.length;i++){
      var kw=String(ngAll[i]).trim(); if(!kw) continue;
      if(q.indexOf(kw)>=0){
        addMsg('bot','申し訳ございません。その内容はこのチャットではお答えを控えさせていただいております。\nお困りごとやご相談は、担当窓口で丁寧にご対応いたします。\n\n📞 お電話：03-3438-4568（協会本部／平日 9:00〜17:00）\n✉ メール：下の「お問い合わせフォーム」をご利用ください。');
        addLinks([L('お問い合わせフォームを開く','contact/index.html'),L('働く人の悩みホットライン','counseling/hotline/index.html')]);
        return;
      }
    }
    /* 管理画面の追加Q&A優先 */
    var ex=(CFG.extraQA||[]);
    for(var j=0;j<ex.length;j++){
      var e=ex[j]; if(!e||!e.q) continue;
      if(q.indexOf(String(e.q).slice(0,6))>=0 || String(e.q).indexOf(q.slice(0,6))>=0){ addMsg('bot',e.a||''); return; }
    }
    /* キーワードスコアリング */
    var best=null,bs=0;
    QA.forEach(function(item){ var s=0; item.kw.forEach(function(k){ if(q.indexOf(k)>=0) s+=k.length; }); if(s>bs){bs=s;best=item;} });
    if(best){ addMsg('bot',best.a); addLinks(best.links); }
    else{
      addMsg('bot','お問い合わせありがとうございます。恐れ入りますが、そのご質問はこのAIチャットではお答えが難しい内容のようです。\n正確にご案内するため、下記の窓口へお気軽にお問い合わせください。担当者が丁寧にご対応いたします。\n\n📞 お電話：03-3438-4568（協会本部／平日 9:00〜17:00）\n✉ メール：下の「お問い合わせフォーム」からお送りいただけます。');
      addLinks([L('お問い合わせフォームを開く','contact/index.html'),L('目的から探す（資格・講座）','qualification/index.html'),L('相談窓口のご案内','counseling/index.html')]);
    }
  }

  function ask(q){
    q=String(q||'').trim(); if(!q) return;
    addMsg('user',q); inp.value='';
    typing(function(){ answer(q); });
  }

  function greet(){
    body.innerHTML='';
    addMsg('bot', CFG.greeting || 'こんにちは！日本産業カウンセラー協会のAIチャットボット（デモ版）です。\n講座・資格・相談窓口など、なんでもご質問ください。');
    var chips=document.createElement('div'); chips.className='jcb-chips';
    ['講座を探したい','受講料・給付金','説明会の日程','資格の更新について','相談したい','入会について'].forEach(function(t){
      var b=document.createElement('button'); b.textContent=t; b.onclick=function(){ ask(t); }; chips.appendChild(b);
    });
    body.appendChild(chips); scb();
  }

  var opened=false;
  function toggle(open){
    var on=(open===undefined)?!pn.classList.contains('on'):open;
    pn.classList.toggle('on',on); btn.classList.toggle('open',on); btn.innerHTML = on ? '✕' : BTN_HTML;
    if(on && !opened){ opened=true; greet(); setTimeout(function(){ inp.focus(); },250); }
  }
  btn.addEventListener('click',function(){ toggle(); });
  pn.querySelector('.jcb-cl').addEventListener('click',function(){ toggle(false); });
  send.addEventListener('click',function(){ ask(inp.value); });
  inp.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); ask(inp.value); } });


  /* スクショ・デモ用：?chatopen=1 で自動オープン */
  try{ if(/[?&]chatopen=1/.test(location.search)) toggle(true); }catch(e){}
})();
