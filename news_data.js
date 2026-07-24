/* お知らせ共通データ（demo_news 管理画面 と news-archive アーカイブページ が共有）
   items: [{date, body, archived?}]  archived:true = アーカイブ済み（LPの新着からは非表示、アーカイブページに掲載）
   ※現時点で前年以前の項目は初期状態でアーカイブ済みにしてある（1年毎アーカイブ運用のイメージ）。 */
window.JAICO_NEWS = {
 sangyo:{ name:'産業カウンセラー養成講座 LP', key:'jaico_news_sangyo_v1',
   preview:'../designD/qualification/counselor/index.html', archive:'../news-archive/index.html?lp=sangyo',
   seed:[
    {date:'2026.7.22', body:'【日程変更のお知らせ】東京支部「渋谷OL（日）026」コース（コースコード：2634Y26）につきまして、第3回の開催日を <b>2026年5月10日（日）</b> から <b>2026年5月17日（日）</b> へ変更いたしました。ご受講予定の皆様にはご迷惑をおかけいたしますが、何卒よろしくお願い申し上げます。'},
    {date:'2026.4.24', body:'「全国オンライン無料説明会」の開催日時は決まり次第、順次掲載いたします。現在はお申込みを受け付けておりません。<br>・新型コロナウイルス感染症の拡大防止のため、安全対策を施し講座を実施します。<br>・面接の体験学習をオンライン（Zoom利用）で行なうコースを開設しています。一部スクーリングのあるコースと、全日程オンラインで行なうコースとがあります。'}
   ]},
 senior:{ name:'シニア産業カウンセラー育成講座 LP', key:'jaico_news_senior_v1',
   preview:'../designD/qualification/senior/index.html', archive:'../news-archive/index.html?lp=senior',
   seed:[
    {date:'2026.7.1', body:'<a href="#content05">2026年7月募集開始分 を追加しました。</a>'},
    {date:'2026.6.1', body:'2026年6月募集開始分 を追加しました。'},
    {date:'2026.5.7', body:'<a href="https://www.counselor.or.jp/tabid/101/Default.aspx?itemid=720&dispmid=436" target="_blank" rel="noopener">厚生労働省団体検定認定に伴うシニア産業カウンセラー試験について ↗</a>'},
    {date:'2026.5.1', body:'2026年5月募集開始分 を追加しました。'}
   ]},
 cc:{ name:'キャリアコンサルタント養成講習 LP', key:'jaico_news_cc_v1',
   preview:'../designD/qualification/career/course/index.html', archive:'../news-archive/index.html?lp=cc',
   seed:[
    {date:'2026-05-25', body:'2026年6月開講・6か月コースの受付を終了しました。<br>次回6か月コースの詳細は決まり次第ご案内いたします。'},
    {date:'2026-04-22', body:'2026年8月開講・4ヵ月コースの受付を開始しました。'},
    {date:'2026-04-01', body:'2026年6月開講・6ヵ月コースの受付を開始しました。'}
   ]},
 koushin:{ name:'キャリアコンサルタント更新講習 LP', key:'jaico_news_koushin_v1',
   preview:'../designD/qualification/career/renewal/index.html', archive:'../news-archive/index.html?lp=koushin',
   seed:[
    {date:'2026.6.16', body:'開催情報を更新しました。'},
    {date:'2021.6.15', body:'修了証の発行を6月15日開催講習より原則PDFによりメール送付する方式に変更しました。<br><a href="https://www.jaico.cc/koushin/pdf/2106_newsletter.pdf" target="_blank" rel="noopener">詳細はコチラ</a>', archived:true}
   ]},
 kokoro:{ name:'心の健康アドバイザー認定講座 LP', key:'jaico_news_kokoro_v1',
   preview:'../designD/qualification/kokoro/index.html', archive:'../news-archive/index.html?lp=kokoro',
   seed:[
    {date:'2026.6.7', body:'9月度（9月19日・26日・27日開催）「心の健康アドバイザー認定講座」のお申込み受付を開始しました。<br>お申込み期間は以下の通りです。<br>2026年6月7日（日）～8月28日（金）17時まで'},
    {date:'2026.4.26', body:'7月度（7月4日・11日・20日開催）「心の健康アドバイザー認定講座」のお申込み受付を開始しました。<br>お申込み期間は以下の通りです。<br>2026年4月26日（日）～6月6日（土）17時まで'},
    {date:'2026.3.14', body:'5月度（5月11日・18日・25日開催）「心の健康アドバイザー認定講座」のお申込み受付を開始しました。<br>お申込み期間は以下の通りです。<br>2026年3月14日（土）～4月25日（土）17時まで'},
    {date:'2025.5.29', body:'受講者の声を掲載いたしました。', archived:true},
    {date:'2023.12.7', body:'学生の皆様へ：申込受付を開始しました。', archived:true},
    {date:'2023.11.18', body:'11月1日より、学生割引制度を導入致しました。<br>詳細はご準備でき次第、掲載してまいります。', archived:true}
   ]}
};
/* 保存済み(localStorage)があればそれを、無ければ seed を返す */
window.JAICO_NEWS_ITEMS = function(lpKey){
  var lp = window.JAICO_NEWS[lpKey]; if(!lp) return [];
  var d=null; try{ d=JSON.parse(localStorage.getItem(lp.key)||'null'); }catch(e){}
  return (d && Array.isArray(d.items)) ? d.items : JSON.parse(JSON.stringify(lp.seed));
};
